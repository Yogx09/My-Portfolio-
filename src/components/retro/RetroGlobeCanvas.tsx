"use client";

import React, { useEffect, useRef } from "react";

interface RetroGlobeCanvasProps {
  color?: string;
  size?: number;
}

export default function RetroGlobeCanvas({
  color = "#38bdf8",
  size = 140,
}: RetroGlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.2, y: 0 });
  const autoRotateSpeedRef = useRef(0.008);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Generate latitude and longitude wireframe points
    const points: { x: number; y: number; z: number }[] = [];
    const numLat = 12;
    const numLon = 20;
    const radius = size * 0.42;

    for (let i = 0; i <= numLat; i++) {
      const theta = (i * Math.PI) / numLat;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let j = 0; j < numLon; j++) {
        const phi = (j * 2 * Math.PI) / numLon;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        points.push({
          x: radius * sinTheta * cosPhi,
          y: radius * cosTheta,
          z: radius * sinTheta * sinPhi,
        });
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Auto rotation
      if (!isDraggingRef.current) {
        rotationRef.current.y += autoRotateSpeedRef.current;
      }

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw pixel globe grid & points
      points.forEach((p) => {
        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Perspective
        const fov = 200;
        const scale = fov / (fov + z2 + 80);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;

        // Only draw front-facing points brighter, back dimmer
        const isFront = z2 < 0;
        const alpha = isFront ? Math.max(0.3, 0.95 + z2 / (radius * 2)) : 0.15;
        const pixelSize = isFront ? 2.5 : 1.2;

        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(projX - pixelSize / 2, projY - pixelSize / 2, pixelSize, pixelSize);
      });

      // Outer bounding wireframe ring
      ctx.globalAlpha = 0.25;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.98, 0, Math.PI * 2);
      ctx.stroke();

      // Core pulse
      const pulse = (Math.sin(Date.now() * 0.003) + 1) * 0.5;
      ctx.globalAlpha = 0.06 + pulse * 0.04;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse / Touch Drag interaction
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      rotationRef.current.y += dx * 0.012;
      rotationRef.current.x += dy * 0.012;
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
      rotationRef.current.y += dx * 0.012;
      rotationRef.current.x += dy * 0.012;
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
  }, [color, size]);

  return (
    <div className="relative inline-block cursor-grab active:cursor-grabbing select-none group">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="drop-shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-mono text-cyan-400/80 tracking-widest whitespace-nowrap pointer-events-none">
        DRAG TO ROTATE
      </div>
    </div>
  );
}
