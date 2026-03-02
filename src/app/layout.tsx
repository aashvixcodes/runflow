import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Studio - ObsidianUI Component Library",
  description: "A premium React + Tailwind component library with AI-powered component generation. Design less, ship better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="max-w-[1300px] mx-auto min-h-[calc(100vh-4rem)]">
          <div className="bg-bg-island rounded-[var(--radius-island)] w-full min-h-[calc(100vh-4rem)] relative overflow-x-hidden p-10 flex flex-col shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] border border-border-light">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
