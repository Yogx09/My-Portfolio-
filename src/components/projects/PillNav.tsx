"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Atom, 
  Cpu, 
  Terminal, 
  Layers, 
  Flame, 
  CheckCircle, 
  Activity, 
  HeartPulse, 
  Sparkles,
  Bot
} from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Overview", icon: Atom },
  { id: "stockpulse", label: "StockPulse", icon: Flame },
  { id: "university-complaints", label: "Resolve", icon: CheckCircle },
  { id: "cmlre-ocean", label: "CMLRE", icon: Layers },
  { id: "designforge", label: "DesignForge", icon: Sparkles },
  { id: "oreo", label: "Oreo AI", icon: Bot },
  { id: "drowsiness", label: "Driver Safety", icon: Activity },
  { id: "agrovise", label: "AgroVise", icon: Atom },
  { id: "braintumor", label: "Brain MRI", icon: HeartPulse },
  { id: "prosthetic", label: "Prosthetic", icon: Cpu }
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] hidden sm:flex items-center gap-2 px-4 py-2.5 bg-black/70 backdrop-blur-2xl border border-white/15 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
    >
      {SECTIONS.map((sec) => {
        const isActive = active === sec.id;
        const Icon = sec.icon;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            title={sec.label}
            className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full transition-all group"
          >
            {isActive && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-amber-400/20 rounded-full border border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <Icon 
              className={`relative z-10 w-4 h-4 transition-colors duration-300 ${
                isActive ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'text-white/40 group-hover:text-white/80'
              }`} 
            />
          </button>
        );
      })}
    </motion.div>
  );
}
