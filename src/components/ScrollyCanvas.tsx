"use client";

import { useEffect, useRef, useState } from "react";
import { useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

const FRAME_COUNT = 80;

interface ScrollyCanvasProps {
  scrollYProgress: MotionValue<number>;
  introProgress: MotionValue<number>;
  introDone: boolean;
  onLoadComplete: () => void;
  onLoadProgress: (progress: number) => void;
}

export default function ScrollyCanvas({ scrollYProgress, introProgress, introDone, onLoadComplete, onLoadProgress }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  // We map the scroll container to only the first 35% of the images
  const scrollFrame = useTransform(scrollYProgress, [0, 1], [0, Math.floor((FRAME_COUNT - 1) * 0.35)]);

  useEffect(() => {
    // EAGER LOAD FRAME 79: Draw the first frame instantly so the user sees the 3D scene during the loading typing effect
    const firstImg = new Image();
    firstImg.onload = () => {
      if (canvasRef.current && images.length === 0) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.drawImage(firstImg, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    };
    firstImg.src = `/sequence/frame_79_delay-0.066s.webp`;

    const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loadedCount = 0;

    const loadChunk = (startIndex: number, chunkSize: number) => {
      for (let i = startIndex; i < Math.min(startIndex + chunkSize, FRAME_COUNT); i++) {
        const img = new Image();
        const indexStr = i.toString().padStart(2, "0");
        
        img.onload = () => {
          loadedCount++;
          loadedImages[i] = img;
          onLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
          
          if (loadedCount === FRAME_COUNT) {
            if (canvasRef.current) {
              const ctx = canvasRef.current.getContext("2d");
              if (ctx) {
                loadedImages.forEach((image) => {
                  if (image) ctx.drawImage(image, 0, 0, 1, 1);
                });
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              }
            }
            setImages(loadedImages);
            onLoadComplete();
          }
        };

        img.src = `/sequence/frame_${indexStr}_delay-0.066s.webp`;
      }
      
      if (startIndex + chunkSize < FRAME_COUNT) {
        requestAnimationFrame(() => loadChunk(startIndex + chunkSize, 5)); // Load 5 images per frame to yield to UI
      }
    };

    // Start loading chunks after a small delay to let the initial preloader render smoothly
    setTimeout(() => {
      loadChunk(0, 5);
    }, 500);
  }, []);

  const renderFrame = (index: number) => {
    if (images.length === 0 || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const safeIndex = Math.min(Math.max(Math.floor(index), 0), images.length - 1);
    const img = images[safeIndex];
    if (!img || !img.complete) return;

    const canvas = canvasRef.current;
    
    // Custom object-fit: cover implementation
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Render intro animation if not done
  useMotionValueEvent(introProgress, "change", (latest) => {
    if (!introDone) renderFrame(latest);
  });

  // Render scroll animation if intro is done
  useMotionValueEvent(scrollFrame, "change", (latest) => {
    if (introDone) renderFrame(latest);
  });

  // Handle window resize and initial drawing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(introDone ? scrollFrame.get() : introProgress.get());
      }
    };
    
    // Set initial size
    handleResize(); 
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
