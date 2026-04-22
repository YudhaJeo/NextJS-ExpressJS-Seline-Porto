// D:\Personal App\Seline Porto NextJS ExpressJS\frontend_project\components\ContactSection.tsx
const contacts = [
  {
    label: "Email",
    value: "Xvivydiva@gmail.com",
    href: "mailto:Xvivydiva@gmail.com",
    icon: "✉️",
  },
  {
    label: "Instagram",
    value: "@Jesseline_Vel",
    href: "https://instagram.com/Jesseline_Vel",
    icon: "📸",
  },
  {
    label: "GitHub",
    value: "github.com/Selineajasih",
    href: "https://github.com/Selineajasih",
    icon: "🐙",
  },
  {
    label: "WhatsApp",
    value: "+62 852-1398-8015",
    href: "https://wa.me/6285213988015",
    icon: "💬",
  },
];

export default function ContactSection() {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm tracking-widest uppercase font-semibold mb-2">Let&apos;s Talk</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Contact</h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-purple-500 to-violet-400 mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 bg-purple-900/20 border border-purple-700/30 rounded-2xl px-4 py-6 hover:border-purple-500/60 hover:bg-purple-800/30 transition-all text-center group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{c.icon}</span>
              <p className="text-purple-300 text-xs uppercase tracking-wider font-semibold">{c.label}</p>
              <p className="text-white text-sm font-medium break-all">{c.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
