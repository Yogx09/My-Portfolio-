import ScrollySection from "@/components/ScrollySection";
import Projects from "@/components/Projects";
import TechMarquee from "@/components/TechMarquee";
import NavigationParallax from "@/components/NavigationParallax";

export default function Home() {
  return (
    <main className="bg-[#121212] text-white min-h-screen">
      <ScrollySection />

      {/* Animated Infinite Tech Marquee */}
      <TechMarquee />

      {/* 3D Cinematic Navigation Grid */}
      <NavigationParallax />

      {/* Main Dashboard -> Scroll naturally to enter */}
      <Projects />
    </main>
  );
}
