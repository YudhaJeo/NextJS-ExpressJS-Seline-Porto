// app/skills/page.tsx
import Navbar from "@/components/Navbar";
import CoreSkillsSection from "@/components/CoreSkillsSection";
import ContactSection from "@/components/ContactSection";
import CertificateSection from "@/components/CertificateSection";
import SnowOverlay from "@/components/SnowOverlay";
import ParallaxScene from "@/components/ParallaxScene";
import Footer from "@/components/Footer";

export default function SkillsPage() {
  return (
    <ParallaxScene>
      <SnowOverlay />
      <Navbar activePage="skills" />
      <main>
        <CoreSkillsSection />
        <ContactSection />
        <CertificateSection />
      </main>
      <Footer />
    </ParallaxScene>
  );
}