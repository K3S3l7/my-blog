"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/cves", label: "CVEs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    setDark(isDark);
    setFavicon(isDark);
  }, []);

  const setFavicon = (darkMode: boolean) => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (link) {
      link.href = darkMode ? "/icon.png" : "/icon-light.png";
    }
  };

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    setFavicon(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  const path = pathname.replace(/^\/my-blog/, "") || "/";

  const isActive = (href: string) => {
    if (href === "/") {
      return path === "/" || path.startsWith("/article/");
    }
    return path === href;
  };

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper md:bg-paper/90 md:backdrop-blur-sm">
      <div className="wrap h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-ink"
        >
          Kymu<span className="text-accent">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={
                  active
                    ? "text-accent"
                    : "text-ink-soft hover:text-ink transition-colors"
                }
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={toggleTheme}
          className="ml-2 text-ink-soft hover:text-accent transition-colors"
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          title={dark ? "Switch to light theme" : "Switch to dark theme"}
        >
          {dark ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4" />
              <path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4l1.4-1.4" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-ink hover:text-accent transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            {isOpen ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden border-t border-line bg-paper">
          <div className="wrap py-2 flex flex-col">
            {navLinks.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`py-3 font-mono text-sm border-l-2 pl-3 -ml-0.5 ${
                    active
                      ? "text-accent border-accent"
                      : "text-ink-soft border-transparent hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
