"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Briefcase, Code2, Cpu, Hexagon } from "lucide-react";
import Link from "next/link";

export default function FloatingMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  const navItems = [
    { id: "ABOUT", icon: <User className="w-5 h-5" />, link: "/about", color: "text-stone-300", borderColor: "border-white/20", glow: "shadow-[0_0_10px_rgba(255,255,255,0.1)]" },
    { id: "EXPERIENCE", icon: <Briefcase className="w-5 h-5" />, link: "/experience", color: "text-amber-500", borderColor: "border-amber-500/40", glow: "shadow-[0_0_15px_rgba(251,191,36,0.2)]" },
    { id: "PROJECTS", icon: <Code2 className="w-5 h-5" />, link: "/projects", color: "text-amber-500", borderColor: "border-amber-500/40", glow: "shadow-[0_0_15px_rgba(251,191,36,0.2)]" },
    { id: "SKILLS", icon: <Cpu className="w-5 h-5" />, link: "/skills", color: "text-stone-300", borderColor: "border-white/20", glow: "shadow-[0_0_10px_rgba(255,255,255,0.1)]" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[200] lg:hidden flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-4 mb-4 pointer-events-auto items-end"
          >
            {navItems.map((item, index) => (
              <Link key={item.id} href={item.link} className="flex items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="font-orbitron text-[9px] tracking-[0.2em] text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 shadow-lg"
                >
                  {item.id}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 260, damping: 20 }}
                  onClick={() => setIsOpen(false)}
                  className={`w-12 h-12 rounded-full bg-[#030508]/90 backdrop-blur-xl border ${item.borderColor} flex items-center justify-center ${item.color} ${item.glow} active:scale-95 transition-transform`}
                >
                  {item.icon}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggleNav}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 border border-white/20 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] pointer-events-auto active:scale-90 transition-all duration-300 relative z-10"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Hexagon className="w-6 h-6" />}
      </button>
    </div>
  );
}
