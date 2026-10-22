"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Copy, Check, ExternalLink, Send, Sparkles } from "lucide-react";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sindeyogesh09@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col justify-between relative overflow-hidden font-jakarta selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background ambient light */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.12),transparent_60%)] blur-[50px]" />
        <div className="absolute bottom-10 left-1/3 h-[50vmin] w-[50vmin] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_60%)] blur-[60px]" />
      </div>

      {/* Top Navbar Header */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-6 pt-8 flex items-center justify-between">
        <Link 
          href="/#dashboard" 
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:border-amber-400/40 hover:bg-white/[0.08] transition-all text-xs font-mono uppercase tracking-widest text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>Return Home</span>
        </Link>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Transceiver Active</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Direct Outreach & Identity */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMUNICATION SECTOR // 07</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-cinzel font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 leading-tight">
            Initiate Contact
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Have a project, role, or concept you want to build together? Reach out directly via encrypted frequency or dispatch a transmission below.
          </p>

          {/* Direct Email Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-3 shadow-lg">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              Direct Primary Frequency
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <a 
                href="mailto:sindeyogesh09@gmail.com" 
                className="font-mono text-sm sm:text-base font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>sindeyogesh09@gmail.com</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-300" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Coordinates */}
          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <a
              href="https://github.com/Yogx09"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 text-stone-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-all hover:scale-105 shadow-md"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <a
              href="https://www.linkedin.com/in/yogesh-patil09/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 text-stone-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-all hover:scale-105 shadow-md"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Right Column: Transmission Dispatch Box */}
        <div className="lg:col-span-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl relative">
            <div className="font-orbitron font-bold text-xs tracking-widest text-amber-400 uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Quick Transmission Portal</span>
            </div>

            {sent ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-orbitron font-bold text-lg text-white">Transmission Recorded</h3>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed font-light">
                  Thank you! Your transmission coordinates have been routed. You can also reach out directly via sindeyogesh09@gmail.com.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-bold tracking-wider"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                    Your Name / Identity
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-amber-400/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                    Return Frequency (Email)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-amber-400/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">
                    Message Payload
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your vision, project, or inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-amber-400/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-orbitron font-bold text-xs tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Payload</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer Strip */}
      <footer className="relative z-10 w-full text-center py-6 border-t border-white/5 text-[11px] font-mono text-slate-500">
        YOGX STUDIO NEXUS • COORDINATES LOCKED • ALL RIGHTS RESERVED
      </footer>
    </div>
  );
}
