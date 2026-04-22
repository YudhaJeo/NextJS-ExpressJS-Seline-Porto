// components/Footer.tsx
"use client";
import { useEffect, useState } from "react";

const ASCII_JESS = `
     ██╗███████╗███████╗███████╗
     ██║██╔════╝██╔════╝██╔════╝
     ██║█████╗  ███████╗███████╗
██   ██║██╔══╝  ╚════██║╚════██║
╚█████╔╝███████╗███████║███████║
 ╚════╝ ╚══════╝╚══════╝╚══════╝`.trim();

const LINKS = {
  Navigate: [
    { label: "Home",        href: "/#home" },
    { label: "About Me",    href: "/#about" },
    { label: "Core Skills", href: "/skills#skills" },
    { label: "Contact",     href: "/skills#contact" },
  ],
  Connect: [
    { label: "GitHub",    href: "https://github.com/" },
    { label: "WhatsApp",  href: "https://wa.me/6285213988015" },
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Email",     href: "mailto:hello@jess.dev" },
  ],
};

function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <style>{`
        @keyframes glitch-1 {
          0%,100% { clip-path: inset(0 0 100% 0); transform: translate(-2px, 0); }
          20%      { clip-path: inset(20% 0 60% 0); }
          40%      { clip-path: inset(50% 0 30% 0); transform: translate(2px, 0); }
          60%      { clip-path: inset(80% 0 5% 0); }
          80%      { clip-path: inset(10% 0 80% 0); transform: translate(-1px, 0); }
        }
        @keyframes glitch-2 {
          0%,100% { clip-path: inset(0 0 100% 0); transform: translate(2px, 0); }
          20%      { clip-path: inset(60% 0 20% 0); }
          40%      { clip-path: inset(30% 0 50% 0); transform: translate(-2px, 0); }
          60%      { clip-path: inset(5% 0 80% 0); }
          80%      { clip-path: inset(80% 0 10% 0); transform: translate(1px, 0); }
        }
        @keyframes scanline-move {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink-cursor {
          0%,100% { opacity: 1; }
          50%     { opacity: 0; }
        }
        @keyframes flicker {
          0%,19%,21%,23%,25%,54%,56%,100% { opacity: 1; }
          20%,22%,24%,55% { opacity: 0.4; }
        }
        @keyframes data-stream {
          0%   { transform: translateY(0); opacity: 0.6; }
          100% { transform: translateY(-120px); opacity: 0; }
        }
      `}</style>
      {text}
      {glitch && (
        <>
          <span aria-hidden style={{
            position: "absolute", inset: 0,
            color: "#ff6ef7",
            animation: "glitch-1 0.15s steps(1) forwards",
          }}>{text}</span>
          <span aria-hidden style={{
            position: "absolute", inset: 0,
            color: "#7efff5",
            animation: "glitch-2 0.15s steps(1) forwards",
          }}>{text}</span>
        </>
      )}
    </span>
  );
}

