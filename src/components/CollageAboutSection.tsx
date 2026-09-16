"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Mail, Copy, Check, Sparkles, ArrowLeft, Camera, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Custom Social SVG Icons
const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

// Program icons data with proficiency levels (out of 5)
const PROGRAMS = [
  { id: "three", name: "Three.js & WebGL", short: "3D", isCsp: false, level: 5, desc: "3D Graphics, Shaders & Interactive Scenes" },
  { id: "next", name: "Next.js", short: "Nx", isCsp: false, level: 5, desc: "App Router, SSR, Turbopack & Full-Stack" },
  { id: "react", name: "React", short: "Re", isCsp: false, level: 5, desc: "Component Architecture & State Management" },
  { id: "ts", name: "TypeScript", short: "Ts", isCsp: false, level: 5, desc: "Type-Safe Architecture & Modern ES6+" },
  { id: "tw", name: "Tailwind CSS", short: "Tw", isCsp: false, level: 5, desc: "Custom Design Systems & Responsive Layouts" },
  { id: "node", name: "Node.js", short: "Nd", isCsp: false, level: 4, desc: "Backend APIs, Express & Cloud Microservices" },
];

export default function CollageAboutSection({ isStandalonePage = true }: { isStandalonePage?: boolean }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeProgram, setActiveProgram] = useState<typeof PROGRAMS[0] | null>(null);
  const [flashActive, setFlashActive] = useState(false);
  const [avatarImage, setAvatarImage] = useState<string>("/about_avatar.jpg");

  // 3D Parallax Tilt for the scrapbook collage
  const collageRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!collageRef.current) return;
    const rect = collageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const triggerCameraFlash = () => {
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 350);
  };

  const toggleAvatar = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerCameraFlash();
    setAvatarImage(prev => prev === "/about_avatar.jpg" ? "/avatar.png" : "/about_avatar.jpg");
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0d0d0f] text-[#dedede] font-sans overflow-x-hidden selection:bg-[#ff3333]/30 selection:text-white">
      {/* Background grain texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.035] z-0 mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Atmospheric dark vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_30%,rgba(230,40,40,0.06)_0%,transparent_60%)] z-0" />

      {/* Navigation Header if standalone */}
      {isStandalonePage && (
        <header className="relative z-30 w-full max-w-[1340px] mx-auto pt-8 px-6 sm:px-10 flex justify-between items-center">
          <Link 
            href="/#dashboard" 
            className="group flex items-center gap-2.5 text-xs font-mono tracking-widest text-[#a3a3a3] hover:text-[#ff3b30] transition-colors py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-[#ff3b30]/40 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO HOME</span>
          </Link>
          <div className="flex items-center gap-2 font-mono text-[11px] text-[#737373] tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#ff3b30] animate-pulse"></span>
            <span>PORTFOLIO // ABOUT ME</span>
          </div>
        </header>
      )}

      {/* Main Content Layout */}
      <main className="relative z-10 max-w-[1340px] mx-auto px-6 sm:px-10 lg:px-12 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* ======================================================== */}
          {/* LEFT SIDE: Typography, Bio & Credentials Grid (Cols 1-7) */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 flex flex-col gap-10 lg:pr-6">
            
            {/* 1. Header Bio */}
            <section className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl md:text-[1.65rem] font-medium leading-relaxed tracking-tight text-[#f0f0f0]"
              >
                <span className="font-bold text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">Hello!</span>{" "}
                I&apos;m Sinde Yogesh, a Creative Developer and Full-Stack 3D Architect based in MH, India.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm sm:text-base text-[#a3a3a3] font-normal leading-relaxed max-w-[620px]"
              >
                I blend raw performance with cinematic aesthetics to build experiences that aren&apos;t just read—they are felt. Combining modern WebGL, Three.js, and scalable full-stack engineering, I create interactive digital worlds where every pixel serves a purpose.
              </motion.p>
            </section>

            {/* 2. Two-Column Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 pt-2">
              
              {/* --- COLUMN 1: Experience, Education, Languages --- */}
              <div className="flex flex-col gap-8">
                
                {/* Experience */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="space-y-3.5 group/block"
                >
                  <h2 className="text-[#ff3b30] font-bold text-xl sm:text-[1.35rem] tracking-tight flex items-center gap-2">
                    Experience
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30] opacity-0 group-hover/block:opacity-100 transition-opacity" />
                  </h2>
                  <div className="space-y-4 text-sm">
                    <div className="space-y-0.5">
                      <p className="font-bold text-white tracking-wide">2024-</p>
                      <p className="font-semibold text-[#f5f5f5]">Full-Stack 3D &amp; Creative Developer</p>
                      <p className="text-[#9e9e9e]">Independent &amp; Freelance Studio</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-white tracking-wide">2023-2024</p>
                      <p className="font-semibold text-[#f5f5f5]">Software Engineering Intern</p>
                      <p className="text-[#9e9e9e]">Web Systems &amp; Cloud Innovations</p>
                    </div>
                  </div>
                </motion.div>

                {/* Education */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="space-y-3.5 group/block"
                >
                  <h2 className="text-[#ff3b30] font-bold text-xl sm:text-[1.35rem] tracking-tight flex items-center gap-2">
                    Education
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30] opacity-0 group-hover/block:opacity-100 transition-opacity" />
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="space-y-0.5">
                      <p className="font-bold text-white tracking-wide">2022-2027</p>
                      <p className="font-semibold text-[#f5f5f5]">Vellore Institute of Technology</p>
                      <p className="text-[#9e9e9e]">Integrated M.Tech in Software Engineering</p>
                      <p className="text-[#ff4d4d] font-mono text-xs">AP, India • GPA: 8.3/10.0</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-white tracking-wide">2020-2022</p>
                      <p className="font-semibold text-[#f5f5f5]">Sri Chaitanya College</p>
                      <p className="text-[#9e9e9e]">Intermediate Education (93.6%)</p>
                    </div>
                  </div>
                </motion.div>

                {/* Languages */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="space-y-3.5 group/block"
                >
                  <h2 className="text-[#ff3b30] font-bold text-xl sm:text-[1.35rem] tracking-tight flex items-center gap-2">
                    Languages
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30] opacity-0 group-hover/block:opacity-100 transition-opacity" />
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="space-y-0.5">
                      <p className="font-bold text-white">English</p>
                      <p className="text-[#9e9e9e]">Fluent / Professional</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-white">Hindi &amp; Marathi</p>
                      <p className="text-[#9e9e9e]">Native Proficiency</p>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* --- COLUMN 2: Achievements, Skills, Programs --- */}
              <div className="flex flex-col gap-8">
                
                {/* Achievements */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-3.5 group/block"
                >
                  <h2 className="text-[#ff3b30] font-bold text-xl sm:text-[1.35rem] tracking-tight flex items-center gap-2">
                    Achievements
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30] opacity-0 group-hover/block:opacity-100 transition-opacity" />
                  </h2>
                  <div className="space-y-4 text-sm">
                    <div className="space-y-0.5">
                      <p className="font-bold text-white tracking-wide">2024</p>
                      <p className="font-semibold text-[#f5f5f5]">National Hackathon Winner</p>
                      <p className="text-[#9e9e9e]">Real-time 3D Data Visualization Engine</p>
                      <p className="text-[#ff4d4d] font-medium">First Place Award</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-bold text-white tracking-wide">2023</p>
                      <p className="font-semibold text-[#f5f5f5]">Awwwards Honorable Mention</p>
                      <p className="text-[#9e9e9e]">Innovative UI/UX &amp; Three.js Scrollytelling</p>
                      <p className="text-[#ff4d4d] font-medium">Portfolio Excellence</p>
                    </div>
                  </div>
                </motion.div>

                {/* Skills */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-3.5 group/block"
                >
                  <h2 className="text-[#ff3b30] font-bold text-xl sm:text-[1.35rem] tracking-tight flex items-center gap-2">
                    Skills
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30] opacity-0 group-hover/block:opacity-100 transition-opacity" />
                  </h2>
                  <div className="space-y-1.5 text-sm text-[#dedede]">
                    <p className="hover:text-white transition-colors">3D Web Graphics, WebGL &amp; Three.js</p>
                    <p className="hover:text-white transition-colors">Full-Stack Next.js, React &amp; TypeScript</p>
                    <p className="hover:text-white transition-colors">Shader Programming (GLSL) &amp; Motion Design</p>
                  </div>
                </motion.div>

                {/* Programs (Interactive) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-4 group/block"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-[#ff3b30] font-bold text-xl sm:text-[1.35rem] tracking-tight">
                      Programs
                    </h2>
                    {activeProgram && (
                      <span className="text-[11px] font-mono text-[#ff4d4d] bg-[#ff3b30]/10 px-2 py-0.5 rounded border border-[#ff3b30]/20 animate-fadeIn">
                        {activeProgram.name} • {activeProgram.level}/5
                      </span>
                    )}
                  </div>

                  {/* Program Icons + Level Pips Matrix */}
                  <div className="flex items-start gap-2.5 sm:gap-3 flex-wrap">
                    {PROGRAMS.map((prog) => {
                      const isSelected = activeProgram?.id === prog.id;
                      return (
                        <div 
                          key={prog.id}
                          onMouseEnter={() => setActiveProgram(prog)}
                          onMouseLeave={() => setActiveProgram(null)}
                          className="flex flex-col items-center gap-2 cursor-pointer group/icon"
                        >
                          {/* App Tile Icon */}
                          <motion.div 
                            whileHover={{ y: -4, scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-black shadow-md transition-all duration-300 ${
                              isSelected 
                                ? "bg-white ring-2 ring-[#ff3b30] shadow-[0_0_15px_rgba(255,59,48,0.5)]" 
                                : "bg-white hover:bg-neutral-100"
                            }`}
                          >
                            <span className="text-[13px] sm:text-sm tracking-tight font-black font-sans">
                              {prog.short}
                            </span>
                          </motion.div>

                          {/* Proficiency Star Marks (Plus / 4-Point Sparkles) */}
                          <div className="flex flex-col items-center gap-1.5 py-1">
                            {[1, 2, 3, 4, 5].map((starIndex) => {
                              const isFilled = starIndex <= prog.level;
                              return (
                                <span 
                                  key={starIndex}
                                  className={`text-[11px] leading-none transition-all duration-300 select-none ${
                                    isFilled 
                                      ? isSelected
                                        ? "text-[#ff3b30] scale-125 drop-shadow-[0_0_6px_#ff3b30]" 
                                        : "text-[#ff3b30]/80 group-hover/icon:text-[#ff3b30]"
                                      : "opacity-0"
                                  }`}
                                >
                                  ✦
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tooltip Description for active program */}
                  <div className="h-6 text-xs text-[#a3a3a3] font-mono italic">
                    {activeProgram ? activeProgram.desc : "Hover over icons to inspect tech stack proficiency"}
                  </div>
                </motion.div>

              </div>

            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT SIDE: Scrapbook Collage & Polaroid (Cols 8-12)     */}
          {/* ======================================================== */}
          <div 
            ref={collageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 relative flex flex-col items-center justify-center lg:items-end perspective-[1200px] select-none"
          >
            <motion.div 
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-[420px] transition-transform duration-100 ease-out"
            >
              
              {/* 1. LAYER: White torn backboard background */}
              <div 
                className="absolute -top-4 -right-3 w-[92%] h-[105%] bg-[#e6e2db] rounded-sm shadow-[0_20px_45px_rgba(0,0,0,0.85)] -rotate-1 z-0 overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 98% 97%, 95% 99%, 88% 96%, 82% 99%, 75% 96%, 60% 100%, 40% 97%, 20% 99%, 0 98%)"
                }}
              >
                {/* Paper texture overlay */}
                <div className="w-full h-full opacity-30 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />
              </div>

              {/* 2. LAYER: Ripped Red Perforated Notebook Strip on the left */}
              <motion.div 
                className="absolute -left-5 sm:-left-7 top-4 w-12 sm:w-14 h-[300px] sm:h-[340px] bg-[#d92222] shadow-[4px_10px_25px_rgba(0,0,0,0.7)] z-10 flex flex-col justify-around py-4 items-center -rotate-2"
                style={{
                  clipPath: "polygon(12% 0, 100% 0, 100% 100%, 8% 100%, 0 95%, 15% 90%, 0 85%, 15% 80%, 0 75%, 15% 70%, 0 65%, 15% 60%, 0 55%, 15% 50%, 0 45%, 15% 40%, 0 35%, 15% 30%, 0 25%, 15% 20%, 0 15%, 15% 10%, 0 5%)"
                }}
              >
                {/* Perforation holes */}
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-3.5 h-3.5 rounded-full bg-[#0d0d0f] shadow-inner border border-black/40" />
                ))}
              </motion.div>

              {/* 3. LAYER: The Main Polaroid Photo */}
              <motion.div 
                drag
                dragConstraints={collageRef}
                dragElastic={0.15}
                whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                className="relative z-20 bg-[#f7f5f0] p-4 sm:p-5 pb-5 rounded-[2px] shadow-[0_25px_50px_rgba(0,0,0,0.9),0_0_1px_rgba(255,255,255,0.4)_inset] rotate-1 cursor-grab"
              >
                {/* Scotch Tape Top Left */}
                <div 
                  className="absolute -top-3.5 -left-4 w-20 h-7 bg-white/40 backdrop-blur-[2px] shadow-sm border border-white/40 -rotate-[32deg] z-30 pointer-events-none"
                  style={{
                    clipPath: "polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0 50%)"
                  }}
                />

                {/* Scotch Tape Bottom Right of Polaroid */}
                <div 
                  className="absolute -bottom-2 -left-3 w-16 h-6 bg-white/35 backdrop-blur-[2px] shadow-sm border border-white/30 rotate-[22deg] z-30 pointer-events-none"
                  style={{
                    clipPath: "polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0 50%)"
                  }}
                />

                {/* Photo Container */}
                <div 
                  onClick={triggerCameraFlash}
                  className="relative w-full aspect-[4/4.5] bg-[#111] overflow-hidden rounded-[1px] shadow-inner group/photo cursor-pointer"
                  title="Click to take a flash snap!"
                >
                  {/* Photo image */}
                  <Image 
                    src={avatarImage} 
                    alt="Sinde Yogesh" 
                    width={480}
                    height={540}
                    priority
                    className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-700 filter contrast-[1.08] brightness-[0.98]"
                  />

                  {/* Camera Flash overlay */}
                  <AnimatePresence>
                    {flashActive && (
                      <motion.div 
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute inset-0 bg-white z-40 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>

                  {/* Photo Switcher Button */}
                  <button 
                    onClick={toggleAvatar}
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white/90 text-[10px] font-mono flex items-center gap-1.5 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 shadow-md hover:bg-black"
                    title="Switch avatar image"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Flip Photo</span>
                  </button>

                  {/* Camera Snap hint */}
                  <div className="absolute bottom-3 left-3 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white/80 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 shadow-md">
                    <Camera className="w-3.5 h-3.5" />
                  </div>

                  {/* Subtle Paper Grain on photo */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/10 mix-blend-multiply" />
                </div>

                {/* Handwritten Marker Signature Area */}
                <div className="pt-3.5 pb-1 flex flex-col items-center justify-center text-center">
                  <div className="relative group/sig">
                    <span 
                      className="font-serif tracking-widest text-[#1a1a1a] text-lg sm:text-xl font-black uppercase select-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
                      style={{ letterSpacing: "0.22em", fontFamily: "Courier New, monospace" }}
                    >
                      SINDE YOGESH
                    </span>
                    {/* Doodle smiley 'xx' above */}
                    <span className="absolute -top-2 right-6 text-[9px] text-black/70 font-mono tracking-tighter select-none font-bold">
                      xx
                    </span>
                    {/* Hand-drawn marker underline */}
                    <div className="w-full h-[1.5px] bg-[#1a1a1a]/80 mt-1 mx-auto rounded-full" />
                  </div>
                </div>

              </motion.div>

              {/* 4. LAYER: Crumpled Craft Paper Memo Note (Contact info) */}
              <motion.div 
                drag
                dragConstraints={collageRef}
                dragElastic={0.12}
                whileDrag={{ scale: 1.04, cursor: "grabbing" }}
                className="relative -mt-10 sm:-mt-12 mr-1 sm:mr-3 z-30 bg-[#e7ded1] p-5 sm:p-6 rounded-[2px] shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(0,0,0,0.06)] text-[#222] -rotate-1 cursor-grab"
                style={{
                  clipPath: "polygon(0 4%, 97% 0, 100% 95%, 98% 100%, 3% 98%, 0 92%)"
                }}
              >
                {/* Tape on top-right of the note */}
                <div 
                  className="absolute -top-3 right-6 w-16 h-6 bg-white/40 backdrop-blur-[2px] shadow-sm border border-white/40 rotate-[12deg] z-40 pointer-events-none"
                  style={{
                    clipPath: "polygon(5% 0, 95% 0, 100% 50%, 95% 100%, 5% 100%, 0 50%)"
                  }}
                />

                {/* Red ripped corner accent at bottom right */}
                <div 
                  className="absolute -bottom-3 -right-2 w-10 h-10 bg-[#e02424] shadow-md z-40 pointer-events-none"
                  style={{
                    clipPath: "polygon(40% 0, 100% 0, 100% 100%, 0 100%, 0 60%, 25% 40%)"
                  }}
                />

                {/* Contact list with interactive copy / click */}
                <div className="space-y-3.5 font-medium text-xs sm:text-[13px] text-[#1c1c1c]">
                  
                  {/* Email */}
                  <div 
                    onClick={() => copyToClipboard("yogeshsinde1@gmail.com", "email")}
                    className="flex items-center gap-3 p-1.5 -mx-1.5 rounded hover:bg-black/5 transition-colors cursor-pointer group/link"
                    title="Click to copy email address"
                  >
                    <div className="w-6 h-6 flex items-center justify-center border border-black/80 rounded-sm bg-white/30 text-black">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-mono tracking-tight group-hover/link:underline">
                      yogeshsinde1@gmail.com
                    </span>
                    <div className="ml-auto">
                      {copiedField === "email" ? (
                        <span className="text-[10px] text-emerald-700 font-mono font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Copied!
                        </span>
                      ) : (
                        <Copy className="w-3 h-3 text-black/40 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <a 
                    href="https://www.linkedin.com/in/yogesh-patil09/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-1.5 -mx-1.5 rounded hover:bg-black/5 transition-colors cursor-pointer group/link"
                  >
                    <div className="w-6 h-6 flex items-center justify-center bg-black text-white rounded-sm font-bold text-[10px]">
                      in
                    </div>
                    <span className="font-mono tracking-tight group-hover/link:underline">
                      /in/yogesh-patil09
                    </span>
                    <ExternalLink className="w-3 h-3 text-black/40 ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>

                  {/* GitHub */}
                  <a 
                    href="https://github.com/Yogx09"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-1.5 -mx-1.5 rounded hover:bg-black/5 transition-colors cursor-pointer group/link"
                  >
                    <div className="w-6 h-6 flex items-center justify-center border border-black/80 rounded-sm bg-white/30 text-black">
                      <GithubIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-mono tracking-tight group-hover/link:underline">
                      github.com/Yogx09
                    </span>
                    <ExternalLink className="w-3 h-3 text-black/40 ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>

                </div>
              </motion.div>

              {/* Floating Interaction Hint */}
              <div className="text-center mt-6">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#737373] bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.05]">
                  <Sparkles className="w-3 h-3 text-[#ff3b30]" /> Drag polaroid &amp; click photo to snap flash!
                </span>
              </div>

            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
}
