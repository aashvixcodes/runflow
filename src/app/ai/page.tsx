"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PromptBox from "@/components/ai/PromptBox";
import CodeViewer from "@/components/ai/CodeViewer";
import type { ModelType, AIResponse, AIError } from "@/lib/ai/providers";

const examplePrompts = [
    "Create a pricing card with gradient border and hover glow effect",
    "Create a dashboard sidebar with icons and active state",
    "Create a login form with email/password validation and loading state",
    "Create a notification dropdown with unread badges",
    "Create a dark mode toggle button with smooth animation",
    "Create a file upload dropzone with drag-and-drop support",
];

export default function AIPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (prompt: string, model: ModelType, image?: string) => {
        setIsLoading(true);
        setError(null);
        setGeneratedCode(null);

        try {
            const response = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, model, image }),
            });

            const data = await response.json();

            if (!response.ok) {
                const errData = data as AIError;
                setError(errData.details || errData.error || "Generation failed.");
                return;
            }

            const result = data as AIResponse;
            setGeneratedCode(result.code);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExampleClick = (prompt: string) => {
        // Set the prompt in the textarea by triggering generate directly
        handleGenerate(prompt, "gemini-flash");
    };

    return (
        <>
            {/* Hero */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-center mt-16 mb-10"
            >
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 bg-[rgba(225,29,72,0.08)] border border-[rgba(225,29,72,0.2)] text-accent-crimson px-4 py-1.5 rounded-full text-[0.8rem] font-bold uppercase tracking-wider mb-6"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                    </svg>
                    AI-Powered
                </motion.div>

                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1] tracking-[-0.04em] text-text-main mb-6"
                >
                    Component <span className="text-accent-crimson">Generator</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-[1.1rem] font-medium text-text-muted leading-relaxed max-w-[550px]"
                >
                    Describe what you need or upload a design image. Our AI generates production-ready React + TypeScript + TailwindCSS components.
                </motion.p>
            </motion.div>

            {/* Main Content */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-full max-w-[800px] mx-auto space-y-8"
            >
                {/* Prompt Box */}
                <PromptBox onGenerate={handleGenerate} isLoading={isLoading} />

                {/* Example Prompts */}
                <div>
                    <p className="text-[0.8rem] font-semibold text-text-muted uppercase tracking-wider mb-3">
                        💡 Example Prompts
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {examplePrompts.map((prompt) => (
                            <button
                                key={prompt}
                                onClick={() => handleExampleClick(prompt)}
                                disabled={isLoading}
                                className="px-3.5 py-2 rounded-xl border border-border-light bg-white text-[0.8rem] font-medium text-text-muted hover:text-accent-crimson hover:border-[rgba(225,29,72,0.3)] hover:bg-[rgba(225,29,72,0.03)] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-left"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center justify-center py-16 gap-4"
                        >
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 rounded-full border-2 border-border-light" />
                                <div className="absolute inset-0 rounded-full border-2 border-accent-crimson border-t-transparent animate-spin" />
                                <div className="absolute inset-2 rounded-full border-2 border-accent-crimson/30 border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-semibold text-text-main">Generating your component...</p>
                                <p className="text-xs text-text-muted mt-1">This may take a few seconds</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error State */}
                <AnimatePresence>
                    {error && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-start gap-3 p-5 rounded-2xl bg-[rgba(225,29,72,0.05)] border border-[rgba(225,29,72,0.2)]"
                        >
                            <svg className="text-accent-crimson mt-0.5 shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <div>
                                <p className="text-sm font-semibold text-accent-crimson">Generation failed</p>
                                <p className="text-sm text-text-muted mt-1">{error}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Generated Code Viewer */}
                <AnimatePresence>
                    {generatedCode && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                        >
                            <CodeViewer code={generatedCode} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty State */}
                {!generatedCode && !isLoading && !error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-surface-light flex items-center justify-center mb-4">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-text-main">No component generated yet</p>
                        <p className="text-xs text-text-muted mt-1">Enter a prompt above or click an example to get started</p>
                    </motion.div>
                )}
            </motion.div>

            {/* Bottom Spacer */}
            <div className="pb-10" />
        </>
    );
}
