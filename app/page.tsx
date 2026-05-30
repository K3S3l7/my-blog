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
      <div className="flex items-center justify-between mb-12 text-xs text-[#555] tracking-widest uppercase border-b border-[#1a1a1a] pb-4">
        <span>— Posts</span>
        <span>{posts.length} / {posts.length}</span>
      </div>

      <ul className="divide-y divide-[#141414]">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-baseline gap-8 py-5 group hover:bg-[#0f0f0f] px-3 -mx-3 transition-colors"
            >
              <span className="text-xs text-[#3a3a3a] w-32 shrink-0 tracking-widest font-mono">
                {post.date}
              </span>
              <span className="text-[#c0c0c0] group-hover:text-[#c8f000] transition-colors text-base tracking-wide">
                {post.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
