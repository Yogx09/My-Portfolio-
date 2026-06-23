import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden font-jakarta">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_50%)] blur-[40px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6">
                <div className="w-16 h-16 border border-amber-500/30 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                </div>
                
                <h1 className="text-5xl md:text-7xl font-cinzel font-black tracking-widest uppercase text-white drop-shadow-lg mb-6">
                    Contact
                </h1>
                
                <p className="max-w-md text-slate-400 leading-relaxed mb-12">
                    This sector of the nexus is currently under construction. 
                    The spatial coordinates have been locked, awaiting content integration.
                </p>

                <Link href="/" className="group flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-indigo-500 hover:bg-zinc-800 rounded-full transition-all duration-300">
                    <ArrowLeft className="w-5 h-5 text-indigo-400 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold tracking-[0.2em] text-xs uppercase">Return to Nexus</span>
                </Link>
            </div>
        </div>
    );
}
