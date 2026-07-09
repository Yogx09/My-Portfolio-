"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MapPin, Activity, Terminal } from "lucide-react";

const BENTO_ANIMATION = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#030305] text-slate-200 overflow-hidden relative font-jakarta selection:bg-amber-500/30 pb-20">
      
      {/* Deep Space Background / Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(49,46,129,0.15)_0%,rgba(0,0,0,0)_80%)]"></div>
        {/* Subtle grid pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 w-full p-8 md:p-12 flex justify-between items-center max-w-[1400px] mx-auto">
        <Link href="/#projects" className="group flex items-center gap-3 text-xs font-mono tracking-widest text-indigo-400 hover:text-amber-400 transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="w-6 h-[1px] bg-indigo-400 group-hover:bg-amber-400 group-hover:w-10 transition-all duration-300 shadow-[0_0_10px_currentColor]"></span>
          [ RETURN_TO_PORTAL ]
        </Link>
        <div className="font-orbitron font-black text-xs tracking-[0.4em] text-slate-500">
          SYS.LOC: <span className="text-amber-600 drop-shadow-[0_0_8px_#d97706]">/ABOUT_ME</span>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <motion.div 
        variants={STAGGER}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[220px]"
      >
        
        {/* CARD 1: Identity & Avatar (Spans 2 cols, 2 rows) */}
        <motion.div variants={BENTO_ANIMATION} className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-white/[0.02] border border-white/[0.05] rounded-[2rem] overflow-hidden relative group shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md">
          {/* Background Avatar Image with Parallax Zoom */}
          <div className="absolute inset-0 z-0">
             <img src="/profile.png" alt="Sinde Yogesh Avatar" className="w-full h-full object-cover object-top opacity-50 group-hover:scale-110 group-hover:opacity-70 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] filter grayscale group-hover:grayscale-0" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col justify-end">
             <div className="w-12 h-[2px] bg-amber-500 mb-6 shadow-[0_0_15px_rgba(245,158,11,0.8)]"></div>
             <h1 className="font-cinzel font-black text-4xl md:text-6xl tracking-widest text-white uppercase drop-shadow-lg leading-tight mb-2">
                SINDE <br/> YOGESH
             </h1>
             <h2 className="font-orbitron text-xs md:text-sm tracking-[0.5em] text-amber-500 font-bold uppercase">
                Creative Architect
             </h2>
          </div>
        </motion.div>

        {/* CARD 2: Philosophy (Spans 2 cols, 1 row) */}
        <motion.div variants={BENTO_ANIMATION} className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-white/[0.02] border border-white/[0.05] rounded-[2rem] overflow-hidden relative group shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md p-8 md:p-10 flex flex-col justify-center">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
           <Terminal className="w-6 h-6 text-indigo-400 mb-4 opacity-50" />
           <p className="text-stone-300 font-jakarta text-sm md:text-base leading-relaxed font-light">
             <span className="text-white font-medium">Creativity is logic expressed beautifully.</span> <br/>
             Born in MH, IN. Raised on digital landscapes. I blend raw performance with cinematic aesthetics to build experiences that aren't just read—they are felt. Every pixel serves a purpose.
           </p>
        </motion.div>

        {/* CARD 3: Location / Map (Spans 1 col, 1 row) */}
        <motion.div variants={BENTO_ANIMATION} className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-white/[0.02] border border-white/[0.05] rounded-[2rem] overflow-hidden relative group shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md flex flex-col items-center justify-center">
            {/* Radar Animation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-500">
               <div className="w-32 h-32 border border-emerald-500/30 rounded-full"></div>
               <div className="absolute w-24 h-24 border border-emerald-500/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
               <div className="absolute w-16 h-16 border border-emerald-500/40 rounded-full"></div>
            </div>
            
            <MapPin className="w-8 h-8 text-emerald-400 mb-3 relative z-10 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            <h3 className="font-orbitron font-bold text-white tracking-[0.2em] relative z-10">MH, IN</h3>
            <p className="text-[10px] text-emerald-500 tracking-widest mt-1 relative z-10">BASE OF OPERATIONS</p>
        </motion.div>

        {/* CARD 4: Live Status (Spans 1 col, 1 row) */}
        <motion.div variants={BENTO_ANIMATION} className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 bg-white/[0.02] border border-white/[0.05] rounded-[2rem] overflow-hidden relative group shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4 group-hover:scale-110 transition-transform duration-500">
               <Activity className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            
            <h3 className="font-orbitron font-bold text-[10px] text-white tracking-[0.2em] relative z-10 text-center uppercase">
              Available For <br/> Missions
            </h3>
            <div className="flex items-center gap-2 mt-3">
               <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-ping"></div>
               <span className="text-[9px] text-amber-500 tracking-widest font-mono">SYSTEM ONLINE</span>
            </div>
        </motion.div>

        {/* CARD 5: Endless Tech Marquee (Spans full width) */}
        <motion.div variants={BENTO_ANIMATION} className="col-span-1 md:col-span-3 lg:col-span-4 row-span-1 bg-white/[0.02] border border-white/[0.05] rounded-[2rem] overflow-hidden relative group shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md flex flex-col justify-center">
           <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030305] to-transparent z-10"></div>
           <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030305] to-transparent z-10"></div>
           
           <div className="flex flex-col gap-4">
              <div className="pl-8 text-[10px] text-stone-500 font-orbitron tracking-[0.3em]">PRIMARY_ARSENAL</div>
              
              <div className="flex w-max animate-[marquee-left_30s_linear_infinite]">
                 {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-4 px-4">
                      {["REACT", "NEXT.JS", "THREE.JS", "TYPESCRIPT", "TAILWIND", "NODE.JS", "FRAMER MOTION", "POSTGRESQL", "WEBGL", "PYTHON"].map((tech) => (
                         <div key={tech} className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-mono tracking-widest text-stone-300 whitespace-nowrap hover:border-indigo-500 hover:text-white transition-colors cursor-default">
                           {tech}
                         </div>
                      ))}
                    </div>
                 ))}
              </div>
           </div>
        </motion.div>

        {/* CARD 6: Education & Training (Spans 2 cols, 2 rows for an elegant timeline) */}
        <motion.div variants={BENTO_ANIMATION} className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-white/[0.02] border border-white/[0.05] rounded-[2rem] overflow-hidden relative group shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md p-8 md:p-10 flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
                </div>
                <h3 className="font-orbitron font-bold text-white tracking-[0.2em] text-sm">ACADEMIC.TIMELINE</h3>
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col justify-between pl-4">
                {/* Animated Vertical Track */}
                <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-white/10"></div>
                <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute left-0 top-2 w-[2px] bg-gradient-to-b from-indigo-400 via-teal-400 to-transparent shadow-[0_0_10px_#6366f1]"
                ></motion.div>

                {/* ITEM 1: VIT */}
                <div className="relative group/item cursor-default mb-6">
                    <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-[#030305] bg-indigo-500 group-hover/item:scale-150 group-hover/item:bg-white transition-all duration-300 shadow-[0_0_10px_#6366f1]"></div>
                    <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-white tracking-wide text-sm md:text-base group-hover/item:text-indigo-300 transition-colors">Vellore Institute of Technology</h4>
                        <span className="font-mono text-[10px] text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded bg-indigo-500/10 whitespace-nowrap ml-4">2022 - 2027</span>
                    </div>
                    <p className="text-stone-300 text-xs font-medium mb-1">Integrated M.Tech in Software Engineering</p>
                    <div className="flex items-center gap-3">
                        <p className="text-stone-500 text-[10px] uppercase tracking-widest flex items-center gap-1"><MapPin className="w-3 h-3" /> AP, India</p>
                        <p className="text-amber-400/80 text-[10px] font-mono font-bold bg-amber-400/10 px-1.5 py-0.5 rounded">GPA: 8.3/10.0</p>
                    </div>
                </div>

                {/* ITEM 2: Sri Chaitanya */}
                <div className="relative group/item cursor-default mb-6">
                    <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-[#030305] bg-teal-500 group-hover/item:scale-150 group-hover/item:bg-white transition-all duration-300 shadow-[0_0_10px_#14b8a6]"></div>
                    <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-white tracking-wide text-sm md:text-base group-hover/item:text-teal-300 transition-colors">Sri Chaitanya College</h4>
                        <span className="font-mono text-[10px] text-teal-400 border border-teal-500/30 px-2 py-0.5 rounded bg-teal-500/10 whitespace-nowrap ml-4">2020 - 2022</span>
                    </div>
                    <p className="text-stone-300 text-xs font-medium mb-1">Intermediate Education</p>
                    <div className="flex items-center gap-3">
                        <p className="text-stone-500 text-[10px] uppercase tracking-widest flex items-center gap-1"><MapPin className="w-3 h-3" /> India</p>
                        <p className="text-emerald-400/80 text-[10px] font-mono font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded">93.6%</p>
                    </div>
                </div>

                {/* ITEM 3: Vasavi */}
                <div className="relative group/item cursor-default">
                    <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-[#030305] bg-stone-500 group-hover/item:scale-150 group-hover/item:bg-white transition-all duration-300"></div>
                    <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-white tracking-wide text-sm md:text-base group-hover/item:text-stone-300 transition-colors">Vasavi High School</h4>
                        <span className="font-mono text-[10px] text-stone-400 border border-stone-500/30 px-2 py-0.5 rounded bg-stone-500/10 whitespace-nowrap ml-4">2020</span>
                    </div>
                    <p className="text-stone-300 text-xs font-medium mb-1">Secondary School Certificate</p>
                    <div className="flex items-center gap-3">
                        <p className="text-stone-500 text-[10px] uppercase tracking-widest flex items-center gap-1"><MapPin className="w-3 h-3" /> India</p>
                        <p className="text-amber-400/80 text-[10px] font-mono font-bold bg-amber-400/10 px-1.5 py-0.5 rounded">GPA: 9.8/10.0</p>
                    </div>
                </div>

            </div>
        </motion.div>

        {/* CARD 7: Achievements & Honors (Spans 2 cols, 1 row) */}
        <motion.div variants={BENTO_ANIMATION} className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-white/[0.02] border border-white/[0.05] rounded-[2rem] overflow-hidden relative group shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md p-8 md:p-10 flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                </div>
                <h3 className="font-orbitron font-bold text-white tracking-[0.2em] text-sm">ACHIEVEMENTS.LOG</h3>
            </div>

            <div className="relative z-10 space-y-4">
                <div className="flex items-start gap-4 group/achieve">
                    <div className="font-mono text-[10px] text-amber-500 border border-amber-500/30 bg-amber-500/10 px-2 py-1 rounded mt-0.5 group-hover/achieve:bg-amber-500 group-hover/achieve:text-black transition-colors">2024</div>
                    <div>
                        <h4 className="text-white text-sm font-medium tracking-wide">National Hackathon Winner</h4>
                        <p className="text-stone-400 text-xs mt-1 leading-relaxed">Built a full-stack real-time 3D data visualization engine in under 48 hours.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 group/achieve">
                    <div className="font-mono text-[10px] text-teal-400 border border-teal-400/30 bg-teal-400/10 px-2 py-1 rounded mt-0.5 group-hover/achieve:bg-teal-400 group-hover/achieve:text-black transition-colors">2023</div>
                    <div>
                        <h4 className="text-white text-sm font-medium tracking-wide">Awwwards Honorable Mention</h4>
                        <p className="text-stone-400 text-xs mt-1 leading-relaxed">Recognized for innovative UI/UX and seamless Three.js integration in portfolio v1.</p>
                    </div>
                </div>
            </div>
            
            {/* Ambient Background Glow */}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.1),transparent_70%)] pointer-events-none"></div>
        </motion.div>

      </motion.div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </main>
  );
}
