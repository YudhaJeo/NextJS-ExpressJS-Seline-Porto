// components/HeroSection.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TAGLINE = "BUILDING WORLDS WITH CODE, ART, AND IMAGINATION";

// Pre-computed orbit positions (no Math.sin/cos at render time)
const ORBIT_DOTS = [
  { deg: 0,   color: "#c77dff" },
  { deg: 72,  color: "#ff6ef7" },
  { deg: 144, color: "#7efff5" },
  { deg: 216, color: "#ffd166" },
  { deg: 288, color: "#c77dff" },
].map(({ deg, color }) => ({
  color,
  top:  `calc(50% + ${+(Math.sin((deg * Math.PI) / 180) * 195).toFixed(3)}px - 2.5px)`,
  left: `calc(50% + ${+(Math.cos((deg * Math.PI) / 180) * 195).toFixed(3)}px - 2.5px)`,
}));

export default function HeroSection() {
  const [displayed, setDisplayed] = useState("");
  const [cursor,    setCursor]    = useState(true);
  // ✅ FIX: orbit dots hanya dirender di client
  const [showOrbit, setShowOrbit] = useState(false);
  const idxRef = useRef(0);

  // Typewriter
  useEffect(() => {
    const iv = setInterval(() => {
      if (idxRef.current < TAGLINE.length) {
        setDisplayed(TAGLINE.slice(0, idxRef.current + 1));
        idxRef.current++;
      } else clearInterval(iv);
    }, 50);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setCursor((v) => !v), 600);
    return () => clearInterval(iv);
  }, []);

  // ✅ FIX: render orbit dots setelah mount (client-only)
  useEffect(() => {
    setShowOrbit(true);
  }, []);

  // Parallax refs
  const gridRef  = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pref) return;
    let raf: number;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sy = window.scrollY;
        if (gridRef.current)  gridRef.current.style.transform  = `translateY(${sy * 0.06}px)`;
        if (glowRef.current)  glowRef.current.style.transform  = `translate(-50%,-50%) translateY(${sy * 0.14}px)`;
        if (photoRef.current) photoRef.current.style.transform = `translateY(${sy * 0.15}px)`;
        if (ringsRef.current) ringsRef.current.style.transform = `translateY(${sy * -0.04}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);

  const ripple = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r  = el.getBoundingClientRect();
    const span = document.createElement("span");
    span.className = "ripple";
    Object.assign(span.style, {
      left: `${e.clientX - r.left - 5}px`,
      top:  `${e.clientY - r.top - 5}px`,
      width: "10px", height: "10px",
      position: "absolute", borderRadius: "50%",
      background: "rgba(199,125,255,0.35)",
      transform: "scale(0)",
      animation: "rippleAnim 0.55s linear forwards",
      pointerEvents: "none",
    });
    el.appendChild(span);
    setTimeout(() => span.remove(), 600);
  };

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px 24px 0", position: "relative", overflow: "hidden" }}>

      {/* BG grid */}
      <div ref={gridRef} aria-hidden style={{ position: "absolute", inset: "-10%", backgroundImage: "linear-gradient(rgba(157,78,221,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(157,78,221,0.05) 1px,transparent 1px)", backgroundSize: "40px 40px", zIndex: 0, willChange: "transform" }} />

      {/* Radial glow */}
      <div ref={glowRef} aria-hidden style={{ position: "absolute", top: "30%", left: "55%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle,rgba(157,78,221,0.18) 0%,transparent 70%)", transform: "translate(-50%,-50%)", zIndex: 0, pointerEvents: "none", willChange: "transform" }} />
      <div aria-hidden style={{ position: "absolute", top: "60%", left: "8%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,110,247,0.07) 0%,transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px", position: "relative", zIndex: 3 }}>

        {/* LEFT */}
        <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", background: "rgba(60,9,108,0.4)", border: "1px solid rgba(157,78,221,0.5)", borderRadius: "2px", marginBottom: "28px", animation: "fadeInUp 0.6s 0.1s both" }}>
            <span style={{ width: "6px", height: "6px", background: "#7efff5", boxShadow: "0 0 8px #7efff5", borderRadius: "50%", animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: "0.45rem", color: "#7efff5", letterSpacing: "0.15em", textShadow: "0 0 8px #7efff5" }}>AVAILABLE FOR COLLAB</span>
          </div>

          <div style={{ marginBottom: "12px", animation: "fadeInUp 0.6s 0.2s both" }}>
            <div style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(0.6rem,2vw,0.85rem)", color: "#9b7fbf", letterSpacing: "0.25em", marginBottom: "8px" }}>HELLO, I'M</div>
            <h1 className="glitch-wrap" data-text="JESSELINE" style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(1.6rem,5vw,3rem)", color: "#fff", lineHeight: 1.4, display: "block", textShadow: "0 0 20px #c77dff, 0 0 50px rgba(157,78,221,0.5), 3px 3px 0 #3c096c", letterSpacing: "0.05em" }}>JESSELINE</h1>
            <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(1rem,3vw,1.6rem)", color: "#c77dff", lineHeight: 1.6, textShadow: "0 0 15px rgba(199,125,255,0.7)", letterSpacing: "0.08em" }}>RONIAR</h2>
          </div>

          <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(0.65rem,1.5vw,0.85rem)", color: "#9b7fbf", marginBottom: "28px", letterSpacing: "0.08em", minHeight: "1.5em", animation: "fadeInUp 0.6s 0.3s both" }}>
            <span style={{ color: "#7efff5" }}>&gt; </span>{displayed}
            {cursor && <span style={{ display: "inline-block", width: "8px", height: "1em", background: "#c77dff", marginLeft: "2px", verticalAlign: "text-bottom", boxShadow: "0 0 8px #9d4edd" }} />}
          </div>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "#b89fd4", lineHeight: 1.8, marginBottom: "36px", maxWidth: "480px", borderLeft: "2px solid rgba(157,78,221,0.5)", paddingLeft: "16px", animation: "fadeInUp 0.6s 0.4s both" }}>
            Hi! I'm Jess, a PPLG student specializing in game development and web programming. I combine technical skills with a creative visual side to build engaging digital experiences.
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", animation: "fadeInUp 0.6s 0.5s both" }}>
            <a href="#about" className="btn-pixel" onClick={ripple} style={{ display: "inline-block", padding: "12px 24px", background: "rgba(157,78,221,0.3)", border: "1px solid #9d4edd", borderRadius: "2px", color: "#fff", textDecoration: "none", fontFamily: "var(--font-pixel)", fontSize: "0.5rem", letterSpacing: "0.1em", boxShadow: "0 0 20px rgba(157,78,221,0.3)" }}>▼ ABOUT ME</a>
            <a href="/skills" className="btn-pixel" onClick={ripple} style={{ display: "inline-block", padding: "12px 24px", background: "transparent", border: "1px solid rgba(157,78,221,0.4)", borderRadius: "2px", color: "#c77dff", textDecoration: "none", fontFamily: "var(--font-pixel)", fontSize: "0.5rem", letterSpacing: "0.1em" }}>→ CORE SKILLS</a>
          </div>
        </div>

        {/* RIGHT: Photo */}
        <div ref={photoRef} style={{ flex: "0 0 auto", position: "relative", display: "flex", justifyContent: "center", willChange: "transform", animation: "fadeInUp 0.7s 0.3s both" }}>

          {/* Rings layer */}
          <div ref={ringsRef} aria-hidden style={{ position: "absolute", inset: 0, willChange: "transform" }}>
            <div style={{ position: "absolute", width: "400px", height: "400px", border: "1px solid rgba(157,78,221,0.18)", borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "heroSpin 22s linear infinite" }} />
            <div style={{ position: "absolute", width: "310px", height: "310px", border: "1px dashed rgba(199,125,255,0.1)", borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "heroSpin 15s linear infinite reverse" }} />

            {/* ✅ FIX: orbit dots hanya muncul setelah client mount */}
            {showOrbit && ORBIT_DOTS.map((dot, i) => (
              <div
                key={i}
                aria-hidden
                style={{
                  position:     "absolute",
                  width:        "5px",
                  height:       "5px",
                  background:   dot.color,
                  boxShadow:    `0 0 8px ${dot.color}`,
                  borderRadius: "50%",
                  top:          dot.top,
                  left:         dot.left,
                }}
              />
            ))}
          </div>

          {/* Photo card */}
          <div
            className="corner-box float"
            style={{ width: "350px", height: "430px", position: "relative", background: "rgba(13,0,24,0.8)", border: "1px solid rgba(157,78,221,0.4)", boxShadow: "0 0 40px rgba(157,78,221,0.2)", overflow: "hidden", padding: "6px", transition: "box-shadow 0.3s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 70px rgba(157,78,221,0.45), 0 0 120px rgba(157,78,221,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 40px rgba(157,78,221,0.2)"; }}
          >
            <span aria-hidden />
            <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "rgba(60,9,108,0.3)" }}>
              <Image
                src="/Seline-Edited-1.png"
                alt="Jesseline Roniar"
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                quality={90}
                priority
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
              <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(60,9,108,0.6) 0%,transparent 50%)", pointerEvents: "none" }} />
            </div>
            <div style={{ position: "absolute", bottom: "12px", left: "12px", right: "12px", background: "rgba(7,0,15,0.85)", border: "1px solid rgba(157,78,221,0.4)", padding: "8px 12px", backdropFilter: "blur(4px)" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.45rem", color: "#ff6ef7", letterSpacing: "0.1em", marginBottom: "3px" }}>PLAYER_01</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#c77dff" }}>Jess // Game Dev</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", zIndex: 3 }}>
        <span style={{ fontFamily: "var(--font-pixel)", fontSize: "0.35rem", color: "#9b7fbf", letterSpacing: "0.15em" }}>SCROLL</span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom,#9d4edd,transparent)", animation: "pulse 2s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes heroSpin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes pulse { 0%,100%{opacity:0.4}50%{opacity:1} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)} }
        @keyframes rippleAnim { to{transform:scale(4);opacity:0} }
      `}</style>
    </section>
  );
}