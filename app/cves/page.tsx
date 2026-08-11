const cves = [
  {
    id: "CVE-2026-0533",
    title: "Stored XSS in Autodesk Fusion Client",
    severity: "HIGH",
    cvss: "7.1",
    description:
      "A maliciously crafted HTML payload in a design name, when displayed during the delete confirmation dialog and clicked by a user, can trigger a Stored Cross-site Scripting (XSS) vulnerability in the Autodesk Fusion desktop application. A malicious actor may leverage this vulnerability to read local files or execute arbitrary code in the context of the current process.",
    link: "https://www.autodesk.com/trust/security-advisories/adsk-sa-2026-0001",
  },
  {
    id: "CVE-2026-4345",
    title: "Stored XSS in Autodesk Fusion Client",
    severity: "HIGH",
    cvss: "7.1",
    description:
      "A Maliciously crafted HTML payload, stored in a design name and exported to CSV, can trigger a Stored Cross-site Scripting (XSS) vulnerability in the Autodesk Fusion desktop application. A malicious actor may leverage this vulnerability to read local files or execute arbitrary code in the context of the current process.",
    link: "https://www.autodesk.com/trust/security-advisories/adsk-sa-2026-0005",
  },
];

const severityStyle: Record<string, string> = {
  CRITICAL: "bg-[var(--sev-critical-bg)] text-[var(--sev-critical)]",
  HIGH: "bg-[var(--sev-high-bg)] text-[var(--sev-high)]",
  MEDIUM: "bg-[var(--sev-medium-bg)] text-[var(--sev-medium)]",
  LOW: "bg-[var(--sev-low-bg)] text-[var(--sev-low)]",
};

export default function CVEsPage() {
  return (
    <div>
      <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight leading-tight">
        CVEs<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 text-ink-soft leading-relaxed max-w-xl">
        Publicly disclosed vulnerabilities, with advisories linked where
        they&apos;re available.
      </p>

      <ul className="mt-10 border-t border-line">
        {cves.map((cve) => (
          <li
            key={cve.id}
            className="py-6 border-b border-line"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2">
              <span
                className={`inline-block px-2 py-0.5 font-mono text-[11px] font-medium tracking-wider ${severityStyle[cve.severity] ?? "bg-neutral-200 text-neutral-700"}`}
              >
                {cve.severity}
              </span>
              <span className="font-mono text-xs text-accent">{cve.id}</span>
              <span className="font-mono text-xs text-muted">CVSS {cve.cvss}</span>
            </div>
            <h2 className="font-display text-xl text-ink mb-2">{cve.title}</h2>
            <p className="text-[15px] leading-relaxed text-ink-soft mb-3">
              {cve.description}
            </p>
            <a
              href={cve.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-accent hover:text-accent-deep underline underline-offset-4 transition-colors"
            >
              Advisory ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
