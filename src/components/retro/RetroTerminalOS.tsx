"use client";

import React, { useState } from "react";
import { 
  Home, 
  LayoutGrid, 
  User, 
  Code2, 
  Mail, 
  Sun,
  ArrowRight,
  Play,
  TrendingUp,
  ExternalLink,
  Sparkles,
  BarChart3
} from "lucide-react";
import RetroGlobeCanvas from "./RetroGlobeCanvas";
import { retroAudio } from "./RetroAudio";

export type NavTab = "home" | "projects" | "about" | "skills" | "experience" | "blog" | "contact";

interface RetroTerminalOSProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  className?: string;
  onNavigateSection?: (sectionId?: string) => void;
}

export default function RetroTerminalOS({
  activeTab,
  onSelectTab,
  className = "",
  onNavigateSection
}: RetroTerminalOSProps) {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleTabChange = (tab: NavTab) => {
    retroAudio.playBeep(920, 0.05);
    onSelectTab(tab);
  };

  const projectList = [
    {
      id: "stockpulse",
      title: "StockPulse AI",
      tag: "FinTech & Realtime AI",
      stack: ["Next.js", "TypeScript", "Tailwind", "OpenAI"],
      desc: "An intelligent market telemetry & analytics suite with real-time sentiment extraction.",
      liveUrl: "https://stockpulse-alpha.vercel.app",
    },
    {
      id: "cinematic-3d",
      title: "Cinematic 3D Engine",
      tag: "WebGL & Three.js",
      stack: ["Three.js", "WebGL", "Framer Motion", "GLSL"],
      desc: "Interactive visual experience with custom physics, dynamic studio lighting.",
      liveUrl: "#dashboard",
    },
    {
      id: "vanguard-cyber",
      title: "Vanguard Cyber Telemetry",
      tag: "Cloud & DevSecOps",
      stack: ["Go", "React", "Docker", "Prometheus"],
      desc: "Real-time threat monitoring dashboard with network anomaly inspection.",
      liveUrl: "#dashboard",
    },
  ];

  return (
    <div className={`w-full h-full bg-[#fafbfc] text-slate-900 flex flex-col select-text font-sans relative overflow-hidden ${className}`}>
      {/* 1. TOP BAR INSIDE SCREEN */}
      <div className="h-12 bg-white/95 border-b border-slate-100 px-6 flex items-center justify-between text-xs select-none z-20 shrink-0">
        {/* Left Brand */}
        <div className="flex items-center gap-2">
          <span className="font-extrabold tracking-tight text-slate-900 text-sm font-sans">
            YOGX <span className="text-amber-500 font-normal">STUDIO</span>
          </span>
        </div>

        {/* Center Nav Links inside screen */}
        <div className="hidden sm:flex items-center gap-6 text-[11px] font-semibold text-slate-600">
          {[
            { id: "home", label: "Home" },
            { id: "projects", label: "Projects" },
            { id: "skills", label: "Skills" },
            { id: "about", label: "About" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id as NavTab)}
              className="relative hover:text-slate-950 transition-colors flex flex-col items-center cursor-pointer"
            >
              <span>{item.label}</span>
              {activeTab === item.id && (
                <span className="w-1 h-1 rounded-full bg-amber-500 mt-0.5" />
              )}
            </button>
          ))}
        </div>

        {/* Right Action Button & Theme inside screen */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleTabChange("contact")}
            className="px-3.5 py-1.5 rounded-full border border-amber-400/60 bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 text-slate-900 font-bold text-[10px] flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <span>Build Together</span>
            <ArrowRight size={11} className="text-amber-600" />
          </button>
          <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 bg-white">
            <Sun size={12} className="text-amber-500" />
          </div>
        </div>
      </div>

      {/* 2. MAIN SCREEN BODY */}
      <div className="flex-1 flex overflow-hidden z-10 relative">
        {/* LEFT COMPACT ICON DOCK */}
        <div className="w-14 bg-white/80 border-r border-slate-100 p-2 flex flex-col items-center gap-3 select-none shrink-0 justify-start pt-6">
          {[
            { id: "home", icon: Home },
            { id: "projects", icon: LayoutGrid },
            { id: "skills", icon: Code2 },
            { id: "about", icon: User },
            { id: "contact", icon: Mail },
          ].map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id as NavTab)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-100 text-amber-600 shadow-sm scale-105"
                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-100/60"
                }`}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>

        {/* RIGHT DISPLAY PANE */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between relative bg-gradient-to-br from-[#ffffff] via-[#fafbfc] to-[#f4f7fa]">
          {/* Top-Right Tagline inside screen */}
          <div className="absolute top-6 right-8 text-right font-mono text-[9px] text-slate-400 leading-relaxed hidden sm:block">
            <div>Ideas</div>
            <div>Code</div>
            <div className="text-amber-500 font-bold">Impact</div>
          </div>

          {activeTab === "home" && (
            <div className="flex-1 flex flex-col justify-between relative">
              {/* Center Left Info */}
              <div className="w-full max-w-sm space-y-3 pt-2 text-left z-10">
                <div className="text-[10px] font-mono tracking-wider text-amber-600 font-bold uppercase">
                  // TURN IDEAS INTO REALITY
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Crafting Digital Reality with Code
                </h2>

                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Full Stack Engineering • Three.js 3D • Next.js &amp; Modern Web
                </p>

                {/* Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => handleTabChange("projects")}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-[0_4px_15px_rgba(245,158,11,0.3)] transition cursor-pointer"
                  >
                    <span>Explore Projects</span>
                    <ArrowRight size={13} />
                  </button>

                  <button
                    onClick={() => handleTabChange("about")}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <Play size={11} className="text-amber-500 fill-amber-500" />
                    <span>Watch Intro</span>
                  </button>
                </div>
              </div>

              {/* 3D Realistic Dark Earth Globe with Golden Orbital Rings */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center pointer-events-none">
                {/* Glowing Golden Orbital Ring */}
                <div className="absolute inset-0 rounded-full border border-amber-400/40 animate-[spin_20s_linear_infinite] [transform:rotateX(65deg)] shadow-[0_0_15px_rgba(251,191,36,0.3)]"></div>
                <div className="absolute inset-4 rounded-full border border-slate-300/40 border-dashed animate-[spin_30s_linear_infinite_reverse]"></div>
                <RetroGlobeCanvas color="#0f172a" size={160} />
              </div>

              {/* Floating Stat Card */}
              <div className="mt-auto self-end z-10 px-4 py-2 rounded-2xl bg-white/95 border border-slate-100 shadow-[0_10px_25px_rgba(0,0,0,0.06)] backdrop-blur-md flex items-center gap-3">
                <div className="text-left">
                  <div className="text-sm font-extrabold text-slate-900">1.3M+</div>
                  <div className="text-[9px] text-slate-400 font-medium">Lines of Curiosity</div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <BarChart3 size={16} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS VIEW */}
          {activeTab === "projects" && (
            <div className="flex-1 flex flex-col gap-3 text-left">
              <div className="text-xs font-bold text-amber-600 font-mono">// FEATURED BUILDS</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectList.map((p, i) => (
                  <div key={p.id} className="p-3.5 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-amber-300 transition-all">
                    <div className="font-bold text-xs text-slate-900 mb-1">{p.title}</div>
                    <div className="text-[10px] text-slate-500 mb-2 leading-relaxed">{p.desc}</div>
                    <div className="flex gap-1 flex-wrap">
                      {p.stack.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-mono">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS VIEW */}
          {activeTab === "skills" && (
            <div className="flex-1 flex flex-col gap-3 text-left">
              <div className="text-xs font-bold text-amber-600 font-mono">// CORE TECHNOLOGIES</div>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">⚡ Next.js &amp; React 19</div>
                <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">🌐 Three.js &amp; WebGL</div>
                <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">🔷 TypeScript &amp; Node</div>
                <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-xs">🎨 Tailwind CSS &amp; Framer</div>
              </div>
            </div>
          )}

          {/* TAB 4: ABOUT VIEW */}
          {activeTab === "about" && (
            <div className="flex-1 flex flex-col gap-3 text-left">
              <div className="text-xs font-bold text-amber-600 font-mono">// ABOUT YOGESH</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Creative developer with a deep passion for 3D web experiences, performance optimization, and clean architecture.
              </p>
            </div>
          )}

          {/* TAB 5: CONTACT VIEW */}
          {activeTab === "contact" && (
            <div className="flex-1 flex flex-col gap-3 text-left">
              <div className="text-xs font-bold text-amber-600 font-mono">// GET IN TOUCH</div>
              <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-xs text-xs space-y-2">
                <p className="text-slate-600">Let&apos;s build extraordinary digital products together.</p>
                <div className="text-amber-600 font-bold">sindeyogesh09@gmail.com</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
