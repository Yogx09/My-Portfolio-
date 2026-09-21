"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Home, 
  LayoutGrid, 
  User, 
  Code2, 
  Mail, 
  Sun,
  ArrowRight, 
  Play, 
  Check, 
  Copy, 
  Sparkles, 
  BarChart3, 
  ExternalLink,
  Cpu,
  Layers,
  Flame,
  Globe2,
  Terminal,
  ShieldCheck,
  Zap
} from "lucide-react";
import SpiderHeroView from "./SpiderHeroView";
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
  const router = useRouter();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const handleTabChange = (tab: NavTab) => {
    retroAudio.playBeep(920, 0.05);
    onSelectTab(tab);
  };

  const handleLaunchRedirect = (route: string, sectionId?: string) => {
    retroAudio.playBeep(1400, 0.1, "triangle");
    // Direct Next.js router redirection to the dedicated page
    router.push(route);
  };

  const handleCopyEmail = () => {
    retroAudio.playBeep(1200, 0.08);
    navigator.clipboard.writeText("sindeyogesh09@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const projectList = [
    {
      id: "stockpulse",
      title: "StockPulse AI",
      tag: "FinTech & Realtime AI",
      stack: ["Next.js", "TypeScript", "Tailwind", "OpenAI"],
      desc: "An intelligent market telemetry & predictive analytics suite with real-time sentiment extraction.",
      status: "LIVE PRODUCTION",
      badge: "FEATURED",
    },
    {
      id: "cinematic-3d",
      title: "Cinematic 3D Engine",
      tag: "WebGL & Three.js",
      stack: ["Three.js", "WebGL", "Framer Motion", "GLSL"],
      desc: "High-performance visual studio engine featuring procedural physics, custom shaders, and studio lighting.",
      status: "INTERACTIVE DEMO",
      badge: "GRAPHICS",
    },
    {
      id: "vanguard-cyber",
      title: "Vanguard Cyber Telemetry",
      tag: "Cloud & DevSecOps",
      stack: ["Go", "React", "Docker", "Prometheus"],
      desc: "Real-time threat monitoring dashboard with network anomaly detection & live telemetry streams.",
      status: "DEPLOYED CLOUD",
      badge: "SECURITY",
    },
  ];

  const sidebarNavItems = [
    { id: "home" as NavTab, label: "Home", icon: Home, badge: "SPIDER" },
    { id: "about" as NavTab, label: "About Me", icon: User, badge: "BIO" },
    { id: "skills" as NavTab, label: "Skills", icon: Code2, badge: "MATRIX" },
    { id: "projects" as NavTab, label: "Projects", icon: LayoutGrid, badge: "BUILDS" },
    { id: "contact" as NavTab, label: "Contact", icon: Mail, badge: "COMM" },
  ];

  const isHome = activeTab === "home";

  return (
    <div className={`w-full h-full bg-[#fafbfc] text-slate-900 flex flex-col select-text font-sans relative overflow-hidden ${className}`}>
      {/* 1. TOP STATUS BAR INSIDE SCREEN - MATCHING CERAMIC PATTERN */}
      <div className="h-12 bg-white/95 border-b border-slate-200/80 px-5 flex items-center justify-between text-xs select-none z-20 shrink-0 shadow-2xs">
        {/* Left Brand with Live Pulsing Dot */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold tracking-tight text-slate-950 text-sm font-sans">
              YOGX <span className="text-amber-500 font-bold">STUDIO OS</span>
            </span>
          </div>
          <span className="text-slate-300 font-mono text-xs">|</span>
          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block tracking-wider font-semibold">
            v3.5 • SPIDER ENGINE • 60 FPS
          </span>
        </div>

        {/* Center Quick Tab Navigation inside screen */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
          {sidebarNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-slate-950 shadow-2xs border border-slate-200 text-amber-600"
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Status Badge */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300/70">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>ONLINE</span>
        </div>
      </div>

      {/* 2. MAIN SCREEN BODY WITH SIDEBAR AND CONTENT */}
      <div className="flex-1 flex overflow-hidden z-10 relative">
        {/* ============================================================ */}
        {/* LEFT DEDICATED SIDEBAR NAVIGATION DOCK */}
        {/* ============================================================ */}
        <aside className="w-44 bg-white/95 border-r border-slate-200/80 p-3 flex flex-col justify-between select-none shrink-0 z-20 shadow-2xs">
          <div className="space-y-2">
            <div className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
              // SECTIONS
            </div>

            {sidebarNavItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              const isSpiderTab = item.id === "home";

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full px-3 py-2.5 rounded-xl flex items-center gap-3 transition-all duration-200 cursor-pointer text-left relative group ${
                    isActive
                      ? isSpiderTab
                        ? "bg-gradient-to-r from-red-500/15 via-amber-500/10 to-red-50 border border-red-300/80 text-slate-950 font-black shadow-xs scale-[1.02]"
                        : "bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-50 border border-amber-400/80 text-slate-950 font-black shadow-xs scale-[1.02]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? isSpiderTab
                          ? "bg-red-600 text-white shadow-xs"
                          : "bg-amber-500 text-slate-950 shadow-xs"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-800"
                    }`}
                  >
                    <Icon size={15} strokeWidth={2.4} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold leading-tight text-slate-950">
                      {item.label}
                    </div>
                    <div className={`text-[9px] font-mono leading-tight ${
                      isSpiderTab && isActive ? "text-red-600 font-bold" : "text-slate-400 group-hover:text-amber-700"
                    }`}>
                      {item.badge}
                    </div>
                  </div>

                  {isActive && (
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      isSpiderTab
                        ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]"
                        : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.9)]"
                    }`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick System Telemetry Footer at Bottom of Sidebar */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-slate-600 font-mono text-[9px]">
            <div className="flex items-center justify-between">
              <span className="font-semibold">ENGINE</span>
              <span className="text-red-600 font-bold">SPIDER 3D</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">TELEMETRY</span>
              <span className="text-emerald-600 font-bold">ACTIVE</span>
            </div>
          </div>
        </aside>

        {/* ============================================================ */}
        {/* RIGHT DISPLAY PANE - SIZABLE CONTENT & PROMINENT LAUNCH BAR */}
        {/* ============================================================ */}
        <main className={`flex-1 overflow-y-auto flex flex-col justify-between relative bg-gradient-to-b from-[#ffffff] via-[#fafbfc] to-[#f4f7fa] ${
          activeTab === "home" ? "p-0" : "p-5 sm:p-6"
        }`}>
          {/* ============================================================ */}
          {/* TAB 1: FRONT SCREEN / FULL SPIDER-MAN THEMED HOME VIEW */}
          {/* ============================================================ */}
          {activeTab === "home" && (
            <SpiderHeroView onSwitchTab={handleTabChange} />
          )}

          {/* ============================================================ */}
          {/* TAB 2: ABOUT ME - INCREASED SIZE & ENHANCED LAUNCH BUTTON */}
          {/* ============================================================ */}
          {activeTab === "about" && (
            <div className="flex-1 flex flex-col justify-between text-left">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-amber-600 font-black uppercase tracking-wider flex items-center gap-1.5">
                    <User size={14} />
                    <span>// OPERATOR DOSSIER // BIOGRAPHY</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-bold">
                    ACTIVE ARCHIVE
                  </span>
                </div>

                {/* Sizable Bio Card */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                  <h3 className="text-lg font-black text-slate-950 tracking-tight flex items-center gap-2">
                    <span>Yogesh Sinde</span>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Full-Stack &amp; 3D Creative Engineer
                    </span>
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                    Creative software developer dedicated to engineering fluid 3D web experiences, highly responsive full-stack architectures, and intuitive UI design systems. Driven by relentless curiosity to turn ambitious ideas into polished digital realities.
                  </p>
                </div>

                {/* Increased Strengths Cards */}
                <div className="grid grid-cols-2 gap-3 text-slate-800 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-black text-sm shrink-0">
                      ⚡
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-950 text-xs sm:text-sm">3D WebGL &amp; Canvas</div>
                      <div className="text-[10px] text-slate-500">Three.js, GLSL, Procedural Physics</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-black text-sm shrink-0">
                      🔷
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-950 text-xs sm:text-sm">Full-Stack Architecture</div>
                      <div className="text-[10px] text-slate-500">Next.js 15, TypeScript, Modern APIs</div>
                    </div>
                  </div>
                </div>

                {/* Character Traits Tags */}
                <div className="flex items-center gap-2 flex-wrap pt-0.5">
                  {["Problem Solver", "High Precision", "Fast Learner", "Clean Architecture", "Sound & Audio UI"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-mono font-semibold">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* DEDICATED PROMINENT BOTTOM LAUNCH CARD */}
              <div className="mt-auto pt-4 border-t border-slate-200/90">
                <div className="p-3 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 rounded-2xl border border-amber-300/50 shadow-2xs flex items-center justify-between gap-4">
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-extrabold text-slate-900">Explore Complete Journey</div>
                    <div className="text-[10px] text-slate-500">Interactive collage, background &amp; philosophy</div>
                  </div>

                  <button
                    id="launch-about-btn"
                    onClick={() => handleLaunchRedirect("/about", "liquid-about")}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-2.5 shadow-[0_6px_20px_rgba(245,158,11,0.4)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <User size={16} />
                    <span>Launch About Me Page</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: SKILLS - INCREASED SIZE & ENHANCED LAUNCH BUTTON */}
          {/* ============================================================ */}
          {activeTab === "skills" && (
            <div className="flex-1 flex flex-col justify-between text-left">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-amber-600 font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 size={14} />
                    <span>// SYSTEM CAPABILITIES // TECH MATRIX</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-bold">
                    17+ ACTIVE TECHNOLOGIES
                  </span>
                </div>

                {/* Sizable Categorized Skills Cards with Thick Progress Bars */}
                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-extrabold text-slate-950 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        Frontend &amp; 3D Graphics
                      </span>
                      <span className="font-mono text-xs text-amber-600 font-black">96%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full w-[96%] shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-600 font-semibold">
                      Next.js 15 • React 19 • Three.js • WebGL • Tailwind CSS • Framer Motion
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-extrabold text-slate-950 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                        Backend, Cloud &amp; APIs
                      </span>
                      <span className="font-mono text-xs text-sky-600 font-black">90%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-sky-500 to-blue-400 h-full rounded-full w-[90%] shadow-[0_0_8px_rgba(56,189,248,0.6)]"></div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-600 font-semibold">
                      TypeScript • Node.js • Python • REST &amp; GraphQL • Docker • Linux
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-extrabold text-slate-950 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        Creative Engineering &amp; Design
                      </span>
                      <span className="font-mono text-xs text-purple-600 font-black">92%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full w-[92%] shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-600 font-semibold">
                      Figma • Web Audio API • 3D Physics • Shaders • Performance Tuning
                    </div>
                  </div>
                </div>
              </div>

              {/* DEDICATED PROMINENT BOTTOM LAUNCH CARD */}
              <div className="mt-auto pt-4 border-t border-slate-200/90">
                <div className="p-3 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 rounded-2xl border border-amber-300/50 shadow-2xs flex items-center justify-between gap-4">
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-extrabold text-slate-900">Interactive Balloon Physics Matrix</div>
                    <div className="text-[10px] text-slate-500">Full tech matrix with particle burst interactions</div>
                  </div>

                  <button
                    id="launch-skills-btn"
                    onClick={() => handleLaunchRedirect("/skills", "skills-section")}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-2.5 shadow-[0_6px_20px_rgba(245,158,11,0.4)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Code2 size={16} />
                    <span>Launch Skills Matrix</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 4: PROJECTS - INCREASED SIZE & ENHANCED LAUNCH BUTTON */}
          {/* ============================================================ */}
          {activeTab === "projects" && (
            <div className="flex-1 flex flex-col justify-between text-left">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-amber-600 font-black uppercase tracking-wider flex items-center gap-1.5">
                    <LayoutGrid size={14} />
                    <span>// FLAGSHIP BUILDS // ARCHIVE</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-bold">
                    SELECT TO INSPECT
                  </span>
                </div>

                {/* Sizable Project Showcase Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {projectList.map((p, idx) => {
                    const isSelected = selectedProjectIndex === idx;
                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          retroAudio.playBeep(1000 + idx * 100, 0.04);
                          setSelectedProjectIndex(idx);
                        }}
                        className={`p-3 rounded-xl transition-all cursor-pointer text-left border ${
                          isSelected
                            ? "bg-amber-50/80 border-amber-400 shadow-xs scale-[1.03]"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-100/60 px-1.5 py-0.2 rounded">
                            {p.badge}
                          </span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                        </div>
                        <div className="font-black text-xs sm:text-sm text-slate-950 truncate mb-1">
                          {p.title}
                        </div>
                        <div className="text-[10px] text-slate-600 line-clamp-2 leading-relaxed mb-2.5 font-normal">
                          {p.desc}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {p.stack.slice(0, 2).map((stk) => (
                            <span key={stk} className="px-1.5 py-0.5 rounded bg-slate-100 text-[9px] font-mono font-semibold text-slate-700">
                              {stk}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Project Full Inspection Strip */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Currently Inspected Build</div>
                    <div className="text-xs sm:text-sm font-black text-slate-950">
                      {projectList[selectedProjectIndex].title} — <span className="text-slate-500 font-semibold">{projectList[selectedProjectIndex].tag}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {projectList[selectedProjectIndex].stack.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[9px] font-mono font-bold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* DEDICATED PROMINENT BOTTOM LAUNCH CARD */}
              <div className="mt-auto pt-4 border-t border-slate-200/90">
                <div className="p-3 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 rounded-2xl border border-amber-300/50 shadow-2xs flex items-center justify-between gap-4">
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-extrabold text-slate-900">Explore Full Interactive Showcase</div>
                    <div className="text-[10px] text-slate-500">Live demos, case studies &amp; code repositories</div>
                  </div>

                  <button
                    id="launch-projects-btn"
                    onClick={() => handleLaunchRedirect("/projects", "agency-showcase")}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-2.5 shadow-[0_6px_20px_rgba(245,158,11,0.4)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <LayoutGrid size={16} />
                    <span>Launch Projects Showcase</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 5: CONTACT - INCREASED SIZE & ENHANCED LAUNCH BUTTON */}
          {/* ============================================================ */}
          {activeTab === "contact" && (
            <div className="flex-1 flex flex-col justify-between text-left">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-amber-600 font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Mail size={14} />
                    <span>// DIRECT TRANSMISSION // REACH OUT</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    AVAILABLE FOR HIRE
                  </span>
                </div>

                {/* Sizable Contact Card */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
                  <h3 className="text-base sm:text-lg font-black text-slate-950">
                    Let&apos;s build something extraordinary together.
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                    Open for freelance web engineering, 3D visual frontend contracts, and high-impact full-stack software development roles worldwide.
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Mail size={16} className="text-amber-500" />
                      <span className="text-xs sm:text-sm font-mono font-bold text-slate-900">
                        sindeyogesh09@gmail.com
                      </span>
                    </div>

                    <button
                      onClick={handleCopyEmail}
                      className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-800 hover:text-amber-900 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                    >
                      {copiedEmail ? (
                        <>
                          <Check size={13} className="text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Social Channels Strip */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-500 font-bold">CHANNELS:</span>
                  <a
                    href="https://github.com/Yogx09"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:text-amber-600 hover:border-amber-300 text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-2xs hover:scale-105"
                  >
                    <span>GitHub</span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:text-amber-600 hover:border-amber-300 text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-2xs hover:scale-105"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* DEDICATED PROMINENT BOTTOM LAUNCH CARD */}
              <div className="mt-auto pt-4 border-t border-slate-200/90">
                <div className="p-3 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 rounded-2xl border border-amber-300/50 shadow-2xs flex items-center justify-between gap-4">
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-extrabold text-slate-900">Direct Message &amp; Nexus Hub</div>
                    <div className="text-[10px] text-slate-500">Interactive contact portal with coordinates</div>
                  </div>

                  <button
                    id="launch-contact-btn"
                    onClick={() => handleLaunchRedirect("/contact", "contact-section")}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-xs sm:text-sm tracking-wide uppercase flex items-center justify-center gap-2.5 shadow-[0_6px_20px_rgba(245,158,11,0.4)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Mail size={16} />
                    <span>Launch Contact Page</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
