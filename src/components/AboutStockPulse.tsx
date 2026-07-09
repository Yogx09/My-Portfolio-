"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutStockPulse() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Text for word-by-word reveal
  const titleText = "About StockPulse".split(" ");
  
  const p1Text = "StockPulse is a real-time inventory reservation platform engineered to eliminate overselling in high-concurrency environments. Built with scalability, reliability, and performance at its core, it enables businesses to reserve stock safely before order confirmation using transaction-safe inventory locking.".split(" ");
  
  const p2Text = "The platform intelligently manages inventory across multiple warehouses, ensuring accurate stock allocation, live availability tracking, and seamless synchronization between systems. Administrators gain complete visibility through modern dashboards featuring real-time analytics, reservation monitoring, warehouse insights, and operational metrics.".split(" ");
  
  const p3Text = "Developed using Next.js, TypeScript, Prisma, PostgreSQL, Supabase, Railway, Tailwind CSS, Framer Motion, and Zod Validation, StockPulse combines enterprise-grade backend architecture with an elegant user experience designed for modern commerce.".split(" ");

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants: any = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" } }
  };

  const dashboardVariants: any = {
    hidden: { opacity: 0, scale: 0.95, rotateX: 10, y: 50 },
    visible: { opacity: 1, scale: 1, rotateX: 0, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.2 } }
  };

  const floatingCardVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-[#020202] text-white py-32 overflow-hidden flex items-center justify-center font-inter"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@300;400;500;600&display=swap');
        .font-space { font-family: 'Space Grotesk', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}} />

      {/* Background Effects */}
      <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)] blur-3xl mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_70%)] blur-3xl mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_reverse]" />
      </motion.div>
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <div className="max-w-[1400px] w-full mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Typography & Description */}
        <div className="flex flex-col z-20">
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "4rem" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-8 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
          />
          
          <motion.h2 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-5xl md:text-7xl font-space font-bold mb-10 tracking-tight leading-tight flex flex-wrap gap-x-4"
          >
            {titleText.map((word, i) => (
              <motion.span key={i} variants={wordVariants}>{word}</motion.span>
            ))}
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8 text-stone-400 text-lg md:text-xl font-inter font-light leading-relaxed"
          >
            <p className="flex flex-wrap gap-x-2">
              {p1Text.map((word, i) => (
                <motion.span key={i} variants={wordVariants}>{word}</motion.span>
              ))}
            </p>
            <p className="flex flex-wrap gap-x-2">
              {p2Text.map((word, i) => (
                <motion.span key={i} variants={wordVariants}>{word}</motion.span>
              ))}
            </p>
            <p className="flex flex-wrap gap-x-2 text-stone-500 text-base">
              {p3Text.map((word, i) => (
                <motion.span key={i} variants={wordVariants}>{word}</motion.span>
              ))}
            </p>
          </motion.div>
        </div>

        {/* Right Side: 3D Visualization */}
        <div className="relative w-full aspect-square md:aspect-auto md:h-[700px] flex items-center justify-center perspective-1000 z-10 group cursor-crosshair">
          
          <motion.div 
            variants={dashboardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full h-[500px] md:h-[600px] transform-style-3d group-hover:rotate-x-[2deg] group-hover:rotate-y-[-2deg] transition-transform duration-700 ease-out"
          >
            {/* Main Glass Panel (Dashboard Base) */}
            <div className="absolute inset-0 rounded-[32px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col p-6">
              
              {/* Dashboard Header */}
              <div className="flex justify-between items-center border-b border-white/[0.05] pb-4 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="font-space text-xs tracking-widest text-stone-500 uppercase">Live Inventory</div>
              </div>

              {/* Warehouse Nodes & Connections */}
              <div className="relative flex-1 rounded-2xl border border-white/[0.03] bg-black/20 p-4 overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]">
                
                {/* Node 1 */}
                <motion.div variants={floatingCardVariants} className="absolute top-8 left-8 w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)] z-20 group/node cursor-pointer hover:scale-110 transition-transform">
                  <div className="w-8 h-8 rounded-full border border-blue-400/50 flex items-center justify-center animate-[spin_4s_linear_infinite]">
                    <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]"></div>
                  </div>
                  <span className="absolute -bottom-6 text-[10px] text-blue-300/70 font-space tracking-widest opacity-0 group-hover/node:opacity-100 transition-opacity">WH-US</span>
                </motion.div>

                {/* Node 2 */}
                <motion.div variants={floatingCardVariants} className="absolute top-24 right-12 w-20 h-20 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.2)] z-20 group/node cursor-pointer hover:scale-110 transition-transform">
                  <div className="w-10 h-10 rounded-full border border-purple-400/50 flex items-center justify-center animate-[spin_6s_linear_infinite_reverse]">
                    <div className="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc]"></div>
                  </div>
                  <span className="absolute -bottom-6 text-[10px] text-purple-300/70 font-space tracking-widest opacity-0 group-hover/node:opacity-100 transition-opacity">WH-EU</span>
                </motion.div>

                {/* Node 3 */}
                <motion.div variants={floatingCardVariants} className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)] z-20 group/node cursor-pointer hover:scale-110 transition-transform">
                   <div className="w-12 h-12 rounded-full border border-emerald-400/50 flex items-center justify-center animate-[spin_5s_linear_infinite]">
                      <div className="w-6 h-6 rounded-full border border-dashed border-emerald-400/70 animate-[spin_3s_linear_infinite_reverse] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]"></div>
                      </div>
                   </div>
                   <span className="absolute -bottom-6 text-[10px] text-emerald-300/70 font-space tracking-widest opacity-0 group-hover/node:opacity-100 transition-opacity">CENTRAL_DB</span>
                </motion.div>

                {/* Animated Connection Lines (SVGs) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.2))' }}>
                  {/* Line 1 -> 3 */}
                  <motion.path 
                    d="M 64 64 L 200 250" 
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth="2" 
                    fill="none" 
                    strokeDasharray="4 4"
                  />
                  {/* Line 2 -> 3 */}
                  <motion.path 
                    d="M 300 120 L 220 250" 
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth="2" 
                    fill="none"
                    strokeDasharray="4 4"
                  />
                  {/* Moving Packets */}
                  <circle cx="0" cy="0" r="3" fill="#60a5fa" className="shadow-[0_0_10px_#60a5fa]">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M 64 64 L 200 250" />
                  </circle>
                  <circle cx="0" cy="0" r="3" fill="#c084fc" className="shadow-[0_0_10px_#c084fc]">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M 300 120 L 220 250" />
                  </circle>
                </svg>

                {/* Floating Metric Card 1 */}
                <motion.div 
                  variants={floatingCardVariants}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-32 left-4 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md shadow-xl z-30"
                >
                  <div className="text-[9px] text-stone-500 font-space mb-1">LOCK STATUS</div>
                  <div className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    SECURED
                  </div>
                </motion.div>

                {/* Floating Metric Card 2 */}
                <motion.div 
                  variants={floatingCardVariants}
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-32 right-4 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-md shadow-xl z-30"
                >
                  <div className="text-[9px] text-stone-500 font-space mb-1">REQ / SEC</div>
                  <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    1,204 <span className="text-blue-400 text-xs">↑</span>
                  </div>
                </motion.div>

                {/* Mini Live Chart */}
                <div className="absolute bottom-4 left-4 right-4 h-16 border-t border-white/[0.05] flex items-end gap-1 pt-2 opacity-50">
                  {[...Array(20)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="flex-1 bg-gradient-to-t from-white/20 to-transparent rounded-t-sm"
                      initial={{ height: "10%" }}
                      animate={{ height: `${20 + Math.random() * 80}%` }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: i * 0.1 }}
                    />
                  ))}
                </div>

              </div>
            </div>
            
            {/* Glowing Accent Borders (Behind) */}
            <div className="absolute -inset-0.5 rounded-[34px] bg-gradient-to-br from-blue-500/30 via-transparent to-purple-500/30 blur-md -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-[20%] -right-8 w-32 h-32 bg-blue-500/20 blur-[60px] rounded-full -z-20 group-hover:bg-blue-500/40 transition-colors duration-700" />
            <div className="absolute bottom-[20%] -left-8 w-32 h-32 bg-purple-500/20 blur-[60px] rounded-full -z-20 group-hover:bg-purple-500/40 transition-colors duration-700" />
          
          </motion.div>
        </div>

      </div>
    </section>
  );
}
