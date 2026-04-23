// components/CoreSkillsSection.tsx
"use client";
import { useEffect, useRef } from "react";

const hardSkills = [
  { name: "English Communication + IELTS (soon)", icon: "🌐", level: 70, color: "#7efff5" },
  { name: "Digital Illustrator",                   icon: "🎨", level: 85, color: "#ff6ef7" },
  { name: "Web Programming (Front/Back End)",       icon: "💻", level: 80, color: "#c77dff" },
  { name: "Video / Photo Editing",                  icon: "🎬", level: 75, color: "#ffd166" },
  { name: "Game Development",                       icon: "🎮", level: 65, color: "#32ff7e" },
];

const softSkills = [
  { name: "Public Speaking",   icon: "🎤", level: 78 },
  { name: "Time Management",   icon: "⏱️", level: 82 },
  { name: "Creative Thinking", icon: "💡", level: 90 },
  { name: "Negotiation",       icon: "🤝", level: 72 },
  { name: "Team Work",         icon: "👥", level: 88 },
];

function SkillBar({ name, icon, level, color = "#9d4edd", delay = 0 }: { name: string; icon: string; level: number; color?: string; delay?: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        setTimeout(() => {
          if (fillRef.current) {
            fillRef.current.style.width = `${level}%`;
          }
        }, delay);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(bar);
    return () => obs.disconnect();
  }, [level, delay]);

  return (
    <div
      ref={barRef}
      style={{ background: "rgba(13,0,24,0.7)", border: "1px solid rgba(157,78,221,0.2)", padding: "14px 18px", borderRadius: "2px", transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)", cursor: "default" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = color+"80"; e.currentTarget.style.boxShadow = `0 0 20px ${color}18`; e.currentTarget.style.transform = "translateX(6px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(157,78,221,0.2)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateX(0)"; }}
    >
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
          <span style={{ fontSize:"1.1rem",transition:"transform 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform="scale(1.25) rotate(10deg)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform="scale(1) rotate(0deg)"; }}
          >{icon}</span>
          <span style={{ fontFamily:"var(--font-body)",fontSize:"0.95rem",color:"#e8d5ff",fontWeight:500 }}>{name}</span>
        </div>
        <span style={{ fontFamily:"var(--font-pixel)",fontSize:"0.4rem",color:color,textShadow:`0 0 6px ${color}`,letterSpacing:"0.05em" }}>{level}%</span>
      </div>
      <div style={{ height:"4px",background:"rgba(60,9,108,0.6)",border:"1px solid rgba(157,78,221,0.15)",overflow:"hidden",position:"relative" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(90deg,transparent,transparent 7px,rgba(7,0,15,0.5) 7px,rgba(7,0,15,0.5) 8px)",zIndex:2,pointerEvents:"none" }} />
        <div ref={fillRef} style={{ height:"100%",width:"0%",background:`linear-gradient(90deg,${color}90,${color})`,boxShadow:`0 0 8px ${color}60`,transition:"width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  );
}

export default function CoreSkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);

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
    }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
    items.forEach((i) => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  // Parallax BG
  useEffect(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pref) return;
    let raf: number;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!bgRef.current || !sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const prog = -rect.top / window.innerHeight;
        bgRef.current.style.transform = `translateY(${prog * 25}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <section ref={sectionRef} id="skills" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>

      {/* Parallax BG */}
      <div ref={bgRef} aria-hidden style={{ position:"absolute",top:"-20%",left:"-5%",width:"500px",height:"500px",borderRadius:"50%",background:"radial-gradient(circle,rgba(157,78,221,0.06) 0%,transparent 70%)",pointerEvents:"none",willChange:"transform" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "60px" }}>
          <div style={{ fontFamily:"var(--font-pixel)",fontSize:"0.5rem",color:"#ff6ef7",letterSpacing:"0.2em",textShadow:"0 0 8px #ff6ef7",marginBottom:"12px" }}>// SKILL_TREE.DAT</div>
          <h2 style={{ fontFamily:"var(--font-pixel)",fontSize:"clamp(1rem,3vw,1.6rem)",color:"#fff",textShadow:"0 0 20px #c77dff, 0 0 40px rgba(157,78,221,0.4), 3px 3px 0 #3c096c",letterSpacing:"0.05em",lineHeight:1.6 }}>CORE SKILLS</h2>
          <div style={{ marginTop:"12px",width:"60px",height:"3px",background:"linear-gradient(90deg,#9d4edd,#ff6ef7)",boxShadow:"0 0 10px rgba(157,78,221,0.6)" }} />
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:"48px" }}>
          {/* Hard Skills */}
          <div className="reveal-left">
            <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"24px",paddingBottom:"12px",borderBottom:"1px solid rgba(157,78,221,0.2)" }}>
              <div style={{ width:"8px",height:"8px",background:"#7efff5",boxShadow:"0 0 8px #7efff5",borderRadius:"1px" }} />
              <span style={{ fontFamily:"var(--font-pixel)",fontSize:"0.55rem",color:"#7efff5",textShadow:"0 0 8px #7efff5",letterSpacing:"0.15em" }}>HARD SKILLS</span>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:"10px" }}>
              {hardSkills.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 100} />)}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="reveal-right">
            <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"24px",paddingBottom:"12px",borderBottom:"1px solid rgba(157,78,221,0.2)" }}>
              <div style={{ width:"8px",height:"8px",background:"#ff6ef7",boxShadow:"0 0 8px #ff6ef7",borderRadius:"1px" }} />
              <span style={{ fontFamily:"var(--font-pixel)",fontSize:"0.55rem",color:"#ff6ef7",textShadow:"0 0 8px #ff6ef7",letterSpacing:"0.15em" }}>SOFT SKILLS</span>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:"10px" }}>
              {softSkills.map((s, i) => <SkillBar key={s.name} {...s} color="#ff6ef7" delay={i * 100 + 200} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}