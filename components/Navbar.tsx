"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Blog" },
  { href: "/about", label: "About Me" },
  { href: "/cves", label: "CVEs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Remove basePath from pathname since we have basePath: "/my-blog" in next.config.js
  const path = pathname.replace(/^\/my-blog/, "") || "/";

  const isActive = (href: string) => {
    // For home page, match "/" or any article path
    if (href === "/") {
      return path === "/" || path.startsWith("/article/");
    }
    // For other pages, exact match
    return path === href;
  };

  return (
    <>
      <header className="border-b border-[#222] py-6 flex items-center justify-between w-full px-4">
        <Link href="/" className="text-white font-bold tracking-widest text-base uppercase hover:text-[#ffffa3] transition-colors">
          Kymu
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm tracking-widest uppercase transition-colors border-b-2 pb-0.5 ${
                  active
                    ? "text-[#ffffa3] border-[#ffffa3]"
                    : "text-[#888] border-transparent hover:text-[#d4d4d4]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#ffffa3] hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-[#0a0a0a] border-b border-[#222] flex flex-col">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 text-sm tracking-widest uppercase transition-colors border-l-4 ${
                  active
                    ? "text-[#ffffa3] border-[#ffffa3] bg-[#0f0f0f]"
                    : "text-[#888] border-transparent hover:text-[#d4d4d4]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
