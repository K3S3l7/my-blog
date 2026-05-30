export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <p className="text-xs text-[#555] tracking-widest uppercase mb-6">— About Me</p>

      <h1 className="text-3xl font-bold text-white mb-6 leading-tight">
        Hi, I&apos;m [Your Name]
      </h1>

      <div className="space-y-4 text-[#aaa] text-sm leading-relaxed">
        <p>
          Security researcher focused on web application security, bug bounty hunting,
          and vulnerability research. I write about what I find.
        </p>
        <p>
          I&apos;ve reported vulnerabilities to companies like [Company A], [Company B],
          and earned recognition on several Hall of Fame programs.
        </p>
        <p>
          When I&apos;m not breaking things, I&apos;m writing about how I broke them.
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-[#1f1f1f]">
        <p className="text-xs text-[#555] tracking-widest uppercase mb-4">— Links</p>
        <ul className="space-y-2 text-sm">
          {[
            { label: "GitHub", href: "https://github.com/yourusername" },
            { label: "Twitter / X", href: "https://x.com/yourusername" },
            { label: "HackerOne", href: "https://hackerone.com/yourusername" },
          ].map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888] hover:text-[#c8f000] transition-colors"
              >
                → {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
