import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year} · ${month} · ${day}`;
  } catch {
    return dateString;
  }
}

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div style={{ fontFamily: "Courier New, monospace" }}>
      <div className="flex items-center justify-between mb-12 text-xs text-[#555] tracking-widest uppercase border-b border-[#1a1a1a] pb-4">
        <span>— Posts</span>
        <span>{posts.length} / {posts.length}</span>
      </div>

      <ul className="divide-y divide-[#141414]">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/article/${post.slug}`}
              className="flex items-baseline gap-8 py-5 group hover:bg-[#0f0f0f] px-3 -mx-3 transition-colors"
            >
              <span className="text-xs text-[#3a3a3a] w-32 shrink-0 tracking-widest font-mono">
                {formatDate(post.date)}
              </span>
              <span className="font-mono group-hover:text-[#c8f000] transition-colors text-base" style={{ color: "#ffffff", fontFamily: "Courier New, monospace" }}>
                {post.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
