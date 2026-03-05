import React from "react";
import { cn } from "@/lib/utils";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    code: string;
    language?: string;
    filename?: string;
    showLineNumbers?: boolean;
}

export function CodeBlock({
    code,
    language = "typescript",
    filename,
    showLineNumbers = false,
    className,
    ...props
}: CodeBlockProps) {
    // A simple mock highlighter for display purposes without pulling in heavy libraries like Prism/Shiki
    // For a production lib, this would typically pass through to a real syntax highlighter
    const lines = code.trim().split("\n");

    return (
        <div className="rounded-xl overflow-hidden bg-[#1e1e1e] border border-border-light shadow-sm w-full max-w-full">
            {filename && (
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d2d2d] bg-[#252526]">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#4fc1ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-xs font-medium text-[#cccccc] font-sans">{filename}</span>
                    </div>
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                </div>
            )}
            <div className="relative overflow-x-auto p-4">
                <pre
                    className={cn(
                        "text-[13px] leading-[1.6] text-[#d4d4d4] font-mono",
                        className
                    )}
                    {...props}
                >
                    <code className="block">
                        {lines.map((line, i) => (
                            <div key={i} className="table-row">
                                {showLineNumbers && (
                                    <span className="table-cell text-right pr-4 text-[#858585] select-none opacity-50 text-[11px] align-middle">
                                        {i + 1}
                                    </span>
                                )}
                                <span className="table-cell whitespace-pre">{line || " "}</span>
                            </div>
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    );
}

// Helper wrapper
export function SingleLineCode({ children }: { children: React.ReactNode }) {
    return (
        <code className="bg-surface-light border border-border-light text-accent-crimson px-1.5 py-0.5 rounded-md text-[0.85em] font-mono">
            {children}
        </code>
    );
}
