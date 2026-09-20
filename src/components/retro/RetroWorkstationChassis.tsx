"use client";

import React, { useState } from "react";
import RetroTerminalOS, { NavTab } from "./RetroTerminalOS";
import { retroAudio } from "./RetroAudio";
import { Power } from "lucide-react";

interface RetroWorkstationChassisProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onNavigateSection?: (sectionId?: string) => void;
  onTriggerToast?: (msg: string) => void;
}

export default function RetroWorkstationChassis({
  activeTab,
  onSelectTab,
  onNavigateSection,
  onTriggerToast,
}: RetroWorkstationChassisProps) {
  const [isPoweredOn, setIsPoweredOn] = useState(true);
  const [colorTheme, setColorTheme] = useState<"cyan" | "green" | "amber">("cyan");
  const [brightnessLevel, setBrightnessLevel] = useState(1); // 0.7 to 1.3
  const [contrastLevel, setContrastLevel] = useState(1); // 0.8 to 1.4
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [typedBuffer, setTypedBuffer] = useState("");

  const handlePowerToggle = () => {
    if (isPoweredOn) {
      retroAudio.playBeep(350, 0.12, "sawtooth");
      setIsPoweredOn(false);
      onTriggerToast?.("⚡ CRT Workstation Monitor Powered OFF");
    } else {
      retroAudio.playDegauss();
      setIsPoweredOn(true);
      onTriggerToast?.("⚡ CRT Monitor Degauss & Power ON");
    }
  };

  const handleBrightnessDial = () => {
    retroAudio.playBeep(750, 0.04);
    setBrightnessLevel((prev) => {
      const next = prev >= 1.25 ? 0.8 : +(prev + 0.15).toFixed(2);
      onTriggerToast?.(`CRT Brightness: ${Math.round(next * 100)}%`);
      return next;
    });
  };

  const handleContrastDial = () => {
    retroAudio.playBeep(850, 0.04);
    setColorTheme((prev) => {
      const themes: ("cyan" | "green" | "amber")[] = ["cyan", "green", "amber"];
      const nextTheme = themes[(themes.indexOf(prev) + 1) % themes.length];
      onTriggerToast?.(`Phosphor Tone: ${nextTheme.toUpperCase()}`);
      return nextTheme;
    });
  };

  const handleKeyPress = (keyLabel: string, action?: () => void) => {
    retroAudio.playKeyClick();
    setPressedKey(keyLabel);
    setTimeout(() => setPressedKey(null), 120);

    if (action) {
      action();
      return;
    }

    // Number keys shortcut to tabs
    if (keyLabel === "1") onSelectTab("home");
    else if (keyLabel === "2") onSelectTab("projects");
    else if (keyLabel === "3") onSelectTab("about");
    else if (keyLabel === "4") onSelectTab("skills");
    else if (keyLabel === "5") onSelectTab("experience");
    else if (keyLabel === "6") onSelectTab("blog");
    else if (keyLabel === "7") onSelectTab("contact");
    else if (keyLabel === "ESC") {
      onSelectTab("home");
      onTriggerToast?.("Keyboard ESC -> Returning HOME");
    } else if (keyLabel === "PWR") {
      handlePowerToggle();
    } else {
      setTypedBuffer((prev) => (prev + keyLabel).slice(-12));
    }
  };

  return (
    <div className="relative w-full max-w-[660px] mx-auto flex flex-col items-center select-none font-mono">
      {/* 3D WORKSTATION WRAPPER WITH REAR EXPANSION BLOCK */}
      <div className="relative w-full">
        {/* REAR EXPANSION TOWER PROFILE (Right-side 3D Depth Block from Reference Photo) */}
        <div className="hidden sm:block absolute -top-4 -right-5 w-24 h-48 bg-gradient-to-b from-[#2a2c32] via-[#212328] to-[#16171a] rounded-t-xl rounded-r-2xl border-t border-r border-[#3d414a] shadow-[15px_15px_30px_rgba(0,0,0,0.85)] z-0">
          {/* Circular cooling port */}
          <div className="absolute top-12 right-6 w-5 h-5 rounded-full bg-[#111215] border-2 border-[#32363e] shadow-inner flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#0a0a0c]" />
          </div>
          {/* Subtle model badge on side */}
          <div className="absolute bottom-8 right-3 rotate-90 text-[8px] text-[#4f5460] font-sans font-bold tracking-widest uppercase">
            MODEL 1995
          </div>
        </div>

        {/* ============================================================ */}
        {/* 1. CRT MONITOR CABINET (Top Unit)                           */}
        {/* ============================================================ */}
        <div className="relative z-10 w-full rounded-t-[2rem] sm:rounded-t-[2.5rem] rounded-b-lg bg-gradient-to-b from-[#25272e] via-[#1c1d22] to-[#151619] p-3 sm:p-5 border-t-2 border-x-2 border-[#383c46] shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_-4px_8px_rgba(0,0,0,0.7)]">
          {/* Monitor Top Chamfer & Silver Script Badge */}
          <div className="flex items-center justify-between px-3 pt-1 pb-2">
            {/* Left bezel screw/vent accent */}
            <div className="flex items-center gap-1.5 opacity-60">
              <div className="w-2 h-2 rounded-full bg-[#131416] border border-[#3b3e47] shadow-inner" />
              <div className="hidden sm:flex gap-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-2.5 h-1 bg-[#101114] rounded-full" />
                ))}
              </div>
            </div>

            {/* Top Center Vintage Script Badge (Like "Vidia" / "YogX" from photo) */}
            <div className="relative group cursor-pointer" onClick={() => onTriggerToast?.("✨ Vidia Industrial CRT Workstation")}>
              <span className="font-serif italic font-extrabold text-sm sm:text-base tracking-widest bg-gradient-to-r from-slate-400 via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                Vidia
              </span>
              <span className="text-[8px] font-sans text-slate-500 font-bold ml-1 tracking-wider uppercase">
                90
              </span>
            </div>

            {/* Right bezel screw/sensor */}
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_6px_rgba(56,189,248,0.8)] animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-[#131416] border border-[#3b3e47] shadow-inner" />
            </div>
          </div>

          {/* CRT SCREEN RECESSED BEZEL & GLASS HOUSING */}
          <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#111215] via-[#0d0e11] to-[#15161a] border-4 border-[#2c2f37] shadow-[inset_0_8px_16px_rgba(0,0,0,0.95),inset_0_-4px_8px_rgba(255,255,255,0.05),0_0_0_1px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* CRT Outer Bezel Vignette Shadow */}
            <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_25px_rgba(0,0,0,0.85)] rounded-2xl sm:rounded-3xl" />

            {/* CRT Glass Reflection Arc */}
            <div className="absolute -top-10 -left-10 w-3/4 h-28 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-lg pointer-events-none z-30 transform -rotate-12" />

            {/* The Interactive Retro Terminal OS */}
            <div
              style={{
                filter: isPoweredOn
                  ? `brightness(${brightnessLevel}) contrast(${contrastLevel})`
                  : "brightness(0.1) contrast(0.5)",
                transition: "filter 0.3s ease",
              }}
            >
              <RetroTerminalOS
                activeTab={activeTab}
                onSelectTab={onSelectTab}
                onNavigateSection={onNavigateSection}
              />
            </div>
          </div>

          {/* Monitor Base Seam & Lower Chassis Trim */}
          <div className="mt-2 flex items-center justify-between px-3 text-[9px] text-[#636b78] font-sans font-semibold">
            <span className="tracking-wider">HIGH RESOLUTION COLOR DISPLAY</span>
            <span className="tracking-widest">0.26mm DOT PITCH • STEREO</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. HORIZONTAL DESKTOP CPU BASE UNIT (Middle Case from Photo) */}
        {/* ============================================================ */}
        <div className="relative z-20 w-[102%] -left-[1%] -mt-1 rounded-xl bg-gradient-to-b from-[#1e2025] via-[#16171b] to-[#111215] p-3 sm:p-4 border-t-2 border-b-4 border-x-2 border-[#333742] shadow-[0_15px_35px_rgba(0,0,0,0.95),inset_0_2px_4px_rgba(255,255,255,0.1)]">
          {/* Base Unit Front Console Grid */}
          <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
            {/* LEFT: Horizontal Cooling Intake Louvers + Amber Silkscreen */}
            <div className="col-span-5 sm:col-span-4 flex flex-col justify-center space-y-1.5 p-1.5 rounded-lg bg-[#0e0f12] border border-[#262830] shadow-inner">
              {/* Vintage Orange Telemetry Labels */}
              <div className="flex items-center justify-between text-[7px] sm:text-[8px] text-amber-500/90 font-mono tracking-wider px-1">
                <span>SPEED: 33MHz</span>
                <span className="text-emerald-400 font-bold">TURBO</span>
              </div>

              {/* Horizontal Ventilation Slats */}
              <div className="space-y-1 py-0.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-1 sm:h-1.5 bg-gradient-to-r from-[#08090a] via-[#1a1c22] to-[#08090a] rounded-sm shadow-inner"
                  />
                ))}
              </div>
            </div>

            {/* CENTER: Status LEDs & Logo */}
            <div className="col-span-2 sm:col-span-3 flex items-center justify-center gap-2 select-none">
              {/* Power LED Indicator */}
              <div className="flex flex-col items-center">
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isPoweredOn
                      ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse"
                      : "bg-emerald-950 border border-emerald-900"
                  }`}
                />
                <span className="text-[7px] text-slate-400 font-bold mt-0.5">PWR</span>
              </div>

              {/* Disk Activity Amber LED */}
              <div className="flex flex-col items-center">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                <span className="text-[7px] text-slate-400 font-bold mt-0.5">HDD</span>
              </div>
            </div>

            {/* RIGHT: Iconic Orange Power Dial & Rotary Control Knobs */}
            <div className="col-span-5 flex items-center justify-end gap-2 sm:gap-3">
              {/* Brightness Rotary Dial */}
              <button
                onClick={handleBrightnessDial}
                className="group flex flex-col items-center gap-0.5 p-1 rounded hover:bg-white/5 transition cursor-pointer"
                title="Click to adjust Brightness"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-b from-[#343842] to-[#1b1d22] border-2 border-[#454a57] flex items-center justify-center shadow-md group-hover:border-cyan-400/60 group-active:scale-95 transition">
                  <div
                    className="w-0.5 h-2.5 bg-slate-300 rounded-full transition-transform duration-200"
                    style={{ transform: `rotate(${(brightnessLevel - 1) * 90}deg)` }}
                  />
                </div>
                <span className="text-[7px] text-slate-400 font-bold group-hover:text-cyan-300">
                  BRT
                </span>
              </button>

              {/* Contrast / Color Tone Dial */}
              <button
                onClick={handleContrastDial}
                className="group flex flex-col items-center gap-0.5 p-1 rounded hover:bg-white/5 transition cursor-pointer"
                title="Click to change Phosphor Color Theme"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-b from-[#343842] to-[#1b1d22] border-2 border-[#454a57] flex items-center justify-center shadow-md group-hover:border-amber-400/60 group-active:scale-95 transition">
                  <div
                    className="w-0.5 h-2.5 bg-amber-300 rounded-full transition-transform duration-200"
                    style={{
                      transform: `rotate(${colorTheme === "cyan" ? 0 : colorTheme === "green" ? 120 : 240}deg)`,
                    }}
                  />
                </div>
                <span className="text-[7px] text-slate-400 font-bold group-hover:text-amber-300">
                  TONE
                </span>
              </button>

              {/* ICONIC GLOWING ORANGE POWER DIAL (Exact Match from Photo!) */}
              <button
                onClick={handlePowerToggle}
                className="group flex flex-col items-center gap-0.5 p-1 rounded hover:scale-105 active:scale-95 transition cursor-pointer"
                title="Power Switch / Degauss"
              >
                {/* Glowing Orange Outer Ring */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full p-[2.5px] transition-all duration-300 ${
                    isPoweredOn
                      ? "bg-gradient-to-tr from-[#ff4500] via-[#ff7a00] to-[#ffae00] shadow-[0_0_15px_rgba(255,122,0,0.85)]"
                      : "bg-[#4a2612] shadow-none"
                  }`}
                >
                  {/* Knurled Inner Switch Dial */}
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2a2c32] via-[#1a1b20] to-[#0f1013] border border-[#444955] flex items-center justify-center">
                    <Power
                      size={12}
                      className={`transition-colors ${
                        isPoweredOn ? "text-[#ff9233] drop-shadow-[0_0_4px_#ff7a00]" : "text-slate-600"
                      }`}
                    />
                  </div>
                </div>
                <span className="text-[7px] text-[#ff9233] font-bold tracking-wider">
                  POWER
                </span>
              </button>
            </div>
          </div>

          {/* Right Side Vertical Ventilation Louvers with Vertical Orange Highlight Stripe */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center pr-1.5 opacity-80 pointer-events-none">
            <div className="w-1 h-8 bg-[#ff7a00] rounded-full shadow-[0_0_6px_rgba(255,122,0,0.8)] mr-1" />
            <div className="flex flex-col gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-3 h-0.5 bg-[#252830] rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. ATTACHED MECHANICAL KEYBOARD DECK (Front Unit from Photo)  */}
        {/* ============================================================ */}
        <div className="relative z-30 w-[104%] -left-[2%] -mt-1.5 rounded-b-2xl sm:rounded-b-3xl bg-gradient-to-b from-[#1c1d22] via-[#15161a] to-[#0e0f12] p-2.5 sm:p-4 border-b-4 border-x-2 border-[#2f333d] shadow-[0_25px_60px_rgba(0,0,0,0.98),inset_0_2px_4px_rgba(255,255,255,0.1)]">
          {/* Sloped Wristrest & Keyboard Bed Frame */}
          <div className="rounded-xl bg-[#0d0e11] p-2 sm:p-2.5 border border-[#242730] shadow-inner">
            {/* Top Function / Number Row */}
            <div className="flex items-center justify-between gap-1 mb-1.5 overflow-x-auto pb-0.5">
              {[
                { label: "ESC", color: "text-rose-400 bg-[#251b1f] border-rose-900/60" },
                { label: "1:HOME", key: "1" },
                { label: "2:PROJ", key: "2" },
                { label: "3:ABOUT", key: "3" },
                { label: "4:SKILLS", key: "4" },
                { label: "5:EXP", key: "5" },
                { label: "6:BLOG", key: "6" },
                { label: "7:CONTACT", key: "7" },
                { label: "DEGAUSS", color: "text-amber-400 bg-[#261f14] border-amber-900/60", action: () => retroAudio.playDegauss() },
              ].map((k) => (
                <button
                  key={k.label}
                  onClick={() => handleKeyPress(k.key || k.label, k.action)}
                  className={`px-1.5 sm:px-2 py-1 rounded text-[8px] sm:text-[9px] font-mono font-bold transition-all duration-75 cursor-pointer select-none shadow-[0_2px_0_#050607] active:shadow-none active:translate-y-0.5 ${
                    k.color || "text-slate-300 bg-[#1e2026] hover:bg-[#282c35] border border-[#343945]"
                  } ${pressedKey === (k.key || k.label) ? "scale-95 bg-cyan-600 text-white" : ""}`}
                >
                  {k.label}
                </button>
              ))}
            </div>

            {/* QWERTY Row 1 */}
            <div className="grid grid-cols-10 gap-1 mb-1">
              {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((char) => (
                <button
                  key={char}
                  onClick={() => handleKeyPress(char)}
                  className={`py-1 sm:py-1.5 rounded text-[9px] sm:text-[10px] font-bold font-mono text-slate-300 bg-gradient-to-b from-[#23252c] to-[#18191e] border border-[#323640] shadow-[0_2.5px_0_#070709] active:shadow-none active:translate-y-0.5 hover:text-white hover:border-slate-500 transition-all cursor-pointer select-none ${
                    pressedKey === char ? "scale-95 bg-cyan-600 text-white" : ""
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>

            {/* ASDF Row 2 */}
            <div className="grid grid-cols-10 gap-1 mb-1 px-1">
              {["A", "S", "D", "F", "G", "H", "J", "K", "L", "RET"].map((char) => (
                <button
                  key={char}
                  onClick={() =>
                    handleKeyPress(
                      char,
                      char === "RET" ? () => onTriggerToast?.("⌨️ ENTER Key Executed") : undefined
                    )
                  }
                  className={`py-1 sm:py-1.5 rounded text-[9px] sm:text-[10px] font-bold font-mono transition-all cursor-pointer select-none ${
                    char === "RET"
                      ? "text-cyan-300 bg-[#122838] border border-cyan-600/60 shadow-[0_2.5px_0_#061118]"
                      : "text-slate-300 bg-gradient-to-b from-[#23252c] to-[#18191e] border border-[#323640] shadow-[0_2.5px_0_#070709]"
                  } active:shadow-none active:translate-y-0.5 hover:text-white ${
                    pressedKey === char ? "scale-95 bg-cyan-600 text-white" : ""
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>

            {/* ZXCV Row 3 + Spacebar & Arrow Keys */}
            <div className="grid grid-cols-12 gap-1 items-center">
              <button
                onClick={() => handleKeyPress("CTRL")}
                className="col-span-2 py-1 rounded text-[8px] font-bold font-mono text-slate-400 bg-[#191a20] border border-[#2b2e37] shadow-[0_2px_0_#070709] active:translate-y-0.5 cursor-pointer"
              >
                CTRL
              </button>

              <button
                onClick={() => handleKeyPress("SPACE", () => onTriggerToast?.("⌨️ Mechanical Spacebar Clicked"))}
                className="col-span-6 py-1.5 rounded text-[8px] font-bold font-mono text-slate-400 bg-gradient-to-b from-[#23252c] to-[#18191e] border border-[#323640] shadow-[0_3px_0_#060608] active:translate-y-0.5 hover:border-slate-400 transition cursor-pointer"
              >
                ── YOGX MECH SPACEBAR ──
              </button>

              <button
                onClick={() => handleKeyPress("ALT")}
                className="col-span-2 py-1 rounded text-[8px] font-bold font-mono text-slate-400 bg-[#191a20] border border-[#2b2e37] shadow-[0_2px_0_#070709] active:translate-y-0.5 cursor-pointer"
              >
                ALT
              </button>

              <div className="col-span-2 flex justify-center gap-1">
                {["◀", "▶"].map((arrow) => (
                  <button
                    key={arrow}
                    onClick={() => handleKeyPress(arrow)}
                    className="w-full py-1 rounded text-[8px] text-cyan-400 bg-[#16171d] border border-[#2a2d37] shadow-[0_2px_0_#070709] active:translate-y-0.5 cursor-pointer"
                  >
                    {arrow}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Keyboard Wristrest Lip & Status Bar */}
          <div className="mt-2 flex items-center justify-between px-2 text-[8px] sm:text-[9px] text-slate-500 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>KEYBOARD INTERACTIVE [CLICK KEYS]</span>
            </div>
            {typedBuffer && (
              <span className="text-cyan-300 font-bold tracking-wider">
                TYPED: {typedBuffer}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
