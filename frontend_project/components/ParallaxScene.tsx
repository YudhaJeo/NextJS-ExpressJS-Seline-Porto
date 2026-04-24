"use client";
/**
 * ParallaxScene.tsx
 * ─────────────────────────────────────────────────────────────────
 * Cyberpunk / Retro-Future parallax container.
 *
 * HOW TO USE
 * ----------
 * Wrap any page content inside <ParallaxScene>:
 *
 *   import ParallaxScene from "@/components/ParallaxScene";
 *
 *   export default function Home() {
 *     return (
 *       <ParallaxScene>
 *         <Navbar />
 *         <HeroSection />
 *         ...
 *       </ParallaxScene>
 *     );
 *   }
 *
 * The component exposes a CSS custom-property --tilt-x / --tilt-y
 * (clamped ±15°) on every descendant with [data-tilt] so you can
 * add the mouse-tilt to any card without extra JS:
 *
 *   <div
 *     data-tilt
 *     style={{ transform: "perspective(800px) rotateX(var(--tilt-y,0deg)) rotateY(var(--tilt-x,0deg))" }}
 *   />
 *
 * ─────────────────────────────────────────────────────────────────
 * LAYER ARCHITECTURE
 * ─────────────────────────────────────────────────────────────────
 *  z-0   Layer 1 – BG:         Grid + radial gradients  (slowest, 4 % of mouse)
 *  z-1   Layer 2 – Mid:        Floating code fragments  (medium, 10 % of mouse)
 *  z-2   Layer 3 – FG:         Glitch particles + orbs  (fastest, 18 % of mouse)
 *  z-10  Content slot          Your existing components live here
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useCallback, useState } from "react";

/* ── tuneable constants ──────────────────────────────────────────── */
const MOUSE_FACTOR  = { bg: 0.04, mid: 0.10, fg: 0.18 }; // fraction of half-viewport
const SCROLL_FACTOR = { bg: 0.06, mid: 0.14, fg: 0.22 }; // px per scrollY px
const TILT_MAX      = 15;   // degrees
const SPRING        = 0.08; // lerp coefficient (lower = more lag/depth)

/* ── types ───────────────────────────────────────────────────────── */
interface Vec2 { x: number; y: number }

/* ── code-fragment data ──────────────────────────────────────────── */
const CODE_FRAGMENTS = [
  "> BOOT SEQUENCE INIT",
  "0xDEADBEEF",
  "[ OK ] SYS_CORE",
  "NULL PTR EXCEPTION",
  "for(;;){dream();}",
  "import { soul } from 'void'",
  "SIGNAL_9 RECEIVED",
  "0b10011010",
  "git push origin dark",
  "chmod 777 mind.exe",
  "> NEURAL NET ONLINE",
  "KERNEL PANIC – NOT SYNCING",
  "sudo rm -rf /fears",
  "void* consciousness",
  "> ACCESS GRANTED",
];

/* seeded random so SSR & client agree */
function seededRand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface FragmentDef {
  id: number;
  text: string;
  top: string;
  left: string;
  opacity: number;
  fontSize: string;
  color: string;
  duration: string;
  delay: string;
  drift: string;   // translateX for float anim
}

const FRAGMENTS: FragmentDef[] = CODE_FRAGMENTS.map((text, i) => {
  const r = (o: number) => seededRand(i * 31 + o);
  return {
    id:       i,
    text,
    top:      `${(r(1) * 90).toFixed(2)}%`,
    left:     `${(r(2) * 90).toFixed(2)}%`,
    opacity:  +(r(3) * 0.25 + 0.05).toFixed(3),
    fontSize: `${(r(4) * 0.35 + 0.45).toFixed(2)}rem`,
    color:    r(5) > 0.6 ? "#c77dff" : r(5) > 0.3 ? "#7efff5" : "#ff6ef7",
    duration: `${(r(6) * 10 + 12).toFixed(1)}s`,
    delay:    `${-(r(7) * 12).toFixed(1)}s`,
    drift:    `${(r(8) * 30 - 15).toFixed(1)}px`,
  };
});

