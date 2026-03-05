"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface DockItemProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

export interface DockProps {
    items: DockItemProps[];
    className?: string;
}

export function Dock({ items, className }: DockProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "flex items-end gap-2 bg-bg-island/40 backdrop-blur-2xl border border-border-light/50 rounded-2xl px-4 py-3 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]",
                className
            )}
            onMouseLeave={() => setHoveredIndex(null)}
        >
            {items.map((item, i) => {
                const isHovered = hoveredIndex === i;
                const isNeighbor = hoveredIndex === i - 1 || hoveredIndex === i + 1;

                return (
                    <div key={i} className="relative group flex flex-col items-center">
                        <div
                            className="absolute -top-10 opacity-0 group-hover:opacity-100 group-hover:-top-12 transition-all duration-200 bg-text-main text-bg-page text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none shadow-xl"
                        >
                            {item.label}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-text-main" />
                        </div>
                        <button
                            onMouseEnter={() => setHoveredIndex(i)}
                            onClick={item.onClick}
                            className={cn(
                                "flex items-center justify-center rounded-xl bg-surface-light text-text-muted transition-all duration-200 border border-border-light shadow-sm hover:text-text-main focus:outline-none hover:bg-surface-mid",
                                isHovered ? "w-16 h-16 -translate-y-4" : isNeighbor ? "w-14 h-14 -translate-y-2" : "w-12 h-12"
                            )}
                        >
                            <div className={cn("transition-transform duration-200", isHovered ? "scale-150" : isNeighbor ? "scale-125" : "scale-100")}>
                                {item.icon}
                            </div>
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export function DockDemo() {
    return (
        <div className="w-full h-40 flex items-end justify-center pb-4 bg-dots">
            <Dock
                items={[
                    { label: "Home", icon: <span>🏠</span> },
                    { label: "Search", icon: <span>🔍</span> },
                    { label: "Settings", icon: <span>⚙️</span> },
                    { label: "Profile", icon: <span>👤</span> },
                    { label: "Menu", icon: <span>☰</span> },
                ]}
            />
        </div>
    );
}
