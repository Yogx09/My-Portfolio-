"use client";

import React, { useEffect, useState, useRef } from "react";
import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing";
import { retroAudio } from "./retro/RetroAudio";

interface WavingPreloaderProps {
  onComplete: () => void;
  imagesReady: boolean;
  loadProgress: number;
}

export default function WavingPreloader({
  onComplete,
  imagesReady,
  loadProgress,
}: WavingPreloaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
  const completedRef = useRef(false);

  // Smooth loading percentage interpolation
  useEffect(() => {
    let animationFrame: number;
    const updateProgress = () => {
      setDisplayProgress((prev) => {
        const target = Math.max(prev, loadProgress || 0);
        const increment = target > prev ? (target - prev) * 0.15 : 0.5;
        const next = Math.min(100, prev + Math.max(increment, 0.25));

        if (next >= 100 && !isReadyToEnter) {
          setIsReadyToEnter(true);
        }
        return next;
      });
      animationFrame = requestAnimationFrame(updateProgress);
    };

    animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [loadProgress, isReadyToEnter]);

  const handleManualEnter = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    retroAudio.playBeep(1400, 0.1, "sine");
    onComplete();
  };

  // Keyboard Enter listener: only on pressing Enter does it proceed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleManualEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const progressPercent = Math.min(100, Math.floor(displayProgress));

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#f6f4f0] select-none overflow-hidden">
      <WavingPortfolioLanding
        name="SINDE YOGESH"
        year="2026"
        roles={["DEVELOPER", "CREATIVE ENGINEER"]}
        lettersLeft={["P", "F"]}
        giantLetter="O"
        lettersRight={["RT", "LIO"]}
        title="Portfolio"
        greeting="Hi there, I'm Yogesh!"
        accent="#e5262c"
        paper="#f6f4f0"
        ink="#141414"
        showCornerDice={true}
        showSignature={false}
        showDoodles={true}
        intro={true}
        height="100svh"
        className="w-full h-full"
        centerButton={
          <button
            type="button"
            onClick={handleManualEnter}
            className="group relative px-6 sm:px-8 py-3 rounded-full bg-[#f6f4f0] border-2 border-[#e5262c] text-[#e5262c] hover:bg-[#e5262c] hover:text-[#f6f4f0] transition-all duration-300 shadow-[0_8px_25px_rgba(229,38,44,0.2)] hover:shadow-[0_12px_32px_rgba(229,38,44,0.35)] hover:scale-110 active:scale-95 cursor-pointer flex items-center gap-2.5 font-mono font-black text-xs sm:text-sm tracking-widest uppercase select-none"
            title="Click or press Enter on keyboard to enter"
          >
            <span className="w-2 h-2 rounded-full bg-[#e5262c] group-hover:bg-white animate-pulse shadow-[0_0_8px_rgba(229,38,44,0.8)]" />
            <span>ENTER STUDIO</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#e5262c]/10 group-hover:bg-white/20 font-mono font-bold">
              [ ↵ ]
            </span>
          </button>
        }
      />

      {/* Small loading percentage at bottom corner with same red color and pattern */}
      <div className="fixed bottom-5 right-6 z-50 flex items-center gap-2 select-none pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f6f4f0]/95 backdrop-blur-md border border-[#e5262c]/60 text-[#e5262c] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e5262c] animate-pulse" />
          <span className="font-mono font-black text-[11px] tracking-wider">
            {progressPercent < 100 ? `LOADING ${String(progressPercent).padStart(3, "0")}%` : "READY 100%"}
          </span>
          <div className="w-12 h-1 bg-[#e5262c]/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#e5262c] transition-all duration-150 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
