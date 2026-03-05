"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
    showValue?: boolean;
    color?: "crimson" | "emerald" | "amber" | "blue" | "white";
    variant?: "bar" | "ring";
    size?: number; // Only used for ring variant
    strokeWidth?: number; // Only used for ring variant
}

export function Progress({
    className,
    value = 0,
    max = 100,
    showValue = false,
    color = "crimson",
    variant = "bar",
    size = 120,
    strokeWidth = 8,
    ...props
}: ProgressProps) {
    const [progress, setProgress] = useState(0);

    // Animate progress on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(Math.min(Math.max(value, 0), max));
        }, 100);
        return () => clearTimeout(timer);
    }, [value, max]);

    const percentage = Math.round((progress / max) * 100);

    const colors = {
        crimson: "bg-accent-crimson text-accent-crimson stroke-accent-crimson",
        emerald: "bg-emerald-500 text-emerald-500 stroke-emerald-500",
        amber: "bg-amber-500 text-amber-500 stroke-amber-500",
        blue: "bg-blue-500 text-blue-500 stroke-blue-500",
        white: "bg-white text-white stroke-white",
    };

    if (variant === "ring") {
        const radius = (size - strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (percentage / 100) * circumference;

        return (
            <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }} {...props}>
                <svg width={size} height={size} className="-rotate-90 origin-center drop-shadow-[0_0_10px_rgba(225,29,72,0.3)]">
                    <circle
                        stroke="currentColor"
                        className="text-border-light/50"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                    <circle
                        className={cn("transition-all duration-1000 ease-out", colors[color])}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: offset,
                        }}
                    />
                </svg>
                {showValue && (
                    <div className="absolute flex flex-col items-center justify-center font-bold font-sans">
                        <span className="text-2xl text-text-main">{percentage}%</span>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col gap-2 w-full", className)} {...props}>
            {showValue && (
                <div className="flex justify-between items-center text-sm font-semibold text-text-main">
                    <span>Progress</span>
                    <span>{percentage}%</span>
                </div>
            )}
            <div className="h-2 w-full bg-border-light rounded-full overflow-hidden relative">
                <div
                    className={cn(
                        "absolute left-0 top-0 h-full rounded-full transition-[width] duration-1000 ease-out",
                        colors[color].split(" ")[0] // Get just the bg class
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
