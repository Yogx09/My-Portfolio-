"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import SmartCursor from "@/components/projects/SmartCursor";
import FilmGrain from "@/components/projects/FilmGrain";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ExpandOnHover from "@/components/ui/expand-cards";

// --- Project Data with 7 Features Each ---
const PROJECTS = [
  {
    id: "agrovise",
    title: "AGROVISE",
    subtitle: "AI / ML Plant Disease Detection",
    description: "A comprehensive solution designed to combat agricultural losses by identifying potato leaf diseases with high precision. Deployed entirely on the edge utilizing Firebase functions, ensuring farmers get instant, reliable inference directly from the field without massive cloud overhead.",
    techStack: ["Python", "TensorFlow", "CNN", "Firebase", "React"],
    bgImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop",
    theme: "emerald",
    animationType: "blur-slide",
    features: [
      "Edge Deployment: Hosted and executed via Firebase.",
      "CNN Architecture: Custom-trained Neural Network.",
      "Real-time Inference: Sub-second leaf analysis.",
      "Data Pre-processing: Automated image normalization.",
      "RESTful API: Endpoints for mobile/web submission.",
      "Scalable NoSQL: Integrated Firestore history.",
      "Responsive UI: Web interface for on-field usage."
    ]
  },
  {
    id: "prosthetic",
    title: "AI PROSTHETIC",
    subtitle: "Hardware & IoT Integration",
    description: "A pioneering project bringing artificial intelligence into physical hardware. By integrating myoelectric sensors with microcontrollers, this prosthetic hand reads muscle impulses and utilizes embedded machine learning to map them to precise servo actuations, creating a seamless human-machine interface.",
    techStack: ["C++", "Arduino", "Embedded ML", "Actuators", "CAD"],
    bgImage: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2000&auto=format&fit=crop",
    theme: "amber",
    animationType: "heavy-drop",
    features: [
      "Embedded ML: Models on microcontrollers.",
      "Sensor Fusion: Myoelectric sensor integration.",
      "Actuator Control: Precision servo mapping.",
      "Low Latency Loop: C++ logic for real-time response.",
      "CAD Prototyping: 3D printed component housing.",
      "Adaptive Grip: Force-feedback algorithms.",
      "Telemetry Dashboard: Live hardware monitoring."
    ]
  },
  {
    id: "arch",
    title: "ARCH LINUX AI",
    subtitle: "Systems & Python Scripting",
    description: "A highly restricted virtual assistant engineered exclusively for Arch Linux. Unlike generic chatbots, this AI is deeply embedded into the operating system, bypassing standard OS constraints through advanced Python scripting to automate kernel-level tasks, system diagnostics, and resource management.",
    techStack: ["Arch Linux", "Python", "Bash", "systemd", "NLP"],
    bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
    theme: "cyan",
    animationType: "glitch-scale",
    features: [
      "Kernel-level Automation: Deep system integration.",
      "Restricted Environment: Bypasses OS constraints.",
      "Advanced Python: Modular architecture for logic.",
      "Terminal Parsing: NLP for complex CLI chains.",
      "Resource Monitoring: Background CPU/RAM tracking.",
      "Secure Vault: Encrypted local storage keys.",
      "Headless Execution: systemd background daemon."
    ]
  },
  {
    id: "ibm",
    title: "AGILE SYSTEMS",
    subtitle: "IBM Full-Stack Web Applications",
    description: "Enterprise-grade web infrastructure developed using strict Agile Scrum methodologies. Culminating in a flagship full-stack project submitted for an IBM internship, this ecosystem features robust Java backends, Python microservices, and secure authentication pipelines designed for massive scale.",
    techStack: ["Java", "Flask", "React", "Tailwind", "Agile"],
    bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
    theme: "purple",
    animationType: "card-fan",
    features: [
      "Agro-Scrum: Strict 2-week sprints and workflows.",
      "Java Backend: Enterprise-grade architecture.",
      "Flask Microservices: Python data processing.",
      "Tailwind CSS: Rapid frontend UI development.",
      "CI/CD Pipelines: Automated testing actions.",
      "Authentication: Secure JWT role management.",
      "IBM Cloud: Native tech stack deployment."
    ]
  },
  {
    id: "hackathons",
    title: "HACKATHONS",
    subtitle: "Rapid Prototyping & Cinematics",
    description: "A showcase of rapid zero-to-one engineering. Featuring the Navonmesh '25 national finalist MVP, hardware safety systems built on ESP32-CAMs for Build for Bharat, and automated Python pipelines that generate cinematic AI documentaries for social media content creation.",
    techStack: ["ESP32-CAM", "Gen-AI", "Python", "Rapid Dev", "Video AI"],
    bgImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop",
    theme: "pink",
    animationType: "elastic-pop",
    features: [
      "48Hr MVP: Rapid zero-to-one prototyping.",
      "ESP32 IoT: Hardware safety systems built on C++.",
      "Gen-AI Video: Automated cinematic workflows.",
      "Script-to-Video: LLM compilation pipelines.",
      "Arduino Interfacing: Custom circuit design.",
      "Pitch Engineering: High-conversion tech decks.",
      "Award Finalist: Navonmesh '25 placement."
    ]
  }
];

