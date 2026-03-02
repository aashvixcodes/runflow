"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ToastProvider, useToast } from "@/components/Toast";
import ComponentModal from "@/components/ComponentModal";
import { codeDictionary, componentNames } from "@/lib/componentData";

function BentoCard({
  id,
  codeId,
  size,
  surface,
  children,
  className = "",
}: {
  id: string;
  codeId: string;
  size: "large" | "small";
  surface: "dark" | "light" | "mid";
  children: React.ReactNode;
  className?: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const surfaceClasses = {
    dark: "bg-surface-dark border border-white/5",
    light: "bg-surface-light border border-border-light",
    mid: "bg-surface-mid border border-border-light",
  };

  const sizeClasses = {
    large: "col-span-2 row-span-2",
    small: "col-span-1 row-span-1",
  };

  return (
    <>
      <motion.div
        id={id}
        initial={{ y: 60, opacity: 0, scale: 0.92 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
        onClick={() => setModalOpen(true)}
        className={`rounded-[var(--radius-bento)] relative overflow-hidden cursor-pointer flex items-center justify-center transition-all group ${surfaceClasses[surface]} ${sizeClasses[size]} ${className}`}
      >
        <div className="relative z-[2] w-full h-full flex justify-center items-center group-hover:-translate-y-1.5 transition-transform duration-300">
          {children}
        </div>

        {/* Label Pill */}
        <div className="absolute bottom-6 left-6 px-[18px] py-2.5 rounded-full text-[0.9rem] font-semibold z-20 bg-white text-text-main shadow-[0_4px_10px_rgba(0,0,0,0.05)] pointer-events-none group-hover:-translate-y-1 transition-transform duration-300">
          {componentNames[codeId] || codeId}
        </div>

        {/* Copy Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[8px] flex flex-col justify-center items-center gap-3 text-white opacity-0 z-50 group-hover:opacity-100 transition-opacity duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span className="text-lg font-bold">Copy Code</span>
        </div>
      </motion.div>

      <ComponentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        codeId={codeId}
      />
    </>
  );
}

/* --- Individual Component Previews --- */

function CrimsonRing() {
  const circumference = 52 * 2 * Math.PI;
  return (
    <div className="relative flex justify-center items-center">
      <svg className="progress-ring" width="120" height="120">
        <circle stroke="rgba(225,29,72,0.15)" strokeWidth="8" fill="transparent" r="52" cx="60" cy="60" />
        <circle
          stroke="#e11d48" strokeWidth="8" strokeLinecap="round" fill="transparent" r="52" cx="60" cy="60"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: circumference - (84 / 100) * circumference,
            transform: "rotate(-90deg)", transformOrigin: "50% 50%",
            filter: "drop-shadow(0 0 10px rgba(225,29,72,0.6))",
            transition: "stroke-dashoffset 1s ease-out",
          }}
        />
      </svg>
      <div className="absolute text-[1.8rem] font-extrabold text-white">84%</div>
    </div>
  );
}

function VelvetPass() {
  return (
    <div className="w-4/5 max-w-[220px] h-[140px] bg-gradient-to-br from-[rgba(225,29,72,0.9)] to-[rgba(159,18,57,1)] rounded-2xl border border-white/20 p-4 flex flex-col justify-between relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
      <div className="flex items-center gap-2 text-[0.85rem] font-bold text-white z-[2]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 22h20L12 2z" fill="#fecdd3" /></svg>
        <span>VIP Access</span>
      </div>
      <div className="flex justify-between items-end z-[2]">
        <div className="font-mono text-[1.2rem] tracking-[2px] text-[#fecdd3]">0042</div>
        <div className="text-[0.75rem] uppercase font-bold bg-white/20 px-2 py-1 rounded-md text-white">Active</div>
      </div>
      <div className="hologram group-hover:opacity-100" />
    </div>
  );
}

function SonarButton() {
  return (
    <button className="sonar-btn relative bg-text-main text-white border-none px-9 py-[18px] rounded-full text-[1.05rem] font-bold cursor-pointer z-10 shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform font-sans">
      Deploy Module
      <span className="sonar-ripple ripple-1" />
      <span className="sonar-ripple ripple-2" />
    </button>
  );
}

function GhostSkeleton() {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-8 justify-center">
      <div className="skel-row w-2/5 h-6 rounded-full" />
      <div className="skel-row w-full h-3 rounded-full" />
      <div className="skel-row w-4/5 h-3 rounded-full" />
    </div>
  );
}

function PremiumSwitch() {
  const [active, setActive] = useState(true);
  return (
    <div
      onClick={() => setActive(!active)}
      className={`w-[140px] h-[60px] rounded-full relative flex justify-between items-center px-3.5 cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] transition-colors duration-300 ${active ? "bg-accent-crimson" : "bg-[#e4e4e7]"}`}
    >
      <div className={`absolute w-[52px] h-[52px] bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] left-1 top-1 transition-transform duration-[0.4s] z-[3] ${active ? "translate-x-[80px]" : ""}`} style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }} />
      <span className="font-bold text-white z-[2] ml-3 text-[0.9rem]">ON</span>
      <span className="font-bold text-[#52525b] z-[2] mr-3 text-[0.9rem]">OFF</span>
    </div>
  );
}

function StatCard() {
  return (
    <div className="flex flex-col items-start justify-center p-6 w-full h-full">
      <span className="text-text-muted font-semibold text-[0.9rem]">Total Volume</span>
      <div className="text-[2.2rem] font-extrabold text-text-main flex items-center gap-2">
        24.8k
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </div>
    </div>
  );
}

function AvatarRing() {
  return (
    <div className="avatar-ring relative w-[100px] h-[100px] rounded-full flex justify-center items-center m-5" style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(225,29,72,0.1) 40%, #e11d48 100%)" }}>
      <div className="w-[90px] h-[90px] bg-[#09090b] rounded-full border-2 border-white/10 bg-cover bg-center z-[2]" style={{ backgroundImage: "url('https://i.pravatar.cc/150?img=33')" }} />
    </div>
  );
}

function GlassTooltip() {
  return (
    <div className="relative inline-block group/tooltip">
      <button className="bg-white border border-border-light px-6 py-3 rounded-full font-semibold cursor-pointer text-text-main font-sans">
        Hover Me
      </button>
      <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 translate-y-2.5 bg-white/90 backdrop-blur-[12px] border border-border-light text-text-main px-4 py-2.5 rounded-lg text-[0.85rem] font-semibold whitespace-nowrap opacity-0 pointer-events-none shadow-[0_10px_20px_rgba(0,0,0,0.05)] transition-all duration-200 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0" style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
        View full details
      </div>
    </div>
  );
}

function CyberBadge() {
  return (
    <div className="bg-[rgba(225,29,72,0.15)] border border-[rgba(225,29,72,0.3)] text-[#fda4af] px-4 py-2 rounded-full text-[0.8rem] font-bold uppercase tracking-wider inline-flex items-center gap-2 font-sans">
      <span className="pulse-dot" />
      System Active
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="w-full px-8">
      <div className="w-full h-2 bg-[#e4e4e7] rounded-full overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-[65%] bg-accent-crimson rounded-full transition-[width] duration-1000" />
      </div>
    </div>
  );
}

function MinimalAccordion() {
  return (
    <div className="w-[70%] bg-white border border-border-light rounded-2xl px-5 py-4 flex justify-between items-center font-semibold cursor-pointer text-text-main hover:bg-surface-light transition-colors group/acc">
      <span>Module Settings</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/acc:rotate-180" style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}

function GradientText() {
  return (
    <h2 className="text-[3rem] font-black tracking-[-2px] text-text-main cursor-pointer font-sans inline-block transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#f43f5e] hover:to-[#9f1239] hover:bg-clip-text hover:[-webkit-text-fill-color:transparent]">
      Interact.
    </h2>
  );
}

function FlipText() {
  return (
    <div className="flex gap-3" style={{ perspective: 600 }}>
      {["Create.", "Design.", "Deploy."].map((word) => (
        <span key={word} className="text-[2.2rem] font-black text-white inline-block cursor-default tracking-[-1px] hover:text-accent-crimson transition-all duration-[600ms]" style={{ transformStyle: "preserve-3d", transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "rotateX(360deg)"; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "rotateX(0deg)"; }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

function SpotlightCard() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="w-full h-full relative overflow-hidden group/spot"
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty("--mx", (e.clientX - r.left) + "px");
        ref.current.style.setProperty("--my", (e.clientY - r.top) + "px");
      }}
    >
      <div className="spotlight-beam group-hover/spot:opacity-100" />
      <div className="relative z-[2] text-center flex flex-col items-center justify-center h-full">
        <div className="text-[2.5rem] font-black text-text-main">✦</div>
        <div className="text-[0.85rem] font-semibold text-text-muted mt-2">Hover to reveal</div>
      </div>
    </div>
  );
}

function GlassDock() {
  return (
    <div className="flex items-end gap-1 bg-white/10 backdrop-blur-[20px] border border-white/15 rounded-[20px] px-3.5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
      {[
        { emoji: "🏠", label: "Home" },
        { emoji: "🔍", label: "Search" },
        { emoji: "⚙️", label: "Settings" },
        { emoji: "👤", label: "Profile" },
        { emoji: "☰", label: "Menu" },
      ].map((item) => (
        <div key={item.label} data-label={item.label} className="dock-icon w-11 h-11 flex items-center justify-center text-[1.4rem] rounded-xl bg-white/5 cursor-pointer relative transition-all duration-300 hover:-translate-y-3 hover:scale-[1.35] hover:bg-white/20 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]" style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
          {item.emoji}
        </div>
      ))}
    </div>
  );
}

function MagneticButton() {
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <button ref={btnRef} className="magnetic-btn inline-flex items-center gap-2.5 bg-gradient-to-br from-[#e11d48] to-[#9f1239] text-white border-none px-9 py-[18px] rounded-2xl text-[1.05rem] font-bold cursor-pointer font-sans relative overflow-hidden transition-all duration-200 shadow-[0_8px_30px_rgba(225,29,72,0.3)] hover:shadow-[0_12px_40px_rgba(225,29,72,0.5)]"
      onMouseMove={(e) => {
        if (!btnRef.current) return;
        const r = btnRef.current.getBoundingClientRect();
        btnRef.current.style.setProperty("--mx", (e.clientX - r.left) + "px");
        btnRef.current.style.setProperty("--my", (e.clientY - r.top) + "px");
      }}
    >
      <span>Get Started</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  );
}

function TiltCard() {
  return (
    <div className="w-[140px] h-[180px] bg-gradient-to-br from-[#1c1c1f] to-[#09090b] border border-white/5 rounded-[20px] flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(225,29,72,0.2)] hover:[transform:rotateY(8deg)_rotateX(-5deg)_scale(1.05)] group/tilt" style={{ perspective: 1000 }}>
      <div className="tilt-shine group-hover/tilt:opacity-100" />
      <div className="relative z-[2] text-center">
        <div className="text-2xl font-extrabold text-white">PRO</div>
        <div className="text-[0.75rem] font-medium text-white/60 mt-1">$29/mo</div>
      </div>
    </div>
  );
}

function TypewriterEffect() {
  const [text, setText] = useState("");
  const phrases = useRef(["npm install obsidian-ui", "npx create-app@latest", "git push origin main"]);

  useEffect(() => {
    let phraseIdx = 0, charIdx = 0, isDeleting = false;
    let timeout: NodeJS.Timeout;

    function typeLoop() {
      const phrase = phrases.current[phraseIdx];
      if (!isDeleting) {
        setText(phrase.slice(0, ++charIdx));
        if (charIdx === phrase.length) { isDeleting = true; timeout = setTimeout(typeLoop, 1500); return; }
      } else {
        setText(phrase.slice(0, --charIdx));
        if (charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.current.length; }
      }
      timeout = setTimeout(typeLoop, isDeleting ? 40 : 80);
    }
    typeLoop();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="font-mono text-[1.1rem] font-medium text-[#fda4af] flex items-center gap-0.5">
      <span className="text-white/40 font-medium">$</span>
      <span>{text}</span>
      <span className="tw-cursor">|</span>
    </div>
  );
}

/* --- Main Studio Page --- */
function StudioContent() {
  return (
    <>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center text-center mt-20 mb-16"
      >
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[clamp(4rem,8vw,8rem)] font-black leading-[0.95] tracking-[-0.05em] text-text-main mb-8"
        >
          Design Less.<br />
          <span className="text-accent-crimson">Ship Better.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[1.25rem] font-medium text-text-muted leading-relaxed max-w-[650px] mb-10 tracking-[-0.01em]"
        >
          Spend less time designing and tweaking UI, and more time shipping reliable, visually refined interfaces.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-4 items-center"
        >
          <button className="bg-text-main text-white border-none px-9 py-[18px] rounded-full text-[1.05rem] font-semibold cursor-pointer hover:scale-105 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] transition-all duration-200">
            Browse Components
          </button>
          <div className="flex items-center gap-3 bg-surface-light border border-border-light px-5 py-4 rounded-2xl text-text-muted text-base font-medium">
            <svg width="18" height="18" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 12L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Search components</span>
            <div className="bg-white border border-border-light rounded-md px-2 py-1 text-[0.8rem] font-semibold ml-5 text-text-muted">⌘ + /</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-3 auto-rows-[280px] gap-6 w-full mt-auto">
        <BentoCard id="ring-card" codeId="crimson-ring" size="large" surface="dark">
          <CrimsonRing />
        </BentoCard>

        <BentoCard id="velvet-card" codeId="velvet-pass" size="small" surface="light">
          <VelvetPass />
        </BentoCard>

        <BentoCard id="action-card" codeId="sonar-button" size="small" surface="mid">
          <SonarButton />
        </BentoCard>

        <BentoCard id="skeleton-card" codeId="skeleton-loader" size="small" surface="dark">
          <GhostSkeleton />
        </BentoCard>

        <BentoCard id="switch-card" codeId="pill-switch" size="large" surface="light">
          <PremiumSwitch />
        </BentoCard>

        <BentoCard id="stat-card" codeId="stat-card" size="small" surface="mid">
          <StatCard />
        </BentoCard>

        <BentoCard id="avatar-card" codeId="avatar-ring" size="large" surface="dark">
          <AvatarRing />
        </BentoCard>

        <BentoCard id="tooltip-card" codeId="glass-tooltip" size="small" surface="light">
          <GlassTooltip />
        </BentoCard>

        <BentoCard id="badge-card" codeId="cyber-badge" size="small" surface="dark">
          <CyberBadge />
        </BentoCard>

        <BentoCard id="progress-card" codeId="progress-bar" size="small" surface="mid">
          <ProgressBar />
        </BentoCard>

        <BentoCard id="accordion-card" codeId="minimal-accordion" size="large" surface="light">
          <MinimalAccordion />
        </BentoCard>

        <BentoCard id="gradient-text-card" codeId="gradient-text" size="small" surface="dark">
          <GradientText />
        </BentoCard>

        <BentoCard id="flip-text-card" codeId="flip-text" size="large" surface="dark">
          <FlipText />
        </BentoCard>

        <BentoCard id="spotlight-card" codeId="spotlight-card" size="small" surface="mid">
          <SpotlightCard />
        </BentoCard>

        <BentoCard id="dock-card" codeId="glass-dock" size="small" surface="light">
          <GlassDock />
        </BentoCard>

        <BentoCard id="magnetic-card" codeId="magnetic-btn" size="large" surface="dark">
          <MagneticButton />
        </BentoCard>

        <BentoCard id="tilt-card" codeId="tilt-card" size="small" surface="mid">
          <TiltCard />
        </BentoCard>

        <BentoCard id="typewriter-card" codeId="typewriter" size="small" surface="dark">
          <TypewriterEffect />
        </BentoCard>
      </div>
    </>
  );
}

export default function StudioPage() {
  return (
    <ToastProvider>
      <StudioContent />
    </ToastProvider>
  );
}
