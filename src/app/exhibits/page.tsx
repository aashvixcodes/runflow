"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const exhibits = [
    { name: "Flip Text", desc: "3D rotating text on hover with elastic easing", tag: "Animation", preview: "flip" },
    { name: "Apple Spotlight", desc: "Cursor-tracking radial gradient beam effect", tag: "Interaction", preview: "spotlight" },
    { name: "Glass Dock", desc: "macOS-style dock with magnification and tooltips", tag: "Navigation", preview: "dock" },
    { name: "Magnetic Button", desc: "Cursor-following button with glow trail physics", tag: "Button", preview: "magnetic" },
    { name: "3D Tilt Card", desc: "Perspective tilt with crimson shine overlay", tag: "Card", preview: "tilt" },
    { name: "Typewriter", desc: "Terminal-style auto-typing loop with blinking cursor", tag: "Text Effect", preview: "typewriter" },
    { name: "Activity Ring", desc: "Animated SVG progress ring with glow effect", tag: "Data Viz", preview: "ring" },
    { name: "Sonar Button", desc: "Continuous concentric ripple pulse on hover", tag: "Button", preview: "sonar" },
    { name: "Cyber Badge", desc: "Neon status pill with animated pulsing dot", tag: "Badge", preview: "badge" },
];

function TypewriterPreview() {
    const [text, setText] = useState("");
    const phrases = useRef(["npm install obsidian-ui", "npx create-app@latest", "git push origin main"]);

    useEffect(() => {
        let pi = 0, ci = 0, del = false;
        let t: NodeJS.Timeout;
        function loop() {
            const p = phrases.current[pi];
            if (!del) { setText(p.slice(0, ++ci)); if (ci === p.length) { del = true; t = setTimeout(loop, 1500); return; } }
            else { setText(p.slice(0, --ci)); if (ci === 0) { del = false; pi = (pi + 1) % phrases.current.length; } }
            t = setTimeout(loop, del ? 40 : 80);
        }
        loop();
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="font-mono text-[1.1rem] font-medium text-[#fda4af] flex items-center gap-0.5">
            <span className="text-white/40">$</span>
            <span>{text}</span>
            <span className="tw-cursor">|</span>
        </div>
    );
}

function ExhibitPreview({ type }: { type: string }) {
    const ref = useRef<HTMLDivElement>(null);

    switch (type) {
        case "flip":
            return (
                <div className="flex gap-3" style={{ perspective: 600 }}>
                    {["Create.", "Design.", "Deploy."].map((w) => (
                        <span key={w} className="text-[2rem] font-black text-white inline-block cursor-default hover:text-accent-crimson transition-all duration-500" style={{ transformStyle: "preserve-3d" }}>{w}</span>
                    ))}
                </div>
            );
        case "spotlight":
            return (
                <div ref={ref} className="w-full h-full relative cursor-crosshair group/s"
                    onMouseMove={(e) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); ref.current.style.setProperty("--mx", (e.clientX - r.left) + "px"); ref.current.style.setProperty("--my", (e.clientY - r.top) + "px"); }}
                >
                    <div className="spotlight-beam opacity-100" />
                    <div className="relative z-[2] text-center flex flex-col items-center justify-center h-full">
                        <div className="text-[2.5rem] font-black text-white">✦</div>
                        <div className="text-[0.8rem] font-semibold text-white/50 mt-2">Hover to reveal</div>
                    </div>
                </div>
            );
        case "dock":
            return (
                <div className="flex items-end gap-1 bg-white/10 backdrop-blur-[20px] border border-white/15 rounded-[20px] px-3.5 py-2.5">
                    {["🏠", "🔍", "⚙️", "👤", "☰"].map((e, i) => (
                        <div key={i} className="dock-icon w-11 h-11 flex items-center justify-center text-[1.4rem] rounded-xl bg-white/5 cursor-pointer hover:-translate-y-3 hover:scale-[1.35] transition-all duration-300">{e}</div>
                    ))}
                </div>
            );
        case "magnetic":
            return (
                <button className="inline-flex items-center gap-2.5 bg-gradient-to-br from-[#e11d48] to-[#9f1239] text-white border-none px-9 py-[18px] rounded-2xl text-[1.05rem] font-bold cursor-default font-sans shadow-[0_8px_30px_rgba(225,29,72,0.3)]">
                    <span>Get Started</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </button>
            );
        case "tilt":
            return (
                <div className="w-[140px] h-[180px] bg-gradient-to-br from-[#1c1c1f] to-[#09090b] border border-white/5 rounded-[20px] flex items-center justify-center relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                    <div className="tilt-shine" />
                    <div className="relative z-[2] text-center">
                        <div className="text-2xl font-extrabold text-white">PRO</div>
                        <div className="text-[0.75rem] font-medium text-white/60 mt-1">$29/mo</div>
                    </div>
                </div>
            );
        case "typewriter":
            return <TypewriterPreview />;
        case "ring":
            return (
                <div className="relative flex justify-center items-center">
                    <svg width="100" height="100">
                        <circle stroke="rgba(225,29,72,0.15)" strokeWidth="6" fill="transparent" r="42" cx="50" cy="50" />
                        <circle stroke="#e11d48" strokeWidth="6" strokeLinecap="round" fill="transparent" r="42" cx="50" cy="50" style={{ strokeDasharray: "263.9", strokeDashoffset: "42.2", filter: "drop-shadow(0 0 10px rgba(225,29,72,0.6))", transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} />
                    </svg>
                    <div className="absolute text-[1.4rem] font-extrabold text-white">84%</div>
                </div>
            );
        case "sonar":
            return (
                <button className="sonar-btn relative bg-text-main text-white border-none px-9 py-[18px] rounded-full text-[1.05rem] font-bold cursor-default font-sans shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
                    Deploy Module
                    <span className="sonar-ripple ripple-1" style={{ animation: "sonarPing 1.5s infinite cubic-bezier(0.215, 0.61, 0.355, 1)" }} />
                    <span className="sonar-ripple ripple-2" style={{ animation: "sonarPing 1.5s infinite cubic-bezier(0.215, 0.61, 0.355, 1)", animationDelay: "0.4s" }} />
                </button>
            );
        case "badge":
            return (
                <div className="bg-[rgba(225,29,72,0.15)] border border-[rgba(225,29,72,0.3)] text-[#fda4af] px-4 py-2 rounded-full text-[0.8rem] font-bold uppercase tracking-wider inline-flex items-center gap-2 font-sans">
                    <span className="pulse-dot" />
                    System Active
                </div>
            );
        default:
            return null;
    }
}

