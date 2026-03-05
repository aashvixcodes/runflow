"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface GlowingBorderProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
    borderWidth?: number;
    borderRadius?: number;
}

export function GlowingBorder({
    children,
    className,
    glowColor = "rgba(225, 29, 72, 0.4)",
    borderWidth = 1.5,
    borderRadius = 24
}: GlowingBorderProps) {
    const boxRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [[mouseX, mouseY], setMousePosition] = useState([0, 0]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!boxRef.current) return;
        const rect = boxRef.current.getBoundingClientRect();
        setMousePosition([e.clientX - rect.left, e.clientY - rect.top]);
    };

    return (
        <div
            ref={boxRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className={cn("relative group", className)}
            style={{ borderRadius }}
        >
            {/* The animated gradient glow border wrapper */}
            <div
                className="absolute inset-0 z-0 transition-opacity duration-500 will-change-transform"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(300px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 40%)`,
                    borderRadius,
                }}
            />

            {/* Inset for the inner container blocking the glow except for the border */}
            <div
                className="absolute inset-0 z-10 transition-colors duration-300 pointer-events-none"
                style={{
                    margin: borderWidth,
                    borderRadius: Math.max(0, borderRadius - borderWidth),
                    backgroundColor: "var(--theme-bg-island)",
                }}
            />

            {/* The actual content */}
            <div
                className="relative z-20 h-full w-full"
                style={{ borderRadius: Math.max(0, borderRadius - borderWidth) }}
            >
                {children}
            </div>
        </div>
    );
}
