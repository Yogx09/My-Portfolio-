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
    { value: "100%", label: "Passion Driven" },
    { value: "∞", label: "Ideas Ahead" },
  ];

  const sections = ["01", "02", "03", "04"];

  return (
    <section id="hero-section" className="relative min-h-screen w-full bg-[#fafbfc] text-slate-900 pt-24 pb-16 px-6 sm:px-12 flex flex-col justify-between overflow-hidden">
      {/* Background Soft Ambient Light */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-amber-400/[0.08] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-yellow-300/[0.05] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container Grid */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        {/* LEFT COLUMN: HERO HEADLINE & ACTIONS */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-7 select-none">
          {/* Greeting Pill */}
          <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full bg-[#fef3c7]/60 border border-amber-300/60 text-amber-900 text-xs font-semibold shadow-2xs">
            <span>👋 Hello, I&apos;m Yogesh</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>

          {/* Bold Typography */}
          <div className="space-y-0.5 font-sans">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight text-slate-950 leading-[1.05]">
              Same
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight text-slate-950 leading-[1.05]">
              Curiosity
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 bg-clip-text text-transparent leading-[1.05] drop-shadow-[0_4px_25px_rgba(245,158,11,0.25)]">
              Bigger
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight text-slate-950 leading-[1.05]">
              Possibilities
            </h1>
          </div>

          {/* Subheading with Gold Dividers */}
          <div className="space-y-2 max-w-lg">
            <div className="text-sm sm:text-base font-semibold text-slate-800 flex items-center gap-3">
              <span>Developer</span>
              <span className="text-amber-500 font-bold">|</span>
              <span>Problem Solver</span>
              <span className="text-amber-500 font-bold">|</span>
              <span>Builder</span>
            </div>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
              I turn ideas into real world high-impact digital experiences with code, creativity, and precision engineering.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* View My Work Button */}
            <button
              onClick={() => {
                retroAudio.playBeep(1200, 0.08);
                onSelectTab("projects");
                if (onScrollToExplore) onScrollToExplore();
              }}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-[0_10px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.5)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span>View My Work</span>
              <ArrowRight size={16} />
            </button>

            {/* Get In Touch Button */}
            <button
              onClick={() => {
                retroAudio.playBeep(880, 0.06);
                onSelectTab("contact");
              }}
              className="px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer hover:scale-105"
            >
              Get In Touch
            </button>
          </div>

          {/* Bottom Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-200/80">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-0.5 text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
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
