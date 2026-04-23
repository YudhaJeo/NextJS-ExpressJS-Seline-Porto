// components/CertificateSection.tsx
"use client";
import { useEffect, useRef } from "react";

const certificates = [
  { label:"Dicoding Financial Literacy",                   file:"/certificates/Dicoding.pdf",       icon:"📜", color:"#c77dff", badge:"DICODING" },
  { label:"Dirjen Pendidikan Vokasi — Financial Literacy", file:"/certificates/DJPV.pdf",            icon:"📋", color:"#ff6ef7", badge:"DJPV" },
  { label:"JHIC Certificate",                              file:"/certificates/Peserta-JHIC.pdf",    icon:"🏆", color:"#7efff5", badge:"JHIC" },
  { label:"Semi Finalis JHIC",                             file:"/certificates/SemiFinalis-JHIC.pdf",icon:"⭐", color:"#ffd166", badge:"SEMI FINALIST" },
];

export default function CertificateSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    items.forEach((i) => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  // Ripple
  const ripple = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r  = el.getBoundingClientRect();
    const span = document.createElement("span");
    Object.assign(span.style, { position:"absolute", borderRadius:"50%", background:"rgba(199,125,255,0.25)", width:"10px", height:"10px", left:`${e.clientX-r.left-5}px`, top:`${e.clientY-r.top-5}px`, transform:"scale(0)", animation:"rippleAnim 0.55s linear forwards", pointerEvents:"none" });
    el.appendChild(span);
    setTimeout(() => span.remove(), 600);
  };

  return (
    <section ref={sectionRef} id="certs" style={{ padding:"80px 24px 120px",position:"relative",overflow:"hidden" }}>
      <div className="neon-divider reveal" style={{ marginBottom:"80px" }} />

      <div style={{ maxWidth:"1100px",margin:"0 auto" }}>
        <div className="reveal" style={{ marginBottom:"60px" }}>
          <div style={{ fontFamily:"var(--font-pixel)",fontSize:"0.5rem",color:"#ffd166",letterSpacing:"0.2em",textShadow:"0 0 8px #ffd166",marginBottom:"12px" }}>// ACHIEVEMENTS.LOG</div>
          <h2 style={{ fontFamily:"var(--font-pixel)",fontSize:"clamp(1rem,3vw,1.6rem)",color:"#fff",textShadow:"0 0 20px #c77dff, 0 0 40px rgba(157,78,221,0.4), 3px 3px 0 #3c096c",letterSpacing:"0.05em",lineHeight:1.6 }}>CERTIFICATES</h2>
          <div style={{ marginTop:"12px",width:"60px",height:"3px",background:"linear-gradient(90deg,#9d4edd,#ffd166)",boxShadow:"0 0 10px rgba(157,78,221,0.6)" }} />
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"16px" }}>
          {certificates.map((cert, i) => (
            <a
              key={cert.label}
              href={cert.file}
              download
              className="reveal"
              onClick={ripple}
              style={{
                display:"flex",flexDirection:"column",gap:"14px",padding:"24px",
                background:"rgba(13,0,24,0.85)",border:`1px solid ${cert.color}25`,borderRadius:"2px",
                textDecoration:"none",transition:"all 0.3s cubic-bezier(0.22,1,0.36,1)",
                position:"relative",overflow:"hidden",transitionDelay:`${i*0.08}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = cert.color+"70";
                e.currentTarget.style.boxShadow   = `0 0 30px ${cert.color}25, inset 0 0 25px ${cert.color}06`;
                e.currentTarget.style.transform   = "translateY(-6px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = cert.color+"25";
                e.currentTarget.style.boxShadow   = "none";
                e.currentTarget.style.transform   = "translateY(0) scale(1)";
              }}
            >
              <div style={{ position:"absolute",top:0,left:0,width:"16px",height:"16px",borderTop:`2px solid ${cert.color}`,borderLeft:`2px solid ${cert.color}`,transition:"all 0.3s" }} />
              <div style={{ position:"absolute",top:0,right:0,width:"16px",height:"16px",borderTop:`2px solid ${cert.color}`,borderRight:`2px solid ${cert.color}`,transition:"all 0.3s" }} />

              <div style={{ alignSelf:"flex-start",padding:"3px 10px",background:`${cert.color}15`,border:`1px solid ${cert.color}40`,borderRadius:"1px",fontFamily:"var(--font-pixel)",fontSize:"0.35rem",color:cert.color,textShadow:`0 0 6px ${cert.color}`,letterSpacing:"0.12em" }}>
                {cert.badge}
              </div>

              <div style={{ display:"flex",alignItems:"flex-start",gap:"12px" }}>
                <span style={{ fontSize:"1.8rem",lineHeight:1,transition:"transform 0.2s" }}
                  onMouseEnter={(e)=>{(e.currentTarget as HTMLElement).style.transform="scale(1.3) rotate(-5deg)";}}
                  onMouseLeave={(e)=>{(e.currentTarget as HTMLElement).style.transform="scale(1) rotate(0)";}}
                >{cert.icon}</span>
                <div style={{ fontFamily:"var(--font-body)",fontSize:"0.9rem",color:"#e8d5ff",fontWeight:600,lineHeight:1.5 }}>{cert.label}</div>
              </div>

              <div style={{ display:"flex",alignItems:"center",gap:"8px",marginTop:"auto",padding:"8px 12px",background:`${cert.color}10`,border:`1px solid ${cert.color}30`,borderRadius:"1px",transition:"background 0.2s" }}>
                <span style={{ fontFamily:"var(--font-pixel)",fontSize:"0.38rem",color:cert.color,letterSpacing:"0.1em" }}>↓ DOWNLOAD PDF</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`@keyframes rippleAnim{to{transform:scale(4);opacity:0}}`}</style>
    </section>
  );
}