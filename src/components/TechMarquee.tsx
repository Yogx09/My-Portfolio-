"use client";
import Link from "next/link";

const techRow1 = [
  { name: "JAVA", icon: "java/java-original.svg" },
  { name: "REACT", icon: "react/react-original.svg" },
  { name: "NEXT.JS", icon: "nextjs/nextjs-original.svg" },
  { name: "THREE.JS", icon: "threejs/threejs-original.svg" },
  { name: "TYPESCRIPT", icon: "typescript/typescript-original.svg" }, 
  { name: "TAILWIND", icon: "tailwindcss/tailwindcss-original.svg" }, 
  { name: "NODE.JS", icon: "nodejs/nodejs-original.svg" },
];

const techRow2 = [
  { name: "PYTHON", icon: "python/python-original.svg" },
  { name: "HTML5", icon: "html5/html5-original.svg" },
  { name: "CSS3", icon: "css3/css3-original.svg" },
  { name: "POSTGRESQL", icon: "postgresql/postgresql-original.svg" },
  { name: "GRAPHQL", icon: "graphql/graphql-plain.svg" },
  { name: "DOCKER", icon: "docker/docker-original.svg" },
  { name: "AWS", icon: "amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "LINUX", icon: "linux/linux-original.svg" },
];

const getIconUrl = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

export default function TechMarquee() {
  return (
    <section 
      className="relative w-full pt-10 md:pt-12 pb-32 z-30 flex flex-col justify-center perspective-1000 -mb-28"
      style={{
        // This mask creates the "liquid" feathering effect, making the component dissolve into the sections below it
        maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
      }}
    >
      
      {/* Liquid Seamless Background - Matches #121212 at the top and dissolves at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#050508] to-transparent pointer-events-none -z-20"></div>

      {/* 3D Deep Space Tron Grid Background */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-30 -z-10"></div>
      
      {/* Cinematic Lighting Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(49,46,129,0.25)_0%,rgba(0,0,0,0)_80%)] pointer-events-none z-10"></div>
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-80 bg-gradient-to-r from-[#121212] via-[#121212]/60 to-transparent z-30 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-80 bg-gradient-to-l from-[#121212] via-[#121212]/60 to-transparent z-30 pointer-events-none"></div>

      {/* Holographic Projection Label & Link to Interactive Matrix */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3 opacity-95">
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-0.5"></div>
          <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 bg-amber-500 shadow-[0_0_15px_#f59e0b] animate-[ping_1.5s_ease-in-out_infinite]"></div>
              <span className="font-mono text-[9px] md:text-xs tracking-[0.6em] text-amber-500 font-bold uppercase drop-shadow-[0_0_10px_#f59e0b]">Holographic_Tech_Matrix</span>
              <div className="w-1.5 h-1.5 bg-amber-500 shadow-[0_0_15px_#f59e0b] animate-[ping_1.5s_ease-in-out_infinite]" style={{ animationDelay: "0.75s" }}></div>
          </div>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-0.5"></div>
        </div>
        
        <Link href="/skills" className="group relative px-10 py-4 mt-4 bg-indigo-900/60 border-2 border-indigo-400 rounded-full overflow-hidden hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.6)] hover:shadow-[0_0_40px_rgba(45,212,191,0.8)] cursor-pointer z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 to-teal-600/40 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 animate-pulse bg-indigo-500/20"></div>
          <div className="relative flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-teal-300 shadow-[0_0_15px_#2dd4bf] animate-ping"></div>
            <span className="font-mono text-sm md:text-base text-white tracking-[0.3em] font-black group-hover:text-teal-200 transition-colors drop-shadow-md">ENTER INTERACTIVE SKILLS HUB</span>
          </div>
        </Link>
      </div>

      {/* 3D Container to tilt the marquee track */}
      <div className="w-full flex flex-col gap-6 md:gap-8 mt-14 transform-3d rotate-x-12 z-20">
        
        {/* Track 1 (Right to Left - Gold Accent) */}
        <div className="flex w-max animate-marquee-left">
          {[...techRow1, ...techRow1, ...techRow1, ...techRow1].map((tech, i) => (
            <div key={i} className="flex items-center group cursor-default mx-4 md:mx-6 tech-item-3d bg-slate-900/20 border border-indigo-500/20 px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-500 hover:border-amber-500/80 hover:bg-indigo-950/60 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.3)]">
              
              {/* 3D Floating Logo */}
              <div className="relative w-10 h-10 md:w-14 md:h-14 mr-4 md:mr-6 transition-transform duration-500 transform group-hover:scale-125 group-hover:-translate-y-4 group-hover:rotate-12 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_30px_rgba(245,158,11,0.9)]">
                  {/* Subtle white underlay for dark logos (like NextJS or Docker text) */}
                  <div className="absolute inset-1 bg-white rounded-full opacity-5 group-hover:opacity-20 blur-xl"></div>
                  <img src={getIconUrl(tech.icon)} alt={tech.name} className="relative w-full h-full object-contain z-10" />
              </div>

              {/* 3D Text */}
              <span className="font-cinzel font-black text-2xl md:text-4xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-500 opacity-70 group-hover:opacity-100 group-hover:from-amber-200 group-hover:to-amber-600 transition-all duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Track 2 (Left to Right - Plasma Blue/Teal Accent) */}
        <div className="flex w-max animate-marquee-right">
          {[...techRow2, ...techRow2, ...techRow2, ...techRow2].map((tech, i) => (
            <div key={i} className="flex items-center group cursor-default mx-4 md:mx-6 tech-item-3d bg-slate-900/20 border border-teal-500/10 px-6 py-3 rounded-xl backdrop-blur-sm transition-all duration-500 hover:border-teal-400/80 hover:bg-teal-950/40 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(45,212,191,0.3)]">
              
              {/* 3D Floating Logo */}
              <div className="relative w-10 h-10 md:w-14 md:h-14 mr-4 md:mr-6 transition-transform duration-500 transform group-hover:scale-125 group-hover:-translate-y-4 group-hover:-rotate-12 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_30px_rgba(45,212,191,0.9)]">
                  <div className="absolute inset-1 bg-white rounded-full opacity-5 group-hover:opacity-20 blur-xl"></div>
                  <img src={getIconUrl(tech.icon)} alt={tech.name} className="relative w-full h-full object-contain z-10" />
              </div>

              {/* 3D Text */}
              <span className="font-cinzel font-black text-2xl md:text-4xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-slate-200 to-slate-500 opacity-70 group-hover:opacity-100 group-hover:from-teal-200 group-hover:to-teal-500 transition-all duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        /* 3D Perspective Wrappers */
        .perspective-1000 {
          perspective: 1500px;
        }
        .transform-3d {
          transform-style: preserve-3d;
        }
        
        /* Tilts the entire marquee container backwards slightly into space */
        .rotate-x-12 {
          transform: rotateX(15deg) rotateY(-3deg) rotateZ(1deg);
        }

        /* Interactive 3D Card Hover */
        .tech-item-3d {
          transform-style: preserve-3d;
          transform: translateZ(0) translateY(0);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
        }
        .tech-item-3d:hover {
          /* Pop out towards the user, lift up, and tilt towards them */
          transform: translateZ(80px) translateY(-15px) rotateX(10deg);
          z-index: 50;
        }

        /* 3D Tron-like Grid floor moving backwards */
        .grid-bg {
          background-image: 
            linear-gradient(to right, rgba(99, 102, 241, 0.15) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 2px, transparent 2px);
          background-size: 80px 80px;
          transform: perspective(600px) rotateX(60deg) translateY(-50px) translateZ(-200px);
          animation: grid-move 10s linear infinite;
        }
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 80px 80px; }
        }

        /* Endless Scrolling Keyframes */
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 45s linear infinite;
          will-change: transform;
        }
        .animate-marquee-right {
          animation: marquee-right 45s linear infinite;
          will-change: transform;
        }
        
        /* Pause system on hover for interactivity */
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
