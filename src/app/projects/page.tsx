"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import SmartCursor from "@/components/projects/SmartCursor";
import FilmGrain from "@/components/projects/FilmGrain";
import PillNav from "@/components/projects/PillNav";
import { ArrowLeft, CheckCircle2, ExternalLink, Sparkles, Layers, Cpu, Terminal } from "lucide-react";
import Link from "next/link";
import ExpandOnHover from "@/components/ui/expand-cards";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export interface ProjectData {
  id: string;
  category: "web" | "ai" | "embedded";
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  bgImage: string;
  theme: "amber" | "emerald" | "cyan" | "purple" | "rose" | "indigo" | "blue";
  animationType: "blur-slide" | "heavy-drop" | "glitch-scale" | "card-fan" | "elastic-pop";
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
}

// --- 9 Technical Showcase Projects across Web, AI & Embedded Systems ---
const PROJECTS: ProjectData[] = [
  // 1. Web Applications & Platform Engineering
  {
    id: "stockpulse",
    category: "web",
    categoryLabel: "Web & Platform Systems",
    title: "STOCKPULSE",
    subtitle: "Real-Time Inventory Reservation Platform",
    description: "High-concurrency inventory reservation platform designed with optimistic/pessimistic transactional stock-locking mechanisms to eliminate overbooking during high-traffic spikes. Deployed on Railway with a Redis cache-aside strategy for low-latency stock checks.",
    techStack: ["Next.js", "Prisma ORM", "PostgreSQL", "Supabase", "Redis", "Railway"],
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    theme: "amber",
    animationType: "blur-slide",
    githubUrl: "https://github.com/Yogx09",
    features: [
      "Optimistic Locking: Version-based transaction control for high concurrency.",
      "Pessimistic Locking: Row-level transactional locks preventing race conditions.",
      "Redis Cache-Aside: Sub-millisecond read latency for stock availability.",
      "Multi-Warehouse Sync: Real-time inventory allocation across nodes.",
      "PostgreSQL Persistence: Supabase-backed relational integrity.",
      "Prisma Schema: Fully type-safe migrations and automated query validation.",
      "Railway Deployment: Zero-downtime containerized production infrastructure."
    ]
  },
  {
    id: "university-complaints",
    category: "web",
    categoryLabel: "Web & Platform Systems",
    title: "RESOLVE: GRIEVANCE HUB",
    subtitle: "University Complaints Management System",
    description: "Agile-based ticket tracking system featuring role-based access control, dynamic priority routing, real-time status updates, and administrative management dashboards.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Firebase Auth", "Firestore"],
    bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
    theme: "cyan",
    animationType: "card-fan",
    liveUrl: "https://vitap-resolve-f411c.web.app",
    githubUrl: "https://github.com/Yogx09",
    features: [
      "Live Deployment: Production-ready on Firebase (vitap-resolve-f411c.web.app).",
      "Role-Based Access: Dedicated portals for Students, Staff, and SuperAdmins.",
      "Dynamic Priority Routing: Automated ticket allocation based on urgency.",
      "Real-time Synchronicity: Instant status transitions via Firestore listeners.",
      "SLA Resolution Timers: Automated escalation notifications for open tickets.",
      "Admin Analytics Dashboard: Metric telemetry and audit log tracking.",
      "Responsive UI: Mobile-first responsive interface styled with Tailwind CSS."
    ]
  },
  {
    id: "cmlre-ocean",
    category: "web",
    categoryLabel: "Web & Platform Systems",
    title: "CMLRE OCEAN DATA",
    subtitle: "Oceanographic & Marine Biology Portal",
    description: "Centralized oceanographic and biological dataset visualization interface created for the Centre for Marine Living Resources and Ecology (CMLRE), structuring complex marine surveys into interactive research dashboards.",
    techStack: ["React", "Node.js", "Express", "PostgreSQL", "REST APIs"],
    bgImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop",
    theme: "blue",
    animationType: "glitch-scale",
    githubUrl: "https://github.com/Yogx09",
    features: [
      "Oceanographic Telemetry: Multi-parameter depth, salinity & temperature charts.",
      "Taxon Classification: Comprehensive marine ecological dataset schemas.",
      "Query Optimization: High-performance PostgreSQL relational queries.",
      "Interactive Charting: Spatial and time-series oceanographic visualizers.",
      "Data Ingestion Pipeline: Automated batch parsing for scientific cruise logs.",
      "Faceted Filters: Multi-tier parameters for specimen discovery.",
      "RESTful API Backend: Modular Express architecture handling dense payloads."
    ]
  },
  {
    id: "designforge",
    category: "web",
    categoryLabel: "Web & Platform Systems",
    title: "DESIGNFORGE STUDIO",
    subtitle: "Adaptive Ad Layout Engine & Canvas LLD",
    description: "High-performance design engines utilizing Low-Level Design (LLD) principles, Factory/Strategy design patterns for canvas item creation, dynamic layout optimization algorithms, and efficient state management.",
    techStack: ["React", "Three.js", "WebGL", "Canvas API", "Tailwind CSS"],
    bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    theme: "purple",
    animationType: "heavy-drop",
    githubUrl: "https://github.com/Yogx09",
    features: [
      "Low-Level Design (LLD): Factory & Strategy patterns for element instances.",
      "WebGL Acceleration: Three.js hardware acceleration for graphic rendering.",
      "Canvas Geometry Engine: Dynamic responsive layout reflow algorithms.",
      "Dirty-Rectangle Optimization: Selective re-renders ensuring steady 60 FPS.",
      "Dynamic Aspect Ratios: Auto-scaling multi-format marketing canvas exports.",
      "Undo/Redo State Machine: Immutable history stack for complex asset editing.",
      "High-Res Export Pipeline: Real-time rendering to vector & raster outputs."
    ]
  },

  // 2. Deep Learning, AI & Voice Orchestration
  {
    id: "oreo",
    category: "ai",
    categoryLabel: "Deep Learning & AI",
    title: "OREO: OFFLINE AI",
    subtitle: "Local Voice Assistant & LLM Orchestrator",
    description: "Privacy-focused local voice agent executing local tool calls, system-level automation, and contextual RAG querying completely offline without external cloud dependencies.",
    techStack: ["Python", "Ollama LLM", "Whisper STT", "ChromaDB", "Function Calling"],
    bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
    theme: "amber",
    animationType: "elastic-pop",
    githubUrl: "https://github.com/Yogx09",
    features: [
      "100% Offline Inference: Complete data sovereignty with zero external egress.",
      "Local LLM Orchestration: Powered by Ollama running quantised open-source models.",
      "Local Vector DB: ChromaDB RAG pipeline indexing local docs and scripts.",
      "JSON Function Calling: Direct execution of shell scripts and system hooks.",
      "Local Whisper STT: Fast on-device acoustic-to-text token transcription.",
      "System Telemetry: Autonomous hardware diagnostics and process managers.",
      "Natural Speech Synthesis: Ultra-low latency voice responses via local TTS."
    ]
  },
  {
    id: "drowsiness",
    category: "ai",
    categoryLabel: "Deep Learning & AI",
    title: "DRIVER GUARDIAN",
    subtitle: "Real-Time Drowsiness & Fatigue Detection",
    description: "Computer vision safety system monitoring facial landmarks in real time to calculate the Eye Aspect Ratio (EAR) and issue automated alerts for driver fatigue.",
    techStack: ["Python", "OpenCV", "Dlib", "SciPy", "Computer Vision"],
    bgImage: "https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=2000&auto=format&fit=crop",
    theme: "rose",
    animationType: "blur-slide",
    githubUrl: "https://github.com/Yogx09",
    features: [
      "68-Point Facial Landmarks: Accurate real-time geometric landmark tracking.",
      "Eye Aspect Ratio (EAR): Precise continuous eyelid closure calculation.",
      "Rolling Window Smoothing: SciPy temporal filters filtering out natural blinks.",
      "Multi-Tiered Warning: Instant acoustic and visual alert triggers upon drowsiness.",
      "Edge Optimized: 30+ FPS real-time processing on standard webcam input.",
      "Head Pose Geometry: Estimation of pitch and yaw for driver distraction.",
      "Incident Logging: Local event recording for driver safety analytics."
    ]
  },
  {
    id: "agrovise",
    category: "ai",
    categoryLabel: "Deep Learning & AI",
    title: "AGROVISE",
    subtitle: "Plant Pathology & Disease Detection CNN",
    description: "A comprehensive deep learning solution designed to combat agricultural losses by identifying plant diseases with high precision and auto-generating actionable treatment protocols.",
    techStack: ["Python", "TensorFlow", "Keras", "CNN", "Firebase"],
    bgImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop",
    theme: "emerald",
    animationType: "heavy-drop",
    githubUrl: "https://github.com/Yogx09",
    features: [
      "Deep CNN Architecture: Multi-class convolutional neural network for foliar strains.",
      "Data Augmentation Pipeline: Automated contrast, rotation, and lighting balancing.",
      "Sub-Second Inference: High-speed edge classification for field mobile devices.",
      "Treatment Prescriptions: Direct mapping to organic and chemical remedial advice.",
      "Cloud Diagnostic History: Firebase synchronisation for localized disease records.",
      "RESTful API Ingestion: Endpoints supporting batch image uploads.",
      "High Validation Metrics: Rigorously benchmarked across varied crop diseases."
    ]
  },
  {
    id: "braintumor",
    category: "ai",
    categoryLabel: "Deep Learning & AI",
    title: "NEUROSCAN AI",
    subtitle: "Brain Tumor MRI Classification Suite",
    description: "Deep learning medical vision model for multi-class tumor anomaly detection and diagnostic aid from brain MRI scans utilizing fine-tuned ResNet-V2 residual networks.",
    techStack: ["PyTorch", "ResNet-V2", "Scikit-Learn", "Torchvision"],
    bgImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2000&auto=format&fit=crop",
    theme: "indigo",
    animationType: "card-fan",
    githubUrl: "https://github.com/Yogx09",
    features: [
      "ResNet-V2 Backbone: Deep residual feature extraction fine-tuned on MRI scans.",
      "Multi-Class Diagnosis: Categorization of Glioma, Meningioma, Pituitary & Healthy scans.",
      "Focal Loss Integration: Overcomes medical dataset class imbalances effectively.",
      "Diagnostic Heatmaps: Probability distribution curves for clinician review.",
      "ROC/AUC Benchmarks: Validated for high sensitivity and high specificity.",
      "Automated Pre-Processing: Intensity normalization and skull-stripping pipeline.",
      "Torchvision Pipeline: High-throughput GPU inference and batch testing."
    ]
  },

  // 3. Embedded Systems & Hardware Engineering
  {
    id: "prosthetic",
    category: "embedded",
    categoryLabel: "Embedded Systems & Hardware",
    title: "BIONIC PROSTHETIC",
    subtitle: "Bio-Integrated Myoelectric Hand Firmware",
    description: "Hardware firmware engineered for real-time bio-potential signal filtering, low-latency threshold analysis, and multi-axis motor actuation for assistive prosthetics.",
    techStack: ["Embedded C/C++", "ESP32", "Arduino", "EMG Bio-Sensors", "PWM Actuators"],
    bgImage: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2000&auto=format&fit=crop",
    theme: "amber",
    animationType: "glitch-scale",
    githubUrl: "https://github.com/Yogx09",
    features: [
      "Biopotential Filtering: Real-time analog bandpass + 50Hz notch filters.",
      "Sub-20ms Latency: Low-level C++ interrupt-driven processing loop.",
      "Multi-Axis Actuation: Coordinated PWM servo control for varied grip presets.",
      "Adaptive Contraction Thresholds: Dynamic calibration tailored to muscle strength.",
      "Hardware Safety Guardrails: Watchdog timers and overdraw current protection.",
      "Low-Power Standby: Microcontroller power management for prolonged battery life.",
      "Live Telemetry Stream: Real-time serial graph output for diagnostic tuning."
    ]
  }
];

