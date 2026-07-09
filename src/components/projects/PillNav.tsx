"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Atom, Cpu, Terminal, LayoutGrid, Film } from "lucide-react";

const SECTIONS = [
  { id: "hero", icon: Atom },
  { id: "agrovise", icon: Atom }, // Using standard icons, customize as needed
  { id: "prosthetic", icon: Cpu },
  { id: "arch", icon: Terminal },
  { id: "ibm", icon: LayoutGrid },
  { id: "hackathons", icon: Film },
];

export default function PillNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map(s => document.getElementById(s.id));
      let current = "hero";
      let minDistance = Infinity;

      sections.forEach(section => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 3);
        if (distance < minDistance) {
          minDistance = distance;
          current = section.id;
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)]"
    >
      {SECTIONS.map((sec) => {
        const isActive = active === sec.id;
        const Icon = sec.icon;
        return (
          <div key={sec.id} className="relative flex items-center justify-center w-10 h-10">
            {isActive && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon className={`relative z-10 w-5 h-5 transition-colors duration-300 ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/40'}`} />
          </div>
        );
      })}
    </motion.div>
  );
}
