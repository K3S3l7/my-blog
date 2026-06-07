export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <p className="text-xs text-[#555] tracking-widest uppercase mb-6">— About Me</p>

      <h1 className="text-3xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Merriweather', serif" }}>
        Hi, I&apos;m Karim Belfodil (Kymu)
      </h1>

      <div className="space-y-4 text-[#aaa] text-sm leading-relaxed">
        <p>
          Cyber Security researcher focused on web application, Software Exploitation, and other assets security.
          </p>
          <p>
          I'm Mostly interested in logical flaws, injection attacks, DoS, exploit chains, and so on.
        </p>
        <p>
          I&apos;ve reported vulnerabilities to companies like Nasa, Autodesk, CoinSpot, Twilio, X, and others.
        </p>
        <p>
          Outside of hacking, I take pleasure in reading articles, exploring Islam, and working out.
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-[#1f1f1f]">
        <p className="text-xs text-[#555] tracking-widest uppercase mb-4">— Links</p>
        <ul className="space-y-2 text-sm">
          {[
            { label: "Twitter / X", href: "https://x.com/kymu___" },
            { label: "HackerOne", href: "https://hackerone.com/kymu_" },
            { label: "Bugcrowd", href: "https://bugcrowd.com/h/kymu" },
            { label: "YesWeHack", href: "https://yeswehack.com/hunters/kymu" },
          ].map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888] hover:text-[#ffffa3] transition-colors"
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
