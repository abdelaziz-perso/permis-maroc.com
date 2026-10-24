"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, Sparkles } from "lucide-react";

export function ScrollTransitionRoadSign() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute subtle parallax scale and opacity
  const progress = Math.min(1, Math.max(0, (scrollY - 150) / 350));

  return (
    <div className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-[#0B0F17] via-[#121824] to-[#0B0F17] border-y border-white/5">
      {/* Decorative road lines in background */}
      <div className="absolute inset-0 flex justify-center pointer-events-none opacity-20">
        <div className="w-1 border-r-2 border-dashed border-amber-400 h-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Overhead Road Sign Board */}
        <div
          style={{
            transform: `translateY(${Math.max(-20, (1 - progress) * 20)}px) scale(${0.95 + progress * 0.05})`,
            opacity: Math.max(0.7, progress),
            transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
          }}
          className="inline-block relative p-1 rounded-2xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl shadow-black/80 border-2 border-white/20"
        >
          {/* Sign Surface */}
          <div className="px-8 sm:px-14 py-6 sm:py-8 rounded-xl bg-gradient-to-b from-[#0F172A] to-[#020617] border-2 border-[#C1272D] flex flex-col items-center">
            {/* Top studs */}
            <div className="w-full flex justify-between px-2 mb-2 opacity-50">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block shadow-inner" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block shadow-inner" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-mono font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>POINT KILOMÉTRIQUE 2026</span>
            </div>

            {/* Main Sign Text */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-wider mb-2 drop-shadow-md">
              PRÊT POUR L&apos;EXAMEN ?
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-5">
              Évaluez votre niveau en 2 minutes chrono avec notre question test ci-dessous.
            </p>

            <Link
              href="#quick-test"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-red-600/30"
            >
              <span>Répondre à la question test</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
