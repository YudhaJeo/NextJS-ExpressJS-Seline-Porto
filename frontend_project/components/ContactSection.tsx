// components/ContactSection.tsx
"use client";
import Image from "next/image";

const contacts = [
  {
    label: "EMAIL",
    value: "My Email",
    href:  "mailto:Xvivydiva@gmail.com",
    icon:  "✉",
    color: "#c77dff",
  },
  {
    label: "INSTAGRAM",
    value: "@Jesseline_Vel",
    href:  "https://instagram.com/Jesseline_Vel",
    icon:  "◈",
    color: "#ff6ef7",
  },
  {
    label: "GITHUB",
    value: "Selineajasih",
    href:  "https://github.com/Selineajasih",
    icon:  "◎",
    color: "#7efff5",
  },
  {
    label: "WHATSAPP",
    value: "My WhatsApp",
    href:  "https://wa.me/6285213988015",
    icon:  "◉",
    color: "#ffd166",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        padding:  "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="neon-divider" style={{ marginBottom: "80px" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.5rem", color: "#ffd166", letterSpacing: "0.2em", textShadow: "0 0 8px #ffd166", marginBottom: "12px" }}>
            // CONTACT.CFG
          </div>
          <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(1rem, 3vw, 1.6rem)", color: "#fff", textShadow: "0 0 20px #c77dff, 0 0 40px rgba(157,78,221,0.4), 3px 3px 0 #3c096c", letterSpacing: "0.05em", lineHeight: 1.6 }}>
            CONTACT
          </h2>
          <div style={{ marginTop: "12px", width: "60px", height: "3px", background: "linear-gradient(90deg, #9d4edd, #ffd166)", boxShadow: "0 0 10px rgba(157,78,221,0.6)" }} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "flex-start" }}>
          {/* ── Contact Cards ── */}
          <div style={{ flex: "1 1 360px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:     "flex",
                  flexDirection: "column",
                  gap:         "10px",
                  padding:     "20px",
                  background:  "rgba(13,0,24,0.8)",
                  border:      `1px solid ${c.color}30`,
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition:  "all 0.25s",
                  position:    "relative",
                  overflow:    "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = c.color + "80";
                  e.currentTarget.style.boxShadow = `0 0 20px ${c.color}25, inset 0 0 20px ${c.color}08`;
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = c.color + "30";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Corner accent */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "20px", height: "20px", borderTop: `2px solid ${c.color}`, borderLeft: `2px solid ${c.color}`, opacity: 0.6 }} />
                <div style={{ position: "absolute", bottom: 0, right: 0, width: "20px", height: "20px", borderBottom: `2px solid ${c.color}`, borderRight: `2px solid ${c.color}`, opacity: 0.6 }} />

                <span style={{ fontSize: "1.4rem", color: c.color, textShadow: `0 0 12px ${c.color}` }}>{c.icon}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.38rem", color: c.color, letterSpacing: "0.15em", marginBottom: "5px", textShadow: `0 0 6px ${c.color}` }}>
                    {c.label}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#e8d5ff", wordBreak: "break-all" }}>
                    {c.value}
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.35rem", color: c.color + "90", letterSpacing: "0.1em" }}>
                  CLICK TO OPEN →
                </div>
              </a>
            ))}
          </div>

          {/* ── Photo ── */}
          <div
            style={{
              flex:       "0 1 260px",
              position:   "relative",
              display:    "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="corner-box"
              style={{
                width:    "240px",
                height:   "300px",
                position: "relative",
                background: "rgba(13,0,24,0.8)",
                border:   "1px solid rgba(157,78,221,0.3)",
                boxShadow: "0 0 30px rgba(157,78,221,0.15)",
                overflow:  "hidden",
                padding:   "6px",
              }}
            >
              <span aria-hidden />
              <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
                <Image
                  src="/Seline-Edited-2.png"
                  alt="Jesseline Roniar"
                  fill
                  sizes="(max-width: 768px) 240px, 240px"
                  style={{ 
                    objectFit: "cover", 
                    objectPosition: "center top"
                  }}
                  priority
                />
                <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(60,9,108,0.7))", pointerEvents: "none" }} />
              </div>

              {/* Tag */}
              <div
                style={{
                  position:  "absolute",
                  bottom:    "12px",
                  left:      "12px",
                  right:     "12px",
                  background: "rgba(7,0,15,0.85)",
                  border:    "1px solid rgba(157,78,221,0.3)",
                  padding:   "8px 12px",
                  backdropFilter: "blur(4px)",
                }}
              >
                <div style={{ fontFamily: "var(--font-pixel)", fontSize: "0.4rem", color: "#7efff5", letterSpacing: "0.1em", marginBottom: "3px" }}>LET'S TALK</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#c77dff" }}>Open for collaboration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}