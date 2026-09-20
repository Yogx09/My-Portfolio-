"use client";

import React, { useState } from "react";
import RetroNavbar from "@/components/retro/RetroNavbar";
import RetroHeroSection from "@/components/retro/RetroHeroSection";
import { NavTab } from "@/components/retro/RetroTerminalOS";
import AgencyShowcase from "@/components/AgencyShowcase";
import TechMarquee from "@/components/TechMarquee";
import NavigationParallax from "@/components/NavigationParallax";
import FeaturedHighlight from "@/components/FeaturedHighlight";
import LiquidAbout from "@/components/LiquidAbout";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("home");

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTabSelect = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === "projects") {
      scrollToSection("agency-showcase");
    } else if (tab === "about") {
      scrollToSection("liquid-about");
    } else if (tab === "contact") {
      scrollToSection("contact-section");
    } else if (tab === "skills") {
      scrollToSection("skills-section");
    }
  };

  return (
    <main className="bg-[#fafbfc] text-slate-900 min-h-screen relative selection:bg-amber-500/30 selection:text-amber-900">
      {/* 1. Top Glassmorphic Navigation */}
      <RetroNavbar
        activeTab={activeTab}
        onSelectTab={handleTabSelect}
        onLetsBuildClick={() => {
          setActiveTab("contact");
          scrollToSection("contact-section");
        }}
      />

      {/* 2. Main Studio Hero: Same Curiosity Bigger Possibilities + 3D Ceramic Workstation Display */}
      <RetroHeroSection
        activeTab={activeTab}
        onSelectTab={handleTabSelect}
        onScrollToDashboard={() => scrollToSection("agency-showcase")}
      />

      {/* 3. Infinite Tech Stack Marquee */}
      <div id="skills-section">
        <TechMarquee />
      </div>

      {/* 4. 3D Agency Showcase & Projects */}
      <div id="agency-showcase">
        <AgencyShowcase />
      </div>

      {/* 5. Physics-based Liquid About Section */}
      <div id="liquid-about">
        <LiquidAbout />
      </div>

      {/* 6. Dribbble-Style Magnetic Highlight Section */}
      <FeaturedHighlight />

      {/* 7. 3D Cinematic Navigation Grid - Nexus Contact Section */}
      <div id="contact-section">
        <NavigationParallax />
      </div>
    </main>
  );
}
