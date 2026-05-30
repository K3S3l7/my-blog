import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Your Name — Security Blog",
  description: "Security research, CVEs, and writeups.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0d0d0d] text-[#d4d4d4] min-h-screen font-mono">
        <div className="max-w-6xl mx-auto px-10">
          <Navbar />
          <main className="py-16 px-2">{children}</main>
        </div>
      </body>
    </html>
  );
}
