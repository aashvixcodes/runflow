"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface DropdownItem {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    danger?: boolean;
    divider?: boolean;
}

export interface DropdownProps {
    trigger: React.ReactNode;
    items: DropdownItem[];
    align?: "left" | "right";
    className?: string;
}

export function Dropdown({ trigger, items, align = "left", className }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer inline-block">
                {trigger}
            </div>

            <div
                className={cn(
                    "absolute top-full mt-2 w-56 rounded-xl bg-bg-island border border-border-light shadow-lg ring-1 ring-black/5 z-50 transition-all duration-200 origin-top",
                    align === "right" ? "right-0" : "left-0",
                    isOpen ? "scale-100 opacity-100 pointer-events-auto translate-y-0" : "scale-95 opacity-0 pointer-events-none -translate-y-2",
                    className
                )}
            >
                <div className="py-1" role="menu" aria-orientation="vertical">
                    {items.map((item, index) => {
                        if (item.divider) {
                            return <div key={`divider-${index}`} className="h-[1px] my-1 bg-border-light/60 w-full" />;
                        }

                        return (
                            <button
                                key={`item-${index}`}
                                disabled={item.disabled}
                                onClick={() => {
                                    if (!item.disabled) {
                                        item.onClick?.();
                                        setIsOpen(false);
                                    }
                                }}
                                className={cn(
                                    "group flex w-full items-center px-4 py-2.5 text-sm font-medium transition-colors",
                                    item.disabled ? "opacity-50 cursor-not-allowed text-text-muted" : item.danger ? "text-accent-crimson hover:bg-accent-crimson/10" : "text-text-main hover:bg-surface-light hover:text-text-main",
                                )}
                                role="menuitem"
                            >
                                {item.icon && (
                                    <span className={cn("mr-3 shrink-0 h-4 w-4", item.disabled ? "text-text-muted" : item.danger ? "text-accent-crimson" : "text-text-muted group-hover:text-text-main")}>
                                        {item.icon}
                                    </span>
                                )}
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Minimal Trigger Demo Component Helper
export function DropdownTrigger() {
    return (
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-mid border border-border-light text-text-main hover:bg-surface-light transition-colors font-medium text-sm">
            Options
            <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    );
}
