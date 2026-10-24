"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useUser } from "@/context/UserContext";
import { MobileDrivingScene } from "./MobileDrivingScene";
import {
  BookOpen,
  TriangleAlert,
  HelpCircle,
  Award,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export function MobileHomeScreen() {
  const { language } = useLanguage();
  const { user, stats } = useUser();
  const isArabic = language === "ar" || language === "ary";

  // Calculate real progress percentage or fallback to high-yield demo progress
  const progressPercent = stats?.testsCompleted
    ? Math.min(Math.round((stats.averageScore / 40) * 100), 100)
    : 72;

  const quickActions = [
    {
      href: "/code-de-la-route",
      title: isArabic ? "الدروس" : "Cours",
      subtitle: isArabic ? "12 محورا" : "12 thèmes",
      icon: BookOpen,
      iconColor: "text-blue-500 bg-blue-50",
    },
    {
      href: "/panneaux",
      title: isArabic ? "البلايك" : "Panneaux",
      subtitle: isArabic ? "مراجعة" : "Réviser",
      icon: TriangleAlert,
      iconColor: "text-amber-500 bg-amber-50",
    },
    {
      href: "/examen-blanc",
      title: isArabic ? "الاختبارات" : "Tests",
      subtitle: isArabic ? "تدريب" : "S'entraîner",
      icon: HelpCircle,
      iconColor: "text-emerald-500 bg-emerald-50",
    },
    {
      href: "/examen-blanc",
      title: isArabic ? "امتحان أبيض" : "Examen blanc",
      subtitle: isArabic ? "40 سؤالا" : "40 questions",
      icon: Award,
      iconColor: "text-red-500 bg-red-50",
    },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Header Greeting & Title */}
      <div className="pt-1">
        <span className="text-xs font-semibold text-[#64748B] flex items-center gap-1.5 mb-1">
          <span>Salam</span>
          <span>👋</span>
          {user?.name && <span className="text-[#071A3D] font-bold">{user.name}</span>}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#071A3D] tracking-tight leading-tight">
          {isArabic ? (
            <>
              واجد باش تجيب <span className="text-[#F20D2F]">البيرمي</span> ؟
            </>
          ) : (
            <>
              Prêt à réussir ton <span className="text-[#F20D2F]">permis</span> ?
            </>
          )}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-normal">
          {isArabic
            ? "تعلم، تدرب وانجح مع بيرمي المغرب."
            : "Apprends, entraîne-toi et réussis avec Permis Maroc."}
        </p>
      </div>

      {/* 2. Compact Moroccan Driving Scene (Lightweight Three.js) */}
      <MobileDrivingScene />

      {/* 3. Floating Progress Card matching reference */}
      <div className="rounded-3xl bg-white border border-[#E5ECF5] p-5 shadow-[0_4px_20px_rgba(7,26,61,0.04)] space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#64748B]">
              {isArabic ? "التحضير للامتحان" : "Préparation examen"}
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-black text-[#071A3D] tracking-tight">
                {progressPercent}%
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Green Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-[#F1F5F9] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#20C875] to-[#10B981] transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-xs text-[#64748B]">
          {isArabic
            ? "استمر، أنت تتقدم بشكل ممتاز."
            : "Continue, tu progresses bien."}
        </p>

        {/* Large Primary Red CTA */}
        <Link
          href="/examen-blanc"
          className="w-full py-3.5 px-5 rounded-2xl bg-[#F20D2F] hover:bg-[#D90B28] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 active:scale-[0.98] transition-all"
        >
          <span>
            {user
              ? isArabic
                ? "متابعة تدريبي"
                : "Continuer mon entraînement"
              : isArabic
              ? "ابدأ مجاناً الآن"
              : "Continuer mon entraînement"}
          </span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </Link>
      </div>

      {/* 4. Quick Action Grid (2 columns, large touch targets) */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <Link
              key={idx}
              href={action.href}
              className="p-4 rounded-3xl bg-white border border-[#E5ECF5] hover:border-[#F20D2F]/30 hover:shadow-md transition-all flex flex-col justify-between min-h-[92px] active:scale-[0.97]"
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-2.5 ${action.iconColor}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-[#071A3D] block leading-snug">
                  {action.title}
                </span>
                <span className="text-[11px] text-[#64748B] block mt-0.5">
                  {action.subtitle}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
