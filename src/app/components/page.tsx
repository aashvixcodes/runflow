"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Folder, Sparkles, LayoutGrid, Zap, Layers, Palette, Box, Terminal, Frame } from "lucide-react";

const allExhibits = [
    { name: "Glass Dock", desc: "Interactive floating dock with magnification", tag: "Navigation", preview: "dock", id: "glass-dock" },
    { name: "Cyber Badges", desc: "Pulsating and glassy status indicators", tag: "Primitives", preview: "badges", id: "cyber-badge" },
    { name: "Glowing Border", desc: "Mouse-tracking neon border effect", tag: "Cards", preview: "glowing-border", id: "glowing-border" },
    { name: "Apple Spotlight", desc: "Cursor-tracking radial gradient beam effect", tag: "Interaction", preview: "spotlight", id: "spotlight-card" },
    { name: "Sonar Button", desc: "Continuous concentric ripple pulse on hover", tag: "Button", preview: "sonar", id: "sonar-button" },
    { name: "Pill Switch", desc: "Smooth mix-blend animated toggle", tag: "Interactive", preview: "pill-switch", id: "pill-switch" },
    { name: "Premium Buttons", desc: "Accessible multi-variant buttons", tag: "Primitives", preview: "button-variants", id: "magnetic-btn" },
    { name: "3D Tilt Card", desc: "Perspective tilt with crimson shine overlay", tag: "Card", preview: "tilt", id: "tilt-card" },
    { name: "Typewriter", desc: "Terminal-style auto-typing loop with blinking cursor", tag: "Text Effect", preview: "typewriter", id: "typewriter" },
    { name: "Flip Text", desc: "3D rotating text on hover with elastic easing", tag: "Animation", preview: "flip", id: "flip-text" },
    { name: "Magnetic Button", desc: "Cursor-following button with glow trail physics", tag: "Button", preview: "magnetic", id: "magnetic-btn" },
    { name: "Activity Ring", desc: "Animated SVG progress ring with glow effect", tag: "Data Viz", preview: "ring", id: "crimson-ring" },
];

const sidebarCategories = [
    { id: "all", label: "All Components", icon: "all", desc: "Explore our entire collection of interactive primitives." },
    { id: "glassmorphism", label: "Glassmorphism", icon: "glass", desc: "Frosted glass effects, background blur, and semi-transparent layers." },
    { id: "aurora", label: "Aurora / Glow UI", icon: "aurora", desc: "Vibrant glowing effects, radial gradients, and neon accents." },
    { id: "neumorphism", label: "Neumorphism", icon: "neu", desc: "Soft shadow extrusion, pill borders, and smooth tactile layouts." },
    { id: "claymorphism", label: "Claymorphism", icon: "clay", desc: "Soft, fluffy 3D aesthetics with inner shadows and rounded edges." },
    { id: "skeuomorphism", label: "Skeuomorphism", icon: "skeuo", desc: "Rich textures, 3D tilts, and real-world physical object translation." },
    { id: "brutalism", label: "Brutalism", icon: "brut", desc: "Raw, mono-spaced, high contrast text and terminal effects." },
];

