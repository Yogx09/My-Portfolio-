"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeStr, setTimeStr] = useState("00:00:00");
  const [dateStr, setDateStr] = useState("00 XXX 0000");

  useEffect(() => {
    // Set Time live
    const timer = setInterval(() => {
        const now = new Date();
        setTimeStr(now.toLocaleTimeString('en-US', { hour12: false }));
        setDateStr(now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 35;
    camera.position.y = 5;

    let renderer: THREE.WebGLRenderer;
    const originalError = console.error;
    try {
      console.error = () => {}; // Temporarily suppress internal WebGL error from triggering Next.js red overlay
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (e) {
      console.warn("WebGL is disabled in your current environment (sandbox/VM). The 3D scene cannot render here, but the code is fully intact and will work in a normal browser.");
      return;
    } finally {
      console.error = originalError;
    }
    
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    renderer.setClearColor(0x000000, 0); 
    // Optimization: limit max pixel ratio to 1.5 for better performance on high-density displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); 
    container.appendChild(renderer.domElement);
    
    updateSize();

    // 1. Center Black Hole Sphere (physically blocks particles behind it)
    const bhGeometry = new THREE.SphereGeometry(6, 32, 32);
    const bhMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const blackHole = new THREE.Mesh(bhGeometry, bhMaterial);
    scene.add(blackHole);

    // Intensely Glowing Inner Photon Ring
    const photonGeometry = new THREE.RingGeometry(6.2, 8.5, 64);
    const photonMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffbb00, 
        transparent: true, 
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
    });
    const photonRing = new THREE.Mesh(photonGeometry, photonMaterial);
    photonRing.rotation.x = Math.PI * 0.45; // Match accretion disk tilt
    scene.add(photonRing);

    // Subtle glowing halo behind the black hole
    const haloGeometry = new THREE.SphereGeometry(7, 32, 32);
    const haloMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xeab308, 
        transparent: true, 
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    scene.add(halo);

    // 2. 3D Accretion Disk (Particle Galaxy)
    // Optimization: reduced particle count from 18000 to 8000 for smoother frame rates
    const particleCount = 8000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorCore = new THREE.Color(0xffffff); // Blinding white core
    const colorGold = new THREE.Color(0xeab308); // Amber/Gold
    const colorCyan = new THREE.Color(0x2dd4bf); // Teal/Cyan
    const colorDim = new THREE.Color(0x222222);

    for (let i = 0; i < particleCount; i++) {
        // Create a swirling galaxy disc
        const radius = Math.random() * Math.random() * 50 + 6.5; // keep away from black hole center
        const spinAngle = Math.random() * Math.PI * 2;
        
        // Math for spiral arms
        const branches = 3;
        const branchAngle = ((i % branches) / branches) * Math.PI * 2;
        const finalAngle = spinAngle + branchAngle + radius * 0.5;

        // Height variation (thicker in middle, thinner at edges)
        const yOffset = (Math.random() - 0.5) * (Math.random() * 4) * (15 / radius);

        positions[i * 3] = Math.cos(finalAngle) * radius;
        positions[i * 3 + 1] = yOffset;
        positions[i * 3 + 2] = Math.sin(finalAngle) * radius;

        // Mix colors based on distance and randomness
        let pColor;
        if (radius < 8) {
            // Super heated inner ring
            pColor = colorCore.clone().lerp(colorGold, Math.random());
        } else {
            const mixRatio = Math.random();
            pColor = colorGold.clone().lerp(colorCyan, mixRatio);
            
            // Dim outer particles heavily
            if (radius > 20 && Math.random() > 0.4) {
                pColor.lerp(colorDim, 0.85);
            }
        }

        colors[i * 3] = pColor.r;
        colors[i * 3 + 1] = pColor.g;
        colors[i * 3 + 2] = pColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create the particle material
    const material = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true
    });

    const galaxy = new THREE.Points(geometry, material);
    // Tilt the galaxy for a cinematic angle
    galaxy.rotation.x = Math.PI * 0.15;
    galaxy.rotation.z = Math.PI * 0.05;
    scene.add(galaxy);

    // 3. Ambient Starfield (Background Dust)
    const dustGeom = new THREE.BufferGeometry();
    // Optimization: reduced ambient dust particles from 3000 to 1500
    const dustCount = 1500;
    const dustPos = new Float32Array(dustCount * 3);
    for(let i=0; i<dustCount*3; i++) {
        dustPos[i] = (Math.random() - 0.5) * 150;
    }
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
        color: 0x888888,
        size: 0.08,
        transparent: true,
        opacity: 0.3
    });
    const ambientDust = new THREE.Points(dustGeom, dustMat);
    scene.add(ambientDust);

    // --- INTERACTION & ANIMATION ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX - window.innerWidth / 2);
        mouseY = (e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateSize);

    const clock = new THREE.Clock();
    let animationFrameId: number;
    let isVisible = true;

    const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    observer.observe(container);

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        if (!isVisible) return; // Completely pauses GPU usage when off-screen

        const delta = clock.getDelta();

        // Rotate the entire galaxy
        galaxy.rotation.y -= 0.08 * delta; // Spin speed
        photonRing.rotation.z += 0.2 * delta; // Inner ring spins faster
        
        ambientDust.rotation.y -= 0.01 * delta;
        ambientDust.rotation.x += 0.005 * delta;

        // Make the halo pulse slightly
        const time = clock.getElapsedTime();
        halo.scale.setScalar(1 + Math.sin(time * 3) * 0.04);
        photonRing.scale.setScalar(1 + Math.sin(time * 5) * 0.02);

        // Smoothly move camera based on mouse (3D Parallax effect)
        targetX = mouseX * 0.015;
        targetY = mouseY * 0.015;
        
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y + 5) * 0.05; // Keep base y at 5
        
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    };

    animate();

    return () => {
        cancelAnimationFrame(animationFrameId);
        observer.disconnect();
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', updateSize);
        if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
        }
        renderer.dispose();
    };
  }, []);

  return (
    <section id="projects" className="relative w-full h-screen bg-[#030508] font-jakarta overflow-hidden select-none text-stone-200 cursor-crosshair">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@500;700;900&family=Orbitron:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@300;400;600&display=swap');
        
        .font-cinzel-dec { font-family: 'Cinzel Decorative', serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes data-stream {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `}} />

      {/* Super 3D WebGL Container */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-90"></div>

      {/* Elegant Overlays */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#030508_100%)] opacity-80"></div>
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* Corner Minimalist Accents */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-white/20 z-20 pointer-events-none rounded-tl-xl"></div>
      <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-white/20 z-20 pointer-events-none rounded-tr-xl"></div>
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-white/20 z-20 pointer-events-none rounded-bl-xl"></div>
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-white/20 z-20 pointer-events-none rounded-br-xl"></div>

      {/* DASHBOARD CONTAINER */}
      <div className="relative z-20 w-full h-full flex flex-col p-8 md:p-12 max-w-[1900px] mx-auto pointer-events-auto">
          
          {/* PREMIUM HEADER */}
          <header className="flex justify-between items-start border-b border-white/10 pb-6 relative z-20">
              <div className="flex gap-6 items-center">
                  <div className="flex flex-col gap-1.5 justify-center">
                      <div className="h-0.5 w-12 bg-amber-400 mb-1 shadow-[0_0_15px_rgba(251,191,36,0.6)]"></div>
                      <div className="h-0.5 w-8 bg-white/40"></div>
                      <div className="h-0.5 w-16 bg-white/20"></div>
                  </div>
                  <div>
                      <div className="text-xl md:text-3xl font-cinzel-dec font-bold tracking-[0.2em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">ASTRA<span className="text-amber-400">.SYS</span></div>
                      <div className="text-[9px] md:text-[10px] tracking-widest text-stone-400 mt-1 font-orbitron uppercase">Core Initialized // Sinde Yogesh</div>
                  </div>
              </div>
              
              <div className="flex flex-col items-end text-right font-orbitron">
                  <div className="flex items-center gap-3 text-[10px] md:text-xs tracking-[0.2em] mb-1">
                      <span className="text-stone-500">NETWORK_STATE:</span>
                      <span className="text-amber-400 animate-pulse drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">OPTIMAL</span>
                  </div>
                  <div className="text-[10px] md:text-[12px] text-stone-300 tracking-[0.3em] mt-1">{timeStr}</div>
              </div>
          </header>

          <main className="flex-1 flex flex-col lg:flex-row mt-10 gap-10 min-h-0">
              
              {/* LEFT NAVIGATION PANE */}
              <aside className="hidden lg:flex w-72 flex-col gap-8 relative z-20">
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md relative group hover:border-amber-400/30 transition-colors duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                      <div className="text-[10px] text-amber-500 tracking-[0.3em] mb-6 font-orbitron border-b border-white/[0.05] pb-3">/// DIRECTORY</div>
                      <nav className="flex flex-col gap-5">
                          {[
                              { label: 'HOME', link: '#' },
                              { label: 'ABOUT', link: '/about' },
                              { label: 'SKILLS', link: '/skills' },
                              { label: 'PROJECTS', link: '/projects' },
                              { label: 'CONTACT', link: '/contact' }
                          ].map((item, i) => (
                              <a key={i} href={item.link} className="flex items-center gap-4 text-xs tracking-[0.2em] text-stone-400 hover:text-white hover:translate-x-3 transition-all duration-300 group/link font-jakarta">
                                  <span className="w-6 h-[1px] bg-white/20 group-hover/link:w-10 group-hover/link:bg-amber-400 transition-all duration-500"></span>
                                  <span className="font-orbitron text-[9px] opacity-40 group-hover/link:opacity-100 group-hover/link:text-amber-400">0{i+1}</span>
                                  {item.label}
                              </a>
                          ))}
                      </nav>
                  </div>
                  
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 backdrop-blur-md flex-1 relative shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
                       <div className="absolute inset-0 opacity-10 animate-[data-stream_20s_linear_infinite]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)' }}></div>
                       <div className="relative z-10 font-orbitron">
                           <div className="text-[10px] text-amber-500 tracking-[0.3em] mb-4 border-b border-white/[0.05] pb-3">/// TERMINAL</div>
                           <div className="flex flex-col gap-3 text-[10px] text-stone-400/80 leading-relaxed">
                               <div className="animate-pulse text-amber-400/80">&gt; Authenticating...</div>
                               <div>&gt; Loading neural pathways... <span className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">OK</span></div>
                               <div>&gt; Rendering 3D environment... <span className="text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">OK</span></div>
                               <div className="text-amber-300 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)] mt-4 border-l-2 border-amber-400 pl-3">&gt; Access Granted.</div>
                           </div>
                       </div>
                  </div>
              </aside>

              {/* CENTER HERO */}
              <section className="flex-1 flex flex-col justify-center items-center relative text-center z-20">
                  <div className="bg-white/[0.03] border border-white/[0.05] rounded-full px-6 py-2 mb-10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                      <span className="text-[10px] tracking-[0.4em] text-stone-300 font-orbitron">CREATIVE DEVELOPER</span>
                  </div>

                  <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-cinzel-dec font-black tracking-tighter leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-stone-200 to-stone-600 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] uppercase">
                      YOGESH
                  </h1>
                  
                  <div className="flex items-center gap-6 mb-12 w-full max-w-xl">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-500/50"></div>
                      <h2 className="text-xs md:text-sm tracking-[0.6em] text-amber-400 font-orbitron font-bold drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">3D ENGINEER</h2>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-500/50"></div>
                  </div>

                  <p className="max-w-2xl text-sm md:text-base leading-relaxed text-stone-300/90 mb-12 font-jakarta font-light text-center">
                      Merging cinematic aesthetics with modern web technologies. <br/>
                      Building high-performance digital realities and immersive 3D experiences.
                  </p>

                  <div className="flex gap-8 font-orbitron">
                      <a href="/projects" className="relative px-10 py-4 bg-amber-500/10 border border-amber-500/50 rounded-full text-amber-400 tracking-[0.3em] text-[10px] font-bold uppercase hover:bg-amber-500 hover:text-black hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all duration-500 group overflow-hidden">
                          <span className="relative z-10">EXPLORE WORK</span>
                      </a>
                      <a href="/contact" className="px-10 py-4 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md text-white tracking-[0.3em] text-[10px] font-bold uppercase hover:border-white/40 hover:bg-white/10 transition-all duration-500">
                          CONTACT ME
                      </a>
                  </div>
              </section>

              {/* RIGHT PANEL (Diamond Navigation Matrix + Radar) */}
              <aside className="hidden lg:flex w-72 flex-col justify-start items-center relative z-20 pb-8">
                  
                  {/* Background Orbital Rings - Elegant Gold/White */}
                  <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-white/[0.03] rounded-full pointer-events-none"></div>
                  <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-amber-500/10 rounded-full pointer-events-none animate-[spin_60s_linear_infinite_reverse]"></div>
                  <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] border border-white/[0.05] rounded-full border-dashed pointer-events-none animate-[spin_40s_linear_infinite]"></div>

                  {/* Diamond Grid Container */}
                  <div className="relative w-[220px] h-[220px] mx-auto z-10 mb-auto mt-[20%] drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                      <div className="absolute inset-0 transform rotate-45 grid grid-cols-2 gap-3">
                          
                          {/* TOP DIAMOND (About Me) */}
                          <a href="/about" className="group relative w-full h-full border border-white/20 bg-white/[0.02] backdrop-blur-xl hover:bg-white/10 hover:border-white/50 flex items-center justify-center transition-all duration-500 rounded-2xl">
                              <div className="-rotate-45 flex flex-col items-center gap-2">
                                  <svg className="w-5 h-5 text-stone-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                                  <span className="font-orbitron font-bold text-[9px] text-stone-400 group-hover:text-white tracking-[0.2em] text-center">ABOUT</span>
                              </div>
                          </a>

                          {/* RIGHT DIAMOND (Experience) */}
                          <a href="/experience" className="group relative w-full h-full border border-amber-500/30 bg-black/40 backdrop-blur-xl hover:bg-amber-500/20 hover:border-amber-400 flex items-center justify-center transition-all duration-500 rounded-2xl shadow-[inset_0_0_20px_rgba(251,191,36,0.05)]">
                              <div className="-rotate-45 flex flex-col items-center gap-2">
                                  <svg className="w-5 h-5 text-amber-500 group-hover:text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                                  <span className="font-orbitron font-bold text-[8px] text-amber-500/70 group-hover:text-amber-400 tracking-[0.2em]">EXP</span>
                              </div>
                          </a>

                          {/* LEFT DIAMOND (Projects) */}
                          <a href="/projects" className="group relative w-full h-full border border-amber-500/30 bg-black/40 backdrop-blur-xl hover:bg-amber-500/20 hover:border-amber-400 flex items-center justify-center transition-all duration-500 rounded-2xl shadow-[inset_0_0_20px_rgba(251,191,36,0.05)]">
                              <div className="-rotate-45 flex flex-col items-center gap-2">
                                  <svg className="w-5 h-5 text-amber-500 group-hover:text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>
                                  <span className="font-orbitron font-bold text-[8px] text-amber-500/70 group-hover:text-amber-400 tracking-[0.2em]">WORK</span>
                              </div>
                          </a>

                          {/* BOTTOM DIAMOND (Skills) */}
                          <a href="/skills" className="group relative w-full h-full border border-white/20 bg-white/[0.02] backdrop-blur-xl hover:bg-white/10 hover:border-white/50 flex items-center justify-center transition-all duration-500 rounded-2xl">
                              <div className="-rotate-45 flex flex-col items-center gap-2">
                                  <svg className="w-5 h-5 text-stone-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                                  <span className="font-orbitron font-bold text-[9px] text-stone-400 group-hover:text-white tracking-[0.2em]">SKILLS</span>
                              </div>
                          </a>

                      </div>
                  </div>

                  {/* Elegant Orbital Radar Globe */}
                  <div className="relative mt-auto w-44 h-44 flex items-center justify-center opacity-100 group cursor-crosshair drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                      <div className="absolute inset-0 border border-white/[0.05] rounded-full"></div>
                      <div className="absolute inset-3 border border-dashed border-amber-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                      <div className="absolute inset-6 border border-dotted border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                      
                      <div className="absolute inset-10 rounded-full border border-amber-500/40 overflow-hidden bg-[#030508]/80 shadow-[0_0_30px_rgba(251,191,36,0.15)] backdrop-blur-md">
                          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.15),transparent_70%)]"></div>
                          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-amber-400/50 shadow-[0_0_10px_#fbbf24] animate-[pulse_3s_linear_infinite]"></div>
                          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-amber-400/50 shadow-[0_0_10px_#fbbf24] animate-[pulse_3s_linear_infinite]" style={{animationDelay: '1.5s'}}></div>
                      </div>
                      
                      <div className="absolute -left-24 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-orbitron text-[8px] text-amber-400 tracking-[0.2em] text-right">
                          <div className="font-bold">SYSTEM_V2</div>
                          <div className="text-stone-400 mt-1">SYNC: 100%</div>
                      </div>
                  </div>

              </aside>
          </main>

          {/* FOOTER */}
          <footer className="mt-auto border-t border-white/[0.05] pt-6 pb-2 flex justify-between items-center text-[10px] font-orbitron tracking-widest text-stone-500 relative z-20">
              <div>&copy; 2025 SINDE YOGESH.</div>
              
              <div className="flex gap-8">
                  <a href="#" className="hover:text-amber-400 hover:tracking-[0.3em] transition-all duration-300">GITHUB</a>
                  <a href="#" className="hover:text-amber-400 hover:tracking-[0.3em] transition-all duration-300">LINKEDIN</a>
                  <a href="#" className="hover:text-amber-400 hover:tracking-[0.3em] transition-all duration-300">EMAIL</a>
              </div>
          </footer>
      </div>
    </section>
  );
}
