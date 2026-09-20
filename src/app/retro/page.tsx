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

export default function RetroPage() {
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
    }
  };

  return (
    <main className="bg-[#fafbfc] text-slate-900 min-h-screen relative selection:bg-amber-500/30 selection:text-amber-900">
      {/* Top Glassmorphic Retro Navbar */}
      <RetroNavbar
        activeTab={activeTab}
        onSelectTab={handleTabSelect}
        onLetsBuildClick={() => {
          setActiveTab("contact");
          scrollToSection("contact-section");
        }}
      />

      {/* Main Interactive Retro Workstation Hero Section */}
      <RetroHeroSection
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onScrollToDashboard={() => scrollToSection("agency-showcase")}
      />

      {/* Infinite Tech Marquee */}
      <TechMarquee />

      {/* 3D Agency Showcase Integration */}
      <div id="agency-showcase">
        <AgencyShowcase />
      </div>

      {/* Physics-based Liquid About Section */}
      <div id="liquid-about">
        <LiquidAbout />
      </div>

      {/* Dribbble-Style Magnetic Highlight Section */}
      <FeaturedHighlight />

      {/* 3D Cinematic Navigation Grid / Contact Section */}
      <div id="contact-section">
        <NavigationParallax />
      </div>
    </main>
  );
}
