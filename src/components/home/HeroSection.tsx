"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { HeroRoadWrapper } from "@/components/three/HeroRoadWrapper";
import { CheckCircle2, ArrowRight, Play, Sparkles } from "lucide-react";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background radial gradient accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Value Proposition, CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-red-500/30 text-xs text-red-300 font-semibold mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C1272D] animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Large Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-6">
              {t.hero.titleStart}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EA383E] via-[#C1272D] to-amber-500">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <Link
                href="/examen-blanc"
                className="px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#C1272D] hover:bg-[#9E1F24] transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-950/50 hover:shadow-red-800/40 hover:-translate-y-0.5 border border-red-500/30"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <Link
                href="#quick-test"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 bg-slate-900/90 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-white/25 hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 text-red-400 fill-red-400" />
                <span>{t.hero.secondaryCta}</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-lg pt-6 border-t border-white/10">
              {t.hero.trustIndicators.map((indicator, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Three.js Moroccan Road Scene */}
          <div className="lg:col-span-6 w-full h-[400px] sm:h-[480px] lg:h-[560px] relative z-10">
            <HeroRoadWrapper />
          </div>
        </div>
      </div>
    </section>
  );
}
