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
    <section id="projects" className="relative w-full h-screen bg-[#020202] font-mono overflow-hidden select-none text-cyan-400 cursor-crosshair">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes glitch-anim {
          0% { clip-path: inset(80% 0 0 0); transform: translate(-2px, 2px); }
          20% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(40% 0 20% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(15% 0 70% 0); transform: translate(-2px, 2px); }
          100% { clip-path: inset(50% 0 30% 0); transform: translate(0); }
        }
        .glitch-text { position: relative; display: inline-block; }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        }
        .glitch-text::before { left: 2px; text-shadow: -1px 0 red; clip-path: inset(0); animation: glitch-anim 2s infinite linear alternate-reverse; }
        .glitch-text::after { left: -2px; text-shadow: -1px 0 blue; clip-path: inset(0); animation: glitch-anim 3s infinite linear alternate-reverse; }
        
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .scan-bar { animation: scanline 4s linear infinite; }

        @keyframes data-stream {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />

      {/* Super 3D WebGL Container */}
      <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"></div>

      {/* High-Tech Overlays */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute inset-0 pointer-events-none z-10 scan-bar h-32 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"></div>

      {/* Corner HUD Elements */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-cyan-500/50 z-20 pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-cyan-500/50 z-20 pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-cyan-500/50 z-20 pointer-events-none"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-cyan-500/50 z-20 pointer-events-none"></div>

      {/* HUD DASHBOARD */}
      <div className="relative z-20 w-full h-full flex flex-col p-6 md:p-8 max-w-[1800px] mx-auto pointer-events-auto">
          
          {/* HIGH-TECH HEADER */}
          <header className="flex justify-between items-start border-b border-cyan-500/30 pb-4">
              <div className="flex gap-4">
                  <div className="flex flex-col gap-1 justify-center">
                      <div className="h-1 w-12 bg-cyan-400 mb-1 shadow-[0_0_10px_#22d3ee]"></div>
                      <div className="h-1 w-8 bg-cyan-500/50"></div>
                      <div className="h-1 w-16 bg-cyan-500/30"></div>
                  </div>
                  <div>
                      <div className="text-xl md:text-2xl font-black tracking-[0.3em] text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] glitch-text" data-text="SYS_CORE_YOGESH">SYS_CORE_YOGESH</div>
                      <div className="text-[9px] md:text-[10px] tracking-widest text-cyan-600 mt-1">INITIALIZATION SEQUENCE COMPLETE</div>
                  </div>
              </div>
              
              <div className="flex flex-col items-end text-right">
                  <div className="flex items-center gap-3 text-[10px] md:text-xs tracking-widest mb-1">
                      <span className="text-cyan-700">STATUS:</span>
                      <span className="text-amber-400 animate-pulse drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">SYSTEM NOMINAL</span>
                  </div>
                  <div className="text-[9px] md:text-[10px] text-cyan-500 tracking-[0.2em]">{timeStr}</div>
                  <div className="flex gap-1 mt-2">
                      {[...Array(10)].map((_, i) => (
                          <div key={i} className="w-1 md:w-1.5 h-2 md:h-3 bg-cyan-500/40" style={{ animation: `pulse ${Math.random() * 2 + 1}s infinite` }}></div>
                      ))}
                  </div>
              </div>
          </header>

          <main className="flex-1 flex flex-col lg:flex-row mt-8 gap-8 min-h-0">
              
              {/* LEFT DATABANK */}
              <aside className="hidden lg:flex w-64 flex-col gap-6">
                  <div className="border border-cyan-500/30 bg-cyan-950/20 p-5 backdrop-blur-md relative group hover:border-cyan-400 transition-colors duration-300 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">
                      <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 shadow-[0_0_5px_#22d3ee]"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-400 shadow-[0_0_5px_#22d3ee]"></div>
                      <div className="text-[10px] text-cyan-500 tracking-[0.3em] mb-6 border-b border-cyan-500/30 pb-2">/// NAV_PROTOCOL</div>
                      <nav className="flex flex-col gap-4">
                          {[
                              { label: 'MAIN_HUB', link: '#' },
                              { label: 'ABOUT_ME', link: '/about' },
                              { label: 'SKILLS_DB', link: '/skills' },
                              { label: 'ARCHIVES', link: '/projects' },
                              { label: 'COMMS', link: '/contact' }
                          ].map((item, i) => (
                              <a key={i} href={item.link} className="flex items-center gap-3 text-xs tracking-[0.2em] text-cyan-400/70 hover:text-cyan-300 hover:translate-x-2 transition-all group/link">
                                  <span className="w-4 h-[1px] bg-cyan-500/50 group-hover/link:w-8 group-hover/link:bg-cyan-400 transition-all duration-300"></span>
                                  <span className="font-bold opacity-50 group-hover/link:opacity-100">0{i+1}</span>
                                  {item.label}
                              </a>
                          ))}
                      </nav>
                  </div>
                  
                  <div className="border border-cyan-500/30 bg-cyan-950/20 p-5 backdrop-blur-md flex-1 overflow-hidden relative shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">
                       <div className="absolute inset-0 opacity-20 animate-[data-stream_10s_linear_infinite]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.2) 2px, rgba(6,182,212,0.2) 4px)' }}></div>
                       <div className="relative z-10">
                           <div className="text-[10px] text-cyan-500 tracking-[0.3em] mb-4 border-b border-cyan-500/30 pb-2">/// SYSTEM_LOGS</div>
                           <div className="flex flex-col gap-2 text-[9px] text-cyan-500/60 font-mono">
                               <div className="animate-pulse">&gt; Loading core modules...</div>
                               <div>&gt; Injecting dependencies... OK</div>
                               <div className="text-amber-500">&gt; Warning: High power draw detected</div>
                               <div>&gt; Establishing neural link...</div>
                               <div className="text-cyan-300 drop-shadow-[0_0_5px_#22d3ee]">&gt; Link established.</div>
                               <div className="mt-2 text-cyan-700">_awaiting_input</div>
                           </div>
                       </div>
                  </div>
              </aside>

              {/* CENTER HIGH-TECH HERO */}
              <section className="flex-1 flex flex-col justify-center items-center relative text-center">
                  
                  {/* Huge Targeting Reticle Behind Text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.15]">
                      <div className="absolute inset-0 border border-cyan-400/30 rounded-full animate-[spin_40s_linear_infinite]"></div>
                      <div className="absolute inset-4 border border-dashed border-cyan-400/50 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
                      <div className="absolute inset-16 border border-dotted border-cyan-400/50 rounded-full animate-[spin_20s_linear_infinite]"></div>
                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-400/30"></div>
                      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-cyan-400/30"></div>
                  </div>

                  <div className="border border-cyan-500/40 bg-cyan-950/60 px-8 py-2 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                      <span className="text-[10px] md:text-xs tracking-[0.5em] text-cyan-300 font-bold">ACCESS GRANTED</span>
                  </div>

                  <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-600 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)] glitch-text uppercase" data-text="SINDE YOGESH">
                      SINDE YOGESH
                  </h1>
                  
                  <div className="flex items-center gap-4 mb-12 w-full max-w-2xl">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyan-500/80"></div>
                      <h2 className="text-xs md:text-sm tracking-[0.5em] text-amber-400 font-bold drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">CREATIVE ENGINEER</h2>
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyan-500/80"></div>
                  </div>

                  <p className="max-w-xl text-xs md:text-sm leading-relaxed text-cyan-100/80 mb-12 tracking-[0.1em] font-light border-l-2 border-cyan-500/50 pl-6 text-left bg-cyan-950/20 py-2 backdrop-blur-sm">
                      &gt; INITIATING CREATIVE OVERRIDE... <br/><br/>
                      &gt; BUILDING HIGH-PERFORMANCE DIGITAL REALITIES WITH IMMERSIVE 3D TECHNOLOGIES AND ADVANCED WEB ENGINEERING.
                  </p>

                  <div className="flex gap-6">
                      <a href="/projects" className="relative px-8 py-4 bg-cyan-500/10 border border-cyan-400 text-cyan-300 tracking-[0.3em] text-[10px] font-bold uppercase hover:bg-cyan-400 hover:text-black transition-all duration-300 group overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                          <div className="absolute inset-0 bg-cyan-400 w-0 group-hover:w-full transition-all duration-300 ease-out z-0"></div>
                          <span className="relative z-10 group-hover:text-black">ACCESS ARCHIVES</span>
                      </a>
                      <a href="/contact" className="px-8 py-4 border border-cyan-500/40 bg-cyan-950/30 backdrop-blur-md text-cyan-500 tracking-[0.3em] text-[10px] font-bold uppercase hover:border-cyan-400 hover:text-cyan-300 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                          INITIATE COMMS
                      </a>
                  </div>
              </section>

              {/* RIGHT RADAR / STATUS */}
              <aside className="hidden lg:flex w-72 flex-col justify-between items-end pb-8">
                  
                  <div className="w-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md p-5 flex flex-col gap-5 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">
                      <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 shadow-[0_0_5px_#22d3ee]"></div>
                      <div className="flex justify-between items-end border-b border-cyan-500/30 pb-2">
                          <span className="text-[10px] tracking-[0.3em] text-cyan-500">/// SYS_METRICS</span>
                          <span className="text-xs font-bold text-cyan-300">100%</span>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                          <div className="flex justify-between text-[9px] text-cyan-400 tracking-widest">
                              <span>PROJECTS_DEPLOYED</span>
                              <span className="text-amber-400 font-bold">25+</span>
                          </div>
                          <div className="w-full h-[2px] bg-cyan-950"><div className="w-[85%] h-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div></div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                          <div className="flex justify-between text-[9px] text-cyan-400 tracking-widest">
                              <span>YEARS_EXP</span>
                              <span className="text-amber-400 font-bold">02+</span>
                          </div>
                          <div className="w-full h-[2px] bg-cyan-950"><div className="w-[40%] h-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div></div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                          <div className="flex justify-between text-[9px] text-cyan-400 tracking-widest">
                              <span>CLIENT_SATISFACTION</span>
                              <span className="text-amber-400 font-bold">15+</span>
                          </div>
                          <div className="w-full h-[2px] bg-cyan-950"><div className="w-[60%] h-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div></div>
                      </div>
                  </div>

                  {/* High-tech Radar Map */}
                  <div className="relative w-56 h-56 border border-cyan-500/40 rounded-full flex items-center justify-center bg-cyan-950/20 backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.2)_0%,transparent_70%)]"></div>
                      <div className="absolute inset-4 border border-cyan-500/20 rounded-full"></div>
                      <div className="absolute inset-10 border border-dashed border-cyan-500/30 rounded-full animate-[spin_15s_linear_infinite]"></div>
                      <div className="absolute inset-16 border border-dotted border-cyan-500/40 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-500/30"></div>
                      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-cyan-500/30"></div>
                      {/* Radar sweep */}
                      <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(6,182,212,0.4)_90deg,transparent_90deg)] origin-bottom-left animate-[radar-sweep_3s_linear_infinite]"></div>
                      <div className="absolute top-1/4 right-1/4 w-2.5 h-2.5 bg-amber-400 rounded-full shadow-[0_0_12px_#fbbf24] animate-pulse"></div>
                      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#22d3ee]"></div>
                      <div className="absolute top-[60%] right-[30%] w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_#22d3ee]"></div>
                  </div>

              </aside>
          </main>

          <footer className="mt-auto border-t border-cyan-500/30 pt-4 flex justify-between text-[9px] tracking-[0.3em] text-cyan-600 uppercase">
              <div>SECURE CONNECTION // ENCRYPTED // 2025</div>
              <div className="flex gap-6">
                  <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">CORE.JS</span>
                  <span className="text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]">THREE.SYS</span>
              </div>
          </footer>
      </div>
    </section>
  );
}
