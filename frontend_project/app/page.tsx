// app/page.tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CommentSection from "@/components/CommentSection";
import SnowOverlay from "@/components/SnowOverlay";
import ScanlineOverlay from "@/components/ScanlineOverlay";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#07000f] text-white overflow-x-hidden">
      <ScanlineOverlay />
      <SnowOverlay />
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar activePage="home" />
        <main>
          <HeroSection />
          <AboutSection />
          <CommentSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}