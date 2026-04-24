// components/AboutSection.tsx
"use client";
import { useEffect, useRef } from "react";

const stats = [
  { key: "SCHOOL", val: "SMKN 1 CIOMAS",          icon: "🏫", color: "#c77dff" },
  { key: "MAJOR",  val: "PPLG — Software & Games", icon: "💻", color: "#7efff5" },
  { key: "FOCUS",  val: "Game Developer",           icon: "🎮", color: "#ff6ef7" },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Array.from(items).indexOf(e.target as HTMLElement);
          setTimeout(() => (e.target as HTMLElement).classList.add("visible"), idx * 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    items.forEach((i) => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  // Ripple
  const ripple = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r  = el.getBoundingClientRect();
    const span = document.createElement("span");
    span.className = "ripple";
    Object.assign(span.style, { left: `${e.clientX-r.left-5}px`, top: `${e.clientY-r.top-5}px`, width:"10px",height:"10px", position:"absolute", borderRadius:"50%", background:"rgba(199,125,255,0.3)", transform:"scale(0)", animation:"rippleAnim 0.55s linear forwards", pointerEvents:"none" });
    el.appendChild(span);
    setTimeout(() => span.remove(), 600);
  };

  return (
    <section ref={sectionRef} id="about" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>

      <div className="neon-divider" style={{ marginBottom: "80px" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div className="reveal" style={{ marginBottom: "60px" }}>
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.5rem", color: "#7efff5", letterSpacing: "0.2em", textShadow: "0 0 8px #7efff5", marginBottom: "12px" }}>// ABOUT_ME.EXE</div>
          <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(1rem,3vw,1.6rem)", color: "#fff", textShadow: "0 0 20px #c77dff, 0 0 40px rgba(157,78,221,0.4), 3px 3px 0 #3c096c", letterSpacing: "0.05em", lineHeight: 1.6 }}>ABOUT ME</h2>
          <div style={{ marginTop: "12px", width: "60px", height: "3px", background: "linear-gradient(90deg,#9d4edd,#ff6ef7)", boxShadow: "0 0 10px rgba(157,78,221,0.6)" }} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "flex-start" }}>

          {/* Terminal box — data-tilt: ParallaxScene applies mouse tilt */}
          <div className="reveal-left" style={{ flex: "1 1 400px", minWidth: "280px" }}>
            <div
              data-tilt
              style={{
                background: "rgba(13,0,24,0.8)", border: "1px solid rgba(157,78,221,0.3)",
                borderRadius: "2px", overflow: "hidden",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(157,78,221,0.6)"; e.currentTarget.style.boxShadow="0 0 30px rgba(157,78,221,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(157,78,221,0.3)"; e.currentTarget.style.boxShadow="none"; }}
            >
              <div style={{ background: "rgba(60,9,108,0.5)", padding: "8px 16px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid rgba(157,78,221,0.2)" }}>
                <span style={{ width:"8px",height:"8px",background:"#ff6ef7",borderRadius:"50%",boxShadow:"0 0 6px #ff6ef7" }} />
                <span style={{ width:"8px",height:"8px",background:"#ffd166",borderRadius:"50%",boxShadow:"0 0 6px #ffd166" }} />
                <span style={{ width:"8px",height:"8px",background:"#7efff5",borderRadius:"50%",boxShadow:"0 0 6px #7efff5" }} />
                <span style={{ fontFamily:"var(--font-mono)",fontSize:"0.7rem",color:"#9b7fbf",marginLeft:"8px" }}>about.txt</span>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ fontFamily:"var(--font-mono)",fontSize:"0.7rem",color:"#7efff5",marginBottom:"12px" }}>$ cat about.txt</div>
                <p style={{ fontFamily:"var(--font-body)",fontSize:"1rem",color:"#b89fd4",lineHeight:1.9 }}>
                  Studying at <span style={{ color:"#c77dff",fontWeight:600 }}>SMKN 1 Ciomas</span>, majoring in Software and Game Development, I discovered my passion for building complex yet user-friendly systems. My interest in <span style={{ color:"#ff6ef7",fontWeight:600 }}>game development</span> drives me to constantly experiment with programming logic and visual aesthetics. Outside of coding, I actively hone my <span style={{ color:"#7efff5",fontWeight:600 }}>digital illustration</span> and English communication skills to expand my collaborations.
                </p>
                <div style={{ fontFamily:"var(--font-mono)",fontSize:"0.7rem",color:"#9b7fbf",marginTop:"16px" }}>
                  <span style={{ color:"#7efff5" }}>$</span>
                  <span style={{ display:"inline-block",width:"8px",height:"14px",background:"#9d4edd",marginLeft:"6px",verticalAlign:"text-bottom",animation:"blink 1s step-end infinite" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ flex: "0 1 280px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {stats.map((s, i) => (
              <div
                key={s.key}
                data-tilt
                className="card-pixel reveal-right"
                style={{ padding: "20px", borderRadius: "2px", display: "flex", alignItems: "center", gap: "16px", transitionDelay: `${i * 0.08}s` }}
                onClick={ripple}
              >
                <div style={{ fontSize:"1.6rem",width:"48px",height:"48px",display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.3)",border:`1px solid ${s.color}30`,borderRadius:"2px",flexShrink:0,transition:"transform 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform="scale(1.15) rotate(5deg)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform="scale(1) rotate(0deg)"; }}
                >
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontFamily:"var(--font-pixel)",fontSize:"0.4rem",color:s.color,textShadow:`0 0 8px ${s.color}`,letterSpacing:"0.15em",marginBottom:"6px" }}>{s.key}</div>
                  <div style={{ fontFamily:"var(--font-mono)",fontSize:"0.85rem",color:"#e8d5ff" }}>{s.val}</div>
                </div>
              </div>
            ))}

            {/* XP Bar */}
            <div
              data-tilt
              className="reveal"
              style={{ padding:"16px 20px",background:"rgba(13,0,24,0.6)",border:"1px solid rgba(157,78,221,0.2)",borderRadius:"2px",transitionDelay:"0.25s" }}
            >
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:"8px" }}>
                <span style={{ fontFamily:"var(--font-pixel)",fontSize:"0.4rem",color:"#9b7fbf",letterSpacing:"0.1em" }}>XP</span>
                <span style={{ fontFamily:"var(--font-pixel)",fontSize:"0.4rem",color:"#c77dff" }}>LVL 4</span>
              </div>
              <div style={{ height:"6px",background:"rgba(60,9,108,0.5)",border:"1px solid rgba(157,78,221,0.2)",overflow:"hidden" }}>
                <div style={{ height:"100%",width:"72%",background:"linear-gradient(90deg,#9d4edd,#c77dff,#ff6ef7)",boxShadow:"0 0 10px rgba(157,78,221,0.6)",animation:"fillBar 1.5s ease forwards" }} />
              </div>
              <div style={{ fontFamily:"var(--font-pixel)",fontSize:"0.35rem",color:"#9b7fbf",marginTop:"6px",letterSpacing:"0.1em" }}>3600 / 5000 XP</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fillBar { from{width:0}to{width:72%} }
        @keyframes blink { 0%,100%{opacity:1}50%{opacity:0} }
        @keyframes rippleAnim { to{transform:scale(4);opacity:0} }
      `}</style>
    </section>
  );
}