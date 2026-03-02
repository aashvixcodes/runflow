// Component code snippets dictionary (same as original main.js codeDictionary)
export const codeDictionary: Record<string, string> = {
    "crimson-ring": `<!-- Crimson Data Ring -->
<style>
.ring-container { position: relative; display: flex; justify-content: center; align-items: center; }
.progress-ring__circle { transition: stroke-dashoffset 1s ease-out; transform: rotate(-90deg); transform-origin: 50% 50%; filter: drop-shadow(0 0 10px rgba(225, 29, 72, 0.6)); }
.ring-value { position: absolute; font-size: 1.8rem; font-weight: 800; color: #ffffff; font-family: sans-serif; }
</style>
<div class="ring-container">
  <svg class="progress-ring" width="120" height="120">
    <circle stroke="rgba(225, 29, 72, 0.15)" stroke-width="8" fill="transparent" r="52" cx="60" cy="60"/>
    <circle class="progress-ring__circle" stroke="#e11d48" stroke-width="8" stroke-linecap="round" fill="transparent" r="52" cx="60" cy="60" style="stroke-dasharray: 326.7; stroke-dashoffset: 52.2"/>
  </svg>
  <div class="ring-value">84%</div>
</div>`,

    "velvet-pass": `<!-- Holographic Velvet Pass -->
<style>
.pass-ticket { width: 220px; height: 140px; background: linear-gradient(135deg, rgba(225, 29, 72, 0.9), rgba(159, 18, 57, 1)); border-radius: 16px; border: 1px solid rgba(255,255,255,0.2); padding: 16px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.15); font-family: sans-serif; }
.ticket-header { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; color: #fff; z-index: 2; }
.ticket-body { display: flex; justify-content: space-between; align-items: flex-end; z-index: 2; }
.ticket-code { font-family: monospace; font-size: 1.2rem; letter-spacing: 2px; color: #fecdd3; }
.ticket-status { font-size: 0.75rem; text-transform: uppercase; font-weight: 700; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px; color: #fff; }
</style>
<div class="pass-ticket">
  <div class="ticket-header"><span>VIP Access</span></div>
  <div class="ticket-body">
    <div class="ticket-code">0042</div>
    <div class="ticket-status">Active</div>
  </div>
</div>`,

    "sonar-button": `<!-- Sonar Pulse Button -->
<style>
.sonar-btn { position: relative; background: #09090b; color: white; border: none; padding: 18px 36px; border-radius: 9999px; font-size: 1.05rem; font-weight: 700; cursor: pointer; z-index: 10; box-shadow: 0 10px 20px rgba(0,0,0,0.15); font-family: sans-serif; }
.sonar-btn:hover { transform: scale(1.05); }
.sonar-ripple { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; border-radius: 9999px; border: 2px solid #09090b; z-index: -1; opacity: 0; }
.sonar-btn:hover .ripple-1 { animation: sonarPing 1.5s infinite cubic-bezier(0.215, 0.61, 0.355, 1); }
.sonar-btn:hover .ripple-2 { animation: sonarPing 1.5s infinite cubic-bezier(0.215, 0.61, 0.355, 1); animation-delay: 0.4s; }
@keyframes sonarPing { 0% { width: 100%; height: 100%; opacity: 0.6; } 100% { width: 160%; height: 200%; opacity: 0; } }
</style>
<button class="sonar-btn">Deploy Module<span class="sonar-ripple ripple-1"></span><span class="sonar-ripple ripple-2"></span></button>`,

    "skeleton-loader": `<!-- Ghost Shimmer Skeleton -->
<style>
.skel-row { background: linear-gradient(90deg, #18181b 0%, #27272a 50%, #18181b 100%); background-size: 200% 100%; animation: shimmer 1.5s infinite linear; border-radius: 99px; }
@keyframes shimmer { 0% { background-position: -100% 0; } 100% { background-position: 100% 0; } }
</style>
<div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:300px">
  <div class="skel-row" style="width:40%;height:24px"></div>
  <div class="skel-row" style="width:100%;height:12px"></div>
  <div class="skel-row" style="width:80%;height:12px"></div>
</div>`,

    "pill-switch": `<!-- Premium Toggle Switch -->
<style>
.pill-switch { width: 140px; height: 60px; background: #e4e4e7; border-radius: 9999px; position: relative; display: flex; justify-content: space-between; align-items: center; padding: 0 14px; cursor: pointer; font-family: sans-serif; }
.pill-switch[data-active="true"] { background: #e11d48; }
.switch-handle { position: absolute; width: 52px; height: 52px; background: #fff; border-radius: 50%; left: 4px; top: 4px; transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); z-index: 3; }
.pill-switch[data-active="true"] .switch-handle { transform: translateX(80px); }
</style>
<div class="pill-switch" data-active="true" onclick="this.setAttribute('data-active', this.getAttribute('data-active')==='true'?'false':'true')">
  <div class="switch-handle"></div>
  <span style="font-weight:700;color:#fff;z-index:2;margin-left:12px;font-size:0.9rem">ON</span>
  <span style="font-weight:700;color:#52525b;z-index:2;margin-right:12px;font-size:0.9rem">OFF</span>
</div>`,

    "stat-card": `<!-- Stat Trend Card -->
<div style="display:flex;flex-direction:column;font-family:sans-serif;padding:24px;background:#fafafa;border:1px solid #e4e4e7;border-radius:24px;max-width:250px">
  <span style="color:#52525b;font-weight:600;font-size:0.9rem">Total Volume</span>
  <div style="font-size:2.2rem;font-weight:800;color:#09090b;display:flex;align-items:center;gap:8px;margin-top:8px">24.8k
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e11d48" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
  </div>
</div>`,

    "avatar-ring": `<!-- Spinning Avatar Ring -->
<style>
.avatar-ring { position: relative; width: 100px; height: 100px; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0%, rgba(225,29,72,0.1) 40%, #e11d48 100%); display: flex; justify-content: center; align-items: center; animation: spin 3s linear infinite; }
.avatar-inner { width: 90px; height: 90px; background: #09090b; border-radius: 50%; border: 2px solid rgba(255,255,255,0.1); background-image: url('https://i.pravatar.cc/150?img=33'); background-size: cover; z-index: 2; }
@keyframes spin { 100% { transform: rotate(360deg); } }
</style>
<div class="avatar-ring"><div class="avatar-inner"></div></div>`,

    "glass-tooltip": `<!-- Glass Tooltip -->
<style>
.tooltip-container { position: relative; display: inline-block; font-family: sans-serif; }
.tooltip-box { position: absolute; bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%) translateY(10px); background: rgba(255,255,255,0.9); backdrop-filter: blur(12px); border: 1px solid #e4e4e7; color: #09090b; padding: 10px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; white-space: nowrap; opacity: 0; pointer-events: none; transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
.tooltip-container:hover .tooltip-box { opacity: 1; transform: translateX(-50%) translateY(0); }
</style>
<div class="tooltip-container">
  <button style="background:white;border:1px solid #e4e4e7;padding:12px 24px;border-radius:99px;font-weight:600;cursor:pointer;color:#09090b">Hover Me</button>
  <div class="tooltip-box">View full details</div>
</div>`,

    "cyber-badge": `<!-- Cyber Badge -->
<style>
.cyber-badge { background: rgba(225,29,72,0.15); border: 1px solid rgba(225,29,72,0.3); color: #fda4af; padding: 8px 16px; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; display: inline-flex; align-items: center; gap: 8px; font-family: sans-serif; }
.pulse-dot { width: 8px; height: 8px; background: #e11d48; border-radius: 50%; box-shadow: 0 0 10px #e11d48; animation: pingDot 1.5s infinite ease-out; }
@keyframes pingDot { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(3); opacity: 0; } }
</style>
<div class="cyber-badge"><span class="pulse-dot"></span>System Active</div>`,

    "progress-bar": `<!-- Progress Bar -->
<div style="width:100%;max-width:300px;height:8px;background:#e4e4e7;border-radius:99px;overflow:hidden;position:relative">
  <div style="position:absolute;left:0;top:0;height:100%;width:65%;background:#e11d48;border-radius:99px;transition:width 1s ease"></div>
</div>`,

    "minimal-accordion": `<!-- Minimal Accordion -->
<style>
.mini-accordion { width: 100%; max-width: 300px; background: white; border: 1px solid #e4e4e7; border-radius: 16px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-family: sans-serif; cursor: pointer; color: #09090b; }
.mini-accordion:hover { background: #f4f4f5; }
.mini-accordion:hover svg { transform: rotate(180deg); }
</style>
<div class="mini-accordion">
  <span>Module Settings</span>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.3s"><polyline points="6 9 12 15 18 9"/></svg>
</div>`,

    "gradient-text": `<!-- Gradient Text -->
<style>
.gradient-hover-text { font-size: 3rem; font-weight: 900; letter-spacing: -2px; color: #09090b; cursor: pointer; font-family: sans-serif; display: inline-block; }
.gradient-hover-text:hover { background: linear-gradient(90deg, #f43f5e, #9f1239); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
</style>
<h2 class="gradient-hover-text">Interact.</h2>`,

    "flip-text": `<!-- Flip Text -->
<style>
.flip-text-wrapper { display: flex; gap: 12px; perspective: 600px; }
.flip-word { font-size: 2.2rem; font-weight: 900; color: #ffffff; display: inline-block; transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s; transform-style: preserve-3d; cursor: default; }
.flip-word:hover { transform: rotateX(360deg); color: #e11d48; }
</style>
<div class="flip-text-wrapper">
  <span class="flip-word">Create.</span>
  <span class="flip-word">Design.</span>
  <span class="flip-word">Deploy.</span>
</div>`,

    "spotlight-card": `<!-- Spotlight Card -->
<style>
.spotlight-card { position: relative; overflow: hidden; background: #fafafa; border: 1px solid #e4e4e7; border-radius: 24px; padding: 40px; text-align: center; cursor: crosshair; }
.spotlight-beam { position: absolute; inset: 0; background: radial-gradient(circle 120px at var(--mx, 50%) var(--my, 50%), rgba(225,29,72,0.25), transparent 60%); opacity: 0; transition: opacity 0.3s; z-index: 1; pointer-events: none; }
.spotlight-card:hover .spotlight-beam { opacity: 1; }
</style>
<div class="spotlight-card" onmousemove="const r=this.getBoundingClientRect();this.style.setProperty('--mx',(event.clientX-r.left)+'px');this.style.setProperty('--my',(event.clientY-r.top)+'px')">
  <div class="spotlight-beam"></div>
  <div style="position:relative;z-index:2;font-size:2.5rem;font-weight:900">✦</div>
  <div style="position:relative;z-index:2;font-size:0.85rem;font-weight:600;color:#888;margin-top:8px">Hover to reveal</div>
</div>`,

    "glass-dock": `<!-- Glass Dock -->
<style>
.glass-dock { display: flex; align-items: flex-end; gap: 4px; background: rgba(255,255,255,0.12); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 10px 14px; }
.dock-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; border-radius: 12px; background: rgba(255,255,255,0.08); transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: pointer; }
.dock-icon:hover { transform: translateY(-12px) scale(1.35); background: rgba(255,255,255,0.18); }
</style>
<div class="glass-dock">
  <div class="dock-icon">🏠</div>
  <div class="dock-icon">🔍</div>
  <div class="dock-icon">⚙️</div>
  <div class="dock-icon">👤</div>
  <div class="dock-icon">☰</div>
</div>`,

    "magnetic-btn": `<!-- Magnetic Button -->
<style>
.magnetic-btn { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #e11d48, #9f1239); color: white; border: none; padding: 18px 36px; border-radius: 16px; font-size: 1.05rem; font-weight: 700; cursor: pointer; font-family: sans-serif; position: relative; overflow: hidden; box-shadow: 0 8px 30px rgba(225,29,72,0.3); }
.magnetic-btn::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle 60px at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.25), transparent 60%); opacity: 0; transition: opacity 0.3s; }
.magnetic-btn:hover::before { opacity: 1; }
</style>
<button class="magnetic-btn" onmousemove="const r=this.getBoundingClientRect();this.style.setProperty('--mx',(event.clientX-r.left)+'px');this.style.setProperty('--my',(event.clientY-r.top)+'px')">
  <span>Get Started</span>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
</button>`,

    "tilt-card": `<!-- 3D Tilt Card -->
<style>
.tilt-card-demo { width: 140px; height: 180px; background: linear-gradient(145deg, #1c1c1f, #09090b); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 10px 40px rgba(0,0,0,0.3); }
.tilt-card-demo:hover { transform: rotateY(8deg) rotateX(-5deg) scale(1.05); box-shadow: 0 20px 60px rgba(225,29,72,0.2); }
.tilt-shine { position: absolute; inset: 0; background: linear-gradient(135deg, transparent 30%, rgba(225,29,72,0.15) 50%, transparent 70%); opacity: 0; transition: opacity 0.4s; z-index: 1; }
.tilt-card-demo:hover .tilt-shine { opacity: 1; }
</style>
<div class="tilt-card-demo">
  <div class="tilt-shine"></div>
  <div style="position:relative;z-index:2;text-align:center">
    <div style="font-size:1.5rem;font-weight:800;color:white">PRO</div>
    <div style="font-size:0.75rem;font-weight:500;color:rgba(255,255,255,0.6);margin-top:4px">$29/mo</div>
  </div>
</div>`,

    "typewriter": `<!-- Typewriter Effect -->
<style>
.typewriter-text { font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; font-weight: 500; color: #fda4af; display: flex; align-items: center; gap: 2px; }
.tw-cursor { color: #e11d48; animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
</style>
<div class="typewriter-text">
  <span style="color:rgba(255,255,255,0.4)">$</span>
  <span id="tw"></span>
  <span class="tw-cursor">|</span>
</div>
<script>
const phrases=['npm install obsidian-ui','npx create-app@latest','git push origin main'];
let pi=0,ci=0,del=false;const out=document.getElementById('tw');
function type(){const p=phrases[pi];if(!del){out.textContent=p.slice(0,++ci);if(ci===p.length){del=true;setTimeout(type,1500);return}}else{out.textContent=p.slice(0,--ci);if(ci===0){del=false;pi=(pi+1)%phrases.length}}setTimeout(type,del?40:80)}type();
</script>`,
};

export const componentNames: Record<string, string> = {
    "crimson-ring": "Activity Ring",
    "velvet-pass": "Velvet Pass",
    "sonar-button": "Sonar Button",
    "skeleton-loader": "Ghost Loading",
    "pill-switch": "Premium Switch",
    "stat-card": "Stat Trend",
    "avatar-ring": "Spinning Avatar",
    "glass-tooltip": "Glass Tooltip",
    "cyber-badge": "Cyber Badge",
    "progress-bar": "Progress Bar",
    "minimal-accordion": "Minimal Accordion",
    "gradient-text": "Gradient Text",
    "flip-text": "Flip Text",
    "spotlight-card": "Spotlight",
    "glass-dock": "Glass Dock",
    "magnetic-btn": "Magnetic Button",
    "tilt-card": "3D Tilt Card",
    "typewriter": "Typewriter",
};
