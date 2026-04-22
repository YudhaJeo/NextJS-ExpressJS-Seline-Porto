// D:\Personal App\Seline Porto NextJS ExpressJS\frontend_project\components\AboutSection.tsx
export default function AboutSection() {
  const stats = [
    { label: "School", value: "SMKN 1 Ciomas" },
    { label: "Major", value: "Software & Game Dev" },
    { label: "Focus", value: "Game Developer" },
  ];

  return (
    <section id="about" className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm tracking-widest uppercase font-semibold mb-2">Get To Know</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">About Me</h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-purple-500 to-violet-400 mx-auto rounded-full" />
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Description */}
          <div className="flex-1">
            <p className="text-purple-100/80 text-base leading-relaxed">
              Studying at SMKN 1 Ciomas, majoring in Software and Game Development, I discovered my passion
              for building complex yet user-friendly systems. My interest in game development drives me to
              constantly experiment with programming logic and visual aesthetics. Outside of coding, I actively
              hone my digital illustration and English communication skills to expand my collaborations.
            </p>
          </div>

          {/* Stats cards */}
          <div className="flex flex-col gap-4 min-w-[220px]">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-purple-900/30 border border-purple-700/40 rounded-xl px-5 py-4 hover:border-purple-500/60 transition-colors"
              >
                <p className="text-purple-400 text-xs uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-white font-semibold text-sm">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
