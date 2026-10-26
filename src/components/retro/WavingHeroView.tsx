"use client";

import React from "react";
import Skiper39 from "@/components/ui/skiper39";
import { NavTab } from "./RetroTerminalOS";

interface WavingHeroViewProps {
  onSwitchTab?: (tab: NavTab) => void;
}

export default function WavingHeroView({ onSwitchTab }: WavingHeroViewProps) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#fafbfc] flex items-center justify-center select-none">
      <Skiper39
        className="relative h-full w-full bg-[#fafbfc] text-slate-900"
        canvasClassName="absolute bottom-0 h-full w-full"
        title="Crowd Canvas"
      />
    </div>
  );
}
