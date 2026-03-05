"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface HoverCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    className?: string;
}

export function DirectionalHoverCard({ title, description, icon, className }: HoverCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [[mouseX, mouseY], setMousePos] = useState([0, 0]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos([e.clientX - rect.left, e.clientY - rect.top]);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={cn(
                "group relative overflow-hidden rounded-2xl bg-surface-mid border border-border-light p-8 transition-all duration-300 hover:border-transparent",
                className
            )}
        >
            {/* The mouse-following gradient border background */}
            <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(225,29,72,0.1), transparent 40%)`
                }}
            />

            {/* Inset container to create the 1px border effect from the background */}
            <div className="absolute inset-[1px] rounded-[15px] bg-bg-island z-0 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-4">
                {icon && (
                    <div className="h-12 w-12 rounded-full bg-surface-light border border-border-light flex items-center justify-center text-text-main group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>
                )}
                <div>
                    <h3 className="text-xl font-bold text-text-main mb-2">{title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed">{description}</p>
                </div>

                <div className="mt-2 flex items-center text-sm font-semibold text-accent-crimson opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Explore deeper
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

// Legacy Spotlight Card for simpler usage
export function SpotlightCard({ children, className }: { children: React.ReactNode, className?: string }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        cardRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        cardRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={cn(
                "relative overflow-hidden bg-surface-mid border border-border-light rounded-2xl p-10 text-center cursor-crosshair group",
                className
            )}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_120px_at_var(--mx,50%)_var(--my,50%),rgba(225,29,72,0.15),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
