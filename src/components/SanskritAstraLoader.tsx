"use client";

import { useEffect, useRef, useState } from "react";

interface SanskritAstraLoaderProps {
  onComplete: () => void;
  imagesReady: boolean;
  loadProgress: number;
}

export default function SanskritAstraLoader({ onComplete, imagesReady, loadProgress }: SanskritAstraLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // DOM element Refs for high-performance direct animations (matching user's script style)
  const astraHudRef = useRef<HTMLDivElement>(null);
  const ambientAuraRef = useRef<HTMLDivElement>(null);
  const decryptionCenterRef = useRef<HTMLDivElement>(null);
  const hudTopRef = useRef<HTMLDivElement>(null);
  const hudBottomRef = useRef<HTMLDivElement>(null);
  const bootTextRef = useRef<HTMLDivElement>(null);
  
  const [bootComplete, setBootComplete] = useState(false);
  
  const wordRefs = [
    { first: useRef<HTMLSpanElement>(null), rest: useRef<HTMLSpanElement>(null) },
    { first: useRef<HTMLSpanElement>(null), rest: useRef<HTMLSpanElement>(null) },
    { first: useRef<HTMLSpanElement>(null), rest: useRef<HTMLSpanElement>(null) }
  ];

  const arrowRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];
  
  const arrowPaths = [
    { h: useRef<SVGPathElement>(null), v: useRef<SVGPathElement>(null) },
    { h: useRef<SVGPathElement>(null), v: useRef<SVGPathElement>(null) }
  ];

  const telemetryGravityRef = useRef<HTMLSpanElement>(null);

  // Sound Engine setup with browser autoplay safety
  const audioEngineRef = useRef<any>(null);

  useEffect(() => {
    class SoundEngine {
      ctx: AudioContext | null = null;
      isMuted = false;
      templeDrone: GainNode | null = null;
      osc1: OscillatorNode | null = null;
      osc2: OscillatorNode | null = null;

      init() {
        if (!this.ctx) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          this.ctx = new AudioContextClass();
        }
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        this.startTempleDrone();
      }

      startTempleDrone() {
        if (this.isMuted || !this.ctx || this.templeDrone) return;

        const baseTime = this.ctx.currentTime;
        this.templeDrone = this.ctx.createGain();
        this.templeDrone.gain.setValueAtTime(0, baseTime);
        this.templeDrone.gain.linearRampToValueAtTime(0.06, baseTime + 4.0); 

        this.osc1 = this.ctx.createOscillator();
        this.osc2 = this.ctx.createOscillator();

        this.osc1.type = 'sine';
        this.osc1.frequency.setValueAtTime(65.41, baseTime); // Low C drone

        this.osc2.type = 'triangle';
        this.osc2.frequency.setValueAtTime(130.81, baseTime); // Octave C drone

        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        const biquadFilter = this.ctx.createBiquadFilter();

        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1, baseTime); 
        lfoGain.gain.setValueAtTime(50, baseTime);

        biquadFilter.type = 'lowpass';
        biquadFilter.frequency.setValueAtTime(220, baseTime);
        biquadFilter.Q.value = 4;

        lfo.connect(lfoGain);
        lfoGain.connect(biquadFilter.frequency);

        this.osc1.connect(biquadFilter);
        this.osc2.connect(biquadFilter);
        biquadFilter.connect(this.templeDrone);
        this.templeDrone.connect(this.ctx.destination);

        lfo.start();
        this.osc1.start();
        this.osc2.start();
      }

      stopTempleDrone() {
        if (this.templeDrone && this.ctx) {
          const baseTime = this.ctx.currentTime;
          this.templeDrone.gain.cancelScheduledValues(baseTime);
          this.templeDrone.gain.linearRampToValueAtTime(0.0, baseTime + 1.2);
          const droneOsc1 = this.osc1;
          const droneOsc2 = this.osc2;
          setTimeout(() => {
            try {
              droneOsc1?.stop();
              droneOsc2?.stop();
            } catch(e) {}
            this.templeDrone = null;
          }, 1300);
        }
      }

      playAstraGlitch() {
        if (this.isMuted || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(Math.random() * 500 + 350, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      }

      playAstraTransitionSwell() {
        if (this.isMuted || !this.ctx) return;
        const baseTime = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(100, baseTime);
        osc.frequency.exponentialRampToValueAtTime(520, baseTime + 0.85);

        filter.type = 'bandpass';
        filter.Q.value = 14;
        filter.frequency.setValueAtTime(220, baseTime);
        filter.frequency.exponentialRampToValueAtTime(1200, baseTime + 0.85);

        gain.gain.setValueAtTime(0.01, baseTime);
        gain.gain.linearRampToValueAtTime(0.14, baseTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, baseTime + 0.9);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(baseTime + 0.95);
      }

      playAstraLockRinging() {
        if (this.isMuted || !this.ctx) return;
        const baseTime = this.ctx.currentTime;

        const gongOsc = this.ctx.createOscillator();
        const chimeOsc = this.ctx.createOscillator();
        const gongFilter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        gongOsc.type = 'sawtooth';
        gongOsc.frequency.setValueAtTime(108, baseTime); 
        gongOsc.frequency.exponentialRampToValueAtTime(54, baseTime + 0.6);

        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(432, baseTime); 

        gongFilter.type = 'bandpass';
        gongFilter.Q.value = 18;
        gongFilter.frequency.setValueAtTime(500, baseTime);
        gongFilter.frequency.exponentialRampToValueAtTime(90, baseTime + 0.6);

        gain.gain.setValueAtTime(0.32, baseTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, baseTime + 0.7);

        gongOsc.connect(gongFilter);
        chimeOsc.connect(gongFilter);
        gongFilter.connect(gain);
        gain.connect(this.ctx.destination);

        gongOsc.start();
        chimeOsc.start();

        gongOsc.stop(baseTime + 0.75);
        chimeOsc.stop(baseTime + 0.75);
      }

      playAstraShatterBoom() {
        if (this.isMuted || !this.ctx) return;
        const baseTime = this.ctx.currentTime;
        const duration = 2.0;

        const warpOsc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const warpGain = this.ctx.createGain();

        warpOsc.type = 'sawtooth';
        warpOsc.frequency.setValueAtTime(40, baseTime);
        warpOsc.frequency.exponentialRampToValueAtTime(2500, baseTime + duration); 

        filter.type = 'lowpass';
        filter.Q.setValueAtTime(12, baseTime);
        filter.frequency.setValueAtTime(60, baseTime);
        filter.frequency.exponentialRampToValueAtTime(4000, baseTime + duration);

        warpGain.gain.setValueAtTime(0.02, baseTime);
        warpGain.gain.linearRampToValueAtTime(0.42, baseTime + duration - 0.3);
        warpGain.gain.exponentialRampToValueAtTime(0.0001, baseTime + duration);

        warpOsc.connect(filter);
        filter.connect(warpGain);
        warpGain.connect(this.ctx.destination);

        warpOsc.start();
        warpOsc.stop(baseTime + duration);

        setTimeout(() => {
          if (this.isMuted || !this.ctx) return;
          const boomOsc = this.ctx.createOscillator();
          const chimeGain = this.ctx.createGain();
          const filter2 = this.ctx.createBiquadFilter();
          
          boomOsc.type = 'sine';
          boomOsc.frequency.setValueAtTime(110, this.ctx.currentTime);
          boomOsc.frequency.exponentialRampToValueAtTime(15, this.ctx.currentTime + 2.2);

          filter2.type = 'lowpass';
          filter2.frequency.setValueAtTime(200, this.ctx.currentTime);

          chimeGain.gain.setValueAtTime(0.95, this.ctx.currentTime);
          chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.2);

          boomOsc.connect(filter2);
          filter2.connect(chimeGain);
          chimeGain.connect(this.ctx.destination);

          boomOsc.start();
          boomOsc.stop(this.ctx.currentTime + 2.3);
        }, (duration - 0.15) * 1000);
      }
    }

    audioEngineRef.current = new SoundEngine();

    // Safety initialization triggers
    const triggerAudio = () => {
      if (audioEngineRef.current) {
        audioEngineRef.current.init();
      }
    };

    window.addEventListener("click", triggerAudio, { once: true });
    window.addEventListener("touchstart", triggerAudio, { once: true });

    return () => {
      window.removeEventListener("click", triggerAudio);
      window.removeEventListener("touchstart", triggerAudio);
      if (audioEngineRef.current) {
        audioEngineRef.current.stopTempleDrone();
      }
    };
  }, []);

  // WebGL Canvas and particle backdrop systems
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isDestroyed = false;
    let animationFrameId: number;

    const ancientBrahmiRuneMatrix = [
      "𑖟", "𑖢", "𑖿", "𑖪", "𑖫", "𑖱", "𑖰", "𑖮", "𑖎", "𑖦", "𑖡", "𑖝", "క", "ల్", "కి", "ధ", "మ", "य", "ర"
    ];

    class BrahmiEmber {
      x: number;
      y: number;
      text: string;
      size: number;
      angle: number;
      speed: number;
      vx: number;
      vy: number;
      alpha = 1.0;
      colorVal: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.text = ancientBrahmiRuneMatrix[Math.floor(Math.random() * ancientBrahmiRuneMatrix.length)];
        this.size = Math.random() * 12 + 10;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 2 + 0.5;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed - 1.2; 
        this.colorVal = Math.random();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.016; 
      }

      draw(c: CanvasRenderingContext2D) {
        if (this.alpha <= 0) return;
        c.save();
        c.font = `${this.size}px 'Cinzel Decorative', serif`;
        let color = `rgba(234, 179, 8, ${this.alpha})`; 
        if (this.colorVal > 0.7) color = `rgba(45, 212, 191, ${this.alpha})`; 
        c.fillStyle = color;
        c.fillText(this.text, this.x, this.y);
        c.restore();
      }
    }

    class AstraParticle {
      ringIndex: number;
      maxRings: number;
      angle!: number;
      baseRadius!: number;
      radius!: number;
      speed!: number;
      size!: number;
      alpha!: number;
      waveSymmetry!: number;
      waveAmplitude!: number;
      colorVal!: number;
      prevX: number | null = null;
      prevY: number | null = null;
      x = 0;
      y = 0;

      constructor(ringIndex: number, maxRings: number) {
        this.ringIndex = ringIndex;
        this.maxRings = maxRings;
        this.reset();
      }

      reset() {
        this.angle = Math.random() * Math.PI * 2;
        this.baseRadius = (this.ringIndex + 1) * 75 + 40;
        this.radius = this.baseRadius;
        this.speed = (Math.random() * 0.003 + 0.001) * (1 - (this.ringIndex / this.maxRings));
        this.size = Math.random() * 1.8 + 0.4;
        this.alpha = Math.random() * 0.5 + 0.25;
        
        this.waveSymmetry = 3 + (this.ringIndex * 2); 
        this.waveAmplitude = 12 + (this.ringIndex * 6);
        
        this.colorVal = Math.random();
        this.prevX = null;
        this.prevY = null;
      }

      update(blackholeX: number, blackholeY: number, shatterActive: boolean, shatterProgress: number, zoom: number, maxRadiusLimit: number) {
        this.angle += this.speed;

        if (!shatterActive) {
          const modulation = Math.sin(this.angle * this.waveSymmetry) * this.waveAmplitude;
          this.radius = this.baseRadius + modulation;
        } else {
          this.angle += this.speed * (shatterProgress * 15);
          const outwardVelocity = Math.pow(shatterProgress, 2) * 45;
          this.radius += outwardVelocity;

          const currentVisualRadius = this.radius * zoom;
          if (currentVisualRadius > maxRadiusLimit) {
            this.radius = Math.random() * 30 + 10;
            this.angle = Math.random() * Math.PI * 2;
            this.prevX = null;
            this.prevY = null;
          }
          
          if (shatterProgress > 0.8) {
            this.alpha -= 0.02;
          }
        }

        const rawX = Math.cos(this.angle) * this.radius * 1.8 * zoom;
        const rawY = Math.sin(this.angle) * this.radius * 0.65 * zoom;

        this.x = blackholeX + rawX;
        this.y = blackholeY + rawY;
      }

      draw(c: CanvasRenderingContext2D, shatterActive: boolean, shatterProgress: number) {
        if (this.alpha <= 0) return;
        c.save();

        let color = "rgba(148, 163, 184, " + this.alpha + ")"; 
        if (this.colorVal > 0.4 && this.colorVal <= 0.8) {
          color = "rgba(234, 179, 8, " + this.alpha + ")"; 
        } else if (this.colorVal > 0.8) {
          color = "rgba(45, 212, 191, " + this.alpha + ")"; 
        }

        c.fillStyle = color;

        if (shatterActive && this.prevX !== null && this.prevY !== null) {
          c.strokeStyle = color;
          c.lineWidth = this.size * (1 + shatterProgress * 3);
          c.beginPath();
          c.moveTo(this.prevX, this.prevY);
          c.lineTo(this.x, this.y);
          c.stroke();
        } else {
          c.beginPath();
          c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          c.fill();
        }

        c.restore();

        this.prevX = this.x;
        this.prevY = this.y;
      }
    }

    class ShockwavePulse {
      x: number;
      y: number;
      radius = 0;
      maxRadius: number;
      alpha = 1.0;
      color: string;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.maxRadius = Math.random() * 150 + 100;
        this.color = color;
      }

      update() {
        this.radius += 5.5;
        this.alpha = Math.max(0, 1.0 - (this.radius / this.maxRadius));
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.strokeStyle = this.color;
        c.lineWidth = 1.8;
        c.globalAlpha = this.alpha;
        c.stroke();
        c.restore();
      }
    }

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    // Optimization: Lowered rings and particles to save rendering time
    const maxRings = 4;
    const particlesPerRing = 45;
    const astraParticles: AstraParticle[] = [];
    const shockwaves: ShockwavePulse[] = [];
    const brahmiEmbers: BrahmiEmber[] = [];

    for (let ring = 0; ring < maxRings; ring++) {
      for (let i = 0; i < particlesPerRing; i++) {
        astraParticles.push(new AstraParticle(ring, maxRings));
      }
    }

    const resizeCanvas = () => {
      if (isDestroyed) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouse.targetX = canvas.width / 2;
      mouse.targetY = canvas.height / 2;
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;
    };
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    let lastEmberTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if ((window as unknown as { isAstraShattering?: boolean }).isAstraShattering) return;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      const now = performance.now();
      // Optimization: Throttle ember creation to prevent array bloat
      if (now - lastEmberTime > 30 && Math.random() > 0.45) {
        brahmiEmbers.push(new BrahmiEmber(e.clientX, e.clientY));
        if (brahmiEmbers.length > 50) brahmiEmbers.shift(); // Limit array size
        lastEmberTime = now;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && !(window as unknown as { isAstraShattering?: boolean }).isAstraShattering) {
        const touch = e.touches[0];
        mouse.targetX = touch.clientX;
        mouse.targetY = touch.clientY;
        const now = performance.now();
        if (now - lastEmberTime > 30 && Math.random() > 0.45) {
          brahmiEmbers.push(new BrahmiEmber(touch.clientX, touch.clientY));
          if (brahmiEmbers.length > 50) brahmiEmbers.shift();
          lastEmberTime = now;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    // Global communication hooks for shockwaves
    (window as unknown as { emitShockwaveAt: (x: number, y: number, color: string) => void }).emitShockwaveAt = (x: number, y: number, color: string) => {
      shockwaves.push(new ShockwavePulse(x, y, color));
    };

    const render = () => {
      if (isDestroyed) return;

      ctx.fillStyle = "rgba(3, 3, 5, 0.16)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const centerAstra_X = canvas.width / 2 + (mouse.x - canvas.width / 2) * 0.06;
      const centerAstra_Y = canvas.height / 2 + (mouse.y - canvas.height / 2) * 0.06;

      for (let i = brahmiEmbers.length - 1; i >= 0; i--) {
        const ember = brahmiEmbers[i];
        ember.update();
        ember.draw(ctx);
        if (ember.alpha <= 0) brahmiEmbers.splice(i, 1);
      }

      astraParticles.forEach(p => {
        p.update(
          centerAstra_X, 
          centerAstra_Y, 
          false, 
          0, 
          1.0, 
          Math.max(canvas.width, canvas.height) * 1.5
        );
        p.draw(ctx, false, 0);
      });

      // Event Horizon Blackhole Center
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerAstra_X, centerAstra_Y, 45, 0, Math.PI * 2);
      
      // Optimization: Replace expensive shadowBlur with a radial gradient
      const gradient = ctx.createRadialGradient(centerAstra_X, centerAstra_Y, 30, centerAstra_X, centerAstra_Y, 65);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.99)");
      gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.9)");
      gradient.addColorStop(1, "rgba(234, 179, 8, 0)");
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.strokeStyle = "rgba(234, 179, 8, 0.2)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(centerAstra_X, centerAstra_Y, 45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.update();
        sw.draw(ctx);
        if (sw.alpha <= 0) shockwaves.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      delete (window as unknown as { emitShockwaveAt?: unknown }).emitShockwaveAt;
    };
  }, []);

  // Choreographed Sequential Boot Sequence Ticking
  useEffect(() => {
    let animationInterval: ReturnType<typeof setInterval> | null = null;

    const ancientBrahmiRuneMatrix = [
      "𑖟", "𑖢", "𑖿", "𑖪", "𑖫", "𑖱", "𑖰", "𑖮", "𑖎", "𑖦", "𑖡", "𑖝", "క", "ల్", "కి", "ధ", "మ", "य", "ర"
    ];

    const resetChainVisuals = () => {
      if (arrowRefs[0].current) arrowRefs[0].current.style.opacity = '0';
      if (arrowRefs[1].current) arrowRefs[1].current.style.opacity = '0';
      
      arrowPaths.forEach(path => {
        path.h.current?.classList.remove('draw-vector-path');
        path.v.current?.classList.remove('draw-vector-path');
      });

      wordRefs.forEach(word => {
        if (word.first.current) {
          word.first.current.innerText = "·";
          word.first.current.className = "inline-block text-3xl md:text-4xl lg:text-[3.5rem] font-bold select-none opacity-20 text-stone-800 font-sans transition-transform duration-300";
          word.first.current.style.transform = "none";
        }
        if (word.rest.current) {
          word.rest.current.innerText = "";
          word.rest.current.style.maxWidth = "0";
          word.rest.current.classList.add('opacity-0');
          word.rest.current.classList.remove('opacity-100', 'ml-2', 'md:ml-3');
        }
      });
    };

    const lockFirstLetter = (elem: HTMLSpanElement, targetChar: string, wordIndex: number) => {
      elem.innerText = targetChar;
      elem.style.transform = "translate(0,0)";

      let styleClass = "";
      let colorTheme = "";

      if (wordIndex === 0) {
        styleClass = "platinum-gradient";
        colorTheme = "rgba(203, 213, 225, 0.75)";
      } else if (wordIndex === 1) {
        styleClass = "gold-metal-gradient";
        colorTheme = "rgba(234, 179, 8, 0.75)";
      } else {
        styleClass = "plasma-blue-gradient";
        colorTheme = "rgba(45, 212, 191, 0.75)";
      }

      elem.className = `inline-block font-cinzel-dec select-none font-black ${styleClass} scale-100 opacity-100 duration-500 text-3xl md:text-4xl lg:text-[3.5rem] animate-lock-flash drop-shadow-xl tracking-wider`;

      const rect = elem.getBoundingClientRect();
      if ((window as unknown as { emitShockwaveAt?: (x: number, y: number, color: string) => void }).emitShockwaveAt) {
        (window as unknown as { emitShockwaveAt: (x: number, y: number, color: string) => void }).emitShockwaveAt(rect.left + rect.width / 2, rect.top + rect.height / 2, colorTheme);
      }
    };

    const startStepAnimation = () => {
      const bootText = bootTextRef.current;
      if (bootText) {
        bootText.style.opacity = '1';
        bootText.innerText = "[ ALIGNING SACRED GEOMETRIES ]";
      }

      // Settle loading timeline speed strictly at 20ms for much faster sequence
      const cycleSpeed = 20; 
      const words = ["DREAM", "BUILD", "CREATE"]; 
      const wordData = words.map((w, i) => ({
        first: w.charAt(0), 
        rest: w.substring(1), 
        firstElem: wordRefs[i].first.current, 
        restElem: wordRefs[i].rest.current
      }));

      let activeStep = 0;
      let stepCycle = 0;
      const cyclesToLock = 5; 

      animationInterval = setInterval(() => {
        
        if (activeStep === 0 || activeStep === 4 || activeStep === 8) {
          const dataIndex = activeStep === 0 ? 0 : (activeStep === 4 ? 1 : 2);
          const colorClasses = ["text-slate-400", "text-amber-500", "text-teal-400"];
          const fElem = wordData[dataIndex].firstElem;

          if (fElem) {
            stepCycle++;
            if (stepCycle <= cyclesToLock) {
              fElem.innerText = ancientBrahmiRuneMatrix[Math.floor(Math.random() * ancientBrahmiRuneMatrix.length)];
              fElem.className = `inline-block text-3xl md:text-4xl lg:text-[3.5rem] opacity-90 transform scale-100 ${colorClasses[dataIndex]} font-sans animate-pulse`;
              fElem.style.textShadow = '0px 0px 15px currentColor';
            } else {
              lockFirstLetter(fElem, wordData[dataIndex].first, dataIndex);
              fElem.style.textShadow = 'none'; // Clear the inline text-shadow so the lock class handles it
              if (audioEngineRef.current) {
                audioEngineRef.current.playAstraLockRinging();
              }
              if (bootText) {
                bootText.innerText = `[ ASTRA GRID LOCK ${dataIndex+1} RESOLVED: ${wordData[dataIndex].first} ]`;
              }
              stepCycle = 0;
              activeStep++;
            }
          }
        }
        else if (activeStep === 1 || activeStep === 5 || activeStep === 9) {
          const dataIndex = activeStep === 1 ? 0 : (activeStep === 5 ? 1 : 2);
          const messages = ["[ CONSTRUCTED DR_EA_M PIPELINE ]", "[ ENCRYPTED PORTAL B_UI_LD COMPILED ]", "[ INJECTING TEMPORAL CR_EAT_E SYSTEM ]"];
          
          const restElem = wordData[dataIndex].restElem;
          if (restElem) {
            restElem.innerText = wordData[dataIndex].rest;
            restElem.style.maxWidth = "280px";
            restElem.classList.remove('opacity-0');
            restElem.classList.add('opacity-100', 'ml-2', 'md:ml-3');
          }
          
          if (bootText) {
            bootText.innerText = messages[dataIndex];
          }
          stepCycle = 0;
          activeStep++;
        }
        else if (activeStep === 2 || activeStep === 6) {
          const arrowIndex = activeStep === 2 ? 1 : 2;
          const arrowContainer = arrowRefs[arrowIndex - 1].current;
          if (arrowContainer) {
            arrowContainer.style.opacity = '1';
          }
          arrowPaths[arrowIndex - 1].h.current?.classList.add('draw-vector-path');
          arrowPaths[arrowIndex - 1].v.current?.classList.add('draw-vector-path');
          
          if (audioEngineRef.current) {
            audioEngineRef.current.playAstraTransitionSwell();
          }
          
          if (bootText) {
            bootText.innerText = `[ MAPPING CONNECTIVE CHRONO VECTOR ${arrowIndex} ]`;
          }
          stepCycle = 0;
          activeStep++;
        }
        else if (activeStep === 3 || activeStep === 7) {
          stepCycle++;
          if (stepCycle > 5) {
            stepCycle = 0;
            activeStep++;
          }
        }
        else if (activeStep === 10) {
          if (animationInterval) clearInterval(animationInterval);
          completeAstraSequence();
        }

      }, cycleSpeed);
    };

    const completeAstraSequence = () => {
      const bootText = bootTextRef.current;
      if (bootText) {
        bootText.innerText = "[ ASTRA SECURE // PORTAL READY ]";
      }

      if (ambientAuraRef.current) {
        ambientAuraRef.current.style.backgroundColor = "rgba(45, 212, 191, 0.12)";
      }

      if (telemetryGravityRef.current) {
        telemetryGravityRef.current.innerText = "TRANSIT_READY";
        telemetryGravityRef.current.className = "text-teal-400 font-bold animate-pulse";
      }

      setBootComplete(true);
      // Wait for user to click the button
    };

    // Auto start preloader steps
    const timer = setTimeout(() => {
      resetChainVisuals();
      startStepAnimation();
    }, 200);

    return () => {
      clearTimeout(timer);
      if (animationInterval) clearInterval(animationInterval);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 bg-[#030305] text-stone-100 overflow-hidden font-orbitron select-none flex items-center justify-center z-50">
      
      {/* CSS style injectors containing user's beautiful keyframe definitions */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Animations */
        @keyframes spinSlow {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spinSlowCounter {
            0% { transform: translate(-50%, -50%) rotate(360deg); }
            100% { transform: translate(-50%, -50%) rotate(0deg); }
        }
        .animate-spin-slow {
            animation: spinSlow 40s linear infinite;
        }
        .animate-spin-counter {
            animation: spinSlowCounter 30s linear infinite;
        }

        /* Refined Text reveal & locking transitions */
        @keyframes lockFlash {
            0% { filter: brightness(3.5) contrast(1.5) drop-shadow(0 0 25px #eab308); transform: scale(1.15); }
            100% { filter: brightness(1) contrast(1); transform: scale(1); }
        }
        .animate-lock-flash {
            animation: lockFlash 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes drawArrow {
            to { stroke-dashoffset: 0; opacity: 1; }
        }
        .draw-vector-path {
            stroke-dasharray: 120;
            stroke-dashoffset: 0;
            opacity: 1;
            transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease;
        }

        @keyframes auraGlow {
            0% { opacity: 0.15; transform: translate(-50%, -50%) scale(0.85); filter: blur(120px); }
            100% { opacity: 0.35; transform: translate(-50%, -50%) scale(1.15); filter: blur(180px); }
        }
        .aura-breathing {
            animation: auraGlow 5s ease-in-out infinite alternate;
        }

        @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(12px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* WebGL-like Interactive Canvas backdrop */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-auto" />

      {/* Concentric Cybernetic Sacred Geometry HUD */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-30 transition-all duration-[1500ms] ease-out">
        <div className="absolute top-1/2 left-1/2 w-[780px] h-[780px] border border-amber-500/10 rounded-full animate-spin-slow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500/30 border border-amber-500/60 rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500/30 border border-amber-500/60 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] border border-dashed border-teal-500/5 rounded-full animate-spin-counter">
          <div className="absolute top-1/2 left-4 -translate-y-1/2 pl-4 text-[9px] text-teal-400/30 tracking-[0.4em] font-mono font-bold">GRID.LOCK_ASTRA_8.2</div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 pr-4 text-[9px] text-teal-400/30 tracking-[0.4em] font-mono font-bold">VEDA_ALIGN_CORE_X9</div>
        </div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] border-2 border-dashed border-amber-500/5 rounded-full animate-spin-slow"></div>
      </div>

      <div className="absolute inset-0 vanguard-scanlines pointer-events-none z-10 opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_30%,rgba(3,3,5,0.98)_100%)] z-10 pointer-events-none"></div>
      <div ref={ambientAuraRef} className="absolute w-[55vw] h-[55vw] rounded-full bg-amber-500/5 top-1/2 left-1/2 aura-breathing z-0 pointer-events-none transition-all duration-[1200ms]"></div>
      
      {/* MAIN INTERACTIVE INTERFACE PORTAL */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-between py-16 md:py-24 px-8 transition-all duration-[1500ms] ease-out">
        
        {/* Top Telemetry */}
        <div ref={hudTopRef} className="w-full max-w-7xl flex justify-between items-start text-[10px] md:text-xs font-mono text-amber-500/50 tracking-[0.4em] uppercase transition-all duration-[1200ms]">
          <div className="space-y-2">
            <div>ASTRA_GRID_ALIGN: <span className="text-teal-400 font-bold animate-pulse">TRUE</span></div>
            <div>COSMO_CLOCK: 55MS_VIBRATION</div>
          </div>
          <div className="space-y-2 text-right">
            <div>VEDIC_ASTRA: <span ref={telemetryGravityRef} className="text-amber-500/70">CONCENTRIC_ORBITAL</span></div>
            <div>YOGA_AXIS_LOC: [88.2° N, 290.4° E]</div>
          </div>
        </div>

        {/* Center Decryption Chain */}
        <div ref={decryptionCenterRef} className="flex flex-col items-center justify-center w-full my-auto translate-y-16 transition-all duration-[1200ms]">
          <div ref={bootTextRef} className="text-sm md:text-base text-amber-500/80 tracking-[0.6em] uppercase mb-16 h-8 opacity-0 transition-opacity duration-500 font-bold text-center font-orbitron drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
            [ ASSEMBLING CELESTIAL ORBITS ]
          </div>

          {/* Highly Premium & Responsive Word Chain */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 w-full max-w-5xl mx-auto px-4 select-none">
            
            {/* Word 1: DREAM */}
            <div className="flex items-baseline justify-center h-14 md:h-20">
              <span ref={wordRefs[0].first} className="inline-block text-3xl md:text-4xl lg:text-[3.5rem] font-bold select-none opacity-20 text-stone-800 font-sans transition-transform duration-300">·</span>
              <span ref={wordRefs[0].rest} className="inline-block text-3xl md:text-4xl lg:text-[3.5rem] font-orbitron font-bold tracking-[0.2em] text-slate-300 max-w-0 overflow-hidden transition-all duration-700 ease-out whitespace-nowrap opacity-0 drop-shadow-md"></span>
            </div>

            {/* Connecting Vector 1 */}
            <div ref={arrowRefs[0]} className="w-6 h-8 md:w-10 md:h-6 lg:w-14 lg:h-8 flex items-center justify-center opacity-0 transition-opacity duration-500 shrink-0">
              <svg className="hidden md:block w-full h-full text-amber-500/40" viewBox="0 0 60 20" fill="none">
                <path ref={arrowPaths[0].h} d="M5 10H52M52 10L44 3M52 10L44 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg className="block md:hidden w-full h-full text-amber-500/40" viewBox="0 0 20 60" fill="none">
                <path ref={arrowPaths[0].v} d="M10 5V52M10 52L3 44M10 52L17 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Word 2: BUILD */}
            <div className="flex items-baseline justify-center h-14 md:h-20">
              <span ref={wordRefs[1].first} className="inline-block text-3xl md:text-4xl lg:text-[3.5rem] font-bold select-none opacity-20 text-stone-800 font-sans transition-transform duration-300">·</span>
              <span ref={wordRefs[1].rest} className="inline-block text-3xl md:text-4xl lg:text-[3.5rem] font-orbitron font-bold tracking-[0.2em] text-amber-400/90 max-w-0 overflow-hidden transition-all duration-700 ease-out whitespace-nowrap opacity-0 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]"></span>
            </div>

            {/* Connecting Vector 2 */}
            <div ref={arrowRefs[1]} className="w-6 h-8 md:w-10 md:h-6 lg:w-14 lg:h-8 flex items-center justify-center opacity-0 transition-opacity duration-500 shrink-0">
              <svg className="hidden md:block w-full h-full text-amber-500/40" viewBox="0 0 60 20" fill="none">
                <path ref={arrowPaths[1].h} d="M5 10H52M52 10L44 3M52 10L44 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg className="block md:hidden w-full h-full text-amber-500/40" viewBox="0 0 20 60" fill="none">
                <path ref={arrowPaths[1].v} d="M10 5V52M10 52L3 44M10 52L17 44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Word 3: CREATE */}
            <div className="flex items-baseline justify-center h-14 md:h-20">
              <span ref={wordRefs[2].first} className="inline-block text-3xl md:text-4xl lg:text-[3.5rem] font-bold select-none opacity-20 text-stone-800 font-sans transition-transform duration-300">·</span>
              <span ref={wordRefs[2].rest} className="inline-block text-3xl md:text-4xl lg:text-[3.5rem] font-orbitron font-bold tracking-[0.2em] text-teal-400/90 max-w-0 overflow-hidden transition-all duration-700 ease-out whitespace-nowrap opacity-0 drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]"></span>
            </div>
          </div>

          {/* Interactive Lets Go Button */}
          {bootComplete && imagesReady && (
            <div className="overflow-hidden mt-12 flex justify-center">
              <button 
                onClick={() => {
                  if (audioEngineRef.current) {
                    audioEngineRef.current.playAstraLockRinging();
                  }
                  onComplete();
                }}
                className="px-10 py-3.5 rounded-full border border-teal-500/30 bg-teal-500/5 text-teal-400 font-orbitron text-xs md:text-sm tracking-[0.3em] font-bold uppercase transition-all duration-300 hover:bg-teal-500/20 hover:border-teal-500/60 hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] active:scale-95 pointer-events-auto cursor-pointer flex items-center gap-3 animate-fade-in"
              >
                <span>[ ENTER PORTFOLIO ]</span>
                <span className="animate-pulse">→</span>
              </button>
            </div>
          )}

          {bootComplete && !imagesReady && (
            <div className="overflow-hidden mt-12 flex justify-center">
              <div className="px-10 py-3.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-400 font-orbitron text-xs md:text-sm tracking-[0.3em] font-bold uppercase flex items-center gap-3">
                <span>[ DOWNLOADING NEURAL CACHE: {loadProgress}% ]</span>
                <span className="animate-spin text-lg">⟳</span>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Telemetry */}
        <div ref={hudBottomRef} className="text-[10px] md:text-xs font-mono text-amber-500/30 tracking-[0.8em] uppercase transition-all duration-[1200ms] text-center">
          CELESTIAL.PORTAL.X // ACTIVE ENVELOPE SECURE
        </div>
      </div>

    </div>
  );
}
