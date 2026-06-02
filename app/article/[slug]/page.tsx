import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import hljs from 'highlight.js';

interface PageProps {
  params: {
    slug: string;
  };
}

function parseMarkdown(content: string): JSX.Element[] {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      const language = line.slice(3).trim() || 'text';
      const codeLines: string[] = [];
      i++;

      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }

      const codeContent = codeLines.join('\n');
      let highlightedCode = codeContent;

      try {
        highlightedCode = hljs.highlight(codeContent, { language, ignoreIllegals: true }).value;
      } catch (e) {
        // If language not recognized, try auto-detect
        try {
          highlightedCode = hljs.highlightAuto(codeContent).value;
        } catch (e2) {
          highlightedCode = codeContent;
        }
      }

      elements.push(
        <pre key={`code-${i}`} className="bg-[#0a0a0a] border border-[#222] rounded p-4 my-4 overflow-x-auto">
          <code 
            className="text-sm leading-6 whitespace-pre" 
            style={{ fontFamily: "Courier New, monospace" }}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      );
      i++; // Skip closing ```
    }
    // Headers
    else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-lg font-bold mt-6 mb-3" style={{ color: "#d4d4d4", fontFamily: "'Merriweather', serif" }}>
          {line.slice(4)}
        </h3>
      );
      i++;
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} className="text-xl font-bold mt-8 mb-4" style={{ color: "#d4d4d4", fontFamily: "'Merriweather', serif" }}>
          {line.slice(3)}
        </h2>
      );
      i++;
    } else if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${i}`} className="text-2xl font-bold mt-10 mb-5" style={{ color: "#d4d4d4", fontFamily: "'Merriweather', serif" }}>
          {line.slice(2)}
        </h1>
      );
      i++;
    }
    // Lists
    else if (line.startsWith('- ')) {
      elements.push(
        <li key={`li-${i}`} className="ml-4 mb-2" style={{ color: "#d4d4d4", fontFamily: "'Merriweather', serif" }}>
          {line.slice(2)}
        </li>
      );
      i++;
    }
    // Empty line
    else if (line.trim() === '') {
      i++;
    }
    // Paragraph
    else {
      elements.push(
        <p key={`p-${i}`} className="mb-4 leading-7" style={{ color: "#d4d4d4", fontFamily: "'Merriweather', serif" }}>
          {line}
        </p>
      );
      i++;
    }
  }

  return elements;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default function ArticlePage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto" style={{ fontFamily: "'Merriweather', serif" }}>
      <Link
        href="/"
        className="text-xs text-[#555] hover:text-[#f5f5dc] transition-colors mb-8 inline-block tracking-widest"
      >
        ← Back to Posts
      </Link>

      <header className="mb-10 pb-8 border-b border-[#1a1a1a]">
        <h1 className="text-4xl font-bold" style={{ fontFamily: "'Merriweather', serif", color: "#ffffff" }}>{post.title}</h1>
        <p className="text-xs text-[#555] tracking-widest font-mono">{post.date}</p>
      </header>

      <div className="prose prose-invert max-w-none" style={{ fontFamily: "'Merriweather', serif" }}>
        {parseMarkdown(post.content)}
      </div>
    </article>
  );
}
