---
title: Walking Backwards Through a Search Oracle
date: 2026-07-26
---

# Walking Backwards Through a Search Oracle

<img width="1248" height="832" alt="KJz2J" src="https://github.com/user-attachments/assets/baa841b3-89a7-4d27-bc74-3e73fce898df" />



---

## Introduction

This post walks through the discovery and exploitation of a blind search oracle in a cloud-based platform used for engineering, and design collaboration. The platform lets organizations manage items, workflows, and attachments — all through a web interface with granular role-based permissions.

The setup involved two accounts: an administrator account used to configure permissions, and a second account whose privileges were deliberately stripped. From the admin panel, access to the **Attachments** tab was removed, and visibility of certain metadata fields — including creator email addresses — was disabled. The second account could browse items and use the search bar, but the restricted fields were nowhere to be found in the UI.

The search bar, however, had other ideas.

---

## Index

- [First Looks at the Search](#first-looks)
- [Beep Boop — A Blind Oracle](#the-oracle)
- [The Starting Character Problem](#the-problem)
- [Bidirectional Extension — Let the Boundary Find Itself](#bidirectional)
- [Email Extraction in Practice](#practice)
- [Results](#results)
- [Conclusion](#conclusion)

---

## First Looks at the Search {#first-looks}

The platform features a global search bar at the top of every page. It performs a full-text search across items, returning results as you type. Behind the scenes, each keystroke fires a request like this:

```
GET /api/v3/search-results?limit=50&offset=0&page=1
    &query=t&revision=1
```

The `query` parameter uses a Lucene-style syntax. Searching for `t` returns all items containing the letter "t" in any indexed field — descriptor, owner name, workspace name, and, as it turns out, attachment filenames and creator email addresses.

The first thing that caught my attention was the ability to scope queries to a specific item using filters:

```sql
query=kymu+AND+((workspaceId=2+AND+ITEM_DETAILS:DMS_ID=18602))
```

This is a compound query: find documents where the default search field contains `kymu`, **and** the item belongs to workspace 2 with `DMS_ID=18602`. If any indexed field of that specific item contains the substring, the item appears in the results. If not, it doesn't.

This scoping immediately raised a question: **what happens if I search for a substring of an attachment filename on an item whose Attachments tab I cannot access?**

---

## Beep Boop — A Blind Oracle {#the-oracle}

The answer was a clean binary signal:


HTTP 200 → item appears in results → substring EXISTS
<img width="958" height="99" alt="Screenshot 2026-07-26 at 13 57 24" src="https://github.com/user-attachments/assets/45f1b2aa-18f4-4136-9d5e-1118d981a480" />

HTTP 204 → empty response         → substring DOES NOT EXIST
<img width="958" height="88" alt="Screenshot 2026-07-26 at 13 58 04" src="https://github.com/user-attachments/assets/f0a3199f-09ae-44d0-89fd-d1876a473ddf" />



A perfect blind oracle. No rate limiting, no noise, no ambiguity.

To validate my theory, i tried to search for the attachment name in the search bar

| Query (scoped to 18602) | Response | Why |
|-------------------------|----------|-----|
| `t` | 200 | 't' in "Test..." |
| `te` | 200 | 'te' in "test..." |
| `test` | 200 | 'test' in attachment filename |
| `vest` | 204 | Not a substring of any indexed field |

The search engine was indexing attachment filenames — fields I had no UI access to — and leaking their presence through the search API. From here, extracting full values was a matter of patience and a good algorithm.

---

## The Starting Character Problem {#the-problem}

A naive attacker might try to brute-force the value from left to right: test `a`, then `ab`, then `abc`, and so on. This fails spectacularly for one simple reason: **the search matches substrings, not prefixes.**

If the filename is `test.webp`, searching for `e` returns 200 — because `e` appears at position 1. Searching for `s` also returns 200. Searching for `te` returns 200. Searching for `es` also returns 200.

There is no way to distinguish position 0 from position N by testing individual characters. You can't just guess the first letter because every letter that appears *anywhere* in the value passes the test equally.

This is the core challenge of any blind substring oracle: **how do you find the start when you can't ask "does it begin with X?"**

---

## The Greedy Bidirectional Extension — Let the Boundary Find Itself {#bidirectional}

The insight is simple: **you don't need to guess the start. You just need to walk until you can't walk anymore.**

Pick any arbitrary character that exists in the value. Now, extend it **leftward** — prepend one character and test. If it matches, keep going. If not, try the next character. When no character in the alphabet can be prepended without breaking the match, you've found the left boundary.

Then do the same **rightward** — append characters until no extension works. You've found the right boundary.

Here's the algorithm in practice, starting from the arbitrary character `s` against item 18602:

```javascript
Seed: "t"              (chosen arbitrarily — any matching char works)

LEFT extension (prepend until dead-end):
  "st"   → 200 → seed = "st"
  "est"  → 200 → seed = "est"
  "eest"  → 204 → skip
  "test" → 200 → seed = "test"
  "atest" → 204, "btest" → 204, ... all 204
  → LEFT BOUNDARY: "test"

RIGHT extension (append until dead-end):
  "test."  → 200 → seed = "test."
  "test.w" → 200 → seed = "test.w"
  "test.we" → 200 → seed = "test.we"
  "test.web" → 200 → seed = "test.web"
  "test.webp" → 200 → seed = "test.webp"
  "test.webpa" → 204, "test.webpb" → 204, ... all 204
  → RIGHT BOUNDARY: "test.webp"

Complete: "test.webp"
```

The start finds itself. You walk backwards from the middle until the path ends, and whatever you're standing on is the beginning. The same principle works for any value — email addresses, filenames, metadata fields.

---

## Email Extraction in Practice {#practice}

Armed with the bidirectional extension algorithm, extracting an email address is fairly straightforward — until it isn't.

**Step 1 — Confirm `@` exists.** If the item has no email in its indexed fields, there's nothing to extract.

**Step 2 — Build the domain (right of `@`).** Extend right from `@` one character at a time until the domain base is found:

```javascript
@ → @w → @we → @wea → ... → @wearehackerone
```

**Step 3 — Build the username (left of `@`).** Extend left from the domain until the full local part is found:

```javascript
kymu_@wearehackerone.com  ←  ymu_@wearehackerone.com  ←  mu_@wearehackerone.com
← ... ← _@wearehackerone.com  ←  @wearehackerone.com
```

**Step 4 — Test TLDs.** Try common TLDs (`.com`, `.net`, `.org`, etc.) as extensions to the domain base.

**Step 5 — Check for `+` aliases.** If `+` is in the discovered charset, test common alias suffixes.

This worked beautifully for our first few test items — `kymu_@wearehackerone.com` came out clean. 


## Automating The Process {#results}
Using DeepSeek i vibecoded a script that will extract the email of the item's creator 
<img width="1150" height="260" alt="Adobe Express - test" src="https://github.com/user-attachments/assets/572e3939-ab14-442c-856f-2efa06fabe10" />

---

## Conclusion {#conclusion}

Search endpoints that return binary signals (match / no match) against privileged fields are effectively read-access to those fields — just a slower, noisier version of it. This vulnerability is not specific to any particular platform or search engine; any search API that indexes fields beyond the user's UI permissions and returns match/no-match responses is susceptible to the same class of attack.

The bidirectional extension technique presented here is generalizable. Given any blind substring oracle — whether it's a search API, a database `LIKE` query leaking through error messages, or a timing side-channel — the algorithm reconstructs the full value without ever needing to guess the first character.

Thank you for reading.

*AlhamduliLlah*

*Published in July 2026*

