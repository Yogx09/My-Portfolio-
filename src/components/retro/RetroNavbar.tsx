"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, ArrowRight, Bookmark } from "lucide-react";
import { NavTab } from "./RetroTerminalOS";
import { retroAudio } from "./RetroAudio";

interface RetroNavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onLetsBuildClick?: () => void;
}

export default function RetroNavbar({
  activeTab,
  onSelectTab,
  onLetsBuildClick,
}: RetroNavbarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Only show navbar when user scrolls down past the landing intro
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: { id: NavTab; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "about", label: "About" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (tab: NavTab) => {
    retroAudio.playBeep(880, 0.04);
    onSelectTab(tab);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    retroAudio.playBeep(1200, 0.05);
  };

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 px-4 sm:px-8 max-w-[1400px] mx-auto flex items-center justify-between transition-all duration-500 pointer-events-none ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-6 opacity-0"
      }`}
    >
      {/* 1. Left Floating Logo: ▲ YOGX STUDIO */}
      <div 
        onClick={() => handleNavClick("home")}
        className="px-4 py-2 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center gap-2 cursor-pointer select-none pointer-events-auto transition-all hover:scale-105"
      >
        <span className="text-emerald-500 text-xs font-black">▲</span>
        <span className="font-extrabold text-sm tracking-tight text-slate-950 flex items-center gap-1">
          <span>YOGX</span>
          <span className="text-amber-500 font-black">STUDIO</span>
        </span>
      </div>

      {/* 2. Center Minimal Floating Nav Capsule */}
      <nav className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-white/85 hover:bg-white/95 backdrop-blur-md border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] pointer-events-auto transition-all">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-3 py-1 text-xs font-bold transition-all duration-200 cursor-pointer flex flex-col items-center ${
                isActive
                  ? "text-slate-950 font-black"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <span>{item.label}</span>
              {isActive && (
                <span className="w-4 h-[2px] rounded-full bg-amber-500 mt-0.5 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. Right Floating Action Buttons */}
      <div className="flex items-center gap-2.5 pointer-events-auto">
        {/* Let's Connect Button - Sleek Dark Capsule matching mock */}
        <button
          onClick={() => {
            retroAudio.playBeep(1400, 0.08);
            if (onLetsBuildClick) onLetsBuildClick();
          }}
          className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-black text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(15,23,42,0.25)] hover:shadow-[0_6px_25px_rgba(245,158,11,0.3)] cursor-pointer backdrop-blur-md hover:scale-105 border border-slate-800"
        >
          <span>Let&apos;s Connect</span>
          <ArrowRight size={13} className="text-amber-400" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="w-9 h-9 rounded-full border border-slate-200/60 bg-white/80 hover:bg-white flex items-center justify-center text-slate-700 hover:text-slate-950 transition-all cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.06)] backdrop-blur-md hover:scale-105"
          title="Toggle Theme"
        >
          {isDarkMode ? <Moon size={15} className="text-amber-600" /> : <Sun size={15} className="text-amber-500" />}
        </button>
      </div>
    </header>
  );
}
