"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
    message: string;
    description?: string;
    type?: "success" | "error" | "info" | "warning";
    onClose: () => void;
}

export function AdvancedToast({ message, description, type = "info", onClose }: ToastProps) {
    const icons = {
        success: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
        error: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-crimson">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
        ),
        info: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
        ),
        warning: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
        ),
    };

    const borders = {
        success: "border-emerald-500/30 bg-emerald-500/5",
        error: "border-accent-crimson/30 bg-accent-crimson/5",
        info: "border-blue-500/30 bg-blue-500/5",
        warning: "border-amber-500/30 bg-amber-500/5",
    };

    return (
        <div className={cn("pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl bg-bg-island shadow-2xl ring-1 ring-black/5 border", borders[type])}>
            <div className="p-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
                    <div className="flex-1 w-0">
                        <p className="text-sm font-semibold text-text-main">{message}</p>
                        {description && <p className="mt-1 text-sm text-text-muted">{description}</p>}
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                        <button
                            type="button"
                            className="inline-flex rounded-md bg-bg-island text-text-muted hover:text-text-main focus:outline-none focus:ring-2 focus:ring-accent-crimson focus:ring-offset-2"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Basic usage example container for the library
export function ToastDemo() {
    const [show, setShow] = useState(false);
    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={() => setShow(true)}
                className="px-4 py-2 bg-text-main text-bg-page rounded-xl text-sm font-semibold"
            >
                Trigger Toast
            </button>
            <div className="relative h-32 w-full">
                {show && (
                    <div className="absolute top-0 left-0 w-full animate-in slide-in-from-top-5 fade-in duration-300">
                        <AdvancedToast
                            type="success"
                            message="Component Copied!"
                            description="The code has been copied to your clipboard."
                            onClose={() => setShow(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
