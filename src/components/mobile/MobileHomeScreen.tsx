"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useUser } from "@/context/UserContext";
import { MobileDrivingScene } from "./MobileDrivingScene";
import { ScrollTransitionRoadSign } from "@/components/home/ScrollTransitionRoadSign";
import { QuickTestSection } from "@/components/home/QuickTestSection";
import { Interactive3DSection } from "@/components/home/Interactive3DSection";
import {
  BookOpen,
  TriangleAlert,
  HelpCircle,
  Award,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export function MobileHomeScreen() {
  const { language } = useLanguage();
  const { user, stats } = useUser();
  const isArabic = language === "ar" || language === "ary";

  const progressPercent = stats?.testsCompleted
    ? Math.min(Math.round((stats.averageScore / 40) * 100), 100)
    : 72;

  const quickActions = [
    {
      href: "/code-de-la-route",
      title: isArabic ? "الدروس" : "Cours",
      subtitle: isArabic ? "12 محوراً" : "12 thèmes",
      icon: BookOpen,
      iconColor: "text-blue-500 bg-blue-50",
    },
    {
      href: "/panneaux",
      title:
        language === "ary"
          ? "البلايك"
          : isArabic
          ? "علامات المرور"
          : "Panneaux",
      subtitle: isArabic ? "+150 علامة" : "Réviser",
      icon: TriangleAlert,
      iconColor: "text-amber-500 bg-amber-50",
    },
    {
      href: "/examen-blanc",
      title: isArabic ? "الاختبارات" : "Tests",
      subtitle: isArabic ? "تدريب تفاعلي" : "S'entraîner",
      icon: HelpCircle,
      iconColor: "text-emerald-500 bg-emerald-50",
    },
    {
      href: "/examen-blanc",
      title: isArabic ? "امتحان تجريبي" : "Examen blanc",
      subtitle: isArabic ? "40 سؤالاً" : "40 questions",
      icon: Award,
      iconColor: "text-red-500 bg-red-50",
    },
  ];

  return (
    <div className="space-y-5">
      {/* 1. Header Greeting & Title */}
      <div className="pt-1">
        <span className="text-xs font-semibold text-[#64748B] flex items-center gap-1.5 mb-1">
          <span>{isArabic ? "مرحباً بك" : "Salam"}</span>
          <span>👋</span>
          {user?.name && (
            <span className="text-[#071A3D] font-bold">{user.name}</span>
          )}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#071A3D] tracking-tight leading-tight">
          {language === "ary" ? (
            <>
              واجد باش تجيب <span className="text-[#F20D2F]">البيرمي</span> ؟
            </>
          ) : isArabic ? (
            <>
              هل أنت مستعد للنجاح في{" "}
              <span className="text-[#F20D2F]">امتحان السياقة</span> ؟
            </>
          ) : (
            <>
              Prêt à réussir ton <span className="text-[#F20D2F]">permis</span> ?
            </>
          )}
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-normal">
          {isArabic
            ? "تعلم قانون السير، تدرب وانجح من المرة الأولى مع بيرمي المغرب."
            : "Apprends, entraîne-toi et réussis avec Permis Maroc."}
        </p>
      </div>

      {/* 2. Scroll & Touch Reactive Moroccan 3D Driving Scene */}
      <MobileDrivingScene />

      {/* 3. Floating Progress Card */}
      <div className="rounded-3xl bg-white border border-[#E5ECF5] p-5 shadow-[0_4px_20px_rgba(7,26,61,0.04)] space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#64748B]">
              {isArabic ? "التحضير للامتحان" : "Préparation examen"}
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-black text-[#071A3D] tracking-tight tabular-nums">
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
            ? "استمر، أنت تتقدم بشكل ممتاز نحو النجاح."
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
              ? "ابدأ الاختبار مجاناً الآن"
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

      {/* 5. 3D Scroll-Driven Highway Maneuver Section on Mobile too */}
      <div className="-mx-4">
        <ScrollTransitionRoadSign />
      </div>

      {/* 6. Interactive 3D Crossroads Simulator on Mobile */}
      <div className="-mx-4">
        <Interactive3DSection />
      </div>

      {/* 7. Quick Test Question on Mobile */}
      <div className="-mx-4">
        <QuickTestSection />
      </div>

      {/* 8. Pack Révision Promo Card */}
      <Link
        href="/pack-revision"
        className="block p-4 rounded-3xl bg-gradient-to-br from-[#071A3D] to-[#0D2860] text-white shadow-lg shadow-navy-950/20 active:scale-[0.98] transition-all relative overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F20D2F] text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{isArabic ? "عرض خاص" : "PACK RÉVISION"}</span>
            </span>
            <div className="text-sm font-black leading-tight">
              {isArabic ? "باك المراجعة الشامل 2026" : "Pack Révision Permis B"}
            </div>
            <div className="text-[11px] text-slate-300">
              {isArabic
                ? "دروس، أسئلة، وعلامات المرور بـ 79 درهم فقط"
                : "Cours, tests & examens à 79 MAD"}
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-white">
            <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </div>
        </div>
      </Link>
    </div>
  );
}
