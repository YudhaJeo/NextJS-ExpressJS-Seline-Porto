// components/ShowcaseSection.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ARTWORKS = [
  { file: "/showcase/Bedroom.png",          title: "Bedroom",          tag: "BACKGROUND ART" },
  { file: "/showcase/Char - Ibu Kantin.png", title: "Char — Ibu Kantin", tag: "CHARACTER DESIGN" },
  { file: "/showcase/Char - SMA.png",        title: "Char — SMA",        tag: "CHARACTER DESIGN" },
  { file: "/showcase/Digital Clock.png",     title: "Digital Clock",     tag: "PROP / UI ART" },
];

// Duplicate for seamless infinite scroll
const ITEMS = [...ARTWORKS, ...ARTWORKS, ...ARTWORKS];

const CARD_W   = 340;
const CARD_GAP = 24;
const STEP     = CARD_W + CARD_GAP;

export default function ShowcaseSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const offsetRef   = useRef(0);           // current pixel offset
  const rafRef      = useRef<number>(0);
  const pauseRef    = useRef(false);
  const [lightbox, setLightbox] = useState<null | typeof ARTWORKS[0]>(null);

  // ── Reveal on scroll ────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Array.from(items).indexOf(e.target as HTMLElement);
          setTimeout(() => (e.target as HTMLElement).classList.add("visible"), idx * 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    items.forEach((i) => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  // ── Auto-scroll loop ─────────────────────────────────────────────
  useEffect(() => {
    const totalW = ARTWORKS.length * STEP; // one full set width

    const tick = () => {
      if (!pauseRef.current) {
        offsetRef.current += 0.6; // px per frame — speed
        // seamless reset when we've scrolled one full set
        if (offsetRef.current >= totalW) offsetRef.current -= totalW;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${offsetRef.current.toFixed(2)}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Manual nav ──────────────────────────────────────────────────
  const nudge = (dir: 1 | -1) => {
    offsetRef.current += dir * STEP;
    const totalW = ARTWORKS.length * STEP;
    if (offsetRef.current < 0) offsetRef.current += totalW;
    if (offsetRef.current >= totalW * 3) offsetRef.current -= totalW;
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="showcase"
        style={{ padding: "80px 0 120px", position: "relative", overflow: "hidden" }}
      >
        <div className="neon-divider reveal" style={{ marginBottom: "80px", margin: "0 24px 80px" }} />

        {/* ── Header ── */}
        <div className="reveal" style={{ maxWidth: "1100px", margin: "0 auto 60px", padding: "0 24px" }}>
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.5rem", color: "#ff6ef7", letterSpacing: "0.2em", textShadow: "0 0 8px #ff6ef7", marginBottom: "12px" }}>
            // ART.GALLERY
          </div>
          <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(1rem,3vw,1.6rem)", color: "#fff", textShadow: "0 0 20px #c77dff, 0 0 40px rgba(157,78,221,0.4), 3px 3px 0 #3c096c", letterSpacing: "0.05em", lineHeight: 1.6 }}>
            SHOWCASE
          </h2>
          <div style={{ marginTop: "12px", width: "60px", height: "3px", background: "linear-gradient(90deg,#9d4edd,#ff6ef7)", boxShadow: "0 0 10px rgba(157,78,221,0.6)" }} />
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#9b7fbf", marginTop: "16px", letterSpacing: "0.05em" }}>
            game art · character design · backgrounds
          </p>
        </div>

        {/* ── Carousel ── */}
        <div style={{ position: "relative" }}>

          {/* Fade edges */}
          <div aria-hidden style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(90deg,#07000f,transparent)", zIndex: 4, pointerEvents: "none" }} />
          <div aria-hidden style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", background: "linear-gradient(270deg,#07000f,transparent)", zIndex: 4, pointerEvents: "none" }} />

          {/* Track */}
          <div
            style={{ overflow: "hidden", padding: "20px 0" }}
            onMouseEnter={() => { pauseRef.current = true; }}
            onMouseLeave={() => { pauseRef.current = false; }}
          >
            <div
              ref={trackRef}
              style={{
                display:    "flex",
                gap:        `${CARD_GAP}px`,
                width:      "max-content",
                willChange: "transform",
              }}
            >
              {ITEMS.map((art, i) => (
                <div
                  key={i}
                  onClick={() => setLightbox(art)}
                  style={{
                    width:        `${CARD_W}px`,
                    flexShrink:   0,
                    cursor:       "pointer",
                    position:     "relative",
                    background:   "rgba(13,0,24,0.9)",
                    border:       "1px solid rgba(157,78,221,0.25)",
                    borderRadius: "2px",
                    overflow:     "hidden",
                    transition:   "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(199,125,255,0.6)";
                    e.currentTarget.style.boxShadow   = "0 0 30px rgba(157,78,221,0.3), inset 0 0 20px rgba(157,78,221,0.05)";
                    e.currentTarget.style.transform   = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(157,78,221,0.25)";
                    e.currentTarget.style.boxShadow   = "none";
                    e.currentTarget.style.transform   = "translateY(0)";
                  }}
                >
                  {/* Corner accents */}
                  <div aria-hidden style={{ position:"absolute",top:0,left:0,width:"14px",height:"14px",borderTop:"2px solid #c77dff",borderLeft:"2px solid #c77dff",zIndex:2 }} />
                  <div aria-hidden style={{ position:"absolute",top:0,right:0,width:"14px",height:"14px",borderTop:"2px solid #c77dff",borderRight:"2px solid #c77dff",zIndex:2 }} />

                  {/* Image */}
                  <div style={{ width: "100%", height: "220px", position: "relative", background: "rgba(60,9,108,0.2)" }}>
                    <Image
                      src={art.file}
                      alt={art.title}
                      fill
                      sizes="340px"
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                      draggable={false}
                    />
                    {/* Scan overlay */}
                    <div aria-hidden style={{ position:"absolute",inset:0,background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.06) 3px,rgba(0,0,0,0.06) 4px)",pointerEvents:"none",zIndex:1 }} />
                  </div>

                  {/* Info */}
                  <div style={{ padding: "16px 16px 18px" }}>
                    <div style={{ fontFamily:"var(--font-pixel)",fontSize:"0.32rem",color:"#ff6ef7",letterSpacing:"0.15em",marginBottom:"6px",textShadow:"0 0 6px rgba(255,110,247,0.5)" }}>
                      {art.tag}
                    </div>
                    <div style={{ fontFamily:"var(--font-pixel)",fontSize:"0.55rem",color:"#e8d5ff",letterSpacing:"0.06em",lineHeight:1.5 }}>
                      {art.title}
                    </div>
                    <div style={{ marginTop:"10px",display:"flex",alignItems:"center",gap:"6px" }}>
                      <span style={{ fontFamily:"var(--font-pixel)",fontSize:"0.32rem",color:"rgba(157,78,221,0.6)",letterSpacing:"0.1em" }}>
                        CLICK TO EXPAND ↗
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav buttons */}
          <div style={{ display:"flex",justifyContent:"center",gap:"16px",marginTop:"28px" }}>
            {(["◀ PREV", "NEXT ▶"] as const).map((label, idx) => (
              <button
                key={label}
                onClick={() => nudge(idx === 0 ? -1 : 1)}
                style={{
                  fontFamily:   "var(--font-pixel)",
                  fontSize:     "0.4rem",
                  padding:      "8px 20px",
                  background:   "rgba(60,9,108,0.4)",
                  border:       "1px solid rgba(157,78,221,0.4)",
                  borderRadius: "2px",
                  color:        "#c77dff",
                  cursor:       "pointer",
                  letterSpacing:"0.1em",
                  transition:   "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background  = "rgba(157,78,221,0.25)";
                  e.currentTarget.style.borderColor = "rgba(157,78,221,0.8)";
                  e.currentTarget.style.boxShadow   = "0 0 12px rgba(157,78,221,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background  = "rgba(60,9,108,0.4)";
                  e.currentTarget.style.borderColor = "rgba(157,78,221,0.4)";
                  e.currentTarget.style.boxShadow   = "none";
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position:       "fixed",
            inset:          0,
            zIndex:         100,
            background:     "rgba(7,0,15,0.92)",
            backdropFilter: "blur(8px)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            padding:        "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position:     "relative",
              maxWidth:     "90vw",
              maxHeight:    "85vh",
              background:   "rgba(13,0,24,0.95)",
              border:       "1px solid rgba(199,125,255,0.4)",
              borderRadius: "2px",
              overflow:     "hidden",
              boxShadow:    "0 0 60px rgba(157,78,221,0.4)",
            }}
          >
            {/* Corner accents */}
            <div aria-hidden style={{ position:"absolute",top:0,left:0,width:"20px",height:"20px",borderTop:"2px solid #c77dff",borderLeft:"2px solid #c77dff",zIndex:2 }} />
            <div aria-hidden style={{ position:"absolute",top:0,right:0,width:"20px",height:"20px",borderTop:"2px solid #c77dff",borderRight:"2px solid #c77dff",zIndex:2 }} />
            <div aria-hidden style={{ position:"absolute",bottom:0,left:0,width:"20px",height:"20px",borderBottom:"2px solid #c77dff",borderLeft:"2px solid #c77dff",zIndex:2 }} />
            <div aria-hidden style={{ position:"absolute",bottom:0,right:0,width:"20px",height:"20px",borderBottom:"2px solid #c77dff",borderRight:"2px solid #c77dff",zIndex:2 }} />

            <img
              src={lightbox.file}
              alt={lightbox.title}
              style={{ display:"block", maxWidth:"85vw", maxHeight:"75vh", objectFit:"contain" }}
            />
            <div style={{ padding:"12px 20px",borderTop:"1px solid rgba(157,78,221,0.2)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px",flexWrap:"wrap" }}>
              <div>
                <div style={{ fontFamily:"var(--font-pixel)",fontSize:"0.32rem",color:"#ff6ef7",letterSpacing:"0.15em",marginBottom:"4px" }}>{lightbox.tag}</div>
                <div style={{ fontFamily:"var(--font-pixel)",fontSize:"0.5rem",color:"#e8d5ff" }}>{lightbox.title}</div>
              </div>
              <div style={{ display:"flex",gap:"10px",alignItems:"center" }}>
                <a
                  href={lightbox.file}
                  download
                  style={{ fontFamily:"var(--font-pixel)",fontSize:"0.4rem",padding:"6px 14px",background:"rgba(157,78,221,0.2)",border:"1px solid rgba(157,78,221,0.5)",borderRadius:"2px",color:"#c77dff",cursor:"pointer",letterSpacing:"0.1em",textDecoration:"none",transition:"all 0.2s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background  = "rgba(157,78,221,0.35)";
                    e.currentTarget.style.borderColor = "rgba(157,78,221,0.9)";
                    e.currentTarget.style.boxShadow   = "0 0 12px rgba(157,78,221,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background  = "rgba(157,78,221,0.2)";
                    e.currentTarget.style.borderColor = "rgba(157,78,221,0.5)";
                    e.currentTarget.style.boxShadow   = "none";
                  }}
                >
                  ↓ DOWNLOAD
                </a>
                <button
                  onClick={() => setLightbox(null)}
                  style={{ fontFamily:"var(--font-pixel)",fontSize:"0.4rem",padding:"6px 14px",background:"transparent",border:"1px solid rgba(255,110,247,0.4)",borderRadius:"2px",color:"#ff6ef7",cursor:"pointer",letterSpacing:"0.1em",transition:"all 0.2s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background  = "rgba(255,110,247,0.1)";
                    e.currentTarget.style.borderColor = "rgba(255,110,247,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background  = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,110,247,0.4)";
                  }}
                >
                  ✕ CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}