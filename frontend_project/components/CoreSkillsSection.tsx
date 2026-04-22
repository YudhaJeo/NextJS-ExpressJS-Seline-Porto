// D:\Personal App\Seline Porto NextJS ExpressJS\frontend_project\components\ContactSection.tsx
const hardSkills = [
  { name: "English Communication + IELTS (soon)", icon: "🌐" },
  { name: "Digital Illustrator", icon: "🎨" },
  { name: "Website Programming (Front/Back End)", icon: "💻" },
  { name: "Video / Photo Editing", icon: "🎬" },
];

const softSkills = [
  { name: "Public Speaking", icon: "🎤" },
  { name: "Time Management", icon: "⏱️" },
  { name: "Creative Thinking", icon: "💡" },
  { name: "Negotiation", icon: "🤝" },
  { name: "Team Work", icon: "👥" },
];

function SkillCard({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="flex items-center gap-3 bg-purple-900/20 border border-purple-700/30 rounded-xl px-4 py-3 hover:border-purple-500/50 hover:bg-purple-800/30 transition-all">
      <span className="text-xl">{icon}</span>
      <span className="text-purple-100 text-sm font-medium">{name}</span>
    </div>
  );
}

export default function CoreSkillsSection() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm tracking-widest uppercase font-semibold mb-2">What I Can Do</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Core Skills</h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-purple-500 to-violet-400 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Hard Skills */}
          <div>
            <h3 className="text-purple-300 text-xs uppercase tracking-widest font-semibold mb-4">
              Hard Skills
            </h3>
            <div className="flex flex-col gap-3">
              {hardSkills.map((s) => (
                <SkillCard key={s.name} name={s.name} icon={s.icon} />
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-purple-300 text-xs uppercase tracking-widest font-semibold mb-4">
              Soft Skills
            </h3>
            <div className="flex flex-col gap-3">
              {softSkills.map((s) => (
                <SkillCard key={s.name} name={s.name} icon={s.icon} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
