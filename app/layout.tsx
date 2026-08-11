import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "kymu.dev — security research",
  description: "Writeups and notes from a bug bounty hunter.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-body text-ink bg-paper min-h-screen flex flex-col">
        <Navbar />
        <main className="wrap py-14 sm:py-20 flex-1 w-full">{children}</main>
        <footer className="wrap pb-12 pt-4 border-t border-line text-muted text-sm font-mono">
          <span>© {new Date().getFullYear()} Kymu</span>
        </footer>
      </body>
    </html>
  );
}
