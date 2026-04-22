// D:\Personal App\Seline Porto NextJS ExpressJS\frontend_project\app\page.tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoreSkillsSection from "@/components/CoreSkillsSection";
import ContactSection from "@/components/ContactSection";
import CertificateSection from "@/components/CertificateSection";
import CommentSection from "@/components/CommentSection";
import ParticleOverlay from "@/components/ParticleOverlay";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0010] text-white overflow-x-hidden">
      <ParticleOverlay />
      <Navbar />
      <main>
        {/* Tab 1 - Home */}
        <section id="home">
          <HeroSection />
          <AboutSection />
        </section>

        {/* Tab 2 - Core Skills */}
        <section id="core-skills">
          <CoreSkillsSection />
        </section>

        {/* Contact */}
        <section id="contact">
          <ContactSection />
          <CertificateSection />
          <CommentSection />
        </section>
      </main>
    </div>
  );
}