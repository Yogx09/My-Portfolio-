"use client";

import { MotionValue, useTransform, motion } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
  introProgress: MotionValue<number>;
  introDone: boolean;
}

export default function Overlay({ scrollYProgress, introProgress, introDone }: OverlayProps) {

  // Map overlays to appear sequentially during the backward intro sequence
  // introProgress goes from 79 down to 0 over 3 seconds
  
  // Section 2 text (The Quote): 
  // It is fully visible at frame 79 (opacity 1) and fades out at frame 40.
  const opacity2 = useTransform(introProgress, [79, 40, 25], [1, 1, 0]);
  const y2 = useTransform(introProgress, [79, 25], [-50, 50]);

  // Section 1 text ("Sinde Yogesh"): 
  // Fades in as the quote leaves, drops to the center and stays.
  const opacity1 = useTransform(introProgress, [35, 15, 0], [0, 1, 1]);
  const y1 = useTransform(introProgress, [35, 0], [-50, 0]);

  // When the user scrolls forward, we fade out the entire overlay wrapper 
  // so it doesn't block the screen during the forward scroll rollout.
  const globalOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <motion.div 
      style={{ opacity: globalOpacity }}
      className="absolute inset-0 pointer-events-none z-50"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center px-[5%] md:px-[10%]">
        
        {/* Section 1: The Name (Appears Last) */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-6xl md:text-8xl font-orbitron font-black tracking-tighter mb-4 platinum-gradient glow-pulse">
            SINDE YOGESH
          </h1>
          <p className="text-sm md:text-lg font-jakarta text-stone-400 font-semibold tracking-[0.6em] uppercase gold-gradient">
            Creative Developer
          </p>
        </motion.div>

        {/* Section 2: The Quote (Appears First) */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col justify-center items-start px-[5%] md:px-[10%]"
        >
          <div className="max-w-2xl border-l-2 border-stone-500/30 pl-6 md:pl-10 relative">
            <h2 className="text-4xl md:text-6xl font-cinzel leading-tight h-auto uppercase font-black tracking-widest relative z-10">
              &quot;<span className="platinum-gradient">CREATIVITY</span> <br />
              <span className="text-stone-400/80 text-3xl md:text-5xl block mt-4 font-jakarta font-light tracking-[0.2em]">
                IS <span className="nova-gradient">ART</span>.&quot;
              </span>
            </h2>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
