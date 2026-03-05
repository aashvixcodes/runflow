"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import NotificationDropdown from "@/components/ui/NotificationDropdown";

const navItems = [
    { href: "/", label: "Studio" },
    { href: "/components", label: "Components" },
];

const navItemsRight = [
    { href: "/docs", label: "Docs" },
    { href: "/ai", label: "AI" },
];

export default function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="flex justify-center w-full z-50 relative mt-4">
            <nav className="flex items-center gap-1 bg-bg-island p-1.5 rounded-full border border-border-light shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] transition-colors duration-300">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`no-underline text-[0.95rem] font-medium px-5 py-2.5 rounded-full transition-all duration-200 ${pathname === item.href
                            ? "bg-surface-light text-text-main"
                            : "text-text-muted hover:text-text-main hover:bg-surface-light"
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}

                {/* Diamond Logo */}
                <div className="px-4 flex items-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#e11d48">
                        <path d="M12 2L2 12l10 10 10-10L12 2z" />
                    </svg>
                </div>

                {navItemsRight.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`no-underline text-[0.95rem] font-medium px-5 py-2.5 rounded-full transition-all duration-200 ${pathname === item.href
                            ? "bg-surface-light text-text-main"
                            : "text-text-muted hover:text-text-main hover:bg-surface-light"
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}

                {/* Notifications */}
                <NotificationDropdown />

                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle dark mode"
                    className="ml-1 w-10 h-10 rounded-full flex items-center justify-center text-text-muted hover:text-accent-crimson hover:bg-surface-light transition-all duration-200 cursor-pointer"
                >
                    {theme === "light" ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    )}
                </button>
            </nav>
        </header>
    );
}
