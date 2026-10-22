"use client";

import React, { useState, useEffect } from "react";
import RetroNavbar from "@/components/retro/RetroNavbar";
import ScrollySection from "@/components/ScrollySection";
import HeroSection, { NavTab } from "@/components/HeroSection";
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

  useEffect(() => {
    if (window.location.hash === "#dashboard" || window.location.hash === "#hero-section") {
      setTimeout(() => {
        const el = document.getElementById("dashboard");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  }, []);

  const handleTabSelect = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === "home") {
      scrollToSection("dashboard");
    } else if (tab === "projects") {
      scrollToSection("agency-showcase");
    } else if (tab === "about") {
      scrollToSection("liquid-about");
    } else if (tab === "contact") {
      scrollToSection("contact-section");
    } else if (tab === "skills") {
      scrollToSection("skills-section");
    } else if (tab === "experience") {
      window.location.href = "/experience";
    }
  };

  return (
    <main className="bg-[#fafbfc] text-slate-900 min-h-screen relative selection:bg-amber-500/30 selection:text-amber-900">
      {/* Top Glassmorphic Navigation Bar */}
      <RetroNavbar
        activeTab={activeTab}
        onSelectTab={handleTabSelect}
        onLetsBuildClick={() => {
          setActiveTab("contact");
          scrollToSection("contact-section");
        }}
      />

      {/* 1. Landing Page Canvas Scrollytelling Sequence with Sanskrit Astra Loader */}
      <ScrollySection />

      {/* 2. Infinite Tech Stack Marquee (Between animated page and home page) */}
      <div id="skills-section">
        <TechMarquee />
      </div>

      {/* 3. Main Studio Hero Page with 3D Computer Workstation (Home / Dashboard) */}
      <div id="dashboard" className="scroll-mt-6">
        <HeroSection
          activeTab={activeTab}
          onSelectTab={handleTabSelect}
          onScrollToExplore={() => scrollToSection("agency-showcase")}
        />
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
