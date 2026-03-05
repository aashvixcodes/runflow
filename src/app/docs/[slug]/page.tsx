"use client";

import { useState, useRef, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Copy, Plus, Sparkles, Check } from "lucide-react";
import { codeDictionary, componentNames } from "@/lib/componentData";
import { motion, AnimatePresence } from "framer-motion";

export default function ComponentDocPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    if (!codeDictionary[slug]) {
        notFound();
    }

    const code = codeDictionary[slug];
    const name = componentNames[slug] || "Component";

    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
    const [copied, setCopied] = useState(false);

    // Create safe preview HTML (no scripts)
    const safeHTML = code.replace(/<script[\s\S]*?<\/script>/gi, "");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            const ta = document.createElement("textarea");
            ta.value = code;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto pt-4 flex flex-col gap-12">

            {/* Component Header */}
            <div>
                <h1 className="text-[2.8rem] font-black text-text-main tracking-tight mb-3">{name}</h1>
                <p className="text-[1.1rem] text-text-muted leading-relaxed">
                    Interactive, responsive, and production-ready implementation of the {name} component. Built with React and Tailwind CSS.
                </p>
            </div>

            {/* Preview & Code Section */}
            <div className="flex flex-col gap-4">
                {/* Tabs & Actions */}
                <div className="flex items-center justify-between border-b border-border-light pb-4">
                    <div className="flex gap-2 bg-surface-dark p-1 rounded-xl border border-border-light w-max">
                        <button
                            onClick={() => setActiveTab("preview")}
                            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'preview' ? 'bg-surface-light text-text-main shadow-sm' : 'text-text-muted hover:text-text-main hover:bg-surface-mid'}`}
                        >
                            Preview
                        </button>
                        <button
                            onClick={() => setActiveTab("code")}
                            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'code' ? 'bg-surface-light text-text-main shadow-sm' : 'text-text-muted hover:text-text-main hover:bg-surface-mid'}`}
                        >
                            Code
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={`/ai?component=${slug}`}
                            className="flex items-center gap-2 bg-surface-light border border-border-light hover:border-[rgba(225,29,72,0.3)] hover:text-accent-crimson text-text-main px-4 py-2 rounded-xl text-sm font-bold transition-all"
                        >
                            <Sparkles className="w-4 h-4 text-accent-crimson" />
                            Edit with AI
                        </Link>
                    </div>
                </div>

                {/* Content Area */}
                <div className="border border-border-light rounded-[1.5rem] overflow-hidden bg-bg-island min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {activeTab === "preview" ? (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-full h-[500px] flex items-center justify-center bg-surface-dark relative p-8"
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>
                                <div className="relative z-10 w-full h-full flex items-center justify-center scale-125" dangerouslySetInnerHTML={{ __html: safeHTML }} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="code"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col h-[500px]"
                            >
                                <div className="flex justify-between items-center bg-[#09090b] px-5 py-3 border-b border-border-light">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
                                        </div>
                                        <span className="text-xs font-medium text-white/50 ml-2 font-mono">{slug}.tsx</span>
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className="text-white/50 hover:text-white transition-colors p-1"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                <div className="p-5 overflow-auto custom-scrollbar bg-[#18181b] flex-1">
                                    <pre className="m-0">
                                        <code className="text-sm font-mono text-[#e4e4e7] leading-relaxed">
                                            {code}
                                        </code>
                                    </pre>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Installation Section */}
            <div className="flex flex-col gap-6 mt-6">
                <h2 className="text-2xl font-bold text-text-main border-b border-border-light pb-3">Installation</h2>

                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-text-main">1. Install using CLI</h3>
                    <div className="bg-[#18181b] rounded-xl border border-border-light p-4 font-mono text-sm text-[#e4e4e7] flex items-center justify-between group">
                        <span><span className="text-accent-crimson">npx</span> runflow-ui add {slug}</span>
                        <button className="text-white/40 hover:text-white opacity-0 group-hover:opacity-100 transition-all"><Copy className="w-4 h-4" /></button>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                    <h3 className="text-lg font-semibold text-text-main">2. Manual Installation</h3>
                    <p className="text-text-muted text-sm -mt-2">First, make sure you have installed the required dependencies:</p>
                    <div className="bg-[#18181b] rounded-xl border border-border-light p-4 font-mono text-sm text-[#e4e4e7] flex items-center justify-between group">
                        <span><span className="text-accent-crimson">npm</span> install framer-motion clsx tailwind-merge</span>
                        <button className="text-white/40 hover:text-white opacity-0 group-hover:opacity-100 transition-all"><Copy className="w-4 h-4" /></button>
                    </div>
                    <p className="text-text-muted text-sm mt-2">Then, copy the code from the Code tab above and paste it into your project component file.</p>
                </div>
            </div>

            {/* Props Component structure */}
            <div className="flex flex-col gap-6 mt-6">
                <h2 className="text-2xl font-bold text-text-main border-b border-border-light pb-3">Props Table</h2>
                <div className="overflow-x-auto border border-border-light rounded-2xl bg-surface-dark">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border-light bg-surface-mid/50">
                                <th className="p-4 text-sm font-semibold text-text-main w-1/4">Prop</th>
                                <th className="p-4 text-sm font-semibold text-text-main w-1/4">Type</th>
                                <th className="p-4 text-sm font-semibold text-text-main w-1/2">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light/50">
                            <tr>
                                <td className="p-4 text-sm font-mono text-accent-crimson">className</td>
                                <td className="p-4 text-sm font-mono text-emerald-400">string</td>
                                <td className="p-4 text-sm text-text-muted">Optional Tailwind CSS classes to inject into the root HTML node.</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-sm font-mono text-accent-crimson">children</td>
                                <td className="p-4 text-sm font-mono text-emerald-400">ReactNode</td>
                                <td className="p-4 text-sm text-text-muted">Content to be rendered within the component.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
