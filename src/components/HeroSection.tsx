"use client";

import React, { useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import RetroWorkstation3DCanvas from "./retro/RetroWorkstation3DCanvas";
import { retroAudio } from "./retro/RetroAudio";
import { NavTab } from "./retro/RetroTerminalOS";

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

  const stats = [
    { value: "5+", label: "Projects Built" },
    { value: "2+", label: "Years Learning" },
    { value: "100%", label: "Dedication" },
    { value: "∞", label: "Ideas Ahead" },
  ];

  const sections = ["01", "02", "03", "04"];

  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full bg-[#fafbfc] text-slate-900 pt-24 pb-16 px-6 sm:px-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle Warm Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-amber-400/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-yellow-300/[0.05] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container Grid */}
      <div className="relative z-15 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* LEFT COLUMN: HERO HEADLINE & ACTIONS */}
        <div className="lg:col-span-5 flex flex-col justify-center select-none">
          {/* Hello Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-2 border border-[#f5d993] bg-[rgba(255,249,230,0.9)] rounded-full text-[13px] font-semibold text-[#080b16] w-fit mb-5 shadow-xs">
            <span>👋 Hello, I&apos;m Yogesh</span>
            <span className="w-2 h-2 rounded-full bg-[#f5a400] shadow-[0_0_0_5px_rgba(245,164,0,0.1)]" />
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-bold tracking-tight text-[#080b16] leading-[0.92]">
            Same<br />
            Curiosity<br />
            <span className="text-[#f5a400]">Bigger</span><br />
            Possibilities
          </h1>

          {/* Subtitle with Separators */}
          <div className="flex items-center gap-3.5 mt-7 text-base font-bold text-[#080b16]">
            <span>Developer</span>
            <span className="w-[2px] h-[18px] bg-[#f5a400]" />
            <span>Problem Solver</span>
            <span className="w-[2px] h-[18px] bg-[#f5a400]" />
            <span>Builder</span>
          </div>

          {/* Description */}
          <p className="max-w-[520px] mt-3.5 text-[#667085] text-base leading-relaxed">
            I turn ideas into real-world high-impact digital experiences with code, creativity, and precision engineering.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mt-7">
            <button
              onClick={() => {
                retroAudio.playBeep(1200, 0.08);
                onSelectTab("projects");
                if (onScrollToExplore) onScrollToExplore();
              }}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-br from-[#ffb000] to-[#f39a00] text-[#080b16] font-bold text-sm shadow-[0_15px_30px_rgba(245,164,0,0.25)] hover:shadow-[0_20px_40px_rgba(245,164,0,0.35)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <span>View My Work →</span>
            </button>

            <button
              onClick={() => {
                retroAudio.playBeep(880, 0.06);
                onSelectTab("contact");
              }}
              className="px-6 py-3.5 rounded-2xl border border-[#dfe3e8] bg-white text-[#171c28] font-bold text-sm hover:-translate-y-1 hover:border-[#f5a400] transition-all duration-300 shadow-xs cursor-pointer"
            >
              Get In Touch
            </button>
          </div>

          {/* Stats Row */}
          <div className="flex gap-0 mt-10 pt-6 border-t border-[#e8ebef] max-w-full sm:w-[570px]">
            <div className="flex-1 border-r border-[#e5e7eb] pr-5 mr-5">
              <div className="font-bold text-2xl sm:text-3xl text-[#080b16]">5+</div>
              <div className="text-xs text-[#89919e] mt-1 font-medium">Projects Built</div>
            </div>
            <div className="flex-1 border-r border-[#e5e7eb] pr-5 mr-5">
              <div className="font-bold text-2xl sm:text-3xl text-[#080b16]">2+</div>
              <div className="text-xs text-[#89919e] mt-1 font-medium">Years Learning</div>
            </div>
            <div className="flex-1 border-r border-[#e5e7eb] pr-5 mr-5">
              <div className="font-bold text-2xl sm:text-3xl text-[#080b16]">100%</div>
              <div className="text-xs text-[#89919e] mt-1 font-medium">Dedication</div>
            </div>
            <div className="flex-1">
              <div className="font-bold text-2xl sm:text-3xl text-[#080b16]">∞</div>
              <div className="text-xs text-[#89919e] mt-1 font-medium">Ideas Ahead</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CERAMIC WHITE 3D WORKSTATION ON DESK */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          {/* Subtle Warm Glow Behind Monitor */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-300/15 to-transparent blur-3xl rounded-full pointer-events-none scale-90" />

          {/* 3D Monitor Canvas */}
          <div className="w-full flex items-center justify-center relative z-10">
            <RetroWorkstation3DCanvas
              activeTab={activeTab}
              onSelectTab={onSelectTab}
              onNavigateSection={onScrollToExplore}
            />
          </div>

          {/* Handwriting Element: "A Better Tomorrow" with Arrow */}
          <div className="absolute -bottom-6 left-16 sm:left-24 hidden md:flex items-center gap-2 pointer-events-none select-none">
            <span className="font-serif italic text-slate-400 text-base">
              A Better Tomorrow
            </span>
            <svg className="w-8 h-8 text-slate-400 rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 14c4 0 7-3 10-6m0 0l-3 1m3-1l-1 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
                  ? "w-7 h-7 rounded-full border border-amber-400 text-amber-600 font-bold bg-amber-50 shadow-xs scale-110"
                  : "hover:text-slate-900"
              }`}
            >
              {sec}
            </button>
          );
        })}
      </div>

      {/* BOTTOM RIGHT: SCROLL TO EXPLORE INDICATOR */}
      <div className="hidden sm:flex fixed bottom-8 right-8 z-40 flex-col items-center gap-2 text-slate-400 select-none pointer-events-none">
        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
          <div>SCROLL</div>
          <div className="text-[8px] text-slate-400">to explore</div>
        </div>
        <div className="w-7 h-7 rounded-full border border-amber-400/50 bg-amber-50/50 flex items-center justify-center text-amber-600 shadow-2xs">
          <ArrowDown size={12} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
