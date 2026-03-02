"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", label: "Studio" },
    { href: "/exhibits", label: "Exhibits" },
];

const navItemsRight = [
    { href: "/contact", label: "Contact" },
    { href: "/ai", label: "AI" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="flex justify-center w-full z-50 relative mt-4">
            <nav className="flex items-center gap-1 bg-white p-1.5 rounded-full border border-border-light shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)]">
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
            </nav>
        </header>
    );
}
