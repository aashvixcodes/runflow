import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "text" | "circular" | "rectangular" | "rounded";
}

export function Skeleton({ className, variant = "rounded", ...props }: SkeletonProps) {
    const variants = {
        text: "h-4 w-full rounded-md",
        circular: "h-12 w-12 rounded-full",
        rectangular: "w-full h-32 rounded-none",
        rounded: "h-32 w-full rounded-xl",
    };

    return (
        <div
            className={cn(
                "animate-pulse bg-surface-light border border-border-light relative overflow-hidden",
                variants[variant],
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-bg-island/40 to-transparent" />
        </div>
    );
}

// Basic usage wrappers
export function SkeletonProfile() {
    return (
        <div className="flex items-center space-x-4 w-full max-w-sm">
            <Skeleton variant="circular" className="h-12 w-12 shrink-0" />
            <div className="space-y-2 flex-1">
                <Skeleton variant="text" className="w-[80%]" />
                <Skeleton variant="text" className="w-[60%]" />
            </div>
        </div>
    );
}

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3 w-full max-w-sm">
            <Skeleton variant="rounded" className="h-[150px] w-full" />
            <div className="space-y-2">
                <Skeleton variant="text" className="w-full" />
                <Skeleton variant="text" className="w-[80%]" />
            </div>
        </div>
    );
}
