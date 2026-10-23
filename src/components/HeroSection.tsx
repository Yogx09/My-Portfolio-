"use client";

import React, { useState } from "react";
import RetroWorkstation3DCanvas from "./retro/RetroWorkstation3DCanvas";
import { retroAudio } from "./retro/RetroAudio";
import { NavTab } from "./retro/RetroTerminalOS";
import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing";

export { type NavTab } from "./retro/RetroTerminalOS";

interface HeroSectionProps {
  activeTab?: NavTab;
  onSelectTab?: (tab: NavTab) => void;
  onScrollToExplore?: () => void;
}

export default function HeroSection({
  activeTab = "home",
  onSelectTab = () => {},
  onScrollToExplore,
}: HeroSectionProps) {
  const [activeSection, setActiveSection] = useState("01");

  const sections = ["01", "02", "03", "04"];

  const topNavLinks: { id: NavTab; label: string }[] = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (tab: NavTab) => {
    retroAudio.playBeep(920, 0.05);
    onSelectTab(tab);
  };

  return (
    <section
      id="hero-section"
      className="relative h-screen min-h-[640px] max-h-[1080px] w-full bg-[#fafbfc] text-slate-900 px-4 sm:px-8 md:px-12 py-3 sm:py-5 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Ambient Radial Golden Glows matching mock */}
      <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] bg-amber-400/[0.12] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-yellow-300/[0.08] rounded-full blur-[140px] pointer-events-none" />

      {/* ============================================================== */}
      {/* 1. TOP HEADER NAVIGATION BAR (MATCHING MOCKUP EXACTLY) */}
      {/* ============================================================== */}
      <header className="relative z-30 max-w-[1440px] mx-auto w-full flex items-center justify-between py-1.5 sm:py-2 select-none shrink-0">
        {/* Left Pills */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-slate-900/10 bg-slate-950 text-amber-400 rounded-full text-xs font-mono font-bold tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>HOME // WORKSTATION</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-[#f5d993] bg-[rgba(255,249,230,0.95)] rounded-full text-xs font-semibold text-[#080b16] shadow-2xs">
            <span>👋 Hello, I&apos;m Yogesh</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a400]" />
          </div>
        </div>

        {/* Right Links & Online Status Pill */}
        <div className="flex items-center gap-6 sm:gap-8">
          <nav className="hidden sm:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {topNavLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors cursor-pointer hover:text-slate-950 ${
                    isActive ? "text-slate-950 font-bold" : "text-slate-600"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* ONLINE Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-mono font-bold tracking-wider shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>ONLINE</span>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 2. MAIN SPLIT HERO: WAVING POSTER (LEFT) & 3D WORKSTATION (RIGHT) */}
      {/* ============================================================== */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
        
        {/* LEFT COLUMN: WAVING POSTER + CALL TO ACTIONS */}
        <div className="lg:col-span-6 flex flex-col justify-center h-full max-h-full select-none relative">
          
          {/* Subtle Doodle Lightning Bolt on Left Border */}
          <div className="absolute -left-6 top-8 hidden sm:block pointer-events-none opacity-80 text-[#e5262c]">
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2 L2 20 L11 20 L5 38 L21 16 L12 16 Z" fill="#e5262c" />
            </svg>
          </div>

          {/* The Main Interactive Waving Poster Component - SIZED TO SCREEN */}
          <div className="w-full flex-1 min-h-[300px] max-h-[55vh] relative overflow-hidden flex items-center justify-center">
            <WavingPortfolioLanding
              name="KEDHARESWER"
              year="2026"
              roles={["GRAPHIC DESIGNER", "ILLUSTRATOR"]}
              lettersLeft={["P", "F"]}
              giantLetter="O"
              lettersRight={["RT", "LIO"]}
              title="Portfolio"
              signature="KEDHA/RESWER"
              greeting="Hi there!"
              accent="#e5262c"
              paper="transparent"
              ink="#141414"
              showCornerDice={false}
              showSignature={false}
              showDoodles={true}
              height="100%"
              intro={true}
              className="w-full h-full wpl-hero-mode"
            />
          </div>

          {/* Action Buttons underneath Poster */}
          <div className="flex flex-wrap items-center gap-3.5 mt-3 sm:mt-4 pl-2 sm:pl-4 shrink-0">
            <button
              onClick={() => {
                retroAudio.playBeep(1200, 0.08);
                onSelectTab("projects");
                if (onScrollToExplore) onScrollToExplore();
              }}
              className="px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#ffb400] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] text-[#080b16] font-bold text-sm shadow-[0_12px_24px_rgba(245,164,0,0.3)] hover:shadow-[0_16px_32px_rgba(245,164,0,0.4)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <span>View My Work →</span>
            </button>

            <button
              onClick={() => {
                retroAudio.playBeep(880, 0.06);
                onSelectTab("contact");
              }}
              className="px-6 py-3 rounded-full border border-slate-300/80 bg-white hover:bg-slate-50 text-[#171c28] font-bold text-sm hover:-translate-y-0.5 hover:border-amber-400 transition-all duration-300 shadow-2xs cursor-pointer"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D WORKSTATION ON DESK + WARM GLOW & SKETCH DOODLES */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center h-full max-h-full relative mt-4 lg:mt-0">
          
          {/* Warm Golden Halo Glow Behind Monitor */}
          <div className="absolute inset-0 -top-10 -bottom-10 bg-gradient-to-tr from-amber-400/35 via-yellow-300/25 to-orange-400/10 blur-[100px] rounded-full pointer-events-none scale-105" />

          {/* Hand-Drawn Red Lightning Bolts & Sparks Around Monitor (from Screenshot) */}
          <div className="absolute -top-6 -right-2 hidden sm:block pointer-events-none z-30 select-none text-[#e5262c]">
            <svg width="70" height="70" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              {/* Double Lightning Bolt */}
              <path d="M 32 8 L 48 8 L 38 28 L 56 28 L 26 66 L 36 38 L 24 38 Z" fill="#e5262c" />
              <path d="M 58 14 L 68 6 M 66 26 L 76 20" strokeWidth="3" />
            </svg>
          </div>

          <div className="absolute -bottom-4 -right-4 hidden sm:block pointer-events-none z-30 select-none text-[#e5262c]">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              {/* Bottom Right Bolt & Ticks */}
              <path d="M 24 10 L 14 28 L 26 28 L 10 52 L 36 30 L 24 30 Z" fill="#e5262c" />
              <path d="M 40 40 L 48 48 M 34 50 L 42 58" strokeWidth="2.5" />
            </svg>
          </div>

          <div className="absolute top-1/3 -left-4 hidden md:block pointer-events-none z-30 select-none text-[#e5262c]">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M 10 8 L 22 22 M 25 10 L 35 24" />
            </svg>
          </div>

          {/* 3D Monitor Canvas with live interactive CSS3D display */}
          <div className="w-full flex items-center justify-center relative z-10">
            <RetroWorkstation3DCanvas
              activeTab={activeTab}
              onSelectTab={onSelectTab}
              onNavigateSection={onScrollToExplore}
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE VERTICAL PAGINATION INDICATOR (01 02 03 04) */}
      <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-5 font-mono text-xs text-slate-400 select-none">
        {sections.map((sec) => {
          const isActive = activeSection === sec;
          return (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`transition-all cursor-pointer flex items-center justify-center ${
                isActive
                  ? "w-7 h-7 rounded-full border border-amber-400 text-amber-600 font-bold bg-amber-50 shadow-2xs scale-110"
                  : "hover:text-slate-900"
              }`}
            >
              {sec}
            </button>
          );
        })}
      </div>
    </section>
  );
}
