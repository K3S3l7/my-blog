import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import hljs from 'highlight.js';

interface PageProps {
  params: {
    slug: string;
  };
}

function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex =
    /!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]*)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|(https?:\/\/[^\s<>)]+)|<img\b([^>]*)>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      nodes.push(
        <img
          key={`${keyPrefix}-img-${idx++}`}
          src={match[2]}
          alt={match[1]}
          className="my-6 rounded-lg border border-line max-w-full h-auto"
        />
      );
    } else if (match[3] !== undefined) {
      if (match[4].startsWith('#')) {
        nodes.push(
          <a
            key={`${keyPrefix}-a-${idx++}`}
            href={match[4]}
            className="text-accent underline decoration-line-strong underline-offset-4 hover:text-accent-deep hover:decoration-accent transition-colors"
          >
            {match[3]}
          </a>
        );
      } else {
        nodes.push(
          <a
            key={`${keyPrefix}-a-${idx++}`}
            href={match[4]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-line-strong underline-offset-4 hover:text-accent-deep hover:decoration-accent transition-colors"
          >
            {match[3]}
          </a>
        );
      }
    } else if (match[5] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${idx++}`} className="font-semibold text-ink">
          {match[5]}
        </strong>
      );
    } else if (match[6] !== undefined) {
      nodes.push(
        <em key={`${keyPrefix}-i-${idx++}`}>{match[6]}</em>
      );
    } else if (match[7] !== undefined) {
      nodes.push(
        <code
          key={`${keyPrefix}-c-${idx++}`}
          className="bg-sunken text-ink font-mono px-1.5 py-0.5 text-[0.85em] rounded border border-line"
        >
          {match[7]}
        </code>
      );
    } else if (match[8] !== undefined) {
      nodes.push(
        <a
          key={`${keyPrefix}-url-${idx++}`}
          href={match[8]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline decoration-line-strong underline-offset-4 hover:text-accent-deep hover:decoration-accent transition-colors break-all"
        >
          {match[8]}
        </a>
      );
    } else if (match[9] !== undefined) {
      const attrs = match[9];
      const src = attrs.match(/src=["']([^"']+)["']/)?.[1];
      const alt = attrs.match(/alt=["']([^"']*)["']/)?.[1] ?? '';
      if (src) {
        nodes.push(
          <img
            key={`${keyPrefix}-img-${idx++}`}
            src={src}
            alt={alt}
            loading="lazy"
            className="my-6 rounded-lg border border-line max-w-full h-auto"
          />
        );
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderCodeBlock(language: string, lines: string[], key: string) {
  let codeContent = lines.join('\n');
  let highlighted = codeContent;
  let label = language;

  if (language) {
    try {
      highlighted = hljs.highlight(codeContent, { language, ignoreIllegals: true }).value;
    } catch {
      try {
        highlighted = hljs.highlightAuto(codeContent).value;
      } catch {
        highlighted = codeContent;
      }
    }
  } else {
    try {
      highlighted = hljs.highlightAuto(codeContent).value;
    } catch {
      highlighted = codeContent;
    }
  }

  return (
    <div key={key} className="my-6">
      <div className="code-head">
        {label && <span>{label}</span>}
        <code>{lines.length} lines</code>
      </div>
      <pre className="bg-sunken border border-line rounded-b-lg overflow-x-auto py-4 px-5">
        <code
          className="font-mono text-[13.5px] leading-6 whitespace-pre"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}

function parseMarkdown(content: string): JSX.Element[] {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  const usedIds = new Set<string>();
  let i = 0;

  const slugify = (text: string): string =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/[\s]+/g, '-');

  const headingId = (text: string, explicit?: string): string => {
    let base = (explicit || slugify(text)).trim() || 'section';
    let id = base;
    let n = 2;
    while (usedIds.has(id)) {
      id = `${base}-${n++}`;
    }
    usedIds.add(id);
    return id;
  };

  const parseHeading = (
    headingLine: string,
    prefix: string,
    level: 'h1' | 'h2' | 'h3',
    cls: string,
    key: string
  ) => {
    const rest = headingLine.slice(prefix.length);
    const anchor = rest.match(/\s*\{#([^}]*)\}\s*$/);
    const clean = anchor ? rest.slice(0, anchor.index) : rest;
    const id = headingId(clean, anchor?.[1]);
    const Tag = level;
    elements.push(
      <Tag
        key={key}
        id={id}
        className={`${cls} scroll-mt-28`}
      >
        {parseInline(clean, key)}
      </Tag>
    );
    i++;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      const language = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;

      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }

      elements.push(renderCodeBlock(language, codeLines, `code-${i}`));
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      parseHeading(line, '### ', 'h3', 'font-display text-2xl font-medium text-ink mt-10 mb-3', `h3-${i}`);
      continue;
    }

    if (line.startsWith('## ')) {
      parseHeading(line, '## ', 'h2', 'font-display text-3xl font-medium text-ink mt-12 mb-4', `h2-${i}`);
      continue;
    }

    if (line.startsWith('# ')) {
      parseHeading(line, '# ', 'h1', 'font-display text-3xl font-medium text-ink mt-12 mb-4', `h1-${i}`);
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      elements.push(<hr key={`hr-${i}`} className="my-10 border-line-strong" />);
      i++;
      continue;
    }

    if (line.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(
          lines[i].split('|').slice(1, -1).map((cell) => cell.trim())
        );
        i++;
      }
      const isSeparator = (row: string[]) =>
        row.length && row.every((cell) => /^-+$/.test(cell.replace(/^:+|:+$/g, '')));

      if (rows.length >= 2 && isSeparator(rows[1])) {
        const header = rows[0];
        const body = rows.slice(2);
        elements.push(
          <div key={`tbl-${i}`} className="my-6 overflow-x-auto">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr>
                  {header.map((cell, j) => (
                    <th
                      key={`th-${j}`}
                      className="border-b-2 border-line-strong px-3 py-2 text-left font-display font-medium text-ink align-top"
                    >
                      {parseInline(cell, `th-${i}-${j}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, r) => (
                  <tr key={`tr-${i}-${r}`}>
                    {row.map((cell, j) => (
                      <td
                        key={`td-${i}-${r}-${j}`}
                        className="border-b border-line px-3 py-2 text-ink-soft align-top"
                      >
                        {parseInline(cell, `td-${i}-${r}-${j}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      } else {
        elements.push(
          <p key={`p-${i}`} className="my-5 leading-relaxed text-ink-soft">
            {parseInline(rows.map((r) => r.join(' | ')).join(' '), `p-${i}`)}
          </p>
        );
      }
      continue;
    }

    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-6 border-l-2 border-accent pl-5 text-ink-soft italic"
        >
          {parseInline(quoteLines.join(' '), `quote-${i}`)}
        </blockquote>
      );
      continue;
    }

    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-5 space-y-2 list-disc pl-6 text-ink-soft">
          {items.map((item, j) => (
            <li key={`ul-${i}-li-${j}`}>{parseInline(item, `ul-${i}-li-${j}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (line.trim() === '') {
      i++;
      continue;
    }

    elements.push(
      <p key={`p-${i}`} className="my-5 leading-relaxed text-ink-soft">
        {parseInline(line, `p-${i}`)}
      </p>
    );
    i++;
  }

  return elements;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function ArticlePage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const date = new Date(post.date);
  const formattedDate = isNaN(date.getTime())
    ? post.date
    : date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

  return (
    <article className="max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-block font-mono text-xs text-muted hover:text-accent transition-colors mb-12"
      >
        ← Back to articles
      </Link>

      <header className="mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1]">
          {post.title}
        </h1>
        <p className="mt-4 font-mono text-xs text-muted uppercase tracking-[0.15em]">
          {formattedDate}
        </p>
      </header>

      <div>{parseMarkdown(post.content)}</div>
    </article>
  );
}
