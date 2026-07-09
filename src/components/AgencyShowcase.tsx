"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Focus, Atom, Gamepad2, Code2, Globe, Cpu, Terminal, ShieldAlert, Trophy, Film } from "lucide-react";

const SERVICES = [
  { id: "01", title: "Full-Stack\nAI Solutions", desc: "End-to-end AI architectures, from neural network training to high-performance inference APIs.", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop" },
  { id: "02", title: "Deep Learning\n& ML", desc: "Advanced predictive models, computer vision, and robust NLP systems deployed at scale.", img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2000&auto=format&fit=crop" },
  { id: "03", title: "Hardware\nIntegration", desc: "Low-level system programming, IoT integration, and hardware-accelerated processing.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop" },
  { id: "04", title: "Games\n& 3D Engines", desc: "Custom multiplayer servers, physics simulations, and WebGL-based rendering engines.", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop" },
  { id: "05", title: "Cloud\nArchitecture", desc: "Scalable distributed systems, Kubernetes orchestration, and real-time database management.", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" }
];

export default function AgencyShowcase() {
  const [hoveredService, setHoveredService] = useState<string>("04");

  return (
    <div 
      className="w-full text-white font-jakarta"
      style={{ background: "linear-gradient(180deg, #030508 0%, #2f0653 10%, #5a0b91 25%, #5a0b91 100%)" }}
    >
      
      {/* ========================================= */}
      {/* SECTION 1: WHAT WE OFFER (SERVICES)       */}
      {/* ========================================= */}
      <section className="relative w-full min-h-screen pt-24 flex flex-col border-b border-white/20">
        
        {/* Top Header */}
        <div className="max-w-[1600px] w-full mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <h2 className="text-6xl md:text-8xl font-orbitron font-black leading-none uppercase tracking-tighter w-full md:w-1/2">
            What<br/>I Offer
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-md leading-relaxed font-light w-full md:w-1/2">
            My toolkit consists of cutting-edge technologies. I specialize in crafting high-performance 3D solutions, cinematic web experiences, and robust multiplayer game architectures.
          </p>
        </div>

        {/* Horizontal Accordion / Columns */}
        <div className="flex-1 flex flex-col md:flex-row w-full border-t border-white/20 h-[600px]">
          {SERVICES.map((service) => {
            const isActive = hoveredService === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredService(service.id)}
                className={`relative flex flex-col justify-between border-r border-white/20 last:border-r-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer ${
                  isActive ? "flex-[3]" : "flex-1"
                }`}
              >
                {/* Background Image on Hover */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  style={{ backgroundImage: `url(${service.img})` }}
                >
                  <div className="absolute inset-0 bg-[#5a0b91]/30 mix-blend-multiply"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start w-full">
                      <h3 className={`font-orbitron font-bold whitespace-pre-line tracking-wide drop-shadow-md transition-all duration-500 origin-left ${isActive ? 'text-white text-2xl md:text-3xl' : 'text-white/70 text-lg md:text-xl'}`}>
                        {service.title}
                      </h3>
                      
                      {/* Focus Crosshair Icon */}
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          className="text-yellow-400 shrink-0 ml-4 hidden md:block"
                        >
                          <Focus className="w-8 h-8 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                        </motion.div>
                      )}
                    </div>

                    {/* Animated Description and Button */}
                    <div 
                      className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isActive ? "max-h-[300px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"}`}
                    >
                      <p className="font-jakarta text-sm md:text-base text-white/90 leading-relaxed max-w-[300px] mb-8 drop-shadow-lg">
                        {service.desc}
                      </p>
                      
                      <button className="group/btn relative self-start inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-orbitron text-xs font-bold tracking-widest uppercase hover:bg-white/20 hover:border-white/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
                        <span className="relative z-10">Explore</span>
                        <div className="w-4 h-[2px] bg-cyan-400 group-hover/btn:w-8 group-hover/btn:bg-yellow-400 transition-all duration-500"></div>
                      </button>
                    </div>
                  </div>
                  
                  <div className={`font-mono text-xl tracking-widest mt-auto ${isActive ? 'text-white drop-shadow-md' : 'text-white/50'}`}>
                    /{service.id}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================= */}
      {/* SECTION 2: WHAT WE DO (PORTFOLIO)         */}
      {/* ========================================= */}
      <section className="relative w-full min-h-screen border-b border-white/20 flex flex-col md:flex-row">
        
        {/* LEFT SIDE: BENTO GRID OF IMAGES (MOBILE SWIPE GALLERY) */}
        <div className="w-full md:w-1/2 border-r border-white/20 py-8 pl-6 md:p-10 flex flex-col overflow-hidden">
          {/* Mobile indicator */}
          <div className="md:hidden flex items-center justify-between pr-6 mb-4 text-[10px] text-white/50 font-orbitron tracking-widest uppercase">
             <span>Swipe to Explore</span>
             <div className="flex gap-1 animate-pulse">
               <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-white/80"></div>
             </div>
          </div>
          
          <div className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-6 md:pb-0 pr-6 md:pr-0 hide-scrollbar grid-cols-2 grid-rows-3 gap-4 md:gap-6 md:h-full md:min-h-[700px] w-full items-stretch">
             {/* AgroVise (CNN) */}
             <div className="group w-[85vw] md:w-auto h-[400px] md:h-auto shrink-0 snap-center md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-500 relative cursor-pointer border border-white/10 hover:border-emerald-400/50">
               <div className="absolute inset-0 bg-gradient-to-t from-[#5a0b91]/90 to-transparent z-10"></div>
               <img src="https://images.unsplash.com/photo-1530836369250-ef71a3a5a4fda?q=80&w=800&auto=format&fit=crop" alt="AgroVise Plant AI" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute bottom-4 left-4 z-20 flex flex-col">
                 <div className="font-orbitron font-bold text-sm tracking-widest text-emerald-300 drop-shadow-md">AGROVISE</div>
                 <div className="font-jakarta text-[9px] tracking-widest text-white/70 mt-1 uppercase">CNN Plant AI</div>
               </div>
             </div>
             
             {/* ESP32 Safety Systems */}
             <div className="group w-[85vw] md:w-auto h-[400px] md:h-auto shrink-0 snap-center md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-500 bg-[#7010b3] flex flex-col items-center justify-center relative cursor-pointer border border-white/10 hover:border-amber-400/50">
               <ShieldAlert className="w-16 h-16 text-amber-400 mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
               <div className="font-orbitron font-bold text-sm tracking-widest text-amber-400 text-center">ESP32 SAFETY<br/><span className="text-[9px] text-amber-400/70">IOT SYSTEMS</span></div>
             </div>
             
             {/* Arch Linux AI Assistant */}
             <div className="group w-[85vw] md:w-auto h-[400px] md:h-auto shrink-0 snap-center md:col-span-2 md:row-span-1 rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-500 bg-[#0d1117] flex flex-col items-center justify-center p-8 relative cursor-pointer border border-white/10 hover:border-cyan-400/50">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop')] opacity-20 bg-cover bg-center group-hover:opacity-40 transition-opacity duration-500"></div>
               <Terminal className="w-12 h-12 text-cyan-400 mb-3 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:scale-110 transition-transform duration-500" />
               <div className="text-3xl md:text-5xl font-black text-cyan-300 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] group-hover:scale-105 transition-transform duration-500 mb-2 relative z-10 font-orbitron">ARCH AI</div>
               <div className="font-jakarta tracking-[0.4em] text-xs text-white/70 relative z-10">RESTRICTED VIRTUAL ASSISTANT</div>
             </div>
             
             {/* Full-Stack Web (IBM) */}
             <div className="group w-[85vw] md:w-auto h-[400px] md:h-auto shrink-0 snap-center md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-500 bg-[#5a0b91] flex items-end justify-center relative cursor-pointer border border-white/10 hover:border-purple-400/50">
               <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" alt="Full Stack Code" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
               <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                 <Code2 className="w-12 h-12 text-purple-300 mb-2" />
                 <div className="font-orbitron font-bold text-xs tracking-widest text-purple-300 text-center">IBM INTERNSHIP<br/><span className="text-[9px] text-purple-300/70">FULL-STACK AGILE</span></div>
               </div>
             </div>
             
             {/* Hackathons & Cinematic Docs */}
             <div className="group w-[85vw] md:w-auto h-[400px] md:h-auto shrink-0 snap-center md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-500 bg-[#8b14db] flex flex-col items-center justify-center relative cursor-pointer border border-white/10 hover:border-pink-400/50">
               <Film className="w-16 h-16 text-pink-300 mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
               <div className="font-orbitron font-bold text-sm tracking-widest text-pink-300 text-center">CINEMATIC<br/><span className="text-[9px] text-pink-300/70">AI DOCUMENTARIES</span></div>
             </div>
          </div>
        </div>

        {/* RIGHT SIDE: TEXT & LARGE FEATURE */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Top Half: Text */}
          <div className="p-10 md:p-16 border-b border-white/20 h-auto md:h-2/5 flex flex-col justify-center">
            <h2 className="text-6xl md:text-8xl font-orbitron font-black leading-none uppercase tracking-tighter mb-8">
              Selected<br/>Work
            </h2>
            <p className="text-base md:text-lg text-white/80 max-w-md leading-relaxed font-light">
              A curated collection of my most ambitious projects. From CNN-based plant disease detection (AgroVise) and Arch Linux AI assistants, to AI-integrated physical prosthetics and full-stack IBM internship platforms.
            </p>
          </div>

          {/* Bottom Half: Featured Image (AI Prosthetic) */}
          <div className="p-10 md:p-16 h-[500px] md:h-3/5 flex items-center justify-center relative bg-gradient-to-br from-[#7e22ce] to-[#581c87] overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-10 text-cyan-400"
            >
              <Cpu className="w-12 h-12 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
            </motion.div>
            
            <div className="relative w-full max-w-sm aspect-square rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-white/5 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-700 cursor-pointer group">
               <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#5a0b91]/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <img src="https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1000&auto=format&fit=crop" alt="AI Prosthetic Hand" className="absolute inset-0 w-full h-full object-cover rounded-full mix-blend-overlay opacity-50" />
               
               <div className="relative z-20 text-center p-6 mt-8">
                 <div className="font-orbitron font-black text-2xl tracking-widest text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] mb-2">AI PROSTHETIC</div>
                 <div className="font-jakarta text-xs tracking-[0.3em] text-white/80">HARDWARE INTEGRATION</div>
               </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
