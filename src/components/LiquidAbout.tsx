"use client";

import CollageAboutSection from "@/components/CollageAboutSection";

export default function LiquidAbout() {
  return (
    <section id="about" className="relative w-full border-t border-white/[0.06] bg-[#0d0d0f]">
      <CollageAboutSection isStandalonePage={false} />
    </section>
  );
}
