// components/CoreSkillsSection.tsx
"use client";

const hardSkills = [
  { name: "English Communication + IELTS (soon)", icon: "", level: 70, color: "#7efff5" },
  { name: "Digital Illustrator", icon: "", level: 85, color: "#ff6ef7" },
  { name: "Web Programming (Front/Back End)", icon: "", level: 80, color: "#c77dff" },
  { name: "Video / Photo Editing", icon: "", level: 75, color: "#ffd166" },
  { name: "Game Development", icon: "", level: 65, color: "#32ff7e" }, 
];

const softSkills = [
  { name: "Public Speaking", icon: "", level: 78 },
  { name: "Time Management", icon: "", level: 82 },
  { name: "Creative Thinking", icon: "", level: 90 },
  { name: "Negotiation", icon: "", level: 72 },
  { name: "Team Work", icon: "", level: 88 },
];

function SkillBar({ name, icon, level, color = "#9d4edd" }: { name: string; icon: string; level: number; color?: string }) {
  return (
    <div
      style={{
        background:   "rgba(13,0,24,0.7)",
        border:       "1px solid rgba(157,78,221,0.2)",
        padding:      "14px 18px",
        borderRadius: "2px",
        transition:   "all 0.25s",
        cursor:       "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color + "80";
        e.currentTarget.style.boxShadow   = `0 0 15px ${color}20`;
        e.currentTarget.style.transform   = "translateX(4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(157,78,221,0.2)";
        e.currentTarget.style.boxShadow   = "none";
        e.currentTarget.style.transform   = "translateX(0)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "1.1rem" }}>{icon}</span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "#e8d5ff", fontWeight: 500 }}>{name}</span>
        </div>
        <span
          style={{
            fontFamily:  "var(--font-pixel)",
            fontSize:    "0.4rem",
            color:       color,
            textShadow:  `0 0 6px ${color}`,
            letterSpacing: "0.05em",
          }}
        >
          {level}%
        </span>
      </div>

      {/* Bar track */}
      <div
        style={{
          height:     "4px",
          background: "rgba(60,9,108,0.6)",
          border:     "1px solid rgba(157,78,221,0.15)",
          overflow:   "hidden",
          position:   "relative",
        }}
      >
        {/* Pixel segments */}
        <div
          style={{
            position:   "absolute",
            inset:      0,
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 7px, rgba(7,0,15,0.5) 7px, rgba(7,0,15,0.5) 8px)",
            zIndex:     2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            height:     "100%",
            width:      `${level}%`,
            background: `linear-gradient(90deg, ${color}90, ${color})`,
            boxShadow:  `0 0 8px ${color}60`,
            transition: "width 1.5s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

export default function CoreSkillsSection() {
  return (
    <section
      id="skills"
      style={{
        padding:  "100px 24px",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <div
            style={{
              fontFamily:  "var(--font-pixel)",
              fontSize:    "0.5rem",
              color:       "#ff6ef7",
              letterSpacing: "0.2em",
              textShadow:  "0 0 8px #ff6ef7",
              marginBottom: "12px",
            }}
          >
            // SKILL_TREE.DAT
          </div>
          <h2
            style={{
              fontFamily:  "var(--font-pixel)",
              fontSize:    "clamp(1rem, 3vw, 1.6rem)",
              color:       "#fff",
              textShadow:  "0 0 20px #c77dff, 0 0 40px rgba(157,78,221,0.4), 3px 3px 0 #3c096c",
              letterSpacing: "0.05em",
              lineHeight:  1.6,
            }}
          >
            CORE SKILLS
          </h2>
          <div style={{ marginTop: "12px", width: "60px", height: "3px", background: "linear-gradient(90deg, #9d4edd, #ff6ef7)", boxShadow: "0 0 10px rgba(157,78,221,0.6)" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px" }}>
          {/* ── Hard Skills ── */}
          <div>
            <div
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          "10px",
                marginBottom: "24px",
                paddingBottom: "12px",
                borderBottom: "1px solid rgba(157,78,221,0.2)",
              }}
            >
              <div
                style={{
                  width:       "8px",
                  height:      "8px",
                  background:  "#7efff5",
                  boxShadow:   "0 0 8px #7efff5",
                  borderRadius: "1px",
                }}
              />
              <span
                style={{
                  fontFamily:  "var(--font-pixel)",
                  fontSize:    "0.55rem",
                  color:       "#7efff5",
                  textShadow:  "0 0 8px #7efff5",
                  letterSpacing: "0.15em",
                }}
              >
                HARD SKILLS
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {hardSkills.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>
          </div>

          {/* ── Soft Skills ── */}
          <div>
            <div
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          "10px",
                marginBottom: "24px",
                paddingBottom: "12px",
                borderBottom: "1px solid rgba(157,78,221,0.2)",
              }}
            >
              <div
                style={{
                  width:       "8px",
                  height:      "8px",
                  background:  "#ff6ef7",
                  boxShadow:   "0 0 8px #ff6ef7",
                  borderRadius: "1px",
                }}
              />
              <span
                style={{
                  fontFamily:  "var(--font-pixel)",
                  fontSize:    "0.55rem",
                  color:       "#ff6ef7",
                  textShadow:  "0 0 8px #ff6ef7",
                  letterSpacing: "0.15em",
                }}
              >
                SOFT SKILLS
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {softSkills.map((s) => (
                <SkillBar key={s.name} {...s} color="#ff6ef7" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}