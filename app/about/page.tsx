const links = [
  { label: "X / Twitter", href: "https://x.com/kymu___" },
  { label: "HackerOne", href: "https://hackerone.com/kymu_" },
  { label: "Bugcrowd", href: "https://bugcrowd.com/h/kymu" },
  { label: "YesWeHack", href: "https://yeswehack.com/hunters/kymu" },
  { label: "Email", href: "mailto:kimuxsxs@gmail.com" },
];

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
        Karim Belfodil<span className="text-accent">.</span>
      </h1>
      <p className="mt-2 font-mono text-sm text-muted">
        A.K.A. Kymu — cyber security researcher
      </p>

      <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-ink-soft">
        <p>
          More than 2 Years of experience is cyber security, I Look for bugs in web applications and whatever else is exposed. I&apos;m
          drawn to logic flaws, injection attacks, DoS angles, and anything that
          chains two small bugs into one big one.
        </p>
        <p>
          I&apos;ve reported vulnerabilities to NASA, Autodesk, CoinSpot,
          Twilio, X, and a few others.
        </p>
        <p>
          Off the keyboard I read a lot, try to understand Islam properly, and
          lift weights.
        </p>
      </div>

      <div className="mt-12 border-t border-line pt-8">
        <h2 className="font-mono text-xs text-muted uppercase tracking-[0.15em] mb-4">
          Elsewhere
        </h2>
        <ul className="space-y-3">
          {links.map(({ label, href }) => (
            <li key={label} className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-muted w-24 shrink-0">
                {href.startsWith("http") ? "www" : "mail"}
              </span>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
