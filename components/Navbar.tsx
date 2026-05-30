"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Blog" },
  { href: "/about", label: "About Me" },
  { href: "/cves", label: "CVEs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[#222] py-6 flex items-center justify-between w-full">
      <Link href="/" className="text-white font-bold tracking-widest text-base uppercase hover:text-[#c8f000] transition-colors">
        Kymu
      </Link>
      <nav className="flex gap-10">
        {navLinks.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`text-sm tracking-widest uppercase transition-colors border-b-2 pb-0.5 ${
                active
                  ? "text-[#c8f000] border-[#c8f000]"
                  : "text-[#888] border-transparent hover:text-[#d4d4d4]"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
