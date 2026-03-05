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

    // Clean the generated code for preview rendering
    const cleanCodeForPreview = (rawCode: string): string => {
        let cleaned = rawCode;
        // Remove import statements (React is provided globally in the iframe)
        cleaned = cleaned.replace(/^import\s+.*?['"].*?['"]\s*;?\s*$/gm, '');
        // Remove TypeScript type annotations that break in Babel standalone
        // e.g. ": React.FC<Props>" or ": string" etc.
        cleaned = cleaned.replace(/:\s*React\.FC<\w+>/g, '');
        // Remove "export default ComponentName;" at end
        cleaned = cleaned.replace(/export\s+default\s+(\w+)\s*;?\s*$/gm, '');
        // Convert "export default function/const" to just "function/const"
        cleaned = cleaned.replace(/export\s+default\s+/gm, '');
        // Remove remaining export keywords
        cleaned = cleaned.replace(/^export\s+/gm, '');
        return cleaned.trim();
    };

    // Extract the component name from the code
    const getComponentName = (rawCode: string): string => {
        const funcMatch = rawCode.match(/(?:const|function)\s+([A-Z]\w+)/);
        if (funcMatch) return funcMatch[1];
        return 'App';
    };

    const cleanedCode = cleanCodeForPreview(code);
    const componentName = getComponentName(code);

    // Encode the code as base64 to avoid HTML parsing issues with angle brackets, quotes, etc.
    const encodedCode = typeof window !== 'undefined'
        ? btoa(unescape(encodeURIComponent(cleanedCode)))
        : Buffer.from(cleanedCode).toString('base64');

    const previewHTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>
    <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"><\/script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
      body { background: #09090b; color: #fafafa; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
      #error-display { color: #f87171; font-family: monospace; padding: 1rem; font-size: 0.85rem; white-space: pre-wrap; max-width: 100%; }
      #loading { color: #a1a1aa; font-family: 'Inter', sans-serif; font-size: 0.9rem; }
    </style>
  </head>
  <body>
    <div id="root"><div id="loading">Loading preview...</div></div>
    <script>
      // Catch runtime errors that slip past the try-catch block
      window.onerror = function(msg, url, lineNo, columnNo, error) {
        document.getElementById('root').innerHTML = '<div id="error-display">Runtime Error: ' + msg + '</div>';
        return false;
      };
      window.onunhandledrejection = function(event) {
        document.getElementById('root').innerHTML = '<div id="error-display">Unhandled Promise Rejection: ' + event.reason + '</div>';
      };

      (function() {
        try {
          // Decode the base64-encoded component code
          var encoded = "${encodedCode}";
          var code = decodeURIComponent(escape(atob(encoded)));

          // Strip TypeScript interfaces and type annotations for Babel
          code = code.replace(/interface\\s+\\w+\\s*\\{[^}]*\\}/gs, '');
          code = code.replace(/type\\s+\\w+\\s*=\\s*[^;]+;/g, '');
          code = code.replace(/:\\s*[A-Za-z]\\w*(?:\\.\\w+)*(?:<[^>]*>)?(?:\\[\\])?/g, '');
          code = code.replace(/<\\w+Props>/g, '');
          code = code.replace(/as\\s+\\w+/g, '');

          // Add render logic
          code += "\\n;(function(){" +
            "var C = typeof ${componentName} !== 'undefined' ? ${componentName} : null;" +
            "if(C){" +
            "  var props = {" +
            "    planName:'Pro', price:'\\$29', frequency:'/month'," +
            "    features:['Unlimited projects','Priority support','Advanced analytics','Custom integrations','Team collaboration']," +
            "    buttonText:'Get Started', buttonHref:'#', isPopular:true," +
            "    title:'Welcome', subtitle:'This is a preview', children:'Hello World'," +
            "    label:'Click Me', onClick:function(){}, onChange:function(){}," +
            "    placeholder:'Type here...', name:'John Doe'," +
            "    description:'A beautifully crafted component', icon:'\\u2605'," +
            "    items:['Item 1','Item 2','Item 3']," +
            "    src:'https://placehold.co/400x300/1a1a2e/e11d48?text=Preview', alt:'Preview'" +
            "  };" +
            "  var root = ReactDOM.createRoot(document.getElementById('root'));" +
            "  root.render(React.createElement(C, props));" +
            "}else{" +
            "  document.getElementById('root').innerHTML='<div id=error-display>Could not detect component.</div>';" +
            "}" +
            "})();";

          // Transpile with Babel
          var output = Babel.transform(code, { presets: ['react'] }).code;

          // Execute the transpiled code
          var script = document.createElement('script');
          script.textContent = output;
          document.body.appendChild(script);
        } catch(err) {
          document.getElementById('root').innerHTML = '<div id="error-display">Preview Error: ' + err.message + '</div>';
        }
      })();
    <\/script>
  </body>
</html>`;

    return (
        <div className="w-full border border-border-light rounded-2xl overflow-hidden bg-bg-island">
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
                        sandbox="allow-scripts allow-same-origin"
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
