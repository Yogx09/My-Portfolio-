"use client";

import React from "react";
import { ArrowRight, User, Sparkles } from "lucide-react";
import QuantumAtomCanvas from "./QuantumAtomCanvas";
import { retroAudio } from "./RetroAudio";
import { NavTab } from "./RetroTerminalOS";

interface SpiderHeroViewProps {
  onSwitchTab: (tab: NavTab) => void;
}

export default function SpiderHeroView({ onSwitchTab }: SpiderHeroViewProps) {
  return (
    <div className="flex-1 flex flex-col justify-between items-center relative text-center bg-gradient-to-b from-[#ffffff] via-[#fafbfc] to-[#f4f7fa] text-slate-900 p-6 overflow-hidden select-none">
      {/* 1. Subtle Radial Spider Web Lattice in Background (Tuned for White Canvas) */}
      <div className="absolute inset-0 pointer-events-none opacity-25 flex items-center justify-center">
        <svg className="w-full h-full max-w-[650px] max-h-[500px]" viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="60" stroke="#dc2626" strokeWidth="1" strokeDasharray="3,3" />
          <circle cx="250" cy="250" r="120" stroke="#dc2626" strokeWidth="1" />
          <circle cx="250" cy="250" r="180" stroke="#0284c7" strokeWidth="1" strokeDasharray="4,4" />
          <circle cx="250" cy="250" r="240" stroke="#dc2626" strokeWidth="1" opacity="0.6" />
          {/* Web Spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <line
                key={angle}
                x1="250"
                y1="250"
                x2={250 + Math.cos(rad) * 245}
                y2={250 + Math.sin(rad) * 245}
                stroke="#dc2626"
                strokeWidth="0.8"
                opacity="0.5"
              />
            );
          })}
        </svg>
      </div>

      {/* Ambient Warm Red & Gold Glows matching site pattern */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-red-500/[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-400/[0.08] rounded-full blur-[80px] pointer-events-none" />

      {/* 2. TOP: CLEAN TAGLINE ONLY (CRISP HIGH CONTRAST) */}
      <div className="relative z-10 space-y-1.5 pt-1">
        {/* Spider Protocol Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/80 text-red-700 text-[10px] font-mono font-bold tracking-widest uppercase shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span>SPIDER-OS // STARK PROTOCOL</span>
        </div>

        {/* The Punchy Tagline */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-950">
          &ldquo;With Great Code, Comes Great Responsibility.&rdquo;
        </h2>
        <div className="text-xs font-mono text-slate-500 font-semibold tracking-wider">
          Yogesh Sinde <span className="text-red-500 font-bold">•</span> Full-Stack Web Slinger &amp; 3D Engineer
        </div>
      </div>

      {/* 3. CENTER: GRAND AWESOME 3D SPIDER-ATOM ANIMATION */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        <QuantumAtomCanvas size={300} theme="spiderman-crimson" />
      </div>

      {/* 4. BOTTOM: SLEEK ACTION PILLS & STATUS */}
      <div className="relative z-10 w-full max-w-md pt-2 border-t border-slate-200/80 flex items-center justify-between">
        {/* Status indicator */}
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-red-700">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>SPIDER-SENSE 100%</span>
        </div>

        {/* Action Buttons matching website's signature style */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              retroAudio.playBeep(1300, 0.08);
              onSwitchTab("projects");
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white font-black text-xs flex items-center gap-1.5 shadow-[0_4px_15px_rgba(220,38,38,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>🕸️ Explore Projects</span>
            <ArrowRight size={13} />
          </button>

          <button
            onClick={() => {
              retroAudio.playBeep(900, 0.06);
              onSwitchTab("about");
            }}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
          >
            <User size={12} className="text-red-500" />
            <span>About Me</span>
          </button>
        </div>
      </div>
    </div>
  );
}
