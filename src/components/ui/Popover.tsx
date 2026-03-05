"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface PopoverProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
    align?: "center" | "start" | "end";
    side?: "top" | "bottom" | "left" | "right";
    className?: string;
}

export function Popover({ trigger, content, align = "center", side = "bottom", className }: PopoverProps) {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const alignments = {
        center: "left-1/2 -translate-x-1/2",
        start: "left-0",
        end: "right-0"
    };

    const sides = {
        top: "bottom-full mb-2 origin-bottom",
        bottom: "top-full mt-2 origin-top",
        left: "right-full mr-2 origin-right top-1/2 -translate-y-1/2",
        right: "left-full ml-2 origin-left top-1/2 -translate-y-1/2"
    };

    return (
        <div className="relative inline-block" ref={popoverRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="inline-block cursor-pointer">
                {trigger}
            </div>

            <div
                className={cn(
                    "absolute z-50 rounded-xl bg-bg-island border border-border-light shadow-xl p-4 transition-all duration-200",
                    sides[side],
                    side === "top" || side === "bottom" ? alignments[align] : "",
                    isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none",
                    className
                )}
            >
                {content}
            </div>
        </div>
    );
}

// Demo helper
export function PopoverDemo() {
    return (
        <Popover
            trigger={
                <button className="px-4 py-2 bg-surface-mid text-text-main border border-border-light rounded-xl hover:bg-surface-light font-medium text-sm transition-colors">
                    Click me
                </button>
            }
            content={
                <div className="w-64 space-y-3">
                    <h4 className="font-semibold text-text-main">Configurations</h4>
                    <p className="text-sm text-text-muted">Adjust these settings to customize how the component behaves.</p>
                    <div className="flex flex-col gap-2 mt-2">
                        <label className="text-xs font-semibold text-text-muted">Width</label>
                        <input type="text" defaultValue="100%" className="rounded-lg border border-border-light bg-surface-light px-3 py-1.5 text-sm outline-none focus:border-accent-crimson text-text-main" />
                    </div>
                </div>
            }
        />
    );
}
