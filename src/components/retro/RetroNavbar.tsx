"use client";

import React, { useState } from "react";
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
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-4 flex items-center justify-between backdrop-blur-md bg-[#fafbfc]/90 transition-all border-b border-slate-100">
      {/* Brand Logo */}
      <div 
        onClick={() => handleNavClick("home")}
        className="flex items-center gap-3 cursor-pointer select-none group"
      >
        <span className="font-extrabold text-2xl tracking-tighter text-slate-950 flex items-center">
          YOG<span className="text-amber-500">X</span>
        </span>
      </div>

      {/* Center Nav Links */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="relative text-sm font-semibold transition-colors duration-200 cursor-pointer text-slate-700 hover:text-slate-950 flex flex-col items-center"
            >
              <span>{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Let's Connect CTA & Theme Toggle */}
      <div className="flex items-center gap-4">
        {/* Let's Connect Button */}
        <button
          onClick={() => {
            retroAudio.playBeep(1400, 0.08);
            if (onLetsBuildClick) onLetsBuildClick();
          }}
          className="px-5 py-2 rounded-full border border-amber-400/60 bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 text-slate-900 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
        >
          <span>Let&apos;s Connect</span>
          <ArrowRight size={14} className="text-amber-600 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={handleThemeToggle}
          className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-950 hover:border-slate-400 transition-all cursor-pointer bg-white shadow-sm"
          title="Toggle Theme"
        >
          {isDarkMode ? <Moon size={16} className="text-amber-600" /> : <Sun size={16} className="text-amber-500" />}
        </button>

        {/* Top Right Bookmark Badge */}
        <div className="hidden lg:flex w-12 h-14 rounded-2xl bg-slate-200/60 backdrop-blur-md items-center justify-center text-slate-500 shadow-sm ml-2">
          <Bookmark size={20} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}
