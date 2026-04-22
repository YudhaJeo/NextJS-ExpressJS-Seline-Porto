// D:\Personal App\Seline Porto NextJS ExpressJS\frontend_project\components\HeroSection.tsx
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-5xl w-full flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
          <p className="text-purple-400 text-sm tracking-widest uppercase font-semibold">
            Hello, I&apos;m
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            <span className="text-white">Jesseline</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
              Roniar
            </span>
          </h1>
          <p className="text-lg md:text-xl text-purple-200 font-light max-w-md">
            Building worlds through code & pixels —<br />
            <span className="text-purple-400 font-medium">Game Developer · Web Programmer · Visual Creator</span>
          </p>
          <p className="text-purple-300/80 text-base max-w-lg">
            Hi! I&apos;m Jess, a PPLG student specializing in game development and web programming.
            I combine technical skills with a creative visual side to build engaging digital experiences.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-2">
            <a
              href="#core-skills"
              className="px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-full text-sm font-semibold transition-colors"
            >
              View My Skills
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-purple-500 hover:border-purple-300 text-purple-300 hover:text-white rounded-full text-sm font-semibold transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Photo */}
        <div className="flex-shrink-0 relative">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-purple-600/60 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
            <Image
              src="/seline-1.PNG"
              alt="Jesseline Roniar"
              width={288}
              height={288}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full border border-purple-400/20 scale-110 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
