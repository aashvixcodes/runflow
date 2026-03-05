import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroller from "@/components/SmoothScroller";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Studio - Runflow UI Component Library",
  description: "A premium React + Tailwind component library with AI-powered component generation. Design less, ship better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <SmoothScroller>
            <div className="max-w-[1300px] mx-auto min-h-[calc(100vh-4rem)]">
              <div className="bg-bg-island rounded-[var(--radius-island)] w-full min-h-[calc(100vh-4rem)] relative overflow-x-hidden p-10 flex flex-col shadow-2xl border border-border-light transition-colors duration-300">
                <Navbar />
                {children}
                <Footer />
              </div>
            </div>
          </SmoothScroller>
        </ThemeProvider>
      </body>
    </html>
  );
}
