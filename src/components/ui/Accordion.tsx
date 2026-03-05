"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface AccordionProps {
    items: { title: React.ReactNode; content: React.ReactNode }[];
    autoClose?: boolean;
    className?: string;
}

export function Accordion({ items, autoClose = true, className }: AccordionProps) {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const handleToggle = (index: number) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index));
        } else {
            if (autoClose) {
                setOpenIndexes([index]);
            } else {
                setOpenIndexes([...openIndexes, index]);
            }
        }
    };

    return (
        <div className={cn("w-full flex flex-col gap-2", className)}>
            {items.map((item, i) => {
                const isOpen = openIndexes.includes(i);
                return (
                    <div
                        key={i}
                        className={cn(
                            "bg-bg-island border rounded-2xl overflow-hidden transition-colors duration-300",
                            isOpen ? "border-accent-crimson/50" : "border-border-light hover:border-text-muted/30"
                        )}
                    >
                        <button
                            onClick={() => handleToggle(i)}
                            className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                            aria-expanded={isOpen}
                        >
                            <span className="font-semibold text-text-main">{item.title}</span>
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center bg-surface-light text-text-muted transition-transform duration-300 shrink-0",
                                    isOpen ? "rotate-180 bg-accent-crimson/10 text-accent-crimson" : ""
                                )}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                        </button>
                        <div
                            className={cn(
                                "grid transition-all duration-300 ease-in-out",
                                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            )}
                        >
                            <div className="overflow-hidden">
                                <div className="px-5 pb-5 text-sm text-text-muted leading-relaxed">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
