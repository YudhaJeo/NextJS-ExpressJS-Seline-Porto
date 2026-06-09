// app/page.tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CommentSection from "@/components/CommentSection";
import CoreSkillsSection from "@/components/CoreSkillsSection";
import ContactSection from "@/components/ContactSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import CertificateSection from "@/components/CertificateSection";
import SnowOverlay from "@/components/SnowOverlay";
import ParallaxScene from "@/components/ParallaxScene";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <ParallaxScene>
      <SnowOverlay />
      <Navbar />
      <main>
        <section id="home"><HeroSection /></section>
        <section id="about"><AboutSection /></section>
        <section id="skills"><CoreSkillsSection /></section>
        <section id="showcase"><ShowcaseSection /></section>
        <section id="certificates"><CertificateSection /></section>
        <section id="contact"><ContactSection /></section>
        <CommentSection />
      </main>
      <Footer />
    </ParallaxScene>
  );
}