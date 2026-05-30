import Link from "next/link";

// Replace these with your real posts
const posts = [
  {
    slug: "hello-world",
    date: "2026 · 05 · 30",
    title: "Hello World — My First Post",
    tags: ["WEB"],
  },
  {
    slug: "cve-2026-example",
    date: "2026 · 04 · 10",
    title: "CVE-2026-XXXXX — Example Vulnerability",
    tags: ["CVE", "RCE"],
  },
];

export default function BlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10 text-xs text-[#555] tracking-widest uppercase">
        <span>— Posts</span>
        <span>{posts.length} / {posts.length}</span>
      </div>

      <ul className="space-y-0 divide-y divide-[#1a1a1a]">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-baseline gap-6 py-4 group hover:bg-[#111] px-2 -mx-2 transition-colors"
            >
              <span className="text-xs text-[#444] w-28 shrink-0 tracking-widest">
                {post.date}
              </span>
              <span className="text-[#d4d4d4] group-hover:text-[#c8f000] transition-colors text-sm">
                {post.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
