"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  MessageCircle,
  Play,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Zap,
  Lock,
  Sparkles,
} from "lucide-react";
import { revisionPackData, getWhatsAppPackOrderUrl } from "@/data/packRevision";
import { PackInteractivePreview } from "./PackInteractivePreview";
import { PackDemoModal } from "./PackDemoModal";

interface PackHeroSectionProps {
  isArabic?: boolean;
}

export function PackHeroSection({ isArabic = false }: PackHeroSectionProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const whatsappUrl = getWhatsAppPackOrderUrl(isArabic);

  const trustIcons: Record<string, React.ElementType> = {
    Lock: Lock,
    Smartphone: Smartphone,
    Zap: Zap,
    MessageCircle: MessageCircle,
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[#F20D2F] font-bold text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isArabic ? "باك المراجعة الشامل 2026" : "PACK RÉVISION PERMIS MAROC"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight sm:leading-tight">
            {isArabic ? revisionPackData.headlineAr : revisionPackData.headline}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            {isArabic ? revisionPackData.descriptionAr : revisionPackData.description}
          </p>
        </div>

        {/* Main 2-Column Product Showcase Card */}
        <div className="rounded-3xl sm:rounded-[36px] bg-gradient-to-b from-[#131B2E] to-[#0B0F17] border border-slate-800/90 shadow-2xl p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT SIDE: Product details, pricing, feature checklist, CTAs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Product Badge & Titles */}
              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-[#C1272D]/20 text-[#F20D2F] border border-red-500/30 text-[11px] font-extrabold uppercase tracking-wider mb-2.5">
                  {isArabic ? "باك شامل وكامل" : "PACK COMPLET"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {isArabic ? revisionPackData.nameAr : revisionPackData.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-400 font-medium mt-1">
                  {isArabic ? revisionPackData.subtitleAr : revisionPackData.subtitle}
                </p>
              </div>

              {/* Transparent Pricing Display */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#090D15] border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {revisionPackData.price} {revisionPackData.currency}
                    </span>
                    {revisionPackData.previousPrice && (
                      <span className="text-sm sm:text-base text-slate-500 line-through font-semibold">
                        {revisionPackData.previousPrice} {revisionPackData.currency}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    {isArabic ? "أداء لمرة واحدة بدون اشتراك شهري" : "Paiement unique – Accès complet"}
                  </span>
                </div>

                {revisionPackData.discountPercent && (
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs sm:text-sm">
                    -{revisionPackData.discountPercent}%
                  </div>
                )}
              </div>

              {/* Feature Checklist (8 items from data) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {(isArabic ? revisionPackData.featuresAr : revisionPackData.features).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons Group */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Primary CTA (WhatsApp or Purchase) */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 rounded-2xl bg-[#F20D2F] hover:bg-[#D90B28] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-600/25 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>{isArabic ? "طلب الباك الآن" : "Obtenir le Pack"}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </a>

                {/* Secondary CTA: WhatsApp direct button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-5 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>{isArabic ? "طلب عبر الواتساب" : "Commander via WhatsApp"}</span>
                </a>

                {/* Secondary CTA: Demo Walkthrough */}
                <button
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="py-3.5 px-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-red-400" />
                  <span>{isArabic ? "معاينة المنصة" : "Voir un aperçu"}</span>
                </button>
              </div>

              {/* Trust Row */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {revisionPackData.trustItems.map((item, idx) => {
                  const Icon = trustIcons[item.icon] || ShieldCheck;
                  return (
                    <div key={idx} className="flex items-center gap-2 text-slate-300">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-medium leading-tight">
                        {isArabic ? item.titleAr : item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE: Interactive Smartphone Preview with Screen Switcher */}
            <div className="lg:col-span-6 flex justify-center">
              <PackInteractivePreview
                onOpenDemo={() => setDemoOpen(true)}
                isArabic={isArabic}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <PackDemoModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        isArabic={isArabic}
      />
    </section>
  );
}
