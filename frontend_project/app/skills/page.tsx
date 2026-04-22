// D:\Personal App\Seline Porto NextJS ExpressJS\frontend_project\app\skills\page.tsx
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
      <ScanlineOverlay />
      <SnowOverlay />
      <Navbar activePage="skills" />
      <main>
        <CoreSkillsSection />
        <ContactSection />
        <CertificateSection />
      </main>
      <Footer />
    </div>
  );
}
