// components/HeroSection.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const TAGLINE = "BUILDING WORLDS WITH CODE, ART, AND IMAGINATION";

export default function HeroSection() {
  const [displayed, setDisplayed] = useState("");
  const [cursor,    setCursor]    = useState(true);
  const idxRef = useRef(0);

  // Typewriter for tagline
  useEffect(() => {
    const iv = setInterval(() => {
      if (idxRef.current < TAGLINE.length) {
        setDisplayed(TAGLINE.slice(0, idxRef.current + 1));
        idxRef.current++;
      } else {
        clearInterval(iv);
      }
    }, 55);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setCursor((v) => !v), 600);
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight:     "100vh",
        display:       "flex",
        alignItems:    "center",
        padding:       "80px 24px 0",
        position:      "relative",
        overflow:      "hidden",
      }}
    >
      {/* Background grid */}
      <div
        aria-hidden
        style={{
          position:   "absolute",
          inset:      0,
          backgroundImage: `
            linear-gradient(rgba(157,78,221,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(157,78,221,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          zIndex:     0,
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top:      "30%",
          left:     "55%",
          width:    "600px",
          height:   "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(157,78,221,0.15) 0%, transparent 70%)",
          transform: "translate(-50%,-50%)",
          zIndex:   0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth:  "1100px",
          margin:    "0 auto",
          width:     "100%",
          display:   "flex",
          flexWrap:  "wrap",
          alignItems: "center",
          gap:       "48px",
          position:  "relative",
          zIndex:    3,
        }}
      >
        {/* ── LEFT TEXT ── */}
        <div style={{ flex: "1 1 400px", minWidth: "300px" }}>
          {/* Status chip */}
          <div
            style={{
              display:    "inline-flex",
              alignItems: "center",
              gap:        "8px",
              padding:    "6px 14px",
              background: "rgba(60,9,108,0.4)",
              border:     "1px solid rgba(157,78,221,0.5)",
              borderRadius: "2px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                width:     "6px",
                height:    "6px",
                background: "#7efff5",
                boxShadow: "0 0 8px #7efff5",
                borderRadius: "50%",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily:  "var(--font-pixel)",
                fontSize:    "0.45rem",
                color:       "#7efff5",
                letterSpacing: "0.15em",
                textShadow:  "0 0 8px #7efff5",
              }}
            >
              AVAILABLE FOR COLLAB
            </span>
          </div>

          {/* Name */}
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontFamily:  "var(--font-pixel)",
                fontSize:    "clamp(0.6rem, 2vw, 0.85rem)",
                color:       "#9b7fbf",
                letterSpacing: "0.25em",
                marginBottom: "8px",
              }}
            >
              HELLO, I'M
            </div>
            <h1
              className="glitch-wrap"
              data-text="JESSELINE"
              style={{
                fontFamily:  "var(--font-pixel)",
                fontSize:    "clamp(1.6rem, 5vw, 3rem)",
                color:       "#fff",
                lineHeight:  1.4,
                display:     "block",
                textShadow:  "0 0 20px #c77dff, 0 0 50px rgba(157,78,221,0.5), 3px 3px 0 #3c096c",
                letterSpacing: "0.05em",
              }}
            >
              JESSELINE
            </h1>
            <h2
              style={{
                fontFamily:  "var(--font-pixel)",
                fontSize:    "clamp(1rem, 3vw, 1.6rem)",
                color:       "#c77dff",
                lineHeight:  1.6,
                textShadow:  "0 0 15px rgba(199,125,255,0.7)",
                letterSpacing: "0.08em",
              }}
            >
              RONIAR
            </h2>
          </div>

          {/* Tagline typewriter */}
          <div
            style={{
              fontFamily:  "var(--font-mono)",
              fontSize:    "clamp(0.65rem, 1.5vw, 0.85rem)",
              color:       "#9b7fbf",
              marginBottom: "28px",
              letterSpacing: "0.08em",
              minHeight:   "1.5em",
            }}
          >
            <span style={{ color: "#7efff5" }}>&gt; </span>
            {displayed}
            {cursor && (
              <span
                style={{
                  display:    "inline-block",
                  width:      "8px",
                  height:     "1em",
                  background: "#c77dff",
                  marginLeft: "2px",
                  verticalAlign: "text-bottom",
                  boxShadow:  "0 0 8px #9d4edd",
                }}
              />
            )}
          </div>

          {/* Bio */}
          <p
            style={{
              fontFamily:  "var(--font-body)",
              fontSize:    "1rem",
              color:       "#b89fd4",
              lineHeight:  1.8,
              marginBottom: "36px",
              maxWidth:    "480px",
              borderLeft:  "2px solid rgba(157,78,221,0.5)",
              paddingLeft: "16px",
            }}
          >
            Hi! I'm Jess, a PPLG student specializing in game development and web programming.
            I combine technical skills with a creative visual side to build engaging digital experiences.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="#about"
              className="btn-pixel"
              style={{
                display:     "inline-block",
                padding:     "12px 24px",
                background:  "rgba(157,78,221,0.3)",
                border:      "1px solid #9d4edd",
                borderRadius: "2px",
                color:       "#fff",
                textDecoration: "none",
                fontFamily:  "var(--font-pixel)",
                fontSize:    "0.5rem",
                letterSpacing: "0.1em",
                boxShadow:   "0 0 20px rgba(157,78,221,0.3)",
                transition:  "all 0.2s",
              }}
            >
              ▼ ABOUT ME
            </a>
            <a
              href="/skills"
              className="btn-pixel"
              style={{
                display:     "inline-block",
                padding:     "12px 24px",
                background:  "transparent",
                border:      "1px solid rgba(157,78,221,0.4)",
                borderRadius: "2px",
                color:       "#c77dff",
                textDecoration: "none",
                fontFamily:  "var(--font-pixel)",
                fontSize:    "0.5rem",
                letterSpacing: "0.1em",
                transition:  "all 0.2s",
              }}
            >
              → CORE SKILLS
            </a>
          </div>
        </div>

        {/* ── RIGHT: PHOTO ── */}
        <div
          style={{
            flex:       "0 0 auto",
            position:   "relative",
            display:    "flex",
            justifyContent: "center",
          }}
        >
          {/* Decorative pixel rings */}
          <div
            aria-hidden
            style={{
              position:  "absolute",
              width:     "340px",
              height:    "340px",
              border:    "1px solid rgba(157,78,221,0.2)",
              borderRadius: "50%",
              top:       "50%",
              left:      "50%",
              transform: "translate(-50%,-50%)",
              animation: "spin 20s linear infinite",
            }}
          />
          <div
            aria-hidden
            style={{
              position:  "absolute",
              width:     "280px",
              height:    "280px",
              border:    "1px dashed rgba(199,125,255,0.15)",
              borderRadius: "50%",
              top:       "50%",
              left:      "50%",
              transform: "translate(-50%,-50%)",
              animation: "spin 14s linear infinite reverse",
            }}
          />

          {/* Photo frame */}
          <div
            className="corner-box float"
            style={{
              width:      "390px",
              height:     "480px",
              position:   "relative",
              background: "rgba(13,0,24,0.8)",
              border:     "1px solid rgba(157,78,221,0.4)",
              boxShadow:  "0 0 40px rgba(157,78,221,0.2), inset 0 0 20px rgba(157,78,221,0.05)",
              overflow:   "hidden",
              padding:    "6px",
            }}
          >
            <span aria-hidden />
            {/* Photo */}
            <div
              style={{
                width:    "100%",
                height:   "100%",
                position: "relative",
                overflow: "hidden",
                background: "rgba(60,9,108,0.3)",
                display:  "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/Seline-Edited-1.png"
                alt="Jesseline Roniar"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
              {/* Purple tint overlay */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset:    0,
                  background: "linear-gradient(to top, rgba(60,9,108,0.6) 0%, transparent 50%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Name tag on photo */}
            <div
              style={{
                position:   "absolute",
                bottom:     "12px",
                left:       "12px",
                right:      "12px",
                background: "rgba(7,0,15,0.85)",
                border:     "1px solid rgba(157,78,221,0.4)",
                padding:    "8px 12px",
                backdropFilter: "blur(4px)",
              }}
            >
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.45rem", color: "#ff6ef7", letterSpacing: "0.1em", marginBottom: "3px" }}>
                PLAYER_01
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#c77dff" }}>
                Jess // Game Dev
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position:  "absolute",
          bottom:    "32px",
          left:      "50%",
          transform: "translateX(-50%)",
          display:   "flex",
          flexDirection: "column",
          alignItems: "center",
          gap:       "6px",
          zIndex:    3,
        }}
      >
        <span style={{ fontFamily: "var(--font-pixel)", fontSize: "0.35rem", color: "#9b7fbf", letterSpacing: "0.15em" }}>SCROLL</span>
        <div
          style={{
            width:   "1px",
            height:  "40px",
            background: "linear-gradient(to bottom, #9d4edd, transparent)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes pulse {
          0%,100% { opacity: 0.4; }
          50%     { opacity: 1; }
        }
      `}</style>
    </section>
  );
}