"use client";

import React, { useEffect, useRef, useState } from "react";

interface QuantumAtomCanvasProps {
  size?: number;
  theme?: "quantum-gold" | "spiderman-crimson";
}

export default function QuantumAtomCanvas({
  size = 320,
  theme = "spiderman-crimson",
}: QuantumAtomCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.35, y: -0.2 });
  const [atomMode, setAtomMode] = useState<"spider" | "atom">("spider");

  // Colors tuned for pristine white background
  const colors = atomMode === "spider"
    ? {
        core1: "#dc2626", // Bold Crimson Red
        core2: "#f59e0b", // Warm Amber Gold
        orbit1: "rgba(220, 38, 38, 0.75)",
        orbit2: "rgba(2, 132, 199, 0.75)",
        orbit3: "rgba(217, 119, 6, 0.8)",
        orbit4: "rgba(219, 39, 119, 0.7)",
        electron1: "#dc2626",
        electron2: "#0284c7",
        electron3: "#d97706",
        electron4: "#db2777",
        webLine: "rgba(220, 38, 38, 0.16)",
        glow: "rgba(220, 38, 38, 0.25)",
      }
    : {
        core1: "#d97706",
        core2: "#0284c7",
        orbit1: "rgba(217, 119, 6, 0.75)",
        orbit2: "rgba(2, 132, 199, 0.75)",
        orbit3: "rgba(147, 51, 234, 0.75)",
        orbit4: "rgba(5, 150, 105, 0.7)",
        electron1: "#d97706",
        electron2: "#0284c7",
        electron3: "#9333ea",
        electron4: "#059669",
        webLine: "rgba(217, 119, 6, 0.16)",
        glow: "rgba(217, 119, 6, 0.25)",
      };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Radius of orbits
    const radius = size * 0.38;

    // Electron trail history
    const trails: { x: number; y: number; alpha: number; color: string; size: number }[] = [];

    // Predefined 3D orbital plane orientations: angles in radians
    const orbits = [
      { tiltX: 1.05, tiltY: 0.2, tiltZ: 0.35, speed: 2.0, color: colors.orbit1, eColor: colors.electron1 },
      { tiltX: -1.05, tiltY: -0.4, tiltZ: -0.35, speed: -1.7, color: colors.orbit2, eColor: colors.electron2 },
      { tiltX: 0.1, tiltY: 1.15, tiltZ: 0.85, speed: 2.3, color: colors.orbit3, eColor: colors.electron3 },
      { tiltX: -0.55, tiltY: 0.85, tiltZ: -0.95, speed: -2.1, color: colors.orbit4, eColor: colors.electron4 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      // Auto rotation
      if (!isDraggingRef.current) {
        rotationRef.current.y += 0.008;
        rotationRef.current.x += Math.sin(time * 0.4) * 0.002;
      }

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Project 3D point to 2D
      const project = (x: number, y: number, z: number) => {
        // Rotate around Y
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate around X
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const fov = 400;
        const scale = fov / (fov + z2 + 100);
        return {
          x: centerX + x1 * scale,
          y: centerY + y2 * scale,
          z: z2,
          scale,
        };
      };

      // 1. Draw Subtle Spider Web Filaments / Quantum Radar Rings in background
      if (atomMode === "spider") {
        ctx.strokeStyle = colors.webLine;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 4]);

        // Concentric web rings
        for (let r = 0.25; r <= 0.85; r += 0.2) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius * r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // 8 Web Spokes radiating from the center
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4 + time * 0.08;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + Math.cos(angle) * radius * 0.9,
            centerY + Math.sin(angle) * radius * 0.9
          );
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      // Collect elements to draw after sorting by Z depth
      const renderObjects: Array<{
        type: "orbit" | "electron" | "core";
        z: number;
        draw: () => void;
      }> = [];

      // 2. Draw each 3D orbital ring
      orbits.forEach((orb, orbIdx) => {
        const ringPoints: { x: number; y: number; z: number }[] = [];
        const numSegments = 72;

        // Rotation matrix for this specific orbital plane
        const cx = Math.cos(orb.tiltX);
        const sx = Math.sin(orb.tiltX);
        const cy = Math.cos(orb.tiltY);
        const sy = Math.sin(orb.tiltY);
        const cz = Math.cos(orb.tiltZ);
        const sz = Math.sin(orb.tiltZ);

        for (let i = 0; i <= numSegments; i++) {
          const theta = (i * 2 * Math.PI) / numSegments;
          let px = radius * Math.cos(theta);
          let py = radius * Math.sin(theta);
          let pz = 0;

          // Apply plane tilts
          let x1 = px * cz - py * sz;
          let y1 = px * sz + py * cz;
          let y2 = y1 * cx - pz * sx;
          let z2 = y1 * sx + pz * cx;
          let x3 = x1 * cy + z2 * sy;
          let z3 = -x1 * sy + z2 * cy;

          ringPoints.push({ x: x3, y: y2, z: z3 });
        }

        // Add ring to render queue
        renderObjects.push({
          type: "orbit",
          z: ringPoints.reduce((acc, p) => acc + p.z, 0) / ringPoints.length,
          draw: () => {
            ctx.beginPath();
            ringPoints.forEach((p, idx) => {
              const proj = project(p.x, p.y, p.z);
              if (idx === 0) ctx.moveTo(proj.x, proj.y);
              else ctx.lineTo(proj.x, proj.y);
            });
            ctx.closePath();
            ctx.strokeStyle = orb.color;
            ctx.lineWidth = 1.8;
            ctx.stroke();
          },
        });

        // Calculate Electron Position on this orbit
        const eTheta = time * orb.speed;
        let epx = radius * Math.cos(eTheta);
        let epy = radius * Math.sin(eTheta);
        let epz = 0;

        // Apply plane tilts to electron
        let ex1 = epx * cz - epy * sz;
        let ey1 = epx * sz + epy * cz;
        let ey2 = ey1 * cx - epz * sx;
        let ez2 = ey1 * sx + epz * cx;
        let ex3 = ex1 * cy + ez2 * sy;
        let ez3 = -ex1 * sy + ez2 * cy;

        const eProj = project(ex3, ey2, ez3);

        // Add trail point
        trails.push({
          x: eProj.x,
          y: eProj.y,
          alpha: 0.9,
          color: orb.eColor,
          size: Math.max(2.5, 4 * eProj.scale),
        });

        // Add Electron to render list
        renderObjects.push({
          type: "electron",
          z: ez3,
          draw: () => {
            const eSize = Math.max(3.5, 5.5 * eProj.scale);

            // Outer Electron Glow
            const eGrad = ctx.createRadialGradient(eProj.x, eProj.y, 0, eProj.x, eProj.y, eSize * 3);
            eGrad.addColorStop(0, orb.eColor);
            eGrad.addColorStop(0.5, orb.eColor + "aa");
            eGrad.addColorStop(1, "transparent");

            ctx.fillStyle = eGrad;
            ctx.beginPath();
            ctx.arc(eProj.x, eProj.y, eSize * 3, 0, Math.PI * 2);
            ctx.fill();

            // Core dot
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(eProj.x, eProj.y, eSize * 0.75, 0, Math.PI * 2);
            ctx.fill();

            // Web Strand Line connecting electron to central nucleus
            ctx.strokeStyle = orb.color;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(eProj.x, eProj.y);
            ctx.stroke();
          },
        });
      });

      // 3. Central Spider / Quantum Core
      renderObjects.push({
        type: "core",
        z: 0,
        draw: () => {
          const pulse = (Math.sin(time * 3.2) + 1) * 0.5;
          const coreRadius = (size * 0.11) + pulse * 3;

          // Outer Plasma Corona
          const auraGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius * 3);
          auraGrad.addColorStop(0, colors.core1 + "aa");
          auraGrad.addColorStop(0.5, colors.core2 + "55");
          auraGrad.addColorStop(1, "transparent");

          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(centerX, centerY, coreRadius * 3, 0, Math.PI * 2);
          ctx.fill();

          // Dense Plasma Core Sphere
          const coreGrad = ctx.createRadialGradient(
            centerX - 3,
            centerY - 3,
            0,
            centerX,
            centerY,
            coreRadius
          );
          coreGrad.addColorStop(0, "#ffffff");
          coreGrad.addColorStop(0.35, colors.core2);
          coreGrad.addColorStop(0.8, colors.core1);
          coreGrad.addColorStop(1, colors.core1 + "ee");

          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
          ctx.fill();

          // Spider Emblem in Core
          if (atomMode === "spider") {
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = "#ffffff";
            ctx.shadowBlur = 8;

            // Spider Abdomen
            ctx.beginPath();
            ctx.ellipse(centerX, centerY + 1, 4.5, 6.5, 0, 0, Math.PI * 2);
            ctx.fill();

            // Spider Head
            ctx.beginPath();
            ctx.arc(centerX, centerY - 6.5, 2.8, 0, Math.PI * 2);
            ctx.fill();

            // 8 Spider Legs
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 1.4;
            const legOffsets = [
              [-4, -4, -9, -9, -10, -4],
              [-4, -1, -10, -2, -11, 4],
              [-4, 2, -10, 6, -9, 11],
              [-3, 5, -7, 10, -5, 13],
              [4, -4, 9, -9, 10, -4],
              [4, -1, 10, -2, 11, 4],
              [4, 2, 10, 6, 9, 11],
              [3, 5, 7, 10, 5, 13],
            ];
            legOffsets.forEach(([x1, y1, x2, y2, x3, y3]) => {
              ctx.beginPath();
              ctx.moveTo(centerX + x1, centerY + y1);
              ctx.lineTo(centerX + x2, centerY + y2);
              ctx.lineTo(centerX + x3, centerY + y3);
              ctx.stroke();
            });
            ctx.shadowBlur = 0;
          } else {
            // Quantum Energy Ring in center
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, coreRadius * 0.45, 0, Math.PI * 2);
            ctx.stroke();
          }
        },
      });

      // 4. Draw Trails
      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        t.alpha -= 0.03;
        if (t.alpha <= 0) {
          trails.splice(i, 1);
        } else {
          ctx.fillStyle = t.color;
          ctx.globalAlpha = t.alpha * 0.45;
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.size * t.alpha, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // 5. Sort objects by Z and draw
      renderObjects.sort((a, b) => b.z - a.z);
      renderObjects.forEach((obj) => obj.draw());

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse Drag Interactions
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      rotationRef.current.y += dx * 0.015;
      rotationRef.current.x += dy * 0.015;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDraggingRef.current = true;
        lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - lastMousePosRef.current.x;
      const dy = e.touches[0].clientY - lastMousePosRef.current.y;
      rotationRef.current.y += dx * 0.015;
      rotationRef.current.x += dy * 0.015;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [size, atomMode, colors]);

  return (
    <div className="relative inline-flex flex-col items-center select-none group my-auto">
      <div className="relative cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="drop-shadow-[0_0_35px_rgba(239,68,68,0.45)] transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Interactive Controls Pill placed cleanly under the 3D core */}
      <div className="mt-1 flex items-center gap-2 z-20">
        <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md border border-white/15 px-2 py-0.5 rounded-full shadow-lg text-[9px] font-mono">
          <button
            onClick={() => setAtomMode("spider")}
            className={`px-2 py-0.5 rounded-full transition cursor-pointer font-bold ${
              atomMode === "spider" ? "bg-red-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            🕷️ SPIDER-CORE
          </button>
          <button
            onClick={() => setAtomMode("atom")}
            className={`px-2 py-0.5 rounded-full transition cursor-pointer font-bold ${
              atomMode === "atom" ? "bg-amber-500 text-slate-950 shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            ⚛️ ATOM
          </button>
        </div>

        <div className="text-[8px] font-mono text-slate-400 tracking-wider bg-black/60 px-2 py-0.5 rounded-full border border-white/10 hidden sm:block">
          DRAG TO ROTATE 3D CORE
        </div>
      </div>
    </div>
  );
}
