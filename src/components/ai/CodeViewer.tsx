"use client";

import { useState, useRef } from "react";

interface CodeViewerProps {
    code: string;
}

export default function CodeViewer({ code }: CodeViewerProps) {
    const [tab, setTab] = useState<"preview" | "code">("preview");
    const [copied, setCopied] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

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

    // Create a sandboxed preview HTML
    const previewHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
          body { background: #09090b; color: #fafafa; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        </style>
      </head>
      <body>
        <div id="root">${code}</div>
      </body>
    </html>
  `;

    return (
        <div className="w-full border border-border-light rounded-2xl overflow-hidden bg-white">
            {/* Tab Bar */}
            <div className="flex items-center justify-between border-b border-border-light px-4">
                <div className="flex">
                    <button
                        onClick={() => setTab("preview")}
                        className={`px-5 py-3 text-sm font-semibold transition-all duration-200 border-b-2 ${tab === "preview"
                                ? "text-accent-crimson border-accent-crimson"
                                : "text-text-muted border-transparent hover:text-text-main"
                            }`}
                    >
                        Preview
                    </button>
                    <button
                        onClick={() => setTab("code")}
                        className={`px-5 py-3 text-sm font-semibold transition-all duration-200 border-b-2 ${tab === "code"
                                ? "text-accent-crimson border-accent-crimson"
                                : "text-text-muted border-transparent hover:text-text-main"
                            }`}
                    >
                        Code
                    </button>
                </div>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-text-muted hover:text-accent-crimson hover:bg-[rgba(225,29,72,0.05)] transition-all duration-200"
                >
                    {copied ? (
                        <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            Copy Code
                        </>
                    )}
                </button>
            </div>

            {/* Content */}
            {tab === "preview" ? (
                <div className="bg-surface-dark min-h-[400px]">
                    <iframe
                        ref={iframeRef}
                        srcDoc={previewHTML}
                        sandbox="allow-scripts"
                        className="w-full min-h-[400px] border-none"
                        title="Component Preview"
                    />
                </div>
            ) : (
                <div className="bg-[#18181b] p-6 min-h-[400px] max-h-[600px] overflow-auto">
                    <pre className="m-0">
                        <code className="font-mono text-[0.8rem] text-[#fda4af] leading-7 whitespace-pre-wrap break-words">
                            {code}
                        </code>
                    </pre>
                </div>
            )}
        </div>
    );
}
