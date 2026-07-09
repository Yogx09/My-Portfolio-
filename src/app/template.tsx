"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  // Awwwards-style vertical blinds transition
  const columns = 5;
  
  const anim = {
    initial: { top: 0 },
    animate: { top: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { top: "0vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[9999] flex">
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={i}
            className="relative h-full w-full bg-[#030508] border-r border-white/5"
            variants={anim}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ ...anim.animate.transition, delay: i * 0.05 }}
          />
        ))}
      </div>
      {children}
    </>
  );
}
