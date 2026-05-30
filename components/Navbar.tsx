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
    <header className="border-b border-[#222] px-6 py-5 flex items-center justify-between max-w-5xl mx-auto w-full">
      <Link href="/" className="text-white font-bold tracking-widest text-sm uppercase hover:text-[#c8f000] transition-colors">
        YOUR NAME
      </Link>
      <nav className="flex gap-8">
        {navLinks.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`text-sm tracking-wide transition-colors border-b-2 pb-0.5 ${
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
