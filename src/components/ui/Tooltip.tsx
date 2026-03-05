"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
    delay?: number;
}

export function Tooltip({ children, content, position = "top", className, delay = 200 }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        const id = setTimeout(() => setIsVisible(true), delay);
        setTimeoutId(id);
    };

    const handleMouseLeave = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setIsVisible(false);
    };

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    const arrowPositionClasses = {
        top: "top-full left-1/2 -translate-x-1/2 border-t-text-main border-x-transparent border-b-transparent",
        bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-text-main border-x-transparent border-t-transparent",
        left: "left-full top-1/2 -translate-y-1/2 border-l-text-main border-y-transparent border-r-transparent",
        right: "right-full top-1/2 -translate-y-1/2 border-r-text-main border-y-transparent border-l-transparent",
    };

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
        >
            {children}
            {isVisible && (
                <div
                    role="tooltip"
                    className={cn(
                        "absolute z-50 px-3 py-1.5 text-xs font-semibold text-bg-island bg-text-main rounded-md shadow-md pointer-events-none animate-in fade-in zoom-in-95 duration-200 whitespace-nowrap",
                        positionClasses[position],
                        className
                    )}
                >
                    {content}
                    <div
                        className={cn(
                            "absolute border-[5px]",
                            arrowPositionClasses[position]
                        )}
                        aria-hidden="true"
                    />
                </div>
            )}
        </div>
    );
}