export default function ExhibitsPage() {
    return (
        <>
            <div className="flex flex-col items-center text-center mt-20 mb-8">
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[clamp(4rem,8vw,8rem)] font-black leading-[0.95] tracking-[-0.05em] text-text-main mb-8"
                >
                    Featured <span className="text-accent-crimson">Components</span>
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-[1.25rem] font-medium text-text-muted leading-relaxed max-w-[650px] mb-10"
                >
                    Explore our most popular components with live previews. Click any card to view details and copy the code.
                </motion.p>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex gap-4 items-center"
                >
                    <a href="/" className="bg-text-main text-white border-none px-9 py-[18px] rounded-full text-[1.05rem] font-semibold cursor-pointer hover:scale-105 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all duration-200 no-underline">
                        View All in Studio
                    </a>
                </motion.div>
            </div>

            {/* Exhibits Grid */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 w-full">
                {exhibits.map((exhibit, i) => (
                    <motion.a
                        key={exhibit.name}
                        href="/"
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 * i }}
                        className="bg-surface-mid border border-border-light rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-[rgba(225,29,72,0.3)] no-underline block"
                    >
                        <div className="bg-surface-dark h-[200px] flex items-center justify-center p-6 overflow-hidden relative">
                            <ExhibitPreview type={exhibit.preview} />
                        </div>
                        <div className="p-5">
                            <div className="text-[1.1rem] font-bold text-text-main mb-1">{exhibit.name}</div>
                            <div className="text-[0.85rem] text-[#71717a] font-medium">{exhibit.desc}</div>
                            <span className="inline-block bg-surface-light text-text-muted px-2.5 py-0.5 rounded-full text-[0.7rem] font-semibold mt-2 uppercase tracking-wider">
                                {exhibit.tag}
                            </span>
                        </div>
                    </motion.a>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center py-16 w-full">
                <h2 className="text-[2.2rem] font-extrabold text-text-main tracking-[-1px]">
                    Ship your next project<br /><span className="text-accent-crimson">faster than ever.</span>
                </h2>
                <p className="text-text-muted text-base mt-3 max-w-[500px] mx-auto">
                    Click any component to preview it live and copy the code instantly.
                </p>
                <a href="/" className="bg-text-main text-white border-none px-9 py-[18px] rounded-full text-[1.05rem] font-semibold cursor-pointer hover:scale-105 transition-all duration-200 mt-6 inline-block no-underline">
                    Browse All Components
                </a>
            </div>
        </>
    );
}
