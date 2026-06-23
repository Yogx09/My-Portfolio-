"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const aboutData = {
  ORIGIN: {
    title: "SYS.ORIGIN",
    text: "Born in MH, IN. Raised on digital landscapes and creative problem solving. Began coding as a way to construct universes from nothing. The journey from a simple curiosity to a professional creative developer has been fueled by an obsession with pushing the limits of the web."
  },
  PHILOSOPHY: {
    title: "SYS.PHILOSOPHY",
    text: "Creativity is not just art—it's logic expressed beautifully.\n\nI believe in blending raw performance with cinematic aesthetics. A website should not just be read; it should be experienced. Every pixel, every animation, and every line of code serves a larger purpose."
  },
  ARSENAL: {
    title: "SYS.ARSENAL",
    text: "PRIMARY WEAPONS:\nReact, Next.js, Three.js, TypeScript.\n\nSECONDARY UTILITIES:\nTailwind CSS, Framer Motion, WebGL.\n\nCORE INFRASTRUCTURE:\nNode.js, Python, PostgreSQL, AWS.\n\nDESIGN SYSTEMS:\nFigma, UI/UX Principles."
  },
  MISSION: {
    title: "SYS.MISSION",
    text: "To bridge the gap between engineering and art. \n\nI aim to build high-end digital experiences that leave a lasting impact, collaborating with visionary teams to redefine what is possible in the browser. I want to build the future."
  }
};

type NodeKey = keyof typeof aboutData;

export default function AboutPage() {
  const [activeNode, setActiveNode] = useState<NodeKey>("ORIGIN");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Terminal Typing Effect
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText("");
    const textToType = aboutData[activeNode].text;
    let i = 0;
    
    // Slight delay before typing starts for mechanical feel
    const startDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (i < textToType.length) {
          setDisplayedText(textToType.substring(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 15); // incredibly fast typing speed for a pro-hacker vibe

      return () => clearInterval(typingInterval);
    }, 150);

    return () => clearTimeout(startDelay);
  }, [activeNode]);

  return (
    <main className="min-h-screen bg-[#030305] text-slate-200 overflow-hidden relative font-jakarta selection:bg-amber-500/30">
      
      {/* Deep Space Background / Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(49,46,129,0.15)_0%,rgba(0,0,0,0)_80%)]"></div>
        {/* Subtle grid pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 w-full p-8 flex justify-between items-center">
        <a href="/" className="group flex items-center gap-3 text-xs font-mono tracking-widest text-indigo-400 hover:text-amber-400 transition-colors">
          <span className="w-6 h-[1px] bg-indigo-400 group-hover:bg-amber-400 group-hover:w-10 transition-all duration-300 shadow-[0_0_10px_currentColor]"></span>
          [ RETURN_TO_PORTAL ]
        </a>
        <div className="font-orbitron font-black text-xs tracking-[0.4em] text-slate-500">
          SYS.LOC: <span className="text-amber-600 drop-shadow-[0_0_8px_#d97706]">/ABOUT_ME</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto min-h-[85vh] flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 px-6 pt-10">
        
        {/* Left: 2D Avatar Hologram */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1] }}
          className="relative w-full max-w-[300px] md:max-w-[400px] aspect-square flex items-center justify-center"
        >
          {/* Orbital Rings */}
          <div className="absolute inset-0 border border-indigo-500/20 rounded-full animate-[spin_30s_linear_infinite]"></div>
          <div className="absolute inset-6 border border-amber-500/20 border-dashed rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
          <div className="absolute inset-12 border border-teal-500/10 border-dotted rounded-full animate-[spin_40s_linear_infinite]"></div>
          
          {/* Hologram Base Beam */}
          <div className="absolute -bottom-4 w-64 h-8 bg-indigo-500/30 rounded-full blur-2xl animate-pulse"></div>

          {/* Floating Avatar Container */}
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            className="relative z-10 w-3/4 h-3/4 rounded-full overflow-hidden border border-indigo-900 shadow-[0_0_60px_rgba(49,46,129,0.5)] filter drop-shadow-[0_0_20px_rgba(79,70,229,0.3)] bg-slate-950"
          >
            {/* The Generated 2D Character Image */}
            <img src="/avatar.png" alt="Creator Avatar" className="w-full h-full object-cover object-top opacity-90 transition-all hover:scale-105 hover:opacity-100 duration-500" />
            
            {/* Holographic Scanline Overlay on Image */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] mix-blend-overlay pointer-events-none"></div>
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] pointer-events-none"></div>
          </motion.div>
        </motion.div>

        {/* Right: Interactive Terminal */}
        <div className="w-full max-w-2xl flex flex-col mt-8 lg:mt-0">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-cinzel-dec font-black text-4xl md:text-6xl tracking-widest text-white mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              SINDE YOGESH
            </h1>
            <h2 className="font-mono text-[10px] md:text-xs tracking-[0.5em] text-amber-500 mb-10 font-bold">CREATIVE_DEVELOPER_MATRIX</h2>
          </motion.div>

          {/* Data Nodes Navigation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {(Object.keys(aboutData) as NodeKey[]).map((node) => (
              <button
                key={node}
                onClick={() => setActiveNode(node)}
                className={`relative px-6 py-2.5 font-mono text-xs tracking-widest transition-all duration-300 border backdrop-blur-md overflow-hidden group ${
                  activeNode === node 
                  ? "border-amber-500 text-amber-400 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]" 
                  : "border-indigo-900/40 text-indigo-400/70 hover:border-indigo-500 hover:text-indigo-200 hover:bg-indigo-900/30"
                }`}
              >
                <span className="relative z-10">{node}</span>
                
                {activeNode === node && (
                  <motion.div layoutId="activeNodeIndicator" className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_15px_#fbbf24] z-10"></motion.div>
                )}
                
                {/* Hover subtle glow sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
              </button>
            ))}
          </motion.div>

          {/* Terminal Display */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative border border-slate-800/80 bg-slate-950/60 backdrop-blur-md p-6 md:p-8 min-h-[280px] font-mono text-sm shadow-[0_10px_40px_rgba(0,0,0,0.6)] group"
          >
            {/* Terminal Header */}
            <div className="flex gap-2.5 mb-6 border-b border-slate-800/80 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/40 shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              <span className="ml-4 text-[10px] text-slate-500 tracking-widest group-hover:text-amber-500/80 transition-colors duration-500">{aboutData[activeNode].title}</span>
            </div>

            {/* Terminal Output */}
            <div className="text-slate-300 leading-relaxed font-medium">
              <span className="text-indigo-400 mr-3 animate-pulse">{">"}</span>
              <span dangerouslySetInnerHTML={{ __html: displayedText.replace(/\n/g, '<br/>') }} />
              {isTyping && <span className="inline-block w-2.5 h-4 bg-amber-500 ml-1 translate-y-0.5 shadow-[0_0_8px_#fbbf24]"></span>}
              {!isTyping && <span className="inline-block w-2.5 h-4 bg-indigo-500/50 ml-1 translate-y-0.5 animate-pulse"></span>}
            </div>

            {/* Decorative Corner Borders */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-indigo-400/50"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-indigo-400/50"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-indigo-400/50"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-indigo-400/50"></div>
            
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </motion.div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </main>
  );
}
