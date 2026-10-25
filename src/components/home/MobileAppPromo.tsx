"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { Smartphone, CheckCircle2, Clock, Apple } from "lucide-react";

export function MobileAppPromo() {
  const { language, t } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] relative overflow-hidden border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Info, features, placeholder badges */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#C1272D] mb-4">
              <Smartphone className="w-3.5 h-3.5" />
              <span>{t.appPromo.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#071A3D] tracking-tight leading-tight mb-4">
              {t.appPromo.title}
            </h2>

            <p className="text-[#475569] text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-normal">
              {t.appPromo.subtitle}
            </p>

            {/* Feature bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
              {t.appPromo.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-[#334155] font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#20C875] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Coming Soon Notice and Store Badges */}
            <div className="p-5 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm max-w-lg">
              <div className="flex items-center gap-2 text-amber-500 text-xs font-bold tracking-wide mb-3">
                <Clock className="w-4 h-4" />
                <span>{t.appPromo.comingSoon}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* App Store Placeholder */}
                <div className="w-full sm:w-1/2 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <Apple className="w-6 h-6 text-[#071A3D] shrink-0" />
                  <div className="text-start">
                    <span className="block text-[10px] text-[#5A6A82] leading-tight">
                      {isArabic ? "قريباً على" : "Bientôt sur"}
                    </span>
                    <span className="text-xs font-bold text-[#071A3D] tracking-wide">
                      App Store
                    </span>
                  </div>
                </div>

                {/* Google Play Placeholder */}
                <div className="w-full sm:w-1/2 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current text-emerald-600"
                    >
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.22-.914V2.728c0-.336.082-.647.219-.914zm11.233 11.233l2.25 2.25-11.45 6.61 9.2-8.86zm0-2.094L5.642 2.093l11.45 6.61-2.25 2.25zm1.536 1.047l3.774 2.18c.997.576.997 1.516 0 2.092l-3.774 2.18-2.316-2.316 2.316-2.136z" />
                    </svg>
                  </div>
                  <div className="text-start">
                    <span className="block text-[10px] text-[#5A6A82] leading-tight">
                      {isArabic ? "قريباً على" : "Bientôt sur"}
                    </span>
                    <span className="text-xs font-bold text-[#071A3D] tracking-wide">
                      Google Play
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Smartphone Frame Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[280px] sm:w-[320px] aspect-[9/19] rounded-[48px] bg-slate-950 p-3.5 shadow-2xl shadow-red-950/30 border-4 border-slate-700">
              {/* Dynamic island / Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
              </div>

              {/* Screen Content */}
              <div className="w-full h-full rounded-[38px] bg-[#0B0F17] overflow-hidden flex flex-col justify-between p-4 pt-10 text-white relative">
                {/* App Screen Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black tracking-tight text-white">
                      {isArabic ? "بيرمي المغرب" : "PERMIS MAROC"}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold tabular-nums">
                    37/40
                  </span>
                </div>

                {/* Simulated Screen Card */}
                <div className="my-auto space-y-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {isArabic ? "امتحان تجريبي #14" : "Examen Blanc #14"}
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-white">
                        {isArabic ? "ناجح بتفوق !" : "Admis avec brio !"}
                      </span>
                      <span className="text-lg">🎉</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                      <div className="bg-emerald-500 h-full w-[92%] rounded-full" />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">
                        {isArabic ? "قواعد الأسبقية" : "Priorités à droite"}
                      </span>
                      <span className="text-emerald-400 font-bold tabular-nums">
                        100%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">
                        {isArabic ? "علامات الخطر والمنع" : "Panneaux de danger"}
                      </span>
                      <span className="text-emerald-400 font-bold tabular-nums">
                        95%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">
                        {isArabic ? "الوقوف والتوقف" : "Arrêt & stationnement"}
                      </span>
                      <span className="text-amber-400 font-bold tabular-nums">
                        88%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom App Navigation */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-around text-slate-500">
                  <span className="text-[10px] font-bold text-red-500">
                    {isArabic ? "الرئيسية" : "Accueil"}
                  </span>
                  <span className="text-[10px]">
                    {isArabic ? "الدروس" : "Cours"}
                  </span>
                  <span className="text-[10px]">
                    {isArabic ? "الاختبارات" : "Tests"}
                  </span>
                  <span className="text-[10px]">
                    {isArabic ? "حسابي" : "Profil"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
