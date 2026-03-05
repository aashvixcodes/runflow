"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import PromptBox from "@/components/ai/PromptBox";
import CodeViewer from "@/components/ai/CodeViewer";
import type { ModelType, AIResponse, AIError } from "@/lib/ai/providers";
import { codeDictionary, componentNames } from "@/lib/componentData";

const examplePrompts = [
    "Create a pricing card with gradient border and hover glow effect",
    "Create a dashboard sidebar with icons and active state",
    "Create a login form with email/password validation and loading state",
    "Create a notification dropdown with unread badges",
    "Create a dark mode toggle button with smooth animation",
    "Create a file upload dropzone with drag-and-drop support",
];

function AIContent() {
    const searchParams = useSearchParams();
    const componentId = searchParams.get("component");

    // Determine the initial prompt if a component was passed
    let initialPrompt = "";
    if (componentId && codeDictionary[componentId]) {
        const name = componentNames[componentId] || "Component";
        initialPrompt = `I am tweaking the "${name}". Here is its current code:\n\n\`\`\`html\n${codeDictionary[componentId]}\n\`\`\`\n\nPlease modify it to: [Your tweak here]`;
    }

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
                <PromptBox
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                    initialPrompt={initialPrompt}
                />

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
                                className="px-3.5 py-2 rounded-xl border border-border-light bg-bg-island text-[0.8rem] font-medium text-text-muted hover:text-accent-crimson hover:border-[rgba(225,29,72,0.3)] hover:bg-[rgba(225,29,72,0.03)] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-left"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State - Ghost Loading */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="w-full space-y-6"
                        >
                            {/* Header Skeleton */}
                            <div className="flex items-center gap-4 border-b border-border-light pb-4">
                                <div className="w-10 h-10 rounded-xl bg-surface-dark animate-pulse" />
                                <div className="space-y-2">
                                    <div className="w-32 h-4 bg-surface-dark rounded animate-pulse" />
                                    <div className="w-48 h-3 bg-surface-dark/50 rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Main Preview Skeleton */}
                            <div className="relative overflow-hidden rounded-[2rem] border border-border-light/30 bg-surface-dark/30 aspect-video md:aspect-[21/9] flex flex-col p-8">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_2s_infinite] shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]" />

                                <div className="mt-auto flex justify-between items-end">
                                    <div className="space-y-3">
                                        <div className="w-40 h-6 bg-surface-dark rounded-lg animate-pulse" />
                                        <div className="w-64 h-4 bg-surface-dark/50 rounded-lg animate-pulse" />
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-surface-dark animate-pulse" />
                                </div>

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-14 h-14 rounded-2xl bg-accent-crimson/10 border border-accent-crimson/20 flex items-center justify-center animate-bounce">
                                            <Sparkles className="w-7 h-7 text-accent-crimson" />
                                        </div>
                                        <p className="text-sm font-bold text-text-main animate-pulse tracking-wide">Synthesizing Component...</p>
                                    </div>
                                </div>
                            </div>

                            {/* Code Skeleton */}
                            <div className="rounded-2xl border border-border-light/30 bg-[#09090b] p-6 space-y-4">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-surface-dark" />
                                    <div className="w-3 h-3 rounded-full bg-surface-dark" />
                                    <div className="w-3 h-3 rounded-full bg-surface-dark" />
                                </div>
                                <div className="space-y-3 pt-2">
                                    <div className="w-[85%] h-3 bg-surface-dark/40 rounded animate-pulse" />
                                    <div className="w-[70%] h-3 bg-surface-dark/40 rounded animate-pulse" />
                                    <div className="w-[90%] h-3 bg-surface-dark/40 rounded animate-pulse" />
                                    <div className="w-[45%] h-3 bg-surface-dark/40 rounded animate-pulse" />
                                </div>
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
                        <p className="text-xs text-text-muted mt-1">Enter a prompt above to get started</p>
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}

export default function AIPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-text-main">Loading AI Editor...</div>}>
            <AIContent />
        </Suspense>
    );
}
