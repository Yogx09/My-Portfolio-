'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MousePointerClick } from 'lucide-react';

export default function NavigationParallax() {
    const router = useRouter();
    const [selectedCard, setSelectedCard] = useState<Record<string, string> | null>(null);

    const images = [
        {
            src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Abstract tech tunnel',
            title: 'Home',
            link: '/', // Navigate back to top or just close
        },
        {
            src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Liquid abstract shapes',
            title: 'About Me',
            link: '/about',
        },
        {
            src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Abstract geometric pattern',
            title: 'Skills',
            link: '/skills',
        },
        {
            src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Circuit board glow',
            title: 'Projects',
            link: '/projects',
        },
        {
            src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Holographic gradients',
            title: 'Experience',
            link: '/experience',
        },
        {
            src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Dark cyber aesthetic',
            title: 'Contact',
            link: '/contact',
        },
        {
            src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
            alt: 'Earth from space',
            title: 'System',
            link: '/system',
        },
    ];

    const handleCardClick = (item: Record<string, string>) => {
        setSelectedCard(item);
    };

    return (
        <section className="relative w-full py-32 bg-[#0a0a0a] overflow-hidden flex flex-col items-center border-y border-zinc-900/50">
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className={cn(
                    'absolute top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full',
                    'bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_50%)]',
                    'blur-[30px]',
                )} />
            </div>

            {/* Header */}
            <div className="relative z-10 w-full pb-16 flex flex-col items-center text-center">
                <h2 className="text-3xl md:text-5xl font-cinzel font-black tracking-[0.3em] text-white uppercase drop-shadow-md mb-4 flex items-center gap-4">
                    <span>Navigate</span> <span className="text-amber-500">The Nexus</span>
                </h2>
                <p className="font-jakarta text-slate-400 text-sm md:text-base tracking-widest uppercase flex items-center justify-center gap-2">
                    Click to initialize sequence <MousePointerClick className="w-4 h-4 text-indigo-400" />
                </p>
                <p className="font-jakarta text-indigo-900/60 text-xs md:text-sm tracking-widest uppercase mt-4">
                    Or continue scrolling to access Main Dashboard
                </p>
            </div>

            {/* Interactive 3D Card Grid */}
            <div className="relative z-10 flex flex-wrap justify-center gap-6 md:gap-10 max-w-[1400px] mx-auto px-4 sm:px-6" style={{ perspective: "1200px" }}>
                {images.map((item, idx) => (
                    <motion.div
                        key={idx}
                        className="relative w-full max-w-[280px] sm:w-[280px] h-[160px] sm:h-[180px] cursor-pointer rounded-xl overflow-hidden border border-zinc-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                        initial={{ rotateX: 20, y: 20, opacity: 0 }}
                        whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                        whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, zIndex: 50, borderColor: "rgba(99,102,241,0.5)" }}
                        onClick={() => handleCardClick(item)}
                    >
                        <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/50 hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                            <h3 className="text-white font-cinzel font-bold text-xl uppercase tracking-[0.2em] drop-shadow-lg text-center">
                                {item.title}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Cinematic Expansion Overlay */}
            <AnimatePresence>
                {selectedCard && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]/90 backdrop-blur-md pointer-events-auto"
                        style={{ perspective: "1200px" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* 3D Card morphing to Full Screen */}
                        <motion.div
                            initial={{
                                rotateX: 45,
                                y: 80,
                                width: "85vw",
                                maxWidth: "900px",
                                height: "50vh",
                                borderRadius: "32px",
                                borderWidth: "8px",
                                borderColor: "#444",
                                boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.5), 0 30px 60px -30px rgba(0, 0, 0, 0.3), 0 -10px 40px rgba(0,0,0,0.1)",
                            }}
                            animate={{
                                rotateX: 0,
                                y: 0,
                                width: "100vw",
                                maxWidth: "100vw",
                                height: "100vh",
                                borderRadius: "0px",
                                borderWidth: "0px",
                                borderColor: "transparent",
                                boxShadow: "0 0px 0px 0px rgba(0, 0, 0, 0)",
                            }}
                            transition={{
                                duration: 1.4,
                                ease: [0.25, 1, 0.5, 1], // Cinematic ease
                            }}
                            onAnimationComplete={() => {
                                // Animation completes, wait for user to click enter
                            }}
                            className="bg-zinc-900 overflow-hidden flex items-center justify-center relative"
                        >
                            <motion.img
                                initial={{ scale: 1.3 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                                src={selectedCard.src}
                                alt={selectedCard.alt}
                                className="w-full h-full object-cover object-center"
                            />
                            
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4, duration: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/40"
                            >
                                <h1 className="text-5xl md:text-[6rem] text-white font-cinzel font-black tracking-[0.3em] uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] text-center">
                                    {selectedCard.title}
                                </h1>
                                <motion.button
                                    onClick={() => {
                                        if (selectedCard.link === '/') {
                                            setSelectedCard(null);
                                        } else {
                                            router.push(selectedCard.link);
                                        }
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.5, duration: 0.5 }}
                                    className="mt-12 px-10 py-4 border border-indigo-500/50 hover:bg-indigo-500/20 text-white tracking-[0.4em] font-orbitron font-bold uppercase text-xs md:text-sm rounded-full backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                                >
                                    ENTER SYSTEM
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
