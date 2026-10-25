"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import {
  CheckCircle,
  BookOpen,
  ShieldAlert,
  Flame,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function FeaturesGrid() {
  const { language, t } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  const features = [
    {
      icon: CheckCircle,
      title: t.features.f1Title,
      description: t.features.f1Desc,
      href: "/examen-blanc",
      tag: isArabic ? "40 سؤالاً" : "40 Questions",
      color: "border-red-500/25 text-[#C1272D] bg-red-50",
    },
    {
      icon: BookOpen,
      title: t.features.f2Title,
      description: t.features.f2Desc,
      href: "/code-de-la-route",
      tag: isArabic ? "12 محوراً" : "12 Catégories",
      color: "border-blue-500/25 text-blue-600 bg-blue-50",
    },
    {
      icon: ShieldAlert,
      title: t.features.f3Title,
      description: t.features.f3Desc,
      href: "/panneaux",
      tag: isArabic ? "الغرامات والعقوبات" : "Amendes & Sanctions",
      color: "border-amber-500/25 text-amber-600 bg-amber-50",
    },
    {
      icon: Flame,
      title: t.features.f4Title,
      description: t.features.f4Desc,
      href: "/dashboard",
      tag: isArabic ? "تتبع وشارات" : "Progression & Badges",
      color: "border-emerald-500/25 text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-[#E2E8F0] text-xs text-slate-700 font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C1272D]" />
            <span>
              {isArabic
                ? "منظومة تعليمية متكاملة"
                : "Écosystème Pédagogique"}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] tracking-tight mb-4">
            {t.features.title}
          </h2>
          <p className="text-[#5A6A82] text-sm sm:text-base leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <Link
              key={idx}
              href={feat.href}
              className="p-6 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#F20D2F]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feat.color}`}
                  >
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#F8FAFC] text-slate-600 border border-[#E2E8F0]">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#071A3D] mb-2 group-hover:text-[#C1272D] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-[#5A6A82] text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  {feat.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-[#5A6A82] group-hover:text-[#071A3D] transition-colors pt-4 border-t border-[#F1F5F9]">
                <span>{isArabic ? "اكتشف المزيد" : "Découvrir"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
