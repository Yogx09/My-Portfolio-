"use client";

import React from "react";
import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing";
import { NavTab } from "./RetroTerminalOS";

interface WavingHeroViewProps {
  onSwitchTab?: (tab: NavTab) => void;
}

export default function WavingHeroView({ onSwitchTab }: WavingHeroViewProps) {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#fafbfc] flex items-center justify-center select-none">
      <WavingPortfolioLanding
        name="KEDHARESWER"
        year="2026"
        roles={["GRAPHIC DESIGNER", "ILLUSTRATOR"]}
        lettersLeft={["P", "F"]}
        giantLetter="O"
        lettersRight={["RT", "LIO"]}
        title="Portfolio"
        signature="KEDHA/RESWER"
        greeting="Hi there!"
        accent="#e5262c"
        paper="#fafbfc"
        ink="#141414"
        showCornerDice={false}
        showSignature={false}
        showDoodles={true}
        height="100%"
        intro={true}
        className="w-full h-full wpl-hero-mode"
      />
    </div>
  );
}
