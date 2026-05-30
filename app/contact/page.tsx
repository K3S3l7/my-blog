export default function ContactPage() {
  return (
    <div className="max-w-xl">
      <p className="text-xs text-[#555] tracking-widest uppercase mb-6">— Contact</p>
      <h1 className="text-3xl font-bold text-white mb-6">Get in Touch</h1>

      <p className="text-[#aaa] text-sm mb-10 leading-relaxed">
        Found a bug you&apos;d like to discuss? Want to collaborate? Or just want to say hi?
        Reach out through any of the channels below.
      </p>

      <ul className="space-y-4 text-sm">
        {[
          { label: "Email", value: "kimuxsxs@gmail.com", href: "mailto:kimuxsxs@gmail.com" },
          { label: "Twitter / X", value: "@kymu__", href: "https://x.com/kymu_" },
          { label: "LinkedIn", value: "Karim Belfodil", href: "https://linkedin.com/in/qatada" },
        ].map(({ label, value, href }) => (
          <li key={label} className="flex items-center gap-4 border-b border-[#1a1a1a] pb-4">
            <span className="text-[#444] w-28 shrink-0 tracking-widest text-xs uppercase">{label}</span>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-[#c8f000] transition-colors"
            >
              {value}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 p-4 border border-[#1f1f1f] text-xs text-[#555]">
        <span className="text-[#c8f000]">PGP</span> — Public key available on request.
      </div>
    </div>
  );
}
