"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  overlay: React.ReactNode;
}

export default function ParallaxTransition({ children, overlay }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smoothly scale down and fade the hero, giving it rounded corners
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0rem", "3rem"]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#121212]">
      {/* Background Hero Section (Sticks to top and shrinks) */}
      <motion.div 
        className="sticky top-0 h-screen w-full overflow-hidden origin-top"
        style={{ scale, opacity, borderRadius }}
      >
        {children}
      </motion.div>
      
      {/* Overlay Section (Slides up over the shrinking hero) */}
      <div className="relative z-10 w-full rounded-t-[3rem] shadow-[0_-40px_80px_rgba(0,0,0,1)] border-t border-white/20 bg-[#5a0b91] overflow-hidden">
        {overlay}
      </div>
    </div>
  );
}
