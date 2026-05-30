const cves = [
  {
    id: "CVE-2026-XXXXX",
    title: "Example RCE in SomeProduct",
    severity: "CRITICAL",
    cvss: "9.8",
    date: "2026 · 04 · 10",
    description:
      "Remote code execution via unsanitized user input in the template engine of SomeProduct v1.2.3.",
    link: "https://nvd.nist.gov/",
  },
  {
    id: "CVE-2025-YYYYY",
    title: "XSS in AnotherApp",
    severity: "HIGH",
    cvss: "7.4",
    date: "2025 · 11 · 01",
    description:
      "Stored XSS allowing session hijacking via the profile bio field in AnotherApp.",
    link: "https://nvd.nist.gov/",
  },
];

const severityColor: Record<string, string> = {
  CRITICAL: "text-red-400",
  HIGH: "text-orange-400",
  MEDIUM: "text-yellow-400",
  LOW: "text-green-400",
};

export default function CVEsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10 text-xs text-[#555] tracking-widest uppercase">
        <span>— CVEs</span>
        <span>{cves.length} entries</span>
      </div>

      <ul className="space-y-6">
        {cves.map((cve) => (
          <li
            key={cve.id}
            className="border border-[#1f1f1f] p-5 hover:border-[#333] transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <span className="text-xs text-[#444] tracking-widest">{cve.date}</span>
                <h2 className="text-white text-sm font-bold mt-1">{cve.title}</h2>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-xs font-bold tracking-widest ${severityColor[cve.severity] ?? "text-[#888]"}`}>
                  {cve.severity}
                </span>
                <p className="text-xs text-[#555] mt-0.5">CVSS {cve.cvss}</p>
              </div>
            </div>
            <p className="text-xs text-[#666] mb-3">{cve.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#c8f000] tracking-widest">{cve.id}</span>
              <a
                href={cve.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#555] hover:text-[#c8f000] transition-colors"
              >
                → NVD
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