const getAnimationVariants = (type: string): Variants => {
  switch(type) {
    case "blur-slide":
      return {
        hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" }
      };
    case "heavy-drop":
      return {
        hidden: { opacity: 0, y: -50, rotateX: 45 },
        visible: { opacity: 1, y: 0, rotateX: 0 }
      };
    case "glitch-scale":
      return {
        hidden: { opacity: 0, scale: 0.8, skewX: -20 },
        visible: { opacity: 1, scale: 1, skewX: 0 }
      };
    case "card-fan":
      return {
        hidden: { opacity: 0, x: -50, rotateZ: -10 },
        visible: { opacity: 1, x: 0, rotateZ: 0 }
      };
    case "elastic-pop":
      return {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 15 } }
      };
    default:
      return {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
      };
  }
};

const ProjectSection = ({ project, index }: { project: typeof PROJECTS[0], index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const featureVariants = getAnimationVariants(project.animationType);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center overflow-hidden border-b border-white/5">
      {/* Immersive Background Image with Parallax */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 w-full h-[140%] -top-[20%] z-0"
      >
        <img src={project.bgImage} alt={project.title} className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
      </motion.div>

      {/* Heavy Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-[#030508]/80 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030508]/80 via-transparent to-[#030508]/80 z-0" />

      <div className="max-w-[1600px] w-full mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 py-32">
        
        {/* Left Side: Title, Subtitle, Description & Tech Stack */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col justify-center lg:col-span-7"
        >
          <div className={`font-mono text-${project.theme}-400 tracking-[0.5em] text-sm uppercase mb-6 flex items-center gap-4`}>
            <span className="text-white/30 text-2xl">0{index + 1}</span>
            <span className="w-12 h-[1px] bg-white/20" />
            {project.subtitle}
          </div>
          
          <h2 className={`text-6xl md:text-8xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 drop-shadow-2xl leading-none mb-8`}>
            {project.title}
          </h2>
          
          <p className="text-lg text-white/60 font-light leading-relaxed max-w-2xl mb-8 font-jakarta">
            {project.description}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-3 mb-10">
            {project.techStack.map((tech, i) => (
              <span key={i} className={`px-4 py-2 bg-${project.theme}-500/10 border border-${project.theme}-500/30 rounded-lg text-${project.theme}-300 font-mono text-xs uppercase tracking-widest`}>
                {tech}
              </span>
            ))}
          </div>

          <div>
            <button className={`px-8 py-4 border border-${project.theme}-500/50 hover:bg-${project.theme}-500/10 text-${project.theme}-400 font-orbitron text-sm tracking-[0.2em] uppercase transition-all duration-300 rounded-full`}>
              Explore Initiative
            </button>
          </div>
        </motion.div>

        {/* Right Side: The 7 Features with INDEPENDENT Animations */}
        <div className="flex flex-col justify-center gap-4 lg:col-span-5">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`text-${project.theme}-500/50 font-orbitron text-sm tracking-[0.3em] mb-4`}
          >
            SYSTEM_SPECS // 07
          </motion.div>
          
          <div className="flex flex-col gap-3">
            {project.features.map((feature, i) => {
              const [boldText, descText] = feature.split(": ");
              return (
                <motion.div 
                  key={i}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-xl hover:bg-${project.theme}-500/10 hover:border-${project.theme}-500/30 transition-all duration-300 group cursor-crosshair shadow-lg`}
                >
                  <CheckCircle2 className={`w-5 h-5 mt-0.5 text-${project.theme}-500/50 group-hover:text-${project.theme}-400 transition-colors shrink-0`} />
                  <p className="font-jakarta text-white/70 group-hover:text-white transition-colors">
                    <strong className="text-white font-semibold">{boldText}:</strong> {descText}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default function ProjectsPage() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#030508] text-white font-jakarta min-h-screen relative selection:bg-white/30 cursor-none">
      <SmartCursor />
      <FilmGrain />

      <Link href="/" className="fixed top-8 left-8 z-[100] group flex items-center gap-3 px-6 py-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-colors">
        <ArrowLeft className="w-5 h-5 text-white/70 group-hover:-translate-x-1 transition-transform" />
        <span className="font-orbitron font-bold text-xs tracking-widest text-white/70">NEXUS</span>
      </Link>

      {/* Hero Intro */}
      <section className="relative w-full h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="font-mono text-white/30 tracking-[1em] text-sm uppercase mb-6">Selected Works</div>
          <h1 className="text-[10vw] md:text-8xl font-cinzel font-black uppercase tracking-tighter text-white">
            ARCHIVES
          </h1>
        </motion.div>
      </section>

      {/* Expandable Project Highlights */}
      <section className="relative w-full py-20 border-b border-white/5 bg-[#020202]">
        <div className="max-w-[1600px] mx-auto px-8 mb-12">
          <h2 className="text-3xl font-orbitron font-bold tracking-widest text-white/80">FEATURED_ARCHIVES</h2>
          <div className="w-20 h-1 bg-amber-500 mt-4 rounded-full"></div>
        </div>
        <ExpandOnHover />
      </section>

      {/* Render all 5 Thematic Projects */}
      {PROJECTS.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}

    </div>
  );
}
