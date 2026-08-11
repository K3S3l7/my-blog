export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
        Contact<span className="text-accent">.</span>
      </h1>

      <p className="mt-6 text-ink-soft leading-relaxed">
        Found a bug you want to pick my brain about, or want to collaborate?
        Email is the fastest way to reach me — I read everything, even if I take
        a while to reply.
      </p>

      <ul className="mt-10 border-t border-line">
        {[
          {
            label: "Email",
            value: "kimuxsxs@gmail.com",
            href: "mailto:kimuxsxs@gmail.com",
          },
          {
            label: "X / Twitter",
            value: "@kymu___",
            href: "https://x.com/kymu___",
          },
          {
            label: "LinkedIn",
            value: "Karim Belfodil",
            href: "https://linkedin.com/in/qatada",
          },
        ].map(({ label, value, href }) => (
          <li
            key={label}
            className="flex flex-wrap items-baseline justify-between gap-2 py-4 border-b border-line"
          >
            <span className="font-mono text-xs text-muted uppercase tracking-[0.15em]">
              {label}
            </span>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={
                href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="text-ink hover:text-accent transition-colors"
            >
              {value}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-6 font-mono text-xs text-muted">
        PGP key available on request.
      </p>
    </div>
  );
}
