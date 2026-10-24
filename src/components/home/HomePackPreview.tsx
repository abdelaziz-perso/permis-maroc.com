"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import {
  CheckCircle2,
  MessageCircle,
  Play,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Lock,
  Smartphone,
  Zap,
} from "lucide-react";
import { revisionPackData, getWhatsAppPackOrderUrl } from "@/data/packRevision";
import { PackInteractivePreview } from "@/components/pack/PackInteractivePreview";
import { PackDemoModal } from "@/components/pack/PackDemoModal";

export function HomePackPreview() {
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";
  const [demoOpen, setDemoOpen] = useState(false);
  const whatsappUrl = getWhatsAppPackOrderUrl(isArabic);

  const trustIcons: Record<string, React.ElementType> = {
    Lock,
    Smartphone,
    Zap,
    MessageCircle,
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 border-t border-[#E2E8F0] bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#F20D2F] font-bold text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isArabic ? "باك المراجعة الشامل 2026" : "PACK RÉVISION PERMIS MAROC"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#071A3D] tracking-tight leading-tight">
            {isArabic ? revisionPackData.headlineAr : revisionPackData.headline}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] font-normal leading-relaxed">
            {isArabic ? revisionPackData.descriptionAr : revisionPackData.description}
          </p>
        </div>

        {/* Large Premium Product Card */}
        <div className="rounded-3xl sm:rounded-[36px] bg-white border border-[#E2E8F0] shadow-xl p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT: Product Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-red-50 text-[#F20D2F] border border-red-200 text-[11px] font-extrabold uppercase tracking-wider mb-2.5">
                  {isArabic ? "باك شامل وكامل" : "PACK COMPLET"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#071A3D] tracking-tight">
                  {isArabic ? revisionPackData.nameAr : revisionPackData.name}
                </h3>
                <p className="text-sm sm:text-base text-[#64748B] font-medium mt-1">
                  {isArabic ? revisionPackData.subtitleAr : revisionPackData.subtitle}
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl sm:text-4xl font-black text-[#071A3D] tracking-tight">
                      {revisionPackData.price} {revisionPackData.currency}
                    </span>
                    {revisionPackData.previousPrice && (
                      <span className="text-sm sm:text-base text-slate-400 line-through font-semibold">
                        {revisionPackData.previousPrice} {revisionPackData.currency}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#64748B] block mt-0.5">
                    {isArabic ? "أداء لمرة واحدة – بدون اشتراك شهري" : "Paiement unique – Accès complet"}
                  </span>
                </div>

                {revisionPackData.discountPercent && (
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 font-extrabold text-xs sm:text-sm">
                    -{revisionPackData.discountPercent}%
                  </div>
                )}
              </div>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {(isArabic ? revisionPackData.featuresAr : revisionPackData.features).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#334155]">
                    <CheckCircle2 className="w-4 h-4 text-[#20C875] shrink-0 mt-0.5" />
                    <span className="leading-tight font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/pack-revision"
                  className="py-3.5 px-6 rounded-2xl bg-[#F20D2F] hover:bg-[#D90B28] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-600/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>{isArabic ? "اكتشف الباك بالتفصيل" : "Obtenir le Pack"}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>{isArabic ? "طلب عبر الواتساب" : "Commander via WhatsApp"}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-[#E2E8F0] text-[#071A3D] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-[#F20D2F]" />
                  <span>{isArabic ? "معاينة المنصة" : "Voir un aperçu"}</span>
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-4 border-t border-[#E2E8F0] grid grid-cols-2 sm:grid-cols-4 gap-3">
                {revisionPackData.trustItems.map((item, idx) => {
                  const Icon = trustIcons[item.icon] || ShieldCheck;
                  return (
                    <div key={idx} className="flex items-center gap-2 text-[#475569]">
                      <div className="w-7 h-7 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#071A3D] shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold leading-tight">
                        {isArabic ? item.titleAr : item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Interactive Mockup Preview */}
            <div className="lg:col-span-6 flex justify-center">
              <PackInteractivePreview
                onOpenDemo={() => setDemoOpen(true)}
                isArabic={isArabic}
              />
            </div>
          </div>
        </div>
      </div>

      <PackDemoModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        isArabic={isArabic}
      />
    </section>
  );
}
