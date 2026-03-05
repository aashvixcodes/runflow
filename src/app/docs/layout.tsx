"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { codeDictionary, componentNames } from "@/lib/componentData";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Generate navigation items from component dictionary
    const components = Object.keys(codeDictionary).map(id => ({
        id,
        name: componentNames[id] || id,
        href: `/docs/${id}`
    })).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="flex flex-col lg:flex-row w-full max-w-[1400px] mx-auto min-h-[calc(100vh-10rem)] py-8 gap-8 lg:gap-12">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-[260px] shrink-0 border-b lg:border-b-0 lg:border-r border-border-light/50 pb-8 lg:pb-0 lg:pr-6">
                <div className="sticky top-8 flex flex-col gap-1 h-max max-h-[calc(100vh-8rem)] overflow-y-auto hidden-scrollbar">

                    <div className="mb-4 ml-3">
                        <h3 className="text-[0.7rem] font-black uppercase tracking-[0.15em] text-text-muted">Overview</h3>
                    </div>
                    <Link
                        href="/components"
                        className={`text-[0.9rem] font-medium px-4 py-2.5 rounded-xl transition-all duration-200 border border-transparent ${pathname === '/components'
                                ? "bg-surface-light text-text-main border-border-light/50"
                                : "text-text-muted hover:text-text-main hover:bg-surface-light"
                            }`}
                    >
                        Component Library
                    </Link>

                    <div className="mt-8 mb-4 ml-3">
                        <h3 className="text-[0.7rem] font-black uppercase tracking-[0.15em] text-text-muted">Interactive Components</h3>
                    </div>

                    {components.map((comp) => (
                        <Link
                            key={comp.id}
                            href={comp.href}
                            className={`text-[0.9rem] font-medium px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-between group border border-transparent ${pathname === comp.href
                                    ? "bg-surface-light text-text-main font-semibold border-border-light/50"
                                    : "text-text-muted hover:text-text-main hover:bg-surface-light"
                                }`}
                        >
                            {comp.name}
                            {pathname === comp.href && (
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-crimson shrink-0"></span>
                            )}
                        </Link>
                    ))}

                    <div className="mt-8 mb-4 ml-3">
                        <h3 className="text-[0.7rem] font-black uppercase tracking-[0.15em] text-text-muted">Resources</h3>
                    </div>
                    <Link href="/ai" className="text-[0.9rem] font-medium text-accent-crimson hover:bg-accent-crimson/10 px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                        AI Generator
                    </Link>
                </div>
            </aside>

            {/* Main Documentation Content */}
            <main className="flex-1 min-w-0 pb-20">
                {children}
            </main>
        </div>
    );
}
