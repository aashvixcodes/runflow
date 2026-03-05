"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface SliderProps {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    className?: string;
    showTooltip?: boolean;
}

export function Slider({
    min = 0,
    max = 100,
    step = 1,
    value,
    defaultValue = 50,
    onChange,
    className,
    showTooltip = true
}: SliderProps) {
    const [internalValue, setInternalValue] = useState(value !== undefined ? value : defaultValue);
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    const currentValue = value !== undefined ? value : internalValue;
    const percentage = Math.max(0, Math.min(100, ((currentValue - min) / (max - min)) * 100));

    const handleMove = (clientX: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const rawValue = min + percent * (max - min);
        // Round to nearest step
        const steppedValue = Math.round(rawValue / step) * step;
        const finalValue = Math.max(min, Math.min(max, steppedValue));

        if (value === undefined) setInternalValue(finalValue);
        onChange?.(finalValue);
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        handleMove(e.clientX);
    };

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (isDragging) handleMove(e.clientX);
        };
        const handlePointerUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener("pointermove", handlePointerMove);
            window.addEventListener("pointerup", handlePointerUp);
        }

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [isDragging]);

    return (
        <div
            className={cn("relative flex w-full touch-none select-none items-center py-4", className)}
            onPointerDown={handlePointerDown}
            ref={trackRef}
        >
            {/* Track */}
            <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-border-light">
                {/* Range */}
                <div
                    className="absolute h-full bg-accent-crimson transition-all"
                    style={{ width: `${percentage}%`, transitionDuration: isDragging ? "0ms" : "150ms" }}
                />
            </div>

            {/* Thumb */}
            <div
                className="absolute block h-5 w-5 rounded-full border-2 border-accent-crimson bg-bg-island shadow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-crimson focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 active:scale-125 cursor-grab active:cursor-grabbing"
                style={{
                    left: `calc(${percentage}% - 10px)`,
                    transitionDuration: isDragging ? "0ms" : "150ms"
                }}
            >
                {/* Tooltip */}
                {showTooltip && (
                    <div
                        className={cn(
                            "absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-text-main text-bg-page text-xs font-semibold rounded-lg shadow-md transition-all duration-200 pointer-events-none whitespace-nowrap",
                            isDragging ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        )}
                    >
                        {currentValue}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-text-main" />
                    </div>
                )}
            </div>
        </div>
    );
}
