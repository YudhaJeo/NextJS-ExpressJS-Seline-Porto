// app/skills/page.tsx
import Navbar from "@/components/Navbar";
import CoreSkillsSection from "@/components/CoreSkillsSection";
import ContactSection from "@/components/ContactSection";
import CertificateSection from "@/components/CertificateSection";
import SnowOverlay from "@/components/SnowOverlay";
import ScanlineOverlay from "@/components/ScanlineOverlay";
import Footer from "@/components/Footer";

export default function SkillsPage() {
  return (
    <div className="relative min-h-screen bg-[#07000f] text-white overflow-x-hidden">
      {/* z-index 0: background */}
      <ScanlineOverlay />
      {/* z-index 1: snow — di atas background, di bawah konten */}
      <SnowOverlay />
      {/* z-index 10: semua konten halaman */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar activePage="skills" />
        <main>
          <CoreSkillsSection />
          <ContactSection />
          <CertificateSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}