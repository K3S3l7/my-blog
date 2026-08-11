import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "kymu.dev — security research",
  description: "Writeups and notes from a bug bounty hunter.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "64x64" },
      { url: "/favicon.ico", sizes: "any" },
    ],
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
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light')}else{document.documentElement.setAttribute('data-theme','dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`,
          }}
        />
      </head>
      <body className="font-body text-ink bg-paper min-h-screen flex flex-col">
        <Navbar />
        <main className="wrap pt-20 sm:pt-24 pb-16 sm:pb-24 flex-1 w-full">{children}</main>
        <footer className="wrap pb-12 pt-4 border-t border-line text-muted text-sm font-mono">
          <span>© {new Date().getFullYear()} Kymu</span>
        </footer>
      </body>
    </html>
  );
}