const getAnimationVariants = (type: string): Variants => {
  switch(type) {
    case "blur-slide":
      return {
        hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" }
      };
    case "heavy-drop":
      return {
        hidden: { opacity: 0, y: -40, rotateX: 30 },
        visible: { opacity: 1, y: 0, rotateX: 0 }
      };
    case "glitch-scale":
      return {
        hidden: { opacity: 0, scale: 0.85, skewX: -10 },
        visible: { opacity: 1, scale: 1, skewX: 0 }
      };
    case "card-fan":
      return {
        hidden: { opacity: 0, x: -40, rotateZ: -5 },
        visible: { opacity: 1, x: 0, rotateZ: 0 }
      };
    case "elastic-pop":
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 280, damping: 18 } }
      };
    default:
      return {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 }
      };
  }
};

const ProjectSection = ({ project, index }: { project: ProjectData; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const featureVariants = getAnimationVariants(project.animationType);

  const themeColors: Record<string, { badge: string; border: string; text: string; buttonHover: string; glow: string }> = {
    amber: { badge: "bg-amber-500/10 text-amber-300 border-amber-500/30", border: "hover:border-amber-400/40", text: "text-amber-400", buttonHover: "hover:bg-amber-500 hover:text-black", glow: "from-amber-500/20" },
    emerald: { badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30", border: "hover:border-emerald-400/40", text: "text-emerald-400", buttonHover: "hover:bg-emerald-500 hover:text-black", glow: "from-emerald-500/20" },
    cyan: { badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30", border: "hover:border-cyan-400/40", text: "text-cyan-400", buttonHover: "hover:bg-cyan-500 hover:text-black", glow: "from-cyan-500/20" },
    purple: { badge: "bg-purple-500/10 text-purple-300 border-purple-500/30", border: "hover:border-purple-400/40", text: "text-purple-400", buttonHover: "hover:bg-purple-500 hover:text-black", glow: "from-purple-500/20" },
    rose: { badge: "bg-rose-500/10 text-rose-300 border-rose-500/30", border: "hover:border-rose-400/40", text: "text-rose-400", buttonHover: "hover:bg-rose-500 hover:text-black", glow: "from-rose-500/20" },
    indigo: { badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30", border: "hover:border-indigo-400/40", text: "text-indigo-400", buttonHover: "hover:bg-indigo-500 hover:text-black", glow: "from-indigo-500/20" },
    blue: { badge: "bg-blue-500/10 text-blue-300 border-blue-500/30", border: "hover:border-blue-400/40", text: "text-blue-400", buttonHover: "hover:bg-blue-500 hover:text-black", glow: "from-blue-500/20" },
  };

  const themeStyle = themeColors[project.theme] || themeColors.amber;

  return (
    <section 
      id={project.id} 
      ref={containerRef} 
      className="relative w-full min-h-screen flex items-center overflow-hidden border-b border-white/5 py-24 md:py-32"
    >
      {/* Immersive Background Image with Parallax */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 w-full h-[130%] -top-[15%] z-0 pointer-events-none"
      >
        <img 
          src={project.bgImage} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity filter blur-[1px]" 
        />
      </motion.div>

      {/* Heavy Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030508] via-[#030508]/95 to-[#030508]/85 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030508] via-transparent to-[#030508] z-0" />

      <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 md:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Category, Title, Subtitle, Description & Tech Stack */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col justify-center lg:col-span-7"
        >
          {/* Category Tag & Index */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-white/40 font-mono text-sm">0{index + 1}</span>
            <span className="w-8 h-[1px] bg-white/20" />
            <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest border ${themeStyle.badge}`}>
              {project.categoryLabel}
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40 drop-shadow-2xl leading-none mb-4 uppercase">
            {project.title}
          </h2>

          <div className={`font-orbitron font-semibold tracking-wider text-sm sm:text-base ${themeStyle.text} mb-6`}>
            {project.subtitle}
          </div>
          
          <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-2xl mb-8 font-jakarta">
            {project.description}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8">
            {project.techStack.map((tech, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-lg text-stone-300 font-mono text-xs uppercase tracking-wider hover:border-white/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md ${themeStyle.text} font-orbitron text-xs tracking-widest uppercase hover:bg-white/15 transition-all duration-300 group`}
              >
                <span>Live Project</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}

            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] text-stone-300 font-orbitron text-xs tracking-widest uppercase hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Right Side: The 7 Features with INDEPENDENT Animations */}
        <div className="flex flex-col justify-center gap-3 lg:col-span-5">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`font-orbitron text-xs tracking-[0.3em] uppercase mb-2 ${themeStyle.text}`}
          >
            ARCHITECTURE_SPECS // 07
          </motion.div>
          
          <div className="flex flex-col gap-2.5">
            {project.features.map((feature, i) => {
              const parts = feature.split(": ");
              const boldText = parts[0];
              const descText = parts.slice(1).join(": ");
              
              return (
                <motion.div 
                  key={i}
                  variants={featureVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-md hover:bg-white/[0.06] ${themeStyle.border} transition-all duration-300 group cursor-default shadow-md`}
                >
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 ${themeStyle.text} opacity-70 group-hover:opacity-100 transition-opacity shrink-0`} />
                  <p className="font-jakarta text-xs sm:text-sm text-stone-300/85 group-hover:text-stone-100 transition-colors leading-relaxed">
                    <strong className="text-white font-medium">{boldText}:</strong> {descText}
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
  const [selectedFilter, setSelectedFilter] = useState<"all" | "web" | "ai" | "embedded">("all");

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return () => lenis.destroy();
  }, []);

  const filteredProjects = selectedFilter === "all"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedFilter);

  return (
    <div className="bg-[#030508] text-white font-jakarta min-h-screen relative selection:bg-amber-500/30 selection:text-white cursor-none">
      <SmartCursor />
      <FilmGrain />
      <PillNav />

      {/* Top Floating Back Button */}
      <Link 
        href="/#dashboard" 
        className="fixed top-6 left-6 z-[100] group flex items-center gap-3 px-5 py-2.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 transition-colors shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 text-white/70 group-hover:-translate-x-1 transition-transform" />
        <span className="font-orbitron font-bold text-[11px] tracking-widest text-white/80">HOME</span>
      </Link>

      {/* Hero Intro */}
      <section id="hero" className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5 px-6 pt-24 pb-16">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 font-orbitron text-xs tracking-widest uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            ENGINEERING REPOSITORY // SINDE YOGESH
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-cinzel font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30 drop-shadow-2xl mb-6">
            PROJECTS
          </h1>

          <p className="text-stone-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Full-Stack Web Architectures, Privacy-First Offline AI Voice Engines, Computer Vision Telemetry, and Embedded Myoelectric Firmware.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {[
              { id: "all", label: "All Projects (9)", icon: Sparkles },
              { id: "web", label: "Web & Platforms (4)", icon: Layers },
              { id: "ai", label: "Deep Learning & AI (4)", icon: Cpu },
              { id: "embedded", label: "Embedded Systems (1)", icon: Terminal },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedFilter(id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-orbitron tracking-wider uppercase transition-all duration-300 ${
                  selectedFilter === id
                    ? "bg-amber-400 text-black font-bold shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                    : "bg-white/[0.03] border border-white/10 text-stone-400 hover:text-white hover:border-white/25"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Expandable Project Visual Highlight */}
      <section className="relative w-full py-16 border-b border-white/5 bg-[#020202]">
        <div className="max-w-[1600px] mx-auto px-8 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-orbitron font-bold tracking-widest text-white/90">PROJECT_GALLERY</h2>
            <div className="w-16 h-1 bg-amber-500 mt-2 rounded-full"></div>
          </div>
          <span className="text-xs font-mono text-stone-500 tracking-widest uppercase hidden sm:block">Hover to inspect</span>
        </div>
        <ExpandOnHover />
      </section>

      {/* Render Filtered Projects */}
      {filteredProjects.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}

      {/* Bottom CTA / Footer Section */}
      <section className="relative w-full py-24 text-center border-t border-white/10 bg-[#020202] px-6">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-cinzel font-bold text-white mb-4">
            Interested in Collaborative Engineering?
          </h3>
          <p className="text-stone-400 text-sm mb-8 font-light">
            Available for high-concurrency full-stack platforms, computer vision deployments, and deep tech prototypes.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link 
              href="/contact" 
              className="px-8 py-3.5 rounded-full bg-amber-500 text-black font-orbitron font-bold text-xs tracking-widest uppercase hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all"
            >
              Initiate Contact
            </Link>
            <a 
              href="https://github.com/Yogx09" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 text-white font-orbitron font-bold text-xs tracking-widest uppercase hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub Profile
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
