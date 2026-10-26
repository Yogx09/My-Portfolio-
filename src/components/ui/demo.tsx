"use client";

import React from "react";
import DotPattern from "@/components/ui/dot-pattern-1";
import { cn } from "@/lib/utils";

interface QuoteProps {
  className?: string;
  containerClassName?: string;
  compact?: boolean;
}

export function Quote({ className, containerClassName, compact = false }: QuoteProps) {
  return (
    <div className={cn("mx-auto w-full", !compact && "mb-10 max-w-7xl px-6 md:mb-20 xl:px-0", containerClassName)}>
      <div className={cn("relative flex flex-col items-center border border-red-500 bg-white/60 backdrop-blur-xs", className)}>
        <DotPattern width={5} height={5} className="fill-slate-500/40" />

        <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-red-500 text-white" />
        <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-red-500 text-white" />
        <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-red-500 text-white" />
        <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-red-500 text-white" />

        <div className={cn(
          "relative z-20 mx-auto max-w-7xl",
          compact 
            ? "p-4 sm:p-6 md:p-8" 
            : "rounded-[40px] py-6 md:p-10 xl:py-20"
        )}>
          <p className={cn(
            "text-red-500 font-mono font-medium",
            compact 
              ? "text-xs sm:text-sm mb-2" 
              : "text-xs md:text-base lg:text-lg xl:text-2xl mb-1"
          )}>
            I believe
          </p>
          <div className={cn(
            "tracking-tighter",
            compact 
              ? "text-lg sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-[2.6rem] leading-[1.15]" 
              : "text-2xl md:text-5xl lg:text-7xl xl:text-8xl"
          )}>
            <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4 flex-wrap">
              <h1 className="font-semibold text-slate-900">"Design should be</h1>
              <p className="font-thin text-slate-600">easy to</p>
            </div>
            <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4 flex-wrap">
              <p className="font-thin text-slate-600">understand</p>
              <h1 className="font-semibold text-slate-900">because</h1>
              <p className="font-thin text-slate-600">simple</p>
            </div>
            <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4 flex-wrap">
              <p className="font-thin text-slate-600">ideas</p>
              <h1 className="font-semibold text-slate-900">are quicker to</h1>
            </div>
            <h1 className="font-semibold text-slate-900">grasp..."</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quote;
