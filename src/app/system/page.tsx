"use client";

import Link from "next/link";
import { ArrowLeft, Cpu, Layers, Terminal, Sparkles, Activity, ShieldCheck, ExternalLink } from "lucide-react";

export default function SystemPage() {
  const stack = [
    { title: "Core Framework", name: "Next.js 16 (App Router) + React 19", tag: "STABLE", desc: "Server-side static prerendering with high-speed Turbopack compilation.", icon: Cpu },
    { title: "3D & WebGL Engine", name: "Three.js + Canvas API + GLSL", tag: "60 FPS", desc: "Interactive workstation, orbital models, and particle simulation nodes.", icon: Sparkles },
    { title: "Animation Orchestration", name: "Framer Motion + Lenis Scroll", tag: "GPU ACCEL", desc: "Physics-based inertia scrolling and spring-driven layout transforms.", icon: Layers },
    { title: "Sound Synthesizer", name: "Web Audio API Procedural Engine", tag: "NATIVE", desc: "Dynamic oscillator beeps, frequency ramps, and micro-audio feedback.", icon: Activity },
    { title: "Styling & System Design", name: "Tailwind CSS + Glassmorphism", tag: "MODERN", desc: "Tailored dark & warm minimalist palette with responsive layouts.", icon: Terminal },
    { title: "Type Safety & Quality", name: "TypeScript 5 + ESLint 9", tag: "STRICT", desc: "Zero runtime type vulnerabilities and standardized coding contracts.", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#06080d] text-white flex flex-col justify-between relative overflow-hidden font-jakarta selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[75vmin] w-[75vmin] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.1),transparent_60%)] blur-[50px]" />
        <div className="absolute bottom-10 right-1/4 h-[50vmin] w-[50vmin] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_60%)] blur-[60px]" />
      </div>

      {/* Header */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-6 pt-8 flex items-center justify-between">
        <Link 
          href="/#dashboard" 
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:border-amber-400/40 hover:bg-white/[0.08] transition-all text-xs font-mono uppercase tracking-widest text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>Return Home</span>
        </Link>

        <div className="flex items-center gap-2 font-mono text-[11px] text-sky-400 tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
          <span>Core Telemetry: Operational</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 my-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>ARCHITECTURE // TELEMETRY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-cinzel font-black uppercase tracking-tight text-white">
            System Core
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
            Comprehensive architectural telemetry for this portfolio. Engineered for sub-second page loads, steady 60 FPS graphics, and responsive spatial navigation.
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stack.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/30 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/30 text-sky-300">
                      {item.tag}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                    {item.title}
                  </div>
                  <h3 className="font-orbitron font-bold text-sm text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Hub */}
        <div className="flex items-center justify-center gap-4 flex-wrap pt-4">
          <Link
            href="/projects"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-orbitron font-bold text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-md"
          >
            Explore Projects
          </Link>
          <Link
            href="/skills"
            className="px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white font-orbitron font-bold text-xs tracking-widest uppercase hover:bg-white/10 hover:scale-105 transition-all"
          >
            Skills Matrix
          </Link>
          <a
            href="https://github.com/Yogx09"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-white/5 border border-white/15 text-slate-300 hover:text-white font-orbitron font-bold text-xs tracking-widest uppercase hover:bg-white/10 hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-6 border-t border-white/5 text-[11px] font-mono text-slate-500">
        SYSTEM DIAGNOSTICS NORMAL • ALL SYSTEMS RUNNING AT NOMINAL LEVELS
      </footer>
    </div>
  );
}
