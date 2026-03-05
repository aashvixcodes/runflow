import Link from "next/link";
import { codeDictionary } from "@/lib/componentData";

export default function DocsIndexPage() {
    const categories = Object.keys(codeDictionary);
    const totalComponents = categories.length;

    return (
        <div className="w-full h-full p-8 md:p-14 lg:p-20 overflow-y-auto pt-24 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center text-center">
            <div className="max-w-2xl mx-auto flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-crimson/10 text-accent-crimson text-sm font-semibold mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-crimson opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-crimson"></span>
                    </span>
                    Version 1.0 Live
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-main tracking-tight mb-6">
                    Documentation
                </h1>

                <p className="text-lg md:text-xl text-text-muted mb-10 leading-relaxed">
                    Welcome to the Runflow UI documentation. Explore over{" "}
                    <span className="font-bold text-text-main">{totalComponents}</span> interactive
                    components designed to help you ship better products faster.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-12">
                    <div className="bg-surface-light border border-border-light rounded-2xl p-6 text-left flex flex-col h-full">
                        <div className="text-3xl mb-4">🚀</div>
                        <h3 className="text-lg font-bold text-text-main mb-2">Getting Started</h3>
                        <p className="text-text-muted text-sm flex-grow mb-4">
                            Select a component from the sidebar to view its interactive preview,
                            copy the source code, and learn how to install it.
                        </p>
                    </div>

                    <div className="bg-surface-light border border-border-light rounded-2xl p-6 text-left flex flex-col h-full">
                        <div className="text-3xl mb-4">🤖</div>
                        <h3 className="text-lg font-bold text-text-main mb-2">AI Customization</h3>
                        <p className="text-text-muted text-sm flex-grow mb-4">
                            Click the "Edit with AI" button on any component page to instantly
                            open it in our embedded AI prompt editor and tweak its design.
                        </p>
                    </div>
                </div>

                <Link
                    href={`/docs/${categories[0]}`}
                    className="bg-text-main text-bg-page px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center gap-2"
                >
                    View First Component
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
