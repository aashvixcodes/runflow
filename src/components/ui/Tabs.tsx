"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface TabsProps {
    tabs: { id: string; label: string; content: React.ReactNode }[];
    defaultTab?: string;
    className?: string;
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    return (
        <div className={cn("w-full flex flex-col gap-4", className)}>
            <div className="w-full flex p-1 space-x-1 bg-surface-mid/50 border border-border-light rounded-xl overflow-x-auto hide-scrollbar">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex-1 relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 outline-none whitespace-nowrap",
                                isActive ? "text-text-main shadow-sm" : "text-text-muted hover:text-text-main hover:bg-surface-light/50"
                            )}
                        >
                            {isActive && (
                                <span className="absolute inset-0 rounded-lg bg-bg-island border border-border-light/50 shadow-sm z-0" />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
            <div className="w-full relative rounded-2xl border border-border-light bg-bg-island p-6 mt-2 pt-5 focus:outline-none">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={cn(
                            "transition-all duration-300",
                            activeTab === tab.id ? "opacity-100 block animate-in fade-in zoom-in-95" : "opacity-0 hidden"
                        )}
                    >
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
