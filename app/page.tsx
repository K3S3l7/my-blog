import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div>
      <div className="flex items-baseline justify-between mb-4 font-mono text-xs text-muted uppercase tracking-[0.15em]">
        <h2>Articles</h2>
        <span>{String(posts.length).padStart(2, "0")}</span>
      </div>

      <ul className="border-t border-line">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <Link
              href={`/article/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-6 py-5 border-b border-line"
            >
              <span className="font-mono text-xs text-muted sm:w-24 sm:shrink-0 tabular-nums">
                {formatDate(post.date)}
              </span>
              <span className="font-display text-lg sm:text-xl leading-snug text-ink group-hover:text-accent transition-colors">
                {post.title}
              </span>
              <span className="hidden sm:block ml-auto font-mono text-sm text-muted opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all">
                ↗
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
