// app/page.tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CommentSection from "@/components/CommentSection";
import SnowOverlay from "@/components/SnowOverlay";
import ParallaxScene from "@/components/ParallaxScene";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <ParallaxScene>
      <SnowOverlay />
      <Navbar activePage="home" />
      <main>
        <HeroSection />
        <AboutSection />
        <CommentSection />
      </main>
      <Footer />
    </ParallaxScene>
  );
}