function TypewriterPreview() {
    const [text, setText] = useState("");
    const phrases = useRef(["npm install runflow-ui", "npx create-app@latest", "git push origin main"]);

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
        case "button-variants":
            return (
                <div className="flex flex-col gap-4 w-full px-8">
                    <button className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm shadow-[0_4px_14px_rgba(255,255,255,0.2)]">Primary Action</button>
                    <button className="bg-transparent text-white border border-white/20 hover:bg-white/5 px-6 py-3 rounded-full font-bold text-sm transition-colors">Secondary</button>
                </div>
            );
        case "badges":
            return (
                <div className="flex flex-col gap-5 items-center">
                    <span className="bg-[#e11d48]/20 border border-[#e11d48]/50 text-[#fda4af] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-[0_0_15px_rgba(225,29,72,0.3)]">SYS_ACTIVE</span>
                    <span className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        ONLINE
                    </span>
                </div>
            );
        case "pill-switch":
            return (
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="bg-white/10 p-1.5 rounded-full w-24 h-12 flex items-center relative cursor-pointer border border-white/5 shadow-inner">
                        <motion.div
                            className="w-9 h-9 bg-white rounded-full shadow-md z-10 mx-1"
                            animate={{ x: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </div>
                </div>
            );
        case "glowing-border":
            return (
                <div className="w-[80%] h-[100px] flex items-center justify-center bg-[#09090b] relative overflow-hidden rounded-xl border border-white/10 group-hover:border-transparent transition-colors duration-300">
                    <div className="absolute inset-[-4px] bg-gradient-to-r from-accent-crimson to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-[#09090b] rounded-xl border border-white/5 m-[1px]"></div>
                    <span className="font-bold text-white relative z-10 text-sm">Hover Container</span>
                </div>
            );
        case "magnetic":
            return (
                <button className="inline-flex items-center gap-2.5 bg-gradient-to-br from-[#e11d48] to-[#9f1239] text-white border-none px-7 py-[14px] rounded-2xl text-sm font-bold cursor-default font-sans shadow-[0_8px_30px_rgba(225,29,72,0.3)]">
                    <span>Deploy App</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
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
                <button className="sonar-btn relative bg-text-main text-bg-page border-none px-8 py-[16px] rounded-full text-sm font-bold cursor-default font-sans shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
                    Sonar Pulse
                    <span className="sonar-ripple ripple-1" style={{ animation: "sonarPing 1.5s infinite cubic-bezier(0.215, 0.61, 0.355, 1)" }} />
                    <span className="sonar-ripple ripple-2" style={{ animation: "sonarPing 1.5s infinite cubic-bezier(0.215, 0.61, 0.355, 1)", animationDelay: "0.4s" }} />
                </button>
            );
        default:
            return null;
    }
}

export default function ExhibitsPage() {

    // Smooth scroll for sidebar links
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            const offset = 100; // offset for fixed headers
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="w-full mx-auto px-6 sm:px-10 py-10 pb-20">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                {/* Left Sidebar Navigation */}
                <aside className="w-full lg:w-[300px] shrink-0 border-r border-border-light/30">
                    <div className="sticky top-24 flex flex-col gap-1 h-max overflow-y-auto pr-6 hidden-scrollbar">
                        <div className="mb-4 ml-4 mt-2">
                            <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-text-muted/60">Library Categories</h3>
                        </div>

                        {sidebarCategories.map((cat) => {
                            const IconMap: Record<string, any> = {
                                all: LayoutGrid,
                                glass: Layers,
                                aurora: Palette,
                                neu: Zap,
                                clay: Box,
                                skeuo: Frame,
                                brut: Terminal
                            };
                            const CategoryIcon = IconMap[cat.icon || ""] || Folder;

                            return (
                                <a
                                    key={cat.id}
                                    href={`#${cat.id}`}
                                    onClick={(e) => handleScroll(e, cat.id)}
                                    className="group flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[0.95rem] font-semibold text-text-muted hover:text-text-main hover:bg-surface-light border border-transparent hover:border-border-light/50 transition-all duration-200"
                                >
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-dark group-hover:bg-bg-island border border-border-light/30 transition-colors">
                                        <CategoryIcon className="w-4 h-4 text-text-muted group-hover:text-accent-crimson transition-colors" />
                                    </span>
                                    <span>{cat.label}</span>
                                </a>
                            );
                        })}

                        <div className="mt-8 pt-8 border-t border-border-light/50 ml-4 mb-4">
                            <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-text-muted/60">Creative Space</h3>
                        </div>
                        <Link href="/ai" className="group flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[0.95rem] font-semibold text-accent-crimson hover:bg-accent-crimson/5 border border-transparent hover:border-accent-crimson/20 transition-all duration-200">
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-crimson/10 border border-accent-crimson/20">
                                <Sparkles className="w-4 h-4 text-accent-crimson" />
                            </span>
                            AI Studio
                        </Link>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col pt-2 min-w-0">
                    <div className="mb-16">
                        <h1 className="text-[clamp(3rem,5vw,4.5rem)] font-black text-text-main tracking-tight leading-none mb-4">Component<br /><span className="text-text-muted/50">Exhibits</span></h1>
                        <p className="text-text-muted text-lg max-w-[600px]">Browse our collection of premium, interactive components. Click any component to view the source code or tweak its styles instantly with AI.</p>
                    </div>

                    <div className="flex flex-col gap-28 pb-32">
                        {sidebarCategories.map(cat => {
                            // Only the "all" physical category actually contains the components currently.
                            // The user requested empty new sections.
                            const items = cat.id === 'all' ? allExhibits : [];

                            return (
                                <section key={cat.id} id={cat.id} className="scroll-mt-32 w-full">
                                    <div className="mb-8 border-b border-border-light pb-4">
                                        <h2 className="text-3xl font-extrabold text-text-main tracking-tight flex items-center gap-3">
                                            {cat.label}
                                        </h2>
                                        {cat.desc && <p className="text-text-muted mt-2 text-[1.05rem]">{cat.desc}</p>}
                                    </div>

                                    {items.length > 0 ? (
                                        <div className="columns-1 sm:columns-2 xl:columns-2 gap-6 space-y-6 w-full px-2">
                                            {items.map((exhibit, i) => {
                                                // Create varying heights for actual Pinterest feel
                                                const heights = ["min-h-[220px]", "min-h-[280px]", "min-h-[340px]", "min-h-[300px]"];
                                                const heightClass = heights[i % heights.length];

                                                return (
                                                    <motion.div
                                                        key={exhibit.name}
                                                        initial={{ y: 20, opacity: 0 }}
                                                        whileInView={{ y: 0, opacity: 1 }}
                                                        viewport={{ once: true, margin: "100px" }}
                                                        transition={{ duration: 0.5, delay: 0.05 * i }}
                                                        className="break-inside-avoid relative"
                                                    >
                                                        <Link
                                                            href={`/docs/${exhibit.id}`}
                                                            className="bg-surface-mid border border-border-light/40 rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] hover:border-accent-crimson/30 block group flex flex-col h-full"
                                                        >
                                                            <div className={`${heightClass} bg-surface-dark flex items-center justify-center p-8 overflow-hidden relative border-b border-border-light/10`}>
                                                                <div className="scale-90 sm:scale-100 transition-transform duration-500 group-hover:scale-110">
                                                                    <ExhibitPreview type={exhibit.preview} />
                                                                </div>
                                                                {/* Hover Overlay */}
                                                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px] flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                                                                    <span className="bg-white text-black px-6 py-2.5 rounded-2xl font-bold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Open Specs</span>
                                                                </div>
                                                            </div>
                                                            <div className="p-6">
                                                                <div className="flex flex-col gap-1">
                                                                    <div className="flex items-center justify-between gap-2">
                                                                        <div className="text-[1.05rem] font-bold text-text-main tracking-tight line-clamp-1">{exhibit.name}</div>
                                                                        <span className="shrink-0 px-2 py-0.5 rounded-md bg-surface-light border border-border-light text-text-muted text-[0.55rem] font-bold uppercase tracking-widest">
                                                                            {exhibit.tag}
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-[0.85rem] text-text-muted/70 leading-relaxed font-medum line-clamp-2">{exhibit.desc}</div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="w-full h-[280px] p-12 border-2 border-dashed border-border-light rounded-[32px] flex flex-col items-center justify-center text-center bg-surface-mid/20 transition-all hover:bg-surface-mid/40">
                                            <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center mb-5 border border-border-light shadow-inner">
                                                <span className="text-2xl opacity-50">🛠️</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-text-main mb-2 tracking-tight">Under Construction</h3>
                                            <p className="text-[0.95rem] text-text-muted max-w-[400px]">New components for this aesthetic category are arriving soon. Stay tuned or generate them yourself in the AI Editor!</p>
                                        </div>
                                    )}
                                </section>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
}
