"use client";

import { useState, useRef } from "react";
import type { ModelType } from "@/lib/ai/providers";

const modelOptions: { value: ModelType; label: string; description: string }[] = [
    { value: "gemini-flash", label: "Gemini Flash", description: "Fast & efficient" },
    { value: "gemini-pro", label: "Gemini Pro", description: "Higher quality" },
    { value: "openai", label: "GPT-4o-mini", description: "OpenAI model" },
    { value: "finetuned", label: "Fine-tuned Model", description: "Custom trained" },
];

interface PromptBoxProps {
    onGenerate: (prompt: string, model: ModelType, image?: string) => void;
    isLoading: boolean;
    initialPrompt?: string;
}

export default function PromptBox({ onGenerate, isLoading, initialPrompt = "" }: PromptBoxProps) {
    const [prompt, setPrompt] = useState(initialPrompt);
    const [model, setModel] = useState<ModelType>("gemini-flash");
    const [fileName, setFileName] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
            alert("Please upload a PNG or JPG image.");
            return;
        }

        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = (reader.result as string).split(",")[1];
            setImageBase64(base64);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
        if (!prompt.trim()) return;
        onGenerate(prompt.trim(), model, imageBase64 || undefined);
    };

    return (
        <div className="w-full space-y-5">
            {/* Prompt Area */}
            <div className="relative">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the component you want to generate..."
                    rows={4}
                    className="w-full p-5 rounded-2xl border border-border-light bg-bg-island text-text-main text-base font-sans resize-none focus:outline-none focus:border-accent-crimson focus:shadow-[0_0_20px_rgba(225,29,72,0.1)] transition-all duration-300 placeholder:text-text-muted/50"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                            handleSubmit();
                        }
                    }}
                />
                <div className="absolute bottom-3 right-3 text-[0.7rem] text-text-muted/50 font-medium">
                    ⌘ + Enter to generate
                </div>
            </div>

            {/* Controls Row */}
            <div className="flex flex-wrap gap-3 items-center">
                {/* Model Selector */}
                <div className="relative flex-1 min-w-[200px]">
                    <select
                        value={model}
                        onChange={(e) => setModel(e.target.value as ModelType)}
                        className="w-full appearance-none p-3.5 pl-4 pr-10 rounded-xl border border-border-light bg-bg-island text-text-main text-sm font-semibold cursor-pointer focus:outline-none focus:border-accent-crimson transition-all duration-200"
                    >
                        {modelOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label} — {opt.description}
                            </option>
                        ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>

                {/* File Upload */}
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-3.5 rounded-xl border border-border-light bg-bg-island text-text-main text-sm font-semibold cursor-pointer hover:border-accent-crimson hover:bg-surface-light transition-all duration-200"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    {fileName || "Upload Design"}
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {/* Clear Image */}
                {fileName && (
                    <button
                        onClick={() => { setFileName(null); setImageBase64(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        className="flex items-center gap-1 px-3 py-3.5 rounded-xl text-sm font-semibold text-accent-crimson cursor-pointer hover:bg-[rgba(225,29,72,0.05)] transition-all duration-200"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        Clear
                    </button>
                )}

                {/* Generate Button */}
                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !prompt.trim()}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-br from-accent-crimson to-[#9f1239] text-white text-sm font-bold cursor-pointer transition-all duration-200 shadow-[0_4px_15px_rgba(225,29,72,0.3)] hover:shadow-[0_8px_25px_rgba(225,29,72,0.4)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_15px_rgba(225,29,72,0.3)]"
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                            Generate
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
