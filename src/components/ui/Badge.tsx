import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "cyber" | "soft" | "outline" | "dot";
    color?: "gray" | "crimson" | "emerald" | "amber" | "blue";
}

export function Badge({ className, variant = "default", color = "gray", children, ...props }: BadgeProps) {
    const baseStyles = "inline-flex items-center justify-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap tracking-wide";

    const colors = {
        default: {
            gray: "bg-surface-light text-text-main border border-border-light",
            crimson: "bg-accent-crimson text-white border border-accent-crimson",
            emerald: "bg-emerald-500 text-white border border-emerald-500",
            amber: "bg-amber-500 text-white border border-amber-500",
            blue: "bg-blue-500 text-white border border-blue-500",
        },
        cyber: {
            gray: "bg-surface-light/50 text-text-main border border-border-light shadow-[0_0_10px_rgba(255,255,255,0.1)]",
            crimson: "bg-accent-crimson/15 text-accent-crimson border border-accent-crimson/30 shadow-[0_0_15px_rgba(225,29,72,0.2)]",
            emerald: "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
            amber: "bg-amber-500/15 text-amber-500 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
            blue: "bg-blue-500/15 text-blue-500 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]",
        },
        soft: {
            gray: "bg-surface-light text-text-muted",
            crimson: "bg-accent-crimson/10 text-accent-crimson",
            emerald: "bg-emerald-500/10 text-emerald-500",
            amber: "bg-amber-500/10 text-amber-500",
            blue: "bg-blue-500/10 text-blue-500",
        },
        outline: {
            gray: "bg-transparent text-text-muted border border-border-light",
            crimson: "bg-transparent text-accent-crimson border border-accent-crimson/50",
            emerald: "bg-transparent text-emerald-500 border border-emerald-500/50",
            amber: "bg-transparent text-amber-500 border border-amber-500/50",
            blue: "bg-transparent text-blue-500 border border-blue-500/50",
        },
    };

    const dotColors = {
        gray: "bg-text-muted",
        crimson: "bg-accent-crimson shadow-[0_0_8px_rgba(225,29,72,0.8)]",
        emerald: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
        amber: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
        blue: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
    };

    if (variant === "dot") {
        return (
            <div className={cn(baseStyles, "bg-surface-light border border-border-light text-text-main", className)} {...props}>
                <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", dotColors[color])} />
                {children}
            </div>
        );
    }

    return (
        <div className={cn(baseStyles, colors[variant][color], className)} {...props}>
            {children}
        </div>
    );
}
