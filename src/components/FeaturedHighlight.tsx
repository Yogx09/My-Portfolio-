"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function FeaturedHighlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  // Magnetic Button Effect
  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 }); // 0.3 is the magnetic pull strength
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[120vh] bg-[#030508] flex items-center justify-center overflow-hidden border-t border-white/5"
    >
      {/* Background ambient glow that follows scroll */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_60%)] blur-3xl"></div>
      </motion.div>

      {/* Massive Typography Masking Effect */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-200px" }}
            className="flex flex-col items-center"
        >
            <div className="text-amber-500 font-orbitron text-xs md:text-sm tracking-[0.5em] mb-8 font-bold flex items-center gap-4">
              <span className="w-12 h-[1px] bg-amber-500/50"></span>
              SYS.ARCHITECT
              <span className="w-12 h-[1px] bg-amber-500/50"></span>
            </div>
            
            <h1 className="font-cinzel font-black text-5xl md:text-8xl lg:text-[10rem] leading-none tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10 drop-shadow-2xl">
              Building
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">The Future</span>
            </h1>

            <p className="mt-8 text-stone-400 font-jakarta text-lg md:text-xl max-w-2xl font-light leading-relaxed">
              Merging cutting-edge WebGL graphics with seamless interface design to create digital experiences that don't just exist—they captivate.
            </p>

            <div className="mt-16 h-32 flex items-center justify-center">
                <motion.div
                  animate={{ x: position.x, y: position.y }}
                  transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                >
                  <Link
                    href="/contact"
                    ref={buttonRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative px-12 py-6 rounded-full bg-amber-500 text-black font-orbitron font-bold tracking-[0.2em] text-sm group overflow-hidden inline-flex shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(245,158,11,0.6)]"
                  >
                    {/* Hover reveal gradient */}
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0"></div>
                    <span className="relative z-10 flex items-center gap-3">
                      INITIATE CONTACT
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                  </Link>
                </motion.div>
            </div>
        </motion.div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute left-8 bottom-8 flex flex-col gap-2 font-mono text-[10px] text-stone-500 tracking-widest pointer-events-none">
        <div>LAT: 45.912.88</div>
        <div>LNG: -12.441.90</div>
        <div className="text-amber-500/50 mt-2">SYNC_RATE: 99.9%</div>
      </div>
      
      <div className="absolute right-8 top-8 w-24 h-24 border border-white/5 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite] pointer-events-none">
        <div className="absolute top-0 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]"></div>
      </div>
    </section>
  );
}
