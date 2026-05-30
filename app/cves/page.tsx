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
    id: "CVE-2025-4345",
    title: "Stored XSS in Autodesk Fusion Client",
    severity: "HIGH",
    cvss: "7.1",
    description:
      "A Maliciously crafted HTML payload, stored in a design name and exported to CSV, can trigger a Stored Cross-site Scripting (XSS) vulnerability in the Autodesk Fusion desktop application. A malicious actor may leverage this vulnerability to read local files or execute arbitrary code in the context of the current process.",
    link: "https://www.autodesk.com/trust/security-advisories/adsk-sa-2026-0005",
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
                <h2 className="text-white text-sm font-bold mt-1">{cve.title}</h2>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-xs font-bold tracking-widest ${severityColor[cve.severity] ?? "text-[#888]"}`}>
                  {cve.severity}
                </span>
                <p className="text-xs text-grey mt-0.5">CVSS {cve.cvss}</p>
              </div>
            </div>
            <p className="text-xs text-[#999] mb-3">{cve.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#c8f000] tracking-widest">{cve.id}</span>
              <a
                href={cve.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#c8f000] hover:text-white transition-colors"
              >
                → ADVISORY
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
