"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { codeDictionary, componentNames } from "@/lib/componentData";
import { useToast } from "@/components/Toast";

interface ComponentModalProps {
    isOpen: boolean;
    onClose: () => void;
    codeId: string;
}

export default function ComponentModal({ isOpen, onClose, codeId }: ComponentModalProps) {
    const { showToast } = useToast();
    const [copied, setCopied] = useState(false);
    const code = codeDictionary[codeId] || "";
    const name = componentNames[codeId] || codeId;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            showToast();
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = code;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            showToast();
        }
    };

    // Create safe preview HTML (no scripts)
    const safeHTML = code.replace(/<script[\s\S]*?<\/script>/gi, "");

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/70 backdrop-blur-[16px] z-[9999] flex items-center justify-center"
                >
                    <motion.div
                        initial={{ y: 40, scale: 0.95, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 40, scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-surface-mid border border-border-light rounded-[32px] w-[90%] max-w-[680px] max-h-[85vh] overflow-y-auto p-10 relative shadow-[0_40px_80px_rgba(0,0,0,0.3)]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 bg-[#e4e4e7] border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-[#52525b] hover:bg-text-main hover:text-white transition-all duration-200"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {/* Header */}
                        <div className="mb-6">
                            <span className="inline-block bg-text-main text-white px-3 py-1 rounded-full text-[0.75rem] font-bold uppercase tracking-wider mb-3">
                                Component
                            </span>
                            <h2 className="text-[1.8rem] font-extrabold text-text-main tracking-[-0.5px]">{name}</h2>
                        </div>

                        {/* Preview */}
                        <div
                            className="bg-surface-dark rounded-[20px] min-h-[220px] flex items-center justify-center p-10 mb-6 overflow-hidden relative"
                            dangerouslySetInnerHTML={{ __html: safeHTML }}
                        />

                        {/* Actions */}
                        <div className="flex items-center gap-4 mb-4">
                            <button
                                onClick={handleCopy}
                                className="inline-flex items-center gap-2 bg-gradient-to-br from-accent-crimson to-[#9f1239] text-white border-none px-7 py-3.5 rounded-[14px] text-[0.95rem] font-bold cursor-pointer font-sans transition-all duration-200 shadow-[0_6px_20px_rgba(225,29,72,0.3)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(225,29,72,0.4)]"
                            >
                                {copied ? (
                                    "✓ Copied!"
                                ) : (
                                    <>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                        Copy Code
                                    </>
                                )}
                            </button>
                            <span className="text-[0.8rem] text-[#a1a1aa] font-medium">Click to copy full HTML + CSS</span>
                        </div>

                        {/* Code Block */}
                        <div className="code-block bg-[#18181b] rounded-2xl px-6 py-5 overflow-x-auto max-h-[300px] overflow-y-auto">
                            <pre>
                                <code>{code}</code>
                            </pre>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
