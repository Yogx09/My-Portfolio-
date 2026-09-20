"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { User, Folder, GraduationCap, Code2, Sparkles, Radio } from "lucide-react";

interface CosmicRadarNavProps {
  variant?: "full-section" | "compact" | "hero-widget";
  className?: string;
}

export default function CosmicRadarNav({ variant = "full-section", className = "" }: CosmicRadarNavProps) {
  const [hoveredDiamond, setHoveredDiamond] = useState<string | null>(null);

  const diamondNodes = [
    {
      id: "about",
      label: "ABOUT",
      sublabel: "Bio & Philosophy",
      href: "/about",
      hash: "#liquid-about",
      position: "top",
      icon: User,
      type: "glass",
      borderColor: "border-white/25 hover:border-white/70",
      bgColor: "bg-white/[0.03] hover:bg-white/[0.08]",
      textColor: "text-zinc-300 group-hover:text-white",
      glowColor: "group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]",
      iconColor: "text-zinc-300 group-hover:text-white",
    },
    {
      id: "work",
      label: "WORK",
      sublabel: "Featured Projects",
      href: "/projects",
      hash: "#dashboard",
      position: "left",
      icon: Folder,
      type: "gold",
      borderColor: "border-amber-500/40 hover:border-amber-400",
      bgColor: "bg-[#0a0702]/60 hover:bg-amber-950/30",
      textColor: "text-amber-400 group-hover:text-amber-300",
      glowColor: "shadow-[inset_0_0_20px_rgba(251,191,36,0.06)] group-hover:shadow-[0_0_30px_rgba(251,191,36,0.35)]",
      iconColor: "text-amber-400 group-hover:text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]",
    },
    {
      id: "exp",
      label: "EXP",
      sublabel: "Career & Roles",
      href: "/experience",
      hash: "#experience",
      position: "right",
      icon: GraduationCap,
      type: "gold",
      borderColor: "border-amber-500/40 hover:border-amber-400",
      bgColor: "bg-[#0a0702]/60 hover:bg-amber-950/30",
      textColor: "text-amber-400 group-hover:text-amber-300",
      glowColor: "shadow-[inset_0_0_20px_rgba(251,191,36,0.06)] group-hover:shadow-[0_0_30px_rgba(251,191,36,0.35)]",
      iconColor: "text-amber-400 group-hover:text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]",
    },
    {
      id: "skills",
      label: "SKILLS",
      sublabel: "Tech & Architecture",
      href: "/skills",
      hash: "#skills",
      position: "bottom",
      icon: Code2,
      type: "glass",
      borderColor: "border-white/25 hover:border-white/70",
      bgColor: "bg-white/[0.03] hover:bg-white/[0.08]",
      textColor: "text-zinc-300 group-hover:text-white",
      glowColor: "group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]",
      iconColor: "text-zinc-300 group-hover:text-white",
    },
  ];

  // Render the core 4-diamond matrix and cosmic radar rings
  const radarMatrix = (
    <div className="relative flex items-center justify-center select-none">
      {/* Top Left Glowing Satellite Radar Beacon */}
      <div className="absolute -top-12 -left-12 sm:-top-16 sm:-left-16 md:-top-20 md:-left-20 z-20 pointer-events-none">
        <div className="relative flex items-center justify-center">
          {/* Pulsing Target Ring */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-white/30 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30"></div>
          <div className="absolute w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-white/50 animate-[spin_12s_linear_infinite] border-dashed"></div>
          <div className="absolute w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border border-white/80 flex items-center justify-center bg-black/40 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.6)]">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white shadow-[0_0_12px_#ffffff] animate-pulse"></div>
          </div>
          {/* Subtle Beacon Telemetry */}
          <div className="absolute top-full left-0 mt-2 font-orbitron text-[8px] text-stone-400 tracking-[0.25em] whitespace-nowrap opacity-60">
            RADAR.LOC // 34.8° N
          </div>
        </div>
      </div>

      {/* Cosmic Radar Concentric Rings Background */}
      <div className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] flex items-center justify-center pointer-events-none">
        {/* Outermost Faint Dashed Ring */}
        <div className="absolute inset-0 rounded-full border border-white/[0.06] border-dashed animate-[spin_120s_linear_infinite]"></div>

        {/* Golden Orbital Ellipse sweeping through WORK and EXP */}
        <div className="absolute inset-4 sm:inset-6 md:inset-8 rounded-full border border-amber-500/20 shadow-[0_0_30px_rgba(251,191,36,0.05)]"></div>
        <div className="absolute inset-10 sm:inset-12 md:inset-16 rounded-full border border-white/[0.04]"></div>

        {/* Rotating Orbital Arc with Amber Highlights */}
        <div className="absolute inset-12 sm:inset-16 md:inset-20 rounded-full border-t-2 border-r border-amber-400/40 border-b-transparent border-l-transparent animate-[spin_35s_linear_infinite]"></div>
        <div className="absolute inset-16 sm:inset-20 md:inset-24 rounded-full border-b-2 border-l border-white/20 border-t-transparent border-r-transparent animate-[spin_25s_linear_infinite_reverse]"></div>

        {/* Subtle Stardust particles */}
        <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:40px_40px] opacity-20"></div>

        {/* Inner Radar Crosshairs */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"></div>
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent"></div>

        {/* 4-DIAMOND CLUSTER */}
        <div className="relative z-10 w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] pointer-events-auto">
          {/* Diamond Grid in 45deg rotation */}
          <div className="absolute inset-0 transform rotate-45 grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 p-2">
            {diamondNodes.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onMouseEnter={() => setHoveredDiamond(item.id)}
                  onMouseLeave={() => setHoveredDiamond(null)}
                  className={`group relative w-full h-full rounded-2xl sm:rounded-3xl border ${item.borderColor} ${item.bgColor} backdrop-blur-xl ${item.glowColor} transition-all duration-500 flex items-center justify-center cursor-pointer overflow-hidden active:scale-95`}
                >
                  {/* Subtle Inner Glow on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-white/[0.05] via-transparent to-white/[0.1] pointer-events-none"></div>

                  {/* Upright Content (-45deg counter-rotation) */}
                  <div className="-rotate-45 flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 p-2 transition-transform duration-300 group-hover:scale-110">
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${item.iconColor} transition-all duration-300`} strokeWidth={1.75} />
                    <span className={`font-orbitron font-bold text-[9px] sm:text-[10px] md:text-xs tracking-[0.25em] ${item.textColor} transition-colors duration-300 text-center`}>
                      {item.label}
                    </span>
                  </div>

                  {/* Corner Accent Pips */}
                  <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-white/20 group-hover:bg-amber-400 transition-colors"></div>
                  <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-white/20 group-hover:bg-amber-400 transition-colors"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === "compact" || variant === "hero-widget") {
    return (
      <div className={`relative flex flex-col items-center ${className}`}>
        {radarMatrix}
      </div>
    );
  }

  return (
    <section className={`relative w-full py-20 md:py-32 bg-[#030508] overflow-hidden flex flex-col items-center justify-center border-t border-b border-white/[0.06] ${className}`}>
      {/* Background Cosmic Grid & Nebula Light */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12)_0%,rgba(251,191,36,0.04)_40%,transparent_75%)]"></div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Header Info */}
      <div className="relative z-10 text-center mb-12 md:mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/[0.05] backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(251,191,36,0.1)]"
        >
          <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-orbitron tracking-[0.3em] text-amber-300 uppercase">
            Orbital Navigation Hub
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold tracking-[0.2em] text-white uppercase"
        >
          Explore <span className="text-amber-400">Coordinates</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-stone-400 font-jakarta text-xs sm:text-sm tracking-widest uppercase mt-3 max-w-lg mx-auto"
        >
          Select a quadrant to navigate the digital workspace
        </motion.p>
      </div>

      {/* Main Interactive Radar Matrix */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 my-4"
      >
        {radarMatrix}
      </motion.div>

      {/* Dynamic Status Display on Hover */}
      <div className="relative z-10 mt-10 md:mt-14 h-8 flex items-center justify-center font-orbitron">
        {hoveredDiamond ? (
          <motion.div
            key={hoveredDiamond}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-xs sm:text-sm tracking-[0.25em] text-amber-400 bg-black/60 px-5 py-2 rounded-full border border-amber-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>
              DESTINATION: {diamondNodes.find((d) => d.id === hoveredDiamond)?.sublabel.toUpperCase()}
            </span>
          </motion.div>
        ) : (
          <span className="text-[11px] font-orbitron tracking-[0.25em] text-stone-600">
            // HOVER OR TAP QUADRANT TO ENGAGE
          </span>
        )}
      </div>
    </section>
  );
}
