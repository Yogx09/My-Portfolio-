import ScrollySection from "@/components/ScrollySection";
import Projects from "@/components/Projects";
import AgencyShowcase from "@/components/AgencyShowcase";
import TechMarquee from "@/components/TechMarquee";
import NavigationParallax from "@/components/NavigationParallax";
import FeaturedHighlight from "@/components/FeaturedHighlight";
import LiquidAbout from "@/components/LiquidAbout";

export default function Home() {
  return (
    <main className="bg-[#121212] text-white min-h-screen">
      {/* 1. Scrollytelling Canvas Video Sequence */}
      <ScrollySection />

      {/* 2. Animated Infinite Tech Marquee */}
      <TechMarquee />

      {/* 3. Main 3D Dashboard & Projects with 4-Diamond Radar */}
      <Projects />
      
      {/* 4. Zylo-Style 3D Agency Showcase */}
      <AgencyShowcase />

      {/* 5. Physics-based Liquid About Section */}
      <LiquidAbout />

      {/* 6. Dribbble-Style Magnetic Highlight Section */}
      <FeaturedHighlight />

      {/* 7. 3D Cinematic Navigation Grid - Nexus Contact Section */}
      <NavigationParallax />
    </main>
  );
}