function DataStream() {
  const chars = "01アイウエオカキクケコ∂∑∏√∞≠≈∫";
  const streams = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${10 + i * 11}%`,
    delay: `${i * 0.4}s`,
    char: chars[Math.floor(Math.random() * chars.length)],
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {streams.map((s) => (
        <div
          key={s.id}
          style={{
            position:   "absolute",
            bottom:     "0",
            left:       s.left,
            fontFamily: "var(--font-mono)",
            fontSize:   "0.6rem",
            color:      "rgba(126,255,245,0.15)",
            animation:  `data-stream 3s linear ${s.delay} infinite`,
            userSelect: "none",
          }}
        >
          {Array.from({ length: 6 }, (_, j) => (
            <div key={j}>{chars[(s.id * 3 + j) % chars.length]}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ position: "relative", background: "#04000a", borderTop: "1px solid rgba(157,78,221,0.25)", overflow: "hidden" }}>

      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(157,78,221,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(157,78,221,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }} />

      {/* Top neon bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, transparent, #9d4edd 20%, #ff6ef7 50%, #7efff5 80%, transparent)",
        boxShadow: "0 0 20px rgba(157,78,221,0.6), 0 0 40px rgba(255,110,247,0.3)",
      }} />

      <DataStream />

      <div style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "60px 32px 0" }}>

        {/* ASCII art + tagline */}
        <div style={{ marginBottom: "48px", borderBottom: "1px solid rgba(157,78,221,0.15)", paddingBottom: "40px", textAlign: "center" }}>
          <pre style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "clamp(0.3rem, 1.2vw, 0.55rem)",
            lineHeight:    1.3,
            color:         "#9d4edd",
            textShadow:    "0 0 10px rgba(157,78,221,0.6), 0 0 20px rgba(157,78,221,0.3)",
            margin:        "0 auto",
            letterSpacing: "0.05em",
            animation:     "flicker 8s ease-in-out infinite",
            display:       "inline-block",
          }}>
            {ASCII_JESS}
          </pre>
        </div>

        {/* Link columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "40px", marginBottom: "48px" }}>
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <div style={{
                fontFamily:    "var(--font-pixel)",
                fontSize:      "0.4rem",
                color:         "#ff6ef7",
                letterSpacing: "0.2em",
                marginBottom:  "18px",
                textShadow:    "0 0 8px rgba(255,110,247,0.5)",
              }}>
                // {category.toUpperCase()}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    style={{
                      fontFamily:     "var(--font-mono)",
                      fontSize:       "0.8rem",
                      color:          "#b89fd4",
                      textDecoration: "none",
                      display:        "flex",
                      alignItems:     "center",
                      gap:            "8px",
                      transition:     "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#c77dff";
                      e.currentTarget.style.textShadow = "0 0 8px rgba(199,125,255,0.5)";
                      e.currentTarget.style.paddingLeft = "6px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#b89fd4";
                      e.currentTarget.style.textShadow = "none";
                      e.currentTarget.style.paddingLeft = "0";
                    }}
                  >
                    <span style={{ color: "rgba(157,78,221,0.5)", fontSize: "0.6rem" }}>▸</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Status panel */}
          <div>
            <div style={{
              fontFamily:    "var(--font-pixel)",
              fontSize:      "0.4rem",
              color:         "#ff6ef7",
              letterSpacing: "0.2em",
              marginBottom:  "18px",
              textShadow:    "0 0 8px rgba(255,110,247,0.5)",
            }}>
              // SYSTEM.STATUS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Portfolio",  status: "ONLINE",  color: "#7efff5" },
                { label: "API",        status: "RUNNING", color: "#7efff5" },
                { label: "Coffee",     status: "LOW",     color: "#ffd166" },
                { label: "Sleep",      status: "MINIMAL", color: "#ff6ef7" },
              ].map(({ label, status, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#9b7fbf" }}>{label}</span>
                  <span style={{
                    fontFamily:    "var(--font-pixel)",
                    fontSize:      "0.35rem",
                    color,
                    textShadow:    `0 0 6px ${color}80`,
                    letterSpacing: "0.1em",
                    display:       "flex",
                    alignItems:    "center",
                    gap:           "4px",
                  }}>
                    <span style={{
                      display:      "inline-block",
                      width:        "5px",
                      height:       "5px",
                      borderRadius: "50%",
                      background:   color,
                      boxShadow:    `0 0 6px ${color}`,
                      animation:    "flicker 3s ease-in-out infinite",
                    }} />
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop:     "1px solid rgba(157,78,221,0.15)",
          padding:       "20px 0 28px",
          display:       "flex",
          alignItems:    "center",
          justifyContent:"space-between",
          flexWrap:      "wrap",
          gap:           "12px",
        }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#9b7fbf" }}>
            <span style={{ color: "rgba(157,78,221,0.5)" }}>©</span>{" "}
            {year}{" "}
            <span style={{ color: "#c77dff", textShadow: "0 0 6px rgba(199,125,255,0.4)" }}>Jess</span>
            {" — "}
            <span style={{ color: "rgba(126,255,245,0.6)" }}>crafted with ♥ & too much caffeine</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: "0.35rem", color: "#9b7fbf", letterSpacing: "0.1em" }}>
              BUILT WITH
            </span>
            {["Next.js", "Express", "TypeScript"].map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily:    "var(--font-pixel)",
                  fontSize:      "0.35rem",
                  color:         "#c77dff",
                  background:    "rgba(157,78,221,0.1)",
                  border:        "1px solid rgba(157,78,221,0.3)",
                  borderRadius:  "2px",
                  padding:       "2px 7px",
                  letterSpacing: "0.08em",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}