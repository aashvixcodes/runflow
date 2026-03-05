"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    size?: "sm" | "md" | "lg";
    label?: string;
}

export function Switch({ checked = false, onChange, size = "md", label, className, disabled, ...props }: SwitchProps) {
    const [internalChecked, setInternalChecked] = useState(checked);

    const isChecked = onChange ? checked : internalChecked;

    const toggle = () => {
        if (disabled) return;
        const newValue = !isChecked;
        if (!onChange) setInternalChecked(newValue);
        onChange?.(newValue);
    };

    const sizes = {
        switch: { sm: "w-10 h-6", md: "w-14 h-8", lg: "w-20 h-10" },
        thumb: { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" },
        transform: { sm: "translate-x-4", md: "translate-x-6", lg: "translate-x-10" },
        padding: { sm: "p-1", md: "p-1", lg: "p-1" }
    };

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <button
                type="button"
                role="switch"
                aria-checked={isChecked}
                disabled={disabled}
                onClick={toggle}
                className={cn(
                    "relative inline-flex items-center rounded-full transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-crimson focus-visible:ring-offset-bg-page shrink-0 border border-transparent cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                    sizes.switch[size],
                    sizes.padding[size],
                    isChecked ? "bg-accent-crimson" : "bg-border-light hover:bg-border-light/80"
                )}
                {...props}
            >
                <span
                    className={cn(
                        "pointer-events-none inline-block rounded-full bg-white shadow-sm ring-0 transition-transform duration-300 ease-in-out",
                        sizes.thumb[size],
                        isChecked ? sizes.transform[size] : "translate-x-0"
                    )}
                />
            </button>
            {label && (
                <span className="text-sm font-medium text-text-main cursor-pointer" onClick={toggle}>
                    {label}
                </span>
            )}
        </div>
    );
}

// Demo wrapper for the library
export function PillSwitchDemo() {
    const [active, setActive] = useState(false);
    return (
        <button
            onClick={() => setActive(!active)}
            className={cn(
                "w-[140px] h-[60px] rounded-full relative flex justify-between items-center px-3.5 cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] transition-colors duration-300",
                active ? "bg-accent-crimson" : "bg-border-light"
            )}
        >
            <div
                className={cn(
                    "absolute w-[52px] h-[52px] bg-bg-island rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] left-1 top-1 transition-transform duration-[0.4s] z-[3]",
                    active ? "translate-x-[80px]" : ""
                )}
                style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            />
            <span className="font-bold text-white z-[2] ml-3 text-[0.9rem] mix-blend-difference">ON</span>
            <span className="font-bold text-[#52525b] z-[2] mr-3 text-[0.9rem] mix-blend-difference">OFF</span>
        </button>
    );
}
