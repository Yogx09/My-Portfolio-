"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SkillsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add FontAwesome dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);

    // Audio Context for sound effects
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioContext();

    const playSound = (type: 'pop' | 'scan' | 'open') => {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'scan') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(400, audioCtx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === 'open') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }
    };

    // Color palettes mapped to balloon classes for realistic particle explosions
    const balloonColors: Record<string, string[]> = {
        'b-sapphire': ['#4facfe', '#0077ff', '#c4e0ff'],
        'b-emerald': ['#66ff88', '#00b33c', '#d1fae5'],
        'b-gold': ['#ffe366', '#ffaa00', '#fef08a'],
        'b-amethyst': ['#d488ff', '#7700ff', '#e0b3ff'],
        'b-ruby': ['#ff6688', '#e60039', '#ffe4e6']
    };

    // Central Database for Tech Skills
    const techData: Record<string, any> = {
        'fa-react': { name: 'React', role: 'Frontend Architecture', color: '#61DAFB', percent: 95 },
        'fa-node-js': { name: 'Node.js', role: 'Backend Runtime', color: '#68A063', percent: 88 },
        'fa-python': { name: 'Python', role: 'Data & AI Scripts', color: '#FFD43B', percent: 92 },
        'fa-docker': { name: 'Docker', role: 'Containerization', color: '#2496ED', percent: 90 },
        'fa-aws': { name: 'AWS', role: 'Cloud Infrastructure', color: '#FF9900', percent: 85 },
        'fa-js': { name: 'JavaScript', role: 'Core Interactive Logic', color: '#F7DF1E', percent: 98 },
        'fa-vuejs': { name: 'Vue.js', role: 'Reactive UI Framework', color: '#41B883', percent: 82 },
        'fa-java': { name: 'Java', role: 'Enterprise Backend', color: '#f89820', percent: 80 },
        'fa-css3-alt': { name: 'CSS3', role: 'Advanced Styling & 3D', color: '#2965f1', percent: 95 },
        'fa-html5': { name: 'HTML5', role: 'Semantic Structure', color: '#E34F26', percent: 99 },
        'fa-linux': { name: 'Linux', role: 'System Administration', color: '#FCC624', percent: 85 },
        'fa-git-alt': { name: 'Git', role: 'Version Control', color: '#F05032', percent: 92 },
        'fa-android': { name: 'Android', role: 'Mobile Native App', color: '#a4c639', percent: 75 },
        'fa-angular': { name: 'Angular', role: 'Enterprise UI App', color: '#DD0031', percent: 78 },
        'fa-figma': { name: 'Figma', role: 'UI/UX Rapid Prototyping', color: '#F24E1E', percent: 88 },
        'fa-swift': { name: 'Swift', role: 'iOS Native Dev', color: '#F05138', percent: 70 },
        'fa-github': { name: 'GitHub', role: 'CI/CD & Collaboration', color: '#ffffff', percent: 95 }
    };

    let hudTimeout: NodeJS.Timeout;

    function renderSkillMatrix() {
        const grid = document.getElementById('matrix-grid');
        if (!grid) return;
        grid.innerHTML = ''; 
        
        for (const [iconClass, data] of Object.entries(techData)) {
            const card = document.createElement('div');
            card.className = `bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden cursor-default shadow-[0_4px_15px_rgba(0,0,0,0.5)]`;
            card.onmouseenter = () => { card.style.borderColor = data.color; playSound('scan'); };
            card.onmouseleave = () => card.style.borderColor = 'rgba(255,255,255,0.1)';
            card.style.boxShadow = `inset 0 0 0 transparent`;
            
            card.innerHTML = `
                <div class="absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-20 rounded-full blur-[30px] transition-opacity duration-500 pointer-events-none" style="background-color: ${data.color};"></div>
                
                <div class="flex items-center gap-4 mb-5 relative z-10">
                    <div class="w-14 h-14 rounded-xl bg-black/60 flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <i class="fa-brands ${iconClass} text-3xl" style="color: ${data.color}; filter: drop-shadow(0 0 5px ${data.color}80)"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-white font-black tracking-wider text-lg uppercase">${data.name}</h3>
                        <span class="text-gray-400 text-[9px] uppercase font-bold tracking-[0.15em] block mt-0.5 line-clamp-1">${data.role}</span>
                    </div>
                </div>
                
                <div class="w-full bg-black/60 h-2.5 rounded-full overflow-hidden border border-white/5 relative z-10 shadow-inner">
                    <div class="h-full rounded-full transition-all duration-1000 w-0 group-hover:brightness-125" style="background-color: ${data.color}; box-shadow: 0 0 10px ${data.color}80;" data-width="${data.percent}%"></div>
                </div>
            `;
            grid.appendChild(card);
        }
    }

    const matrixModal = document.getElementById('skill-matrix-modal');
    const matrixContainer = document.getElementById('matrix-container');
    const openBtn = document.getElementById('open-matrix-btn');
    const closeBtn = document.getElementById('close-matrix-btn');
    
    if (openBtn && matrixModal && matrixContainer) {
      openBtn.addEventListener('click', () => {
          playSound('open');
          renderSkillMatrix(); 
          
          matrixModal.classList.remove('opacity-0', 'pointer-events-none');
          matrixModal.classList.add('opacity-100');
          matrixContainer.classList.remove('scale-95');
          matrixContainer.classList.add('scale-100');
          
          setTimeout(() => {
              document.querySelectorAll('#matrix-grid [data-width]').forEach(bar => {
                  (bar as HTMLElement).style.width = bar.getAttribute('data-width') || '0%';
              });
          }, 100);
      });
    }

    if (closeBtn && matrixModal && matrixContainer) {
      closeBtn.addEventListener('click', () => {
          playSound('scan');
          matrixModal.classList.add('opacity-0', 'pointer-events-none');
          matrixModal.classList.remove('opacity-100');
          matrixContainer.classList.add('scale-95');
          matrixContainer.classList.remove('scale-100');
      });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && closeBtn) closeBtn.click();
    });
    if (matrixModal) {
      matrixModal.addEventListener('click', (e) => {
          if (e.target === matrixModal && closeBtn) closeBtn.click();
      });
    }

    function showSkillHUD(iconClassStr: string) {
        playSound('scan');
        const classes = iconClassStr.split(' ');
        let techKey = null;
        for (let c of classes) {
            if (techData[c]) { techKey = c; break; }
        }
        
        if (!techKey) return; 
        
        const data = techData[techKey];
        const hud = document.getElementById('skill-hud');
        const card = document.getElementById('skill-card');
        const progressEl = document.getElementById('hud-progress');
        const iconEl = document.getElementById('hud-icon');
        const hudTitle = document.getElementById('hud-title');
        const hudRole = document.getElementById('hud-role');
        const hudGlow = document.getElementById('hud-glow');
        
        if (!hud || !card || !progressEl || !iconEl || !hudTitle || !hudRole || !hudGlow) return;

        iconEl.className = `fa-brands ${techKey} text-7xl transition-all duration-300`;
        iconEl.style.color = data.color;
        iconEl.style.filter = `drop-shadow(0 0 25px ${data.color})`;
        
        hudTitle.innerText = data.name;
        hudRole.innerText = data.role;
        
        progressEl.style.width = '0%';
        progressEl.style.backgroundColor = data.color;
        hudGlow.style.backgroundColor = data.color;

        hud.classList.remove('opacity-0', 'pointer-events-none');
        hud.classList.add('opacity-100');
        card.classList.add('active');
        
        setTimeout(() => {
            progressEl.style.width = data.percent + '%';
        }, 150);

        clearTimeout(hudTimeout);
        
        hudTimeout = setTimeout(() => {
            hud.classList.remove('opacity-100');
            hud.classList.add('opacity-0', 'pointer-events-none');
            card.classList.remove('active');
        }, 3500);
    }

    document.querySelectorAll('.node-content').forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            const icon = node.querySelector('i');
            if (icon) {
                showSkillHUD(icon.className);
            }
        });
    });

    document.querySelectorAll('.balloon-wrapper').forEach(wrapper => {
        wrapper.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            playSound('pop');
            
            const balloon = wrapper.querySelector('.balloon');
            const sticker = wrapper.querySelector('.tech-sticker') as HTMLElement;
            let colors = ['#ffffff', '#cccccc']; 
            
            if (balloon) {
              for (const [className, colorArr] of Object.entries(balloonColors)) {
                  if (balloon.classList.contains(className)) {
                      colors = colorArr;
                      break;
                  }
              }
            }

            const clickEvent = e as MouseEvent;
            const clickX = clickEvent.clientX;
            const clickY = clickEvent.clientY;

            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.className = 'fixed rounded-full pointer-events-none z-[100] shadow-md';
                
                const size = Math.random() * 8 + 4;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                particle.style.left = clickX + 'px';
                particle.style.top = clickY + 'px';
                document.body.appendChild(particle);

                const angle = Math.random() * Math.PI * 2;
                const velocity = 80 + Math.random() * 120; 
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity + 50; 

                particle.animate([
                    { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                    { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
                ], {
                    duration: 600 + Math.random() * 300,
                    easing: 'cubic-bezier(0.15, 0.9, 0.3, 1)' 
                }).onfinish = () => particle.remove(); 
            }
            
            if (sticker) {
                const rect = sticker.getBoundingClientRect();
                sticker.style.opacity = '0';
                
                const fallingSticker = sticker.cloneNode(true) as HTMLElement;
                fallingSticker.style.position = 'fixed';
                fallingSticker.style.left = rect.left + 'px';
                fallingSticker.style.top = rect.top + 'px';
                fallingSticker.style.width = rect.width + 'px';
                fallingSticker.style.height = rect.height + 'px';
                fallingSticker.style.transform = 'none'; 
                fallingSticker.style.transition = 'none';
                fallingSticker.style.margin = '0';
                fallingSticker.style.zIndex = '9999';
                fallingSticker.style.pointerEvents = 'none';
                fallingSticker.style.opacity = '1';
                
                document.body.appendChild(fallingSticker);
                
                const spin = Math.random() * 360 - 180; 
                const drift = Math.random() * 150 - 75; 
                
                fallingSticker.animate([
                    { transform: 'translate(0, 0) rotate(0deg)', offset: 0 },
                    { transform: `translate(${drift * 0.2}px, -30px) rotate(${spin * 0.2}deg)`, offset: 0.15 }, 
                    { transform: `translate(${drift}px, 120vh) rotate(${spin}deg)`, offset: 1 } 
                ], {
                    duration: 1200 + Math.random() * 500, 
                    easing: 'cubic-bezier(0.32, 0, 0.8, 0.15)', 
                    fill: 'forwards'
                }).onfinish = () => fallingSticker.remove();

                const stickerIcon = sticker.querySelector('i');
                if (stickerIcon) {
                    showSkillHUD(stickerIcon.className);
                }
            }
            
            wrapper.animate([
                { transform: 'scale(1)', opacity: 1, filter: 'brightness(1)' },
                { transform: 'scale(1.4)', opacity: 0, filter: 'brightness(2)' }
            ], {
                duration: 120,
                easing: 'ease-out'
            }).onfinish = () => wrapper.remove(); 
        });
    });

    const cargoData = [
        { title: 'CLOUD', subtitle: 'Infrastructure', icon: 'fa-server', color: 'text-blue-400', shadow: 'rgba(96,165,250,0.6)', bgText: 'DATA' },
        { title: 'FRONTEND', subtitle: 'UI/UX Engineering', icon: 'fa-desktop', color: 'text-pink-400', shadow: 'rgba(244,114,182,0.6)', bgText: 'UI/UX' },
        { title: 'DATA SCI', subtitle: 'Analytics & Models', icon: 'fa-chart-pie', color: 'text-emerald-400', shadow: 'rgba(52,211,153,0.6)', bgText: 'A.I.' },
        { title: 'BACKEND', subtitle: 'Server Logic', icon: 'fa-gears', color: 'text-orange-400', shadow: 'rgba(251,146,60,0.6)', bgText: 'LOGIC' },
        { title: 'MOBILE', subtitle: 'iOS & Android', icon: 'fa-mobile-screen', color: 'text-purple-400', shadow: 'rgba(192,132,252,0.6)', bgText: 'APPS' },
        { title: 'DEVOPS', subtitle: 'CI/CD Pipelines', icon: 'fa-infinity', color: 'text-cyan-400', shadow: 'rgba(34,211,238,0.6)', bgText: 'SYNC' },
        { title: 'SECURITY', subtitle: 'Cyber Defense', icon: 'fa-shield-halved', color: 'text-red-400', shadow: 'rgba(248,113,113,0.6)', bgText: 'SEC' }
    ];

    let currentCargoIndex = 0;
    const interval = setInterval(() => {
        const box = document.getElementById('cargo-box');
        const decalEl = document.getElementById('cargo-decal');
        
        if(box && decalEl) {
            box.style.opacity = '0';
            decalEl.style.opacity = '0';
            
            setTimeout(() => {
                currentCargoIndex = (currentCargoIndex + 1) % cargoData.length;
                const data = cargoData[currentCargoIndex];
                
                const iconEl = document.getElementById('cargo-icon');
                if (iconEl) {
                  iconEl.className = `fa-solid ${data.icon} ${data.color} text-3xl filter transition-colors duration-500`;
                  iconEl.style.filter = `drop-shadow(0 0 8px ${data.shadow})`;
                }
                
                const cargoTitle = document.getElementById('cargo-title');
                if (cargoTitle) cargoTitle.innerText = data.title;
                
                const subtitleEl = document.getElementById('cargo-subtitle');
                if (subtitleEl) {
                  subtitleEl.innerText = data.subtitle;
                  subtitleEl.className = `${data.color} text-[10px] font-bold tracking-widest uppercase mt-1 transition-colors duration-500`;
                }
                
                decalEl.innerText = data.bgText;
                
                box.style.opacity = '1';
                decalEl.style.opacity = '0.3'; 
            }, 500); 
        }
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 w-full h-full overflow-hidden select-none bg-gradient-to-b from-[#1a82f7] via-[#6cb0ff] to-[#c4e0ff]"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .balloon-wrapper { position: relative; transform-origin: bottom center; cursor: crosshair; transition: filter 0.2s ease; }
        .balloon-wrapper:hover { filter: brightness(1.15) drop-shadow(0 0 10px rgba(255,255,255,0.4)); }
        .balloon { position: relative; width: 100%; height: 100%; border-radius: 50% 50% 50% 50% / 45% 45% 55% 55%; box-shadow: inset -10px -10px 20px rgba(0,0,0,0.3), inset 10px 10px 20px rgba(255,255,255,0.6), 0 10px 20px rgba(0,0,0,0.15); }
        .balloon::before { content: ""; position: absolute; width: 25%; height: 40%; background: radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; top: 10%; left: 20%; transform: rotate(-40deg); z-index: 5; pointer-events: none; }
        .balloon::after { content: ""; position: absolute; bottom: -8%; left: 50%; transform: translateX(-50%); width: 12%; height: 10%; clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
        .b-sapphire { background: radial-gradient(circle at 30% 30%, #4facfe, #0077ff); } .b-sapphire::after { background: #0055b3; }
        .b-emerald { background: radial-gradient(circle at 30% 30%, #66ff88, #00b33c); } .b-emerald::after { background: #00802b; }
        .b-gold { background: radial-gradient(circle at 30% 30%, #ffe366, #ffaa00); } .b-gold::after { background: #cc8800; }
        .b-amethyst { background: radial-gradient(circle at 30% 30%, #d488ff, #7700ff); } .b-amethyst::after { background: #5500b3; }
        .b-ruby { background: radial-gradient(circle at 30% 30%, #ff6688, #e60039); } .b-ruby::after { background: #b3002d; }
        .string { position: absolute; bottom: -150%; left: 50%; width: 1.5px; height: 150%; background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.15)); transform-origin: top center; z-index: -1; animation: string-swing 2.5s ease-in-out infinite alternate; }
        @keyframes string-swing { 0% { transform: rotate(6deg) scaleY(0.98); } 100% { transform: rotate(-6deg) scaleY(1.05); } }
        .tech-sticker { position: absolute; top: 45%; left: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-shadow: 0px 2px 4px rgba(0,0,0,0.4); z-index: 3; pointer-events: none; }
        .premium-badge { background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(3px); border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 4px 15px rgba(0,0,0,0.15), inset 0 0 10px rgba(255,255,255,0.1); border-radius: 12px; padding: 8px 12px; }
        .skill-hud-backdrop { background: radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%); backdrop-filter: blur(8px); transition: all 0.4s ease; }
        .skill-card { background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(25px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.2); border-top: 1px solid rgba(255, 255, 255, 0.5); border-left: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 40px 80px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,255,255,0.15); transform: scale(0.7) translateY(40px) perspective(1000px) rotateX(20deg); opacity: 0; transition: all 0.6s cubic-bezier(0.2, 1.2, 0.3, 1); }
        .skill-card.active { transform: scale(1) translateY(0) perspective(1000px) rotateX(0deg); opacity: 1; }
        .progress-bar-fill { width: 0%; transition: width 1.5s cubic-bezier(0.2, 0.8, 0.2, 1); }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
        .scanner-line { position: absolute; top: 0; left: 0; right: 0; height: 15px; background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent); animation: scanline 2s linear infinite; opacity: 0.5; pointer-events: none; }
        @keyframes rise { 0% { top: 110vh; } 100% { top: -40vh; } }
        @keyframes sway-1 { 0% { transform: translateX(-30px) rotate(-10deg); } 100% { transform: translateX(30px) rotate(10deg); } }
        @keyframes sway-2 { 0% { transform: translateX(40px) rotate(15deg); } 100% { transform: translateX(-40px) rotate(-15deg); } }
        @keyframes sway-3 { 0% { transform: translateX(-20px) rotate(-5deg); } 100% { transform: translateX(50px) rotate(12deg); } }
        .float-container { position: absolute; animation: rise linear infinite; }
        .sway-container { animation-direction: alternate; animation-iteration-count: infinite; animation-timing-function: ease-in-out; }
        @keyframes drift-clouds { 0% { transform: translateX(-20vw); opacity: 0; } 10% { opacity: 0.8; } 90% { opacity: 0.8; } 100% { transform: translateX(110vw); opacity: 0; } }
        @keyframes drive-path { 0% { offset-distance: 0%; } 100% { offset-distance: 100%; } }
        @keyframes truck-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        @keyframes wheel-spin { 100% { transform: rotate(360deg); } }
        .truck-glass { background: linear-gradient(135deg, rgba(147, 197, 253, 0.6) 0%, rgba(30, 58, 138, 0.4) 100%); backdrop-filter: blur(4px); border-top: 1px solid rgba(255,255,255,0.6); border-right: 1px solid rgba(255,255,255,0.3); }
        .landscape-wrapper { position: absolute; bottom: 0; left: 0; width: 100%; height: 35vh; z-index: 15; pointer-events: none; }
        @keyframes orbit-spin { 100% { transform: rotate(360deg); } }
        @keyframes orbit-counter-spin { 100% { transform: rotate(-360deg); } }
        @keyframes holo-pulse { 0%, 100% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.1), inset 0 0 30px rgba(255, 255, 255, 0.1); } 50% { box-shadow: 0 0 50px rgba(255, 255, 255, 0.2), inset 0 0 40px rgba(255, 255, 255, 0.2); } }
        .holo-centerpiece { position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); width: 420px; height: 420px; z-index: 18; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.15)); backdrop-filter: blur(12px) saturate(150%); border: 1px solid rgba(255, 255, 255, 0.2); border-top: 1px solid rgba(255, 255, 255, 0.5); border-left: 1px solid rgba(255, 255, 255, 0.5); animation: holo-pulse 4s ease-in-out infinite; display: flex; align-items: center; justify-content: center; transition: all 0.5s ease; }
        .holo-centerpiece:hover .orbit-system, .holo-centerpiece:hover .orbit-node { animation-play-state: paused; }
        .holo-centerpiece:hover { backdrop-filter: blur(16px) saturate(180%); transform: translate(-50%, -50%) scale(1.05); box-shadow: 0 15px 35px rgba(0,0,0,0.2), inset 0 0 40px rgba(255,255,255,0.3); }
        .holo-ring-outer { position: absolute; width: 380px; height: 380px; border-radius: 50%; border: 1px dashed rgba(255, 255, 255, 0.3); animation: orbit-spin 35s linear infinite; }
        .holo-ring-inner { position: absolute; width: 300px; height: 300px; border-radius: 50%; border: 2px dotted rgba(255, 255, 255, 0.4); animation: orbit-counter-spin 25s linear infinite; }
        .holo-core-text { text-align: center; font-size: 1.4rem; font-weight: 900; letter-spacing: 5px; line-height: 1.3; z-index: 5; background: linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 15px rgba(255,255,255,0.3); }
        .orbit-system { position: absolute; width: 100%; height: 100%; border-radius: 50%; animation: orbit-spin 30s linear infinite; }
        .orbit-arm { position: absolute; top: 50%; left: 50%; width: 0; height: 0; }
        .orbit-node { position: absolute; top: -210px; left: -24px; width: 48px; height: 48px; animation: orbit-counter-spin 30s linear infinite; }
        .node-content { width: 100%; height: 100%; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(10px); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; position: relative; }
        .node-content:hover { transform: scale(1.5); z-index: 30; background: rgba(15, 23, 42, 0.95); }
        .tech-tooltip { position: absolute; top: -38px; background: rgba(0, 0, 0, 0.9); color: #fff; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 8px; letter-spacing: 1px; opacity: 0; transform: translateY(10px) scale(0.9); transition: all 0.3s ease; pointer-events: none; border: 1px solid rgba(255, 255, 255, 0.2); box-shadow: 0 4px 15px rgba(0,0,0,0.6); white-space: nowrap; }
        .node-content:hover .tech-tooltip { opacity: 1; transform: translateY(0) scale(1); }
        .node-react { border: 1px solid rgba(97, 218, 251, 0.5); box-shadow: inset 0 0 10px rgba(97,218,251,0.2), 0 0 10px rgba(97,218,251,0.2); } .node-react i { color: #61DAFB; filter: drop-shadow(0 0 6px rgba(97,218,251,0.6)); } .node-react:hover { box-shadow: inset 0 0 15px rgba(97,218,251,0.5), 0 0 25px rgba(97,218,251,0.6); }
        .node-nodejs { border: 1px solid rgba(104, 160, 99, 0.5); box-shadow: inset 0 0 10px rgba(104,160,99,0.2), 0 0 10px rgba(104,160,99,0.2); } .node-nodejs i { color: #68A063; filter: drop-shadow(0 0 6px rgba(104,160,99,0.6)); } .node-nodejs:hover { box-shadow: inset 0 0 15px rgba(104,160,99,0.5), 0 0 25px rgba(104,160,99,0.6); }
        .node-python { border: 1px solid rgba(255, 212, 59, 0.5); box-shadow: inset 0 0 10px rgba(255,212,59,0.2), 0 0 10px rgba(255,212,59,0.2); } .node-python i { color: #FFD43B; filter: drop-shadow(0 0 6px rgba(255,212,59,0.6)); } .node-python:hover { box-shadow: inset 0 0 15px rgba(255,212,59,0.5), 0 0 25px rgba(255,212,59,0.6); }
        .node-docker { border: 1px solid rgba(36, 150, 237, 0.5); box-shadow: inset 0 0 10px rgba(36,150,237,0.2), 0 0 10px rgba(36,150,237,0.2); } .node-docker i { color: #2496ED; filter: drop-shadow(0 0 6px rgba(36,150,237,0.6)); } .node-docker:hover { box-shadow: inset 0 0 15px rgba(36,150,237,0.5), 0 0 25px rgba(36,150,237,0.6); }
        .node-aws { border: 1px solid rgba(255, 153, 0, 0.5); box-shadow: inset 0 0 10px rgba(255,153,0,0.2), 0 0 10px rgba(255,153,0,0.2); } .node-aws i { color: #FF9900; filter: drop-shadow(0 0 6px rgba(255,153,0,0.6)); } .node-aws:hover { box-shadow: inset 0 0 15px rgba(255,153,0,0.5), 0 0 25px rgba(255,153,0,0.6); }
        .node-git { border: 1px solid rgba(240, 80, 50, 0.5); box-shadow: inset 0 0 10px rgba(240,80,50,0.2), 0 0 10px rgba(240,80,50,0.2); } .node-git i { color: #F05032; filter: drop-shadow(0 0 6px rgba(240,80,50,0.6)); } .node-git:hover { box-shadow: inset 0 0 15px rgba(240,80,50,0.5), 0 0 25px rgba(240,80,50,0.6); }
        .node-figma { border: 1px solid rgba(242, 78, 30, 0.5); box-shadow: inset 0 0 10px rgba(242,78,30,0.2), 0 0 10px rgba(242,78,30,0.2); } .node-figma i { color: #F24E1E; filter: drop-shadow(0 0 6px rgba(242,78,30,0.6)); } .node-figma:hover { box-shadow: inset 0 0 15px rgba(242,78,30,0.5), 0 0 25px rgba(242,78,30,0.6); }
        .node-html { border: 1px solid rgba(227, 79, 38, 0.5); box-shadow: inset 0 0 10px rgba(227,79,38,0.2), 0 0 10px rgba(227,79,38,0.2); } .node-html i { color: #E34F26; filter: drop-shadow(0 0 6px rgba(227,79,38,0.6)); } .node-html:hover { box-shadow: inset 0 0 15px rgba(227,79,38,0.5), 0 0 25px rgba(227,79,38,0.6); }
        .node-vue { border: 1px solid rgba(65, 184, 131, 0.5); box-shadow: inset 0 0 10px rgba(65,184,131,0.2), 0 0 10px rgba(65,184,131,0.2); } .node-vue i { color: #41B883; filter: drop-shadow(0 0 6px rgba(65,184,131,0.6)); } .node-vue:hover { box-shadow: inset 0 0 15px rgba(65,184,131,0.5), 0 0 25px rgba(65,184,131,0.6); }
        .node-angular { border: 1px solid rgba(221, 0, 49, 0.5); box-shadow: inset 0 0 10px rgba(221,0,49,0.2), 0 0 10px rgba(221,0,49,0.2); } .node-angular i { color: #DD0031; filter: drop-shadow(0 0 6px rgba(221,0,49,0.6)); } .node-angular:hover { box-shadow: inset 0 0 15px rgba(221,0,49,0.5), 0 0 25px rgba(221,0,49,0.6); }
        .node-github { border: 1px solid rgba(255, 255, 255, 0.5); box-shadow: inset 0 0 10px rgba(255,255,255,0.2), 0 0 10px rgba(255,255,255,0.2); } .node-github i { color: #ffffff; filter: drop-shadow(0 0 6px rgba(255,255,255,0.6)); } .node-github:hover { box-shadow: inset 0 0 15px rgba(255,255,255,0.5), 0 0 25px rgba(255,255,255,0.6); }
        .node-linux { border: 1px solid rgba(252, 198, 36, 0.5); box-shadow: inset 0 0 10px rgba(252,198,36,0.2), 0 0 10px rgba(252,198,36,0.2); } .node-linux i { color: #FCC624; filter: drop-shadow(0 0 6px rgba(252,198,36,0.6)); } .node-linux:hover { box-shadow: inset 0 0 15px rgba(252,198,36,0.5), 0 0 25px rgba(252,198,36,0.6); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; } .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
      `}} />

      {/* Return Home Button */}
      <Link href="/#projects" className="fixed top-6 left-6 z-[200] bg-slate-900/50 backdrop-blur-md border border-white/20 shadow-lg rounded-full px-5 py-2.5 flex items-center gap-3 hover:bg-white/10 hover:border-white/50 hover:scale-105 transition-all group">
        <i className="fa-solid fa-arrow-left text-white group-hover:-translate-x-1 transition-transform"></i>
        <span className="text-white font-bold text-xs tracking-widest uppercase">HOME</span>
      </Link>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[1920px] h-[400px] z-[15] pointer-events-none">
          <div className="absolute right-[1920px] bottom-0 w-[3000px] h-[80px]" style={{background: 'linear-gradient(to bottom, #064e3b, #022c22)'}}></div>
          <div className="absolute left-[1920px] bottom-0 w-[3000px] h-[120px]" style={{background: 'linear-gradient(to bottom, #064e3b, #022c22)'}}></div>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 400" preserveAspectRatio="none">
              <defs>
                  <linearGradient id="hillBack" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0f766e"/><stop offset="100%" stopColor="#042f2e"/>
                  </linearGradient>
                  <linearGradient id="hillMid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669"/><stop offset="100%" stopColor="#022c22"/>
                  </linearGradient>
                  <linearGradient id="roadBase" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#064e3b"/><stop offset="100%" stopColor="#022c22"/>
                  </linearGradient>
                  <filter id="neonGlow">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="shadowDepth" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="-10" stdDeviation="15" floodColor="#000" floodOpacity="0.4"/>
                  </filter>
              </defs>

              <path d="M 0,300 L 150,150 L 350,280 L 550,100 L 800,250 L 1100,80 L 1350,200 L 1600,120 L 1920,280 L 1920,400 L 0,400 Z" fill="#1e3a8a" opacity="0.4" />
              <path d="M -100,350 Q 250,180 600,280 T 1300,180 T 2020,300 L 2020,400 L -100,400 Z" fill="url(#hillBack)" filter="url(#shadowDepth)" />

              <g transform="translate(400, 200)"><rect x="-2" y="0" width="4" height="40" fill="#0d9488"/><path d="M 0,-30 L 15,10 L -15,10 Z" fill="#14b8a6" opacity="0.8"/></g>
              <g transform="translate(1350, 160) scale(1.2)"><rect x="-2" y="0" width="4" height="40" fill="#0d9488"/><path d="M 0,-30 L 15,10 L -15,10 Z" fill="#14b8a6" opacity="0.8"/></g>

              <path d="M 0,320 C 300,320 400,120 960,120 C 1500,120 1600,280 1920,280 L 1920,400 L 0,400 Z" fill="url(#roadBase)" filter="url(#shadowDepth)" />
              <path d="M 0,320 C 300,320 400,120 960,120 C 1500,120 1600,280 1920,280" fill="none" stroke="#10b981" strokeWidth="4" filter="url(#neonGlow)" />
              <path d="M 0,320 C 300,320 400,120 960,120 C 1500,120 1600,280 1920,280" fill="none" stroke="#a7f3d0" strokeWidth="1" />
          </svg>

          <div className="absolute left-0 top-0 w-0 h-0 z-20" 
               style={{ offsetPath: "path('M -400,320 L 0,320 C 300,320 400,120 960,120 C 1500,120 1600,280 1920,280 L 2320,280')", offsetRotate: "auto", animation: "drive-path 22s linear infinite" } as any}>
              
              <div className="relative w-[380px] h-[140px]" style={{transform: 'translate(-50%, -100%)', animation: 'truck-bounce 0.6s ease-in-out infinite'}}>
                  
                  <div className="absolute bottom-[-15px] left-[10px] w-[350px] h-[20px] bg-black/60 blur-[8px] rounded-full"></div>
                  
                  <div className="absolute bottom-[20px] left-0 w-[280px] h-[110px] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] rounded-l-xl rounded-tr-sm border-t-[2px] border-l border-blue-400/30 shadow-[inset_-5px_0_20px_rgba(0,0,0,0.8),_5px_5px_15px_rgba(0,0,0,0.4)] flex flex-col justify-center items-center overflow-hidden z-10">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-transparent opacity-50"></div>
                      <div className="absolute bottom-[10px] left-0 w-full h-[4px] bg-blue-500/20"></div>
                      <div className="absolute bottom-[10px] left-0 w-[80%] h-[1px] bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
                      
                      <div id="cargo-decal" className="text-blue-900/30 text-7xl absolute -right-4 -bottom-6 font-black italic tracking-tighter pointer-events-none transition-opacity duration-500">DATA</div>
                      
                      <div id="cargo-box" className="z-10 flex items-center gap-4 bg-black/40 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10 shadow-[0_5px_15px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05)] transition-opacity duration-500">
                          <i id="cargo-icon" className="fa-solid fa-server text-blue-400 text-3xl filter drop-shadow-[0_0_8px_rgba(96,165,250,0.6)] transition-colors duration-500"></i>
                          <div className="flex flex-col">
                              <span id="cargo-title" className="text-white font-black tracking-[0.2em] text-lg leading-none transition-all duration-500">CLOUD</span>
                              <span id="cargo-subtitle" className="text-blue-400 text-[10px] font-bold tracking-widest uppercase mt-1 transition-colors duration-500">Infrastructure</span>
                          </div>
                      </div>
                  </div>

                  <div className="absolute bottom-[20px] left-[275px] w-[90px] h-[85px] bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-tr-[30px] rounded-br-lg shadow-[5px_5px_15px_rgba(0,0,0,0.4)] border-t border-r border-slate-500/50 z-20">
                      <div className="absolute top-[8px] right-[8px] w-[60px] h-[40px] truck-glass rounded-tr-[22px] rounded-bl-md rounded-br-sm shadow-[inset_-2px_2px_5px_rgba(255,255,255,0.2)]">
                          <div className="absolute bottom-0 left-[15px] w-[20px] h-[25px] bg-slate-900/80 rounded-t-lg"></div>
                      </div>
                      <div className="absolute bottom-[10px] right-[-60px] w-[80px] h-[30px] bg-gradient-to-r from-yellow-100/40 to-transparent blur-md rounded-full pointer-events-none transform rotate-[-5deg]"></div>
                      <div className="absolute bottom-[15px] right-0 w-[6px] h-[12px] bg-yellow-100 rounded-l-sm shadow-[0_0_10px_#fef08a,0_0_20px_#fef08a,inset_0_0_5px_white]"></div>
                      <div className="absolute bottom-[8px] right-[10px] w-[15px] h-[22px] flex flex-col justify-between">
                          <div className="w-full h-[4px] bg-black/80 rounded-sm shadow-inner"></div>
                          <div className="w-full h-[4px] bg-black/80 rounded-sm shadow-inner"></div>
                          <div className="w-full h-[4px] bg-black/80 rounded-sm shadow-inner"></div>
                      </div>
                  </div>

                  <div className="absolute bottom-[3px] left-[30px] flex gap-[140px] z-30">
                      <div className="flex gap-2">
                          <div className="w-[34px] h-[34px] bg-[#111] rounded-full border-[5px] border-[#2a2a2a] shadow-[0_8px_15px_rgba(0,0,0,0.8),inset_0_5px_10px_rgba(0,0,0,0.8)] flex items-center justify-center">
                              <div className="w-[14px] h-[14px] bg-slate-300 rounded-full border-[3px] border-slate-500 border-dashed" style={{animation: 'wheel-spin 0.8s linear infinite'}}></div>
                          </div>
                          <div className="w-[34px] h-[34px] bg-[#111] rounded-full border-[5px] border-[#2a2a2a] shadow-[0_8px_15px_rgba(0,0,0,0.8),inset_0_5px_10px_rgba(0,0,0,0.8)] flex items-center justify-center">
                              <div className="w-[14px] h-[14px] bg-slate-300 rounded-full border-[3px] border-slate-500 border-dashed" style={{animation: 'wheel-spin 0.8s linear infinite'}}></div>
                          </div>
                      </div>
                      <div className="w-[34px] h-[34px] bg-[#111] rounded-full border-[5px] border-[#2a2a2a] shadow-[0_8px_15px_rgba(0,0,0,0.8),inset_0_5px_10px_rgba(0,0,0,0.8)] flex items-center justify-center ml-[20px]">
                          <div className="w-[14px] h-[14px] bg-slate-300 rounded-full border-[3px] border-slate-500 border-dashed" style={{animation: 'wheel-spin 0.8s linear infinite'}}></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className="fixed top-[10%] left-0 w-[200px] h-[60px] z-0 pointer-events-none" style={{animation: 'drift-clouds 45s linear infinite'}}>
          <svg viewBox="0 0 200 60" fill="rgba(255,255,255,0.6)" className="drop-shadow-lg">
              <path d="M 50 40 A 20 20 0 0 1 50 0 A 30 30 0 0 1 110 0 A 20 20 0 0 1 150 20 A 20 20 0 0 1 150 60 Z" />
          </svg>
      </div>
      <div className="fixed top-[25%] left-0 w-[250px] h-[80px] z-0 pointer-events-none" style={{animation: 'drift-clouds 60s linear infinite 15s'}}>
          <svg viewBox="0 0 200 60" fill="rgba(255,255,255,0.4)" className="drop-shadow-lg" transform="scale(1.2)">
              <path d="M 50 40 A 20 20 0 0 1 50 0 A 30 30 0 0 1 110 0 A 20 20 0 0 1 150 20 A 20 20 0 0 1 150 60 Z" />
          </svg>
      </div>

      {/* Balloons */}
      <div className="float-container z-10" style={{left: '5%', animationDuration: '18s', animationDelay: '-10s'}}>
          <div className="sway-container" style={{animationName: 'sway-2', animationDuration: '4.5s'}}>
              <div className="balloon-wrapper w-20 h-24 filter blur-[1px] brightness-90">
                  <div className="balloon b-amethyst"><div className="tech-sticker"><i className="fa-brands fa-react text-2xl"></i></div></div><div className="string"></div>
              </div>
          </div>
      </div>
      <div className="float-container z-10" style={{left: '25%', animationDuration: '15s', animationDelay: '-1s'}}>
          <div className="sway-container" style={{animationName: 'sway-1', animationDuration: '5s'}}>
              <div className="balloon-wrapper w-16 h-20 filter blur-[1px] brightness-90">
                  <div className="balloon b-emerald"><div className="tech-sticker"><i className="fa-brands fa-node-js text-xl"></i></div></div><div className="string"></div>
              </div>
          </div>
      </div>
      <div className="float-container z-10" style={{left: '35%', animationDuration: '19s', animationDelay: '-4s'}}>
          <div className="sway-container" style={{animationName: 'sway-3', animationDuration: '4.8s'}}>
              <div className="balloon-wrapper w-14 h-18 filter blur-[2px] brightness-75">
                  <div className="balloon b-gold"><div className="tech-sticker"><i className="fa-brands fa-js text-lg text-black"></i></div></div><div className="string"></div>
              </div>
          </div>
      </div>
      <div className="float-container z-10" style={{left: '45%', animationDuration: '20s', animationDelay: '-12s'}}>
          <div className="sway-container" style={{animationName: 'sway-3', animationDuration: '4s'}}>
              <div className="balloon-wrapper w-24 h-28 filter blur-[1px] brightness-90">
                  <div className="balloon b-sapphire"><div className="tech-sticker"><i className="fa-brands fa-python text-3xl"></i></div></div><div className="string"></div>
              </div>
          </div>
      </div>
      <div className="float-container z-10" style={{left: '85%', animationDuration: '22s', animationDelay: '-15s'}}>
          <div className="sway-container" style={{animationName: 'sway-1', animationDuration: '5.2s'}}>
              <div className="balloon-wrapper w-20 h-24 filter blur-[2px] brightness-75">
                  <div className="balloon b-emerald"><div className="tech-sticker"><i className="fa-brands fa-vuejs text-2xl"></i></div></div><div className="string"></div>
              </div>
          </div>
      </div>
      <div className="float-container z-10" style={{left: '70%', animationDuration: '16s', animationDelay: '-8s'}}>
          <div className="sway-container" style={{animationName: 'sway-2', animationDuration: '5.5s'}}>
              <div className="balloon-wrapper w-18 h-22 filter blur-[1px] brightness-90">
                  <div className="balloon b-ruby"><div className="tech-sticker"><i className="fa-brands fa-java text-2xl"></i></div></div><div className="string"></div>
              </div>
          </div>
      </div>

      <div className="landscape-wrapper">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" className="w-full h-full absolute bottom-0 object-cover">
              <defs>
                  <linearGradient id="hillBackGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6ee7b7"/><stop offset="100%" stopColor="#059669"/>
                  </linearGradient>
                  <linearGradient id="hillMidGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399"/><stop offset="100%" stopColor="#047857"/>
                  </linearGradient>
                  <linearGradient id="hillFrontGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#064e3b"/>
                  </linearGradient>
                  <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#93c5fd"/><stop offset="50%" stopColor="#bfdbfe"/><stop offset="100%" stopColor="#60a5fa"/>
                  </linearGradient>
                  <filter id="hillShadowGrad" x="-5%" y="-5%" width="110%" height="110%">
                      <feDropShadow dx="0" dy="-8" stdDeviation="15" floodColor="#000000" floodOpacity="0.2"/>
                  </filter>
              </defs>

              <path d="M0,150 L100,80 L250,130 L400,60 L550,140 L700,50 L900,120 L1100,40 L1300,110 L1440,70 L1440,320 L0,320 Z" fill="#60a5fa" opacity="0.35"/>
              <path d="M0,180 L150,100 L300,160 L450,90 L600,170 L800,80 L1000,150 L1200,70 L1440,140 L1440,320 L0,320 Z" fill="#3b82f6" opacity="0.25"/>
              <circle cx="350" cy="110" r="60" fill="#fef08a" opacity="0.7" filter="blur(10px)"/>

              <path d="M-100,220 Q200,120 500,240 T1100,180 T1500,260 L1500,320 L-100,320 Z" fill="url(#hillBackGrad)" filter="url(#hillShadowGrad)"/>
              <path d="M480,240 Q600,260 520,290 T800,330 L100,330 Q300,290 350,260 T480,240 Z" fill="url(#riverGrad)"/>
              <path d="M-100,270 Q250,180 700,280 T1500,220 L1500,320 L-100,320 Z" fill="url(#hillMidGrad)" filter="url(#hillShadowGrad)"/>
              <path d="M-100,310 Q300,240 800,340 T1500,280 L1500,350 L-100,350 Z" fill="url(#hillFrontGrad)" filter="url(#hillShadowGrad)"/>
              
              <g transform="translate(180, 200) scale(0.65)"><rect x="-4" y="0" width="8" height="20" fill="#78350f"/><path d="M0,-40 L20,0 L-20,0 Z" fill="#047857"/><path d="M0,-25 L15,5 L-15,5 Z" fill="#065f46"/><path d="M0,-10 L10,10 L-10,10 Z" fill="#064e3b"/></g>
              <g transform="translate(260, 230) scale(0.9)"><rect x="-3" y="0" width="6" height="25" fill="#451a03"/><circle cx="0" cy="-15" r="18" fill="#10b981"/><circle cx="-8" cy="-25" r="12" fill="#059669"/><circle cx="10" cy="-20" r="14" fill="#047857"/></g>
              <g transform="translate(680, 210) scale(0.7)"><rect x="-4" y="0" width="8" height="20" fill="#78350f"/><path d="M0,-40 L20,0 L-20,0 Z" fill="#047857"/><path d="M0,-25 L15,5 L-15,5 Z" fill="#065f46"/></g>
              <g transform="translate(1100, 240) scale(1)"><rect x="-3" y="0" width="6" height="25" fill="#451a03"/><circle cx="0" cy="-15" r="18" fill="#10b981"/><circle cx="-8" cy="-25" r="12" fill="#059669"/><circle cx="10" cy="-20" r="14" fill="#047857"/></g>
          </svg>
      </div>

      <div className="holo-centerpiece">
          <div className="holo-ring-outer"></div>
          <div className="holo-ring-inner"></div>
          
          <div className="holo-core-text">TECH<br/>STACK</div>
          
          <div className="orbit-system">
              <div className="orbit-arm" style={{transform: 'rotate(0deg)'}}><div className="orbit-node"><div className="node-content node-react"><span className="tech-tooltip">REACT</span><i className="fa-brands fa-react"></i></div></div></div>
              <div className="orbit-arm" style={{transform: 'rotate(30deg)'}}><div className="orbit-node"><div className="node-content node-nodejs"><span className="tech-tooltip">NODE.JS</span><i className="fa-brands fa-node-js"></i></div></div></div>
              <div className="orbit-arm" style={{transform: 'rotate(60deg)'}}><div className="orbit-node"><div className="node-content node-python"><span className="tech-tooltip">PYTHON</span><i className="fa-brands fa-python"></i></div></div></div>
              <div className="orbit-arm" style={{transform: 'rotate(90deg)'}}><div className="orbit-node"><div className="node-content node-docker"><span className="tech-tooltip">DOCKER</span><i className="fa-brands fa-docker"></i></div></div></div>
              <div className="orbit-arm" style={{transform: 'rotate(120deg)'}}><div className="orbit-node"><div className="node-content node-aws"><span className="tech-tooltip">AWS</span><i className="fa-brands fa-aws"></i></div></div></div>
              <div className="orbit-arm" style={{transform: 'rotate(150deg)'}}><div className="orbit-node"><div className="node-content node-git"><span className="tech-tooltip">GIT</span><i className="fa-brands fa-git-alt"></i></div></div></div>
              <div className="orbit-arm" style={{transform: 'rotate(180deg)'}}><div className="orbit-node"><div className="node-content node-figma"><span className="tech-tooltip">FIGMA</span><i className="fa-brands fa-figma"></i></div></div></div>
              <div className="orbit-arm" style={{transform: 'rotate(210deg)'}}><div className="orbit-node"><div className="node-content node-html"><span className="tech-tooltip">HTML5</span><i className="fa-brands fa-html5"></i></div></div></div>
              <div className="orbit-arm" style={{transform: 'rotate(240deg)'}}><div className="orbit-node"><div className="node-content node-vue"><span className="tech-tooltip">VUE.JS</span><i className="fa-brands fa-vuejs"></i></div></div></div>
              <div className="orbit-arm" style={{transform: 'rotate(270deg)'}}><div className="orbit-node"><div className="node-content node-angular"><span className="tech-tooltip">ANGULAR</span><i className="fa-brands fa-angular"></i></div></div></div>
              <div className="orbit-arm" style={{transform: 'rotate(300deg)'}}><div className="orbit-node"><div className="node-content node-github"><span className="tech-tooltip">GITHUB</span><i className="fa-brands fa-github"></i></div></div></div>
              <div className="orbit-arm" style={{transform: 'rotate(330deg)'}}><div className="orbit-node"><div className="node-content node-linux"><span className="tech-tooltip">LINUX</span><i className="fa-brands fa-linux"></i></div></div></div>
          </div>
      </div>

      {/* Foreground balloons */}
      <div className="float-container z-20" style={{left: '15%', animationDuration: '12s', animationDelay: '0s'}}>
          <div className="sway-container" style={{animationName: 'sway-3', animationDuration: '3.5s'}}>
              <div className="balloon-wrapper w-32 h-40"><div className="balloon b-ruby shadow-[0_20px_40px_rgba(0,0,0,0.3)]"><div className="tech-sticker premium-badge"><i className="fa-brands fa-aws text-4xl mb-1"></i><span className="text-xs font-black tracking-widest">AWS</span></div></div><div className="string" style={{height: '200%', bottom: '-200%'}}></div></div>
          </div>
      </div>
      <div className="float-container z-20" style={{left: '8%', animationDuration: '10.5s', animationDelay: '-3s'}}>
          <div className="sway-container" style={{animationName: 'sway-1', animationDuration: '4.1s'}}>
              <div className="balloon-wrapper w-24 h-32"><div className="balloon b-sapphire shadow-[0_20px_40px_rgba(0,0,0,0.3)]"><div className="tech-sticker premium-badge border-none bg-black/20"><i className="fa-brands fa-docker text-3xl mb-1"></i><span className="text-[9px] font-black tracking-widest">DOCKER</span></div></div><div className="string" style={{height: '200%', bottom: '-200%'}}></div></div>
          </div>
      </div>
      <div className="float-container z-20" style={{left: '35%', animationDuration: '14s', animationDelay: '-7s'}}>
          <div className="sway-container" style={{animationName: 'sway-1', animationDuration: '4s'}}>
              <div className="balloon-wrapper w-28 h-36"><div className="balloon b-gold shadow-[0_20px_40px_rgba(0,0,0,0.3)]"><div className="tech-sticker premium-badge"><i className="fa-brands fa-js text-4xl text-black mb-1"></i><span className="text-[10px] font-black tracking-widest text-black">J-SCRIPT</span></div></div><div className="string" style={{height: '200%', bottom: '-200%'}}></div></div>
          </div>
      </div>
      <div className="float-container z-20" style={{left: '55%', animationDuration: '11s', animationDelay: '-3s'}}>
          <div className="sway-container" style={{animationName: 'sway-2', animationDuration: '3.8s'}}>
              <div className="balloon-wrapper w-36 h-44"><div className="balloon b-sapphire shadow-[0_20px_40px_rgba(0,0,0,0.3)]"><div className="tech-sticker premium-badge"><i className="fa-brands fa-react text-4xl mb-1"></i><span className="text-xs font-black tracking-widest">REACT</span></div></div><div className="string" style={{height: '200%', bottom: '-200%'}}></div></div>
          </div>
      </div>
      <div className="float-container z-20" style={{left: '80%', animationDuration: '13s', animationDelay: '-9s'}}>
          <div className="sway-container" style={{animationName: 'sway-3', animationDuration: '4.2s'}}>
              <div className="balloon-wrapper w-32 h-40"><div className="balloon b-amethyst shadow-[0_20px_40px_rgba(0,0,0,0.3)]"><div className="tech-sticker premium-badge"><i className="fa-brands fa-vuejs text-4xl mb-1"></i><span className="text-xs font-black tracking-widest">VUE.JS</span></div></div><div className="string" style={{height: '200%', bottom: '-200%'}}></div></div>
          </div>
      </div>

      <div id="skill-hud" className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center opacity-0 transition-opacity duration-300">
          <div className="absolute inset-0 skill-hud-backdrop"></div>
          
          <div id="skill-card" className="skill-card rounded-3xl p-6 sm:p-10 w-[90vw] sm:w-[420px] max-w-full flex flex-col items-center relative overflow-hidden">
              <div className="scanner-line z-50"></div>
              <div id="hud-glow" className="absolute -top-20 -left-20 w-56 h-56 rounded-full blur-[60px] opacity-40 transition-colors duration-500"></div>
              
              <div className="relative z-10 mb-4 bg-black/20 p-6 rounded-2xl border border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                  <i id="hud-icon" className="fa-brands fa-react text-7xl transition-all duration-300"></i>
              </div>
              
              <h2 id="hud-title" className="text-4xl font-black text-white tracking-[0.2em] relative z-10 uppercase mb-1 drop-shadow-md">REACT</h2>
              <p id="hud-role" className="text-sm font-bold text-gray-400 tracking-[0.15em] uppercase mb-8 relative z-10">Frontend Mastery</p>
              
              <div className="w-full relative z-10 bg-black/40 p-5 rounded-2xl border border-white/5">
                  <div className="flex justify-between text-[11px] font-black text-gray-300 mb-3 tracking-widest">
                      <span>SYSTEM SCAN COMPLETE</span>
                  </div>
                  <div className="w-full h-4 bg-black/60 rounded-full overflow-hidden border border-white/10 shadow-[inset_0_3px_6px_rgba(0,0,0,0.6)]">
                      <div id="hud-progress" className="h-full rounded-full progress-bar-fill relative shadow-[0_0_15px_currentColor]">
                          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-r from-transparent to-white/60 blur-[3px]"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <button id="open-matrix-btn" className="fixed bottom-6 left-6 z-[100] bg-blue-900/40 backdrop-blur-md border border-blue-400/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl px-5 py-3 flex items-center gap-3 hover:bg-blue-800/60 hover:scale-105 transition-all group">
          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/50 group-hover:rotate-12 transition-transform duration-300">
              <i className="fa-solid fa-layer-group text-blue-300 text-xl"></i>
          </div>
          <div className="flex flex-col text-left">
              <span className="text-blue-300 font-black text-[10px] tracking-widest uppercase">Overview</span>
              <span className="text-white font-bold text-sm tracking-wide">SKILL MATRIX</span>
          </div>
      </button>

      <div id="skill-matrix-modal" className="fixed inset-0 z-[300] bg-slate-950/80 backdrop-blur-2xl opacity-0 pointer-events-none transition-opacity duration-500 flex items-center justify-center p-2 sm:p-4 md:p-8">
          <div className="w-full max-w-6xl max-h-[90vh] bg-slate-900/50 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-3xl p-4 sm:p-8 flex flex-col relative scale-95 transform transition-transform duration-500" id="matrix-container">
              <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>

              <div className="flex justify-between items-center mb-8 relative z-10 border-b border-white/10 pb-6">
                  <div>
                      <h2 className="text-3xl md:text-4xl font-black text-white tracking-[0.2em] uppercase drop-shadow-lg">Core Competencies</h2>
                      <p className="text-blue-400 tracking-widest text-xs md:text-sm font-bold mt-2 uppercase">Complete Technology Stack Overview</p>
                  </div>
                  <button id="close-matrix-btn" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-500/80 hover:border-red-500 shadow-lg transition-all flex justify-center items-center hover:rotate-90">
                      <i className="fa-solid fa-xmark text-xl"></i>
                  </button>
              </div>
              
              <div id="matrix-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pr-2 custom-scrollbar pb-6 relative z-10">
              </div>
          </div>
      </div>

      <div className="fixed bottom-6 right-6 z-[100] pointer-events-none" style={{animation: 'holo-pulse 3s infinite'}}>
          <div className="bg-red-900/40 backdrop-blur-md border border-red-500/50 shadow-[0_8px_32px_rgba(255,0,0,0.4)] rounded-2xl px-5 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center border border-red-400/50">
                  <i className="fa-solid fa-crosshairs text-red-400 text-xl"></i>
              </div>
              <div className="flex flex-col">
                  <span className="text-red-300 font-black text-[10px] tracking-widest uppercase">Interactive Zone</span>
                  <span className="text-white font-bold text-sm tracking-wide">CLICK BALLOONS TO POP!</span>
              </div>
          </div>
      </div>
    </motion.div>
  );
}
