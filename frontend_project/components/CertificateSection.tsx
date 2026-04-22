// D:\Personal App\Seline Porto NextJS ExpressJS\frontend_project\components\CertificateSection.tsx
const certificates = [
  {
    label: "Dicoding Financial Literacy",
    file: "/certificates/sertif-dicoding-financial-literacy.pdf",
  },
  {
    label: "Dirjen Pendidikan Vokasi – Financial Literacy",
    file: "/certificates/sertif-dirjen-vokasi-financial-literacy.pdf",
  },
  {
    label: "JHIC Certificate",
    file: "/certificates/sertif-jhic.pdf",
  },
  {
    label: "Semi Finalis JHIC",
    file: "/certificates/sertif-semi-finalis-jhic.pdf",
  },
];

export default function CertificateSection() {
  return (
    <section className="relative z-10 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-purple-400 text-sm tracking-widest uppercase font-semibold mb-2">Achievements</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Certificates</h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-purple-500 to-violet-400 mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <a
              key={cert.label}
              href={cert.file}
              download
              className="flex items-center gap-4 bg-purple-900/20 border border-purple-700/30 rounded-xl px-5 py-4 hover:border-purple-500/60 hover:bg-purple-800/30 transition-all group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">📄</span>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{cert.label}</p>
                <p className="text-purple-400 text-xs mt-0.5">Click to download PDF</p>
              </div>
              <span className="text-purple-400 group-hover:text-purple-200 transition-colors text-sm">↓</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
