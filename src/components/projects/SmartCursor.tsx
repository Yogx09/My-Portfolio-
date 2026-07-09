"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SmartCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      // Traverse up to find a data-cursor attribute
      const cursorTarget = target.closest('[data-cursor]');
      
      if (cursorTarget) {
        const variant = cursorTarget.getAttribute('data-cursor') || "default";
        setCursorVariant(variant);
        
        const text = cursorTarget.getAttribute('data-cursor-text') || "";
        setCursorText(text);
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePos.x - 8,
      y: mousePos.y - 8,
      width: 16,
      height: 16,
      borderRadius: "50%",
      backgroundColor: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      mixBlendMode: "difference" as const,
      transition: { type: "tween", ease: "backOut", duration: 0.15 }
    },
    scan: {
      x: mousePos.x - 40,
      y: mousePos.y - 40,
      width: 80,
      height: 80,
      borderRadius: "50%",
      backgroundColor: "rgba(16, 185, 129, 0.1)", // Emerald
      border: "1px dashed rgba(16, 185, 129, 0.8)",
      mixBlendMode: "normal" as const,
      transition: { type: "spring", stiffness: 150, damping: 15 }
    },
    terminal: {
      x: mousePos.x - 10,
      y: mousePos.y - 15,
      width: 20,
      height: 30,
      borderRadius: "0%",
      backgroundColor: "rgba(34, 211, 238, 0.8)", // Cyan
      border: "none",
      mixBlendMode: "normal" as const,
      animation: "blink 1s step-end infinite",
      transition: { type: "tween", ease: "linear", duration: 0.05 }
    },
    magnetic: {
      x: mousePos.x - 24,
      y: mousePos.y - 24,
      width: 48,
      height: 48,
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "none",
      mixBlendMode: "difference" as const,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}} />
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center font-orbitron font-bold text-[10px] tracking-widest text-emerald-400"
        variants={variants}
        animate={cursorVariant}
      >
        {cursorVariant === "scan" && cursorText}
      </motion.div>
    </>
  );
}
