"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, animate, useMotionValue, AnimatePresence, motion } from "framer-motion";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";
import SanskritAstraLoader from "./SanskritAstraLoader";
import { globalLenis } from "./SmoothScroll";

export default function ScrollySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  
  const [exitPreloader, setExitPreloader] = useState(false);

  const introProgress = useMotionValue(79); // Start at last frame

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const isSkipped = window.location.hash === '#projects';
    if (isSkipped) {
        setIntroDone(true);
        setExitPreloader(true);
        introProgress.set(0);
        
        if (globalLenis) globalLenis.start();
        document.body.style.overflow = "";
        
        // Scroll to projects if needed
        setTimeout(() => {
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
    }

    // Reset scroll position on load
    window.scrollTo(0, 0);
    if (globalLenis) {
      globalLenis.scrollTo(0, { immediate: true });
      globalLenis.stop(); // Lock scroll
    }
    document.body.style.overflow = "hidden"; // Fallback lock

    // Wait until preloader has been triggered to exit
    if (!exitPreloader) return;

    // Start the sequence without waiting for a preloader fade out
    const startDelay = setTimeout(() => {
      const controls = animate(introProgress, 0, {
        duration: 3, 
        ease: "linear", 
        onComplete: () => {
          // Unlock scroll when done
          if (globalLenis) globalLenis.start();
          document.body.style.overflow = "";
          setIntroDone(true);
        }
      });

      return () => controls.stop();
    }, 800);

    return () => {
      clearTimeout(startDelay);
      if (globalLenis) globalLenis.start();
      document.body.style.overflow = "";
    };
  }, [introProgress, exitPreloader]);

  // One-scroll Auto-Play Hijack
  useEffect(() => {
    if (!introDone) return;

    let isAutoScrolling = false;
    let touchStartY = 0;

    const triggerAutoScroll = () => {
      if (window.scrollY < 50 && !isAutoScrolling && globalLenis) {
        isAutoScrolling = true;
        globalLenis.scrollTo('#projects', {
          duration: 5.5, // Smooth, cinematic 5.5 second auto-play
          lock: true,
          onComplete: () => {
            isAutoScrolling = false;
          }
        });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) triggerAutoScroll();
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      if (touchStartY > touchEndY) triggerAutoScroll();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [introDone]);

  return (
    // 200vh perfectly encapsulates the image sequence. Once it finishes, the container ends, 
    // the image un-sticks, and the rest of the page (Projects section) flows up immediately.
    <div ref={containerRef} className="relative h-[200vh] w-full bg-[#121212]">
      
      {/* Horizontal Parting Portal Gates Preloader */}
      <AnimatePresence>
        {!exitPreloader && (
          <motion.div 
            className="fixed inset-0 z-50 flex pointer-events-none overflow-hidden"
          >
            {/* Left Portal Gate Monolith */}
            <motion.div 
              exit={{ x: "-100%" }}
              transition={{ 
                duration: 1.2, 
                ease: [0.87, 0, 0.13, 1] 
              }}
              className="w-1/2 h-full bg-[#030305] border-r border-teal-500/10"
            />
            {/* Right Portal Gate Monolith */}
            <motion.div 
              exit={{ x: "100%" }}
              transition={{ 
                duration: 1.2, 
                ease: [0.87, 0, 0.13, 1] 
              }}
              className="w-1/2 h-full bg-[#030305] border-l border-teal-500/10"
            />

            {/* The Sanskrit Astra Boot Sequence Overlay with high-fidelity depth-of-field dissolve */}
            <motion.div 
              exit={{ opacity: 0, scale: 0.95, filter: "blur(15px)" }}
              transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
              className="absolute inset-0 z-10 pointer-events-auto"
            >
              <SanskritAstraLoader onComplete={() => setExitPreloader(true)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollyCanvas 
        scrollYProgress={scrollYProgress} 
        introProgress={introProgress}
        introDone={introDone}
        onLoadComplete={() => setImagesReady(true)}
        onLoadProgress={setLoadProgress}
      />
      <Overlay 
        scrollYProgress={scrollYProgress} 
        introProgress={introProgress} 
        introDone={introDone} 
      />
    </div>
  );
}
