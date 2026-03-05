"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    showCloseIcon?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    className,
    showCloseIcon = true
}: ModalProps) {
    const [isRendered, setIsRendered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsRendered(true);
            document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
            // slight delay to ensure the display=block takes effect before opacity transitions
            const timer = setTimeout(() => setIsVisible(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
            document.body.style.overflow = "";
            const timer = setTimeout(() => setIsRendered(false), 300); // Wait for transition
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Cleanup overflow on unmount
    useEffect(() => {
        return () => { document.body.style.overflow = ""; };
    }, []);

    if (!isRendered) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 pointer-events-none",
                isVisible ? "opacity-100" : "opacity-0"
            )}
        >
            {/* Backdrop */}
            <div
                className={cn(
                    "absolute inset-0 bg-bg-page/80 backdrop-blur-sm pointer-events-auto transition-opacity duration-300",
                    isVisible ? "opacity-100" : "opacity-0"
                )}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Dialog Content */}
            <div
                role="dialog"
                aria-modal="true"
                className={cn(
                    "relative w-full max-w-lg rounded-2xl bg-bg-island shadow-2xl border border-border-light pointer-events-auto flex flex-col transition-all duration-300 ease-out max-h-full",
                    isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-95 opacity-0",
                    className
                )}
            >
                {/* Header */}
                {(title || showCloseIcon) && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border-light shrink-0">
                        {title && <div className="text-lg font-bold text-text-main">{title}</div>}
                        {showCloseIcon && (
                            <button
                                onClick={onClose}
                                className="ml-auto rounded-full p-2 bg-surface-light text-text-muted hover:text-text-main hover:bg-border-light transition-colors focus:outline-none focus:ring-2 focus:ring-accent-crimson shrink-0"
                                aria-label="Close modal"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="p-6 overflow-y-auto min-h-[100px]">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-border-light bg-surface-light rounded-b-2xl shrink-0 flex items-center justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