/* ── glitch-particle data ────────────────────────────────────────── */
interface ParticleDef {
  id: number;
  top: string;
  left: string;
  size: string;
  color: string;
  blur: string;
  duration: string;
  delay: string;
}

const PARTICLES: ParticleDef[] = Array.from({ length: 28 }, (_, i) => {
  const r = (o: number) => seededRand(i * 17 + o + 200);
  const palette = ["#9d4edd", "#c77dff", "#ff6ef7", "#7efff5", "#ffd166"];
  const col = palette[Math.floor(r(5) * palette.length)];
  return {
    id:       i,
    top:      `${(r(1) * 100).toFixed(2)}%`,
    left:     `${(r(2) * 100).toFixed(2)}%`,
    size:     `${(r(3) * 6 + 2).toFixed(1)}px`,
    color:    col,
    blur:     `${(r(4) * 12 + 4).toFixed(1)}px`,
    duration: `${(r(6) * 8 + 6).toFixed(1)}s`,
    delay:    `${-(r(7) * 8).toFixed(1)}s`,
  };
});

/* ── helper: lerp ────────────────────────────────────────────────── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ══════════════════════════════════════════════════════════════════ */
export default function ParallaxScene({ children }: { children: React.ReactNode }) {

  /* current displayed positions (lerp targets) */
  const bgPos  = useRef<Vec2>({ x: 0, y: 0 });
  const midPos = useRef<Vec2>({ x: 0, y: 0 });
  const fgPos  = useRef<Vec2>({ x: 0, y: 0 });
  const tilt   = useRef<Vec2>({ x: 0, y: 0 });

  /* raw targets set by events */
  const targetBg  = useRef<Vec2>({ x: 0, y: 0 });
  const targetMid = useRef<Vec2>({ x: 0, y: 0 });
  const targetFg  = useRef<Vec2>({ x: 0, y: 0 });
  const targetTilt= useRef<Vec2>({ x: 0, y: 0 });
  const scrollY   = useRef(0);

  /* DOM refs */
  const bgRef  = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef  = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  /* tilt data-attribute elements */
  const [mounted, setMounted] = useState(false);

  /* ── mouse handler ─────────────────────────────────────────────── */
  const onMouseMove = useCallback((e: MouseEvent) => {
    const hw = window.innerWidth  / 2;
    const hh = window.innerHeight / 2;
    const nx =  (e.clientX - hw) / hw; // −1 … +1
    const ny = -(e.clientY - hh) / hh; // −1 … +1 (inverted for natural feel)

    targetBg.current  = { x: nx * hw * MOUSE_FACTOR.bg,  y: ny * hh * MOUSE_FACTOR.bg  };
    targetMid.current = { x: nx * hw * MOUSE_FACTOR.mid, y: ny * hh * MOUSE_FACTOR.mid };
    targetFg.current  = { x: nx * hw * MOUSE_FACTOR.fg,  y: ny * hh * MOUSE_FACTOR.fg  };
    targetTilt.current = {
      x:  nx * TILT_MAX,
      y: -ny * TILT_MAX,
    };
  }, []);

  /* ── scroll handler ────────────────────────────────────────────── */
  const onScroll = useCallback(() => {
    scrollY.current = window.scrollY;
  }, []);

  /* ── RAF loop ──────────────────────────────────────────────────── */
  const tick = useCallback(() => {
    const sy = scrollY.current;

    /* lerp towards targets */
    bgPos.current.x  = lerp(bgPos.current.x,  targetBg.current.x,  SPRING);
    bgPos.current.y  = lerp(bgPos.current.y,  targetBg.current.y,  SPRING);
    midPos.current.x = lerp(midPos.current.x, targetMid.current.x, SPRING);
    midPos.current.y = lerp(midPos.current.y, targetMid.current.y, SPRING);
    fgPos.current.x  = lerp(fgPos.current.x,  targetFg.current.x,  SPRING);
    fgPos.current.y  = lerp(fgPos.current.y,  targetFg.current.y,  SPRING);
    tilt.current.x   = lerp(tilt.current.x,   targetTilt.current.x, SPRING);
    tilt.current.y   = lerp(tilt.current.y,   targetTilt.current.y, SPRING);

    /* scroll offset stacked on top of mouse offset */
    const bx = bgPos.current.x,  by = bgPos.current.y  - sy * SCROLL_FACTOR.bg;
    const mx = midPos.current.x, my = midPos.current.y - sy * SCROLL_FACTOR.mid;
    const fx = fgPos.current.x,  fy = fgPos.current.y  - sy * SCROLL_FACTOR.fg;

    /* apply transforms (translate3d forces GPU compositing) */
    if (bgRef.current)
      bgRef.current.style.transform = `translate3d(${bx.toFixed(2)}px,${by.toFixed(2)}px,0)`;
    if (midRef.current)
      midRef.current.style.transform = `translate3d(${mx.toFixed(2)}px,${my.toFixed(2)}px,0)`;
    if (fgRef.current)
      fgRef.current.style.transform = `translate3d(${fx.toFixed(2)}px,${fy.toFixed(2)}px,0)`;

    /* tilt on [data-tilt] elements */
    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
      el.style.setProperty("--tilt-x", `${tilt.current.x.toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${tilt.current.y.toFixed(2)}deg`);
      el.style.transform =
        `perspective(900px) rotateX(${(-tilt.current.y).toFixed(2)}deg) rotateY(${tilt.current.x.toFixed(2)}deg)`;
    });

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    setMounted(true);
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!pref) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("scroll",    onScroll,    { passive: true });
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll",    onScroll);
    };
  }, [onMouseMove, onScroll, tick]);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#07000f" }}>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 1 – BACKGROUND  (grid + gradients)
          Slowest – gives the "deep horizon" feel
      ══════════════════════════════════════════════════════════════ */}
      <div
        ref={bgRef}
        aria-hidden
        style={{
          position:   "fixed",
          inset:      "-15%",          /* oversized so edges never show */
          zIndex:     0,
          willChange: "transform",
          pointerEvents: "none",
        }}
      >
        {/* Perspective grid – slight vanishing-point illusion via CSS */}
        <div style={{
          position:        "absolute",
          inset:           0,
          backgroundImage: `
            linear-gradient(rgba(157,78,221,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(157,78,221,0.07) 1px, transparent 1px)
          `,
          backgroundSize:  "44px 44px",
          /* subtle CSS perspective on the grid itself */
          transform:       "perspective(900px) rotateX(2deg)",
          transformOrigin: "50% 0",
        }} />

        {/* Radial blobs */}
        <div style={{ position:"absolute", top:"20%",  left:"55%",  width:"800px", height:"800px", borderRadius:"50%", background:"radial-gradient(circle,rgba(157,78,221,0.14) 0%,transparent 70%)", transform:"translate(-50%,-50%)" }} />
        <div style={{ position:"absolute", top:"65%",  left:"15%",  width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle,rgba(255,110,247,0.07) 0%,transparent 70%)" }} />
        <div style={{ position:"absolute", top:"10%",  left:"10%",  width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle,rgba(126,255,245,0.04) 0%,transparent 70%)" }} />
        <div style={{ position:"absolute", top:"80%",  left:"75%",  width:"360px", height:"360px", borderRadius:"50%", background:"radial-gradient(circle,rgba(157,78,221,0.09) 0%,transparent 70%)" }} />

        {/* Scanline */}
        <div style={{
          position:   "absolute", inset: 0,
          background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)",
          mixBlendMode: "multiply",
        }} />
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 2 – MIDDLE  (floating code fragments)
      ══════════════════════════════════════════════════════════════ */}
      <div
        ref={midRef}
        aria-hidden
        style={{
          position:   "fixed",
          inset:      "-15%",
          zIndex:     1,
          willChange: "transform",
          pointerEvents: "none",
        }}
      >
        {mounted && FRAGMENTS.map((f) => (
          <span
            key={f.id}
            style={{
              position:   "absolute",
              top:        f.top,
              left:       f.left,
              fontFamily: "var(--font-mono, 'Share Tech Mono', monospace)",
              fontSize:   f.fontSize,
              color:      f.color,
              opacity:    f.opacity,
              whiteSpace: "nowrap",
              textShadow: `0 0 10px ${f.color}`,
              animation:  `fragFloat ${f.duration} ${f.delay} ease-in-out infinite`,
              userSelect: "none",
            }}
          >
            {f.text}
          </span>
        ))}

        {/* Diagonal neon lines */}
        {mounted && [0,1,2,3].map((i) => (
          <div
            key={i}
            style={{
              position:  "absolute",
              top:       `${20 + i * 20}%`,
              left:      "-5%",
              width:     "110%",
              height:    "1px",
              background:`linear-gradient(90deg,transparent,rgba(157,78,221,${0.05 + i * 0.02}),transparent)`,
              transform: `rotate(${-2 + i * 1.5}deg)`,
              boxShadow: "0 0 6px rgba(157,78,221,0.2)",
            }}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 3 – FOREGROUND  (glitch particles + orbs)
          Fastest – creates the "closest" depth illusion
      ══════════════════════════════════════════════════════════════ */}
      <div
        ref={fgRef}
        aria-hidden
        style={{
          position:   "fixed",
          inset:      "-15%",
          zIndex:     2,
          willChange: "transform",
          pointerEvents: "none",
        }}
      >
        {mounted && PARTICLES.map((p) => (
          <div
            key={p.id}
            style={{
              position:     "absolute",
              top:          p.top,
              left:         p.left,
              width:        p.size,
              height:       p.size,
              borderRadius: "50%",
              background:   p.color,
              boxShadow:    `0 0 ${p.blur} ${p.color}`,
              animation:    `particlePulse ${p.duration} ${p.delay} ease-in-out infinite`,
            }}
          />
        ))}

        {/* Large soft orbs */}
        <div style={{ position:"absolute", top:"40%", left:"80%", width:"180px", height:"180px", borderRadius:"50%", background:"rgba(255,110,247,0.04)", filter:"blur(40px)", animation:"orbDrift 18s -4s ease-in-out infinite" }} />
        <div style={{ position:"absolute", top:"70%", left:"5%",  width:"220px", height:"220px", borderRadius:"50%", background:"rgba(157,78,221,0.05)", filter:"blur(50px)", animation:"orbDrift 22s -10s ease-in-out infinite reverse" }} />

        {/* Corner accent brackets */}
        {mounted && (
          <>
            <div style={{ position:"fixed", top:"80px", left:"24px",  width:"30px", height:"30px", borderTop:"1px solid rgba(157,78,221,0.35)", borderLeft:"1px solid rgba(157,78,221,0.35)" }} />
            <div style={{ position:"fixed", top:"80px", right:"24px", width:"30px", height:"30px", borderTop:"1px solid rgba(157,78,221,0.35)", borderRight:"1px solid rgba(157,78,221,0.35)" }} />
            <div style={{ position:"fixed", bottom:"24px", left:"24px",  width:"30px", height:"30px", borderBottom:"1px solid rgba(157,78,221,0.35)", borderLeft:"1px solid rgba(157,78,221,0.35)" }} />
            <div style={{ position:"fixed", bottom:"24px", right:"24px", width:"30px", height:"30px", borderBottom:"1px solid rgba(157,78,221,0.35)", borderRight:"1px solid rgba(157,78,221,0.35)" }} />
          </>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          CONTENT SLOT  (your existing components)
      ══════════════════════════════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {children}
      </div>

      {/* ═══════════════════════════════════════════════════════════
          KEYFRAMES
      ══════════════════════════════════════════════════════════════ */}
      <style>{`
        @keyframes fragFloat {
          0%,100% { transform: translateY(0px) translateX(0px);   opacity: inherit; }
          33%     { transform: translateY(-18px) translateX(8px);  }
          66%     { transform: translateY(10px) translateX(-6px);  }
        }
        @keyframes particlePulse {
          0%,100% { opacity: 0.15; transform: scale(1); }
          50%     { opacity: 0.7;  transform: scale(1.6); }
        }
        @keyframes orbDrift {
          0%,100% { transform: translate(0,0); }
          50%     { transform: translate(30px, -25px); }
        }
      `}</style>
    </div>
  );
}