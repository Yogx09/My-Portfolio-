import ScrollySection from "@/components/ScrollySection";
import Projects from "@/components/Projects";
import AgencyShowcase from "@/components/AgencyShowcase";
import TechMarquee from "@/components/TechMarquee";
import NavigationParallax from "@/components/NavigationParallax";
import FeaturedHighlight from "@/components/FeaturedHighlight";

export default function Home() {
  return (
    <main className="bg-[#121212] text-white min-h-screen">
      <ScrollySection />

      {/* Animated Infinite Tech Marquee */}
      <TechMarquee />

      {/* Main Dashboard */}
      <Projects />
      
      {/* Zylo-Style 3D Agency Integration Below Dashboard */}
      <AgencyShowcase />

      {/* Dribbble-Style Magnetic Highlight Section */}
      <FeaturedHighlight />

      {/* 3D Cinematic Navigation Grid - Navigation Section */}
      <NavigationParallax />
    </main>
  );
}
