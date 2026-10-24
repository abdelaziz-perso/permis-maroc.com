"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { HeroRoadWrapper } from "@/components/three/HeroRoadWrapper";
import {
  BookOpen,
  CheckCircle2,
  Award,
  TrendingUp,
  ArrowRight,
  Play,
  Users,
  Percent,
  HelpCircle,
  Languages,
} from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  const featureCards = [
    {
      title: isArabic ? "دروس كاملة" : "Cours complets",
      desc: isArabic ? "جميع المحاور الرسمية" : "12 thèmes officiels",
      href: "/code-de-la-route",
      icon: BookOpen,
      color: "from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/20",
    },
    {
      title: isArabic ? "اختبارات تفاعلية" : "Tests interactifs",
      desc: isArabic ? "أكثر من 1 200 سؤال" : "+1 200 questions",
      href: "#quick-test",
      icon: CheckCircle2,
      color: "from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/20",
    },
    {
      title: isArabic ? "امتحانات بيضاء" : "Examens blancs",
      desc: isArabic ? "في ظروف الامتحان" : "Chronométrés 40 Q",
      href: "/examen-blanc",
      icon: Award,
      color: "from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/20",
    },
    {
      title: isArabic ? "تتبع التقدم" : "Suivi de progression",
      desc: isArabic ? "نقاط الضعف والمستوى" : "Score & XP en direct",
      href: "/dashboard",
      icon: TrendingUp,
      color: "from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/20",
    },
  ];

  const stats = [
    {
      value: "25 000+",
      label: isArabic ? "تلميذ مسجل" : "Étudiants formés",
      icon: Users,
    },
    {
      value: "92%",
      label: isArabic ? "نسبة النجاح" : "Taux de réussite",
      icon: Percent,
    },
    {
      value: "40",
      label: isArabic ? "سؤال للامتحان" : "Questions par test",
      icon: HelpCircle,
    },
    {
      value: "3",
      label: isArabic ? "لغات متوفرة" : "Langues (FR / AR / Darija)",
      icon: Languages,
    },
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9]">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-red-500/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Authentic Moroccan EdTech Copy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start z-10"
          >
            {/* Small Label with Red Moroccan Line */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-[#F20D2F] rounded-full inline-block" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F20D2F]">
                {isArabic ? "رخصتك في المغرب" : "VOTRE PERMIS AU MAROC"}
              </span>
            </div>

            {/* Main H1: Exact required text with 'permis' highlighted in Moroccan red */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-[#071A3D] leading-[1.12] mb-5">
              {isArabic ? (
                <>
                  اضمن <span className="text-[#F20D2F] underline decoration-red-500/30">رخصتك</span> في المغرب.
                </>
              ) : (
                <>
                  Réussis ton{" "}
                  <span className="text-[#F20D2F] underline decoration-red-500/30 underline-offset-4">
                    permis
                  </span>{" "}
                  au Maroc.
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-8 max-w-xl font-normal">
              {isArabic
                ? "تعلم قانون السير، تدرب باختبارات تفاعلية واستعد للامتحان بالسرعة التي تناسبك مع بيرمي المغرب."
                : "Apprenez le Code de la Route, entraînez-vous avec des tests interactifs et préparez votre examen à votre rythme avec Permis Maroc."}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-9">
              <Link
                href="/examen-blanc"
                className="px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#F20D2F] hover:bg-[#D90B28] transition-all flex items-center justify-center gap-2 shadow-xl shadow-red-500/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>{isArabic ? "ابدأ مجاناً" : "Commencer gratuitement"}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <Link
                href="#quick-test"
                className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#071A3D] bg-white hover:bg-slate-50 transition-all flex items-center justify-center gap-2 border border-[#E2E8F0] hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0 shadow-xs cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-red-50 text-[#F20D2F] flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>{isArabic ? "مشاهدة العرض" : "Voir la démo"}</span>
              </Link>
            </div>

            {/* 4 Feature Icon Pills / Cards */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xl mb-8">
              {featureCards.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <Link
                    key={idx}
                    href={feat.href}
                    className="p-3.5 rounded-2xl bg-white hover:bg-slate-50/80 border border-[#E2E8F0] hover:border-[#F20D2F]/30 hover:shadow-md transition-all flex items-center gap-3 group shadow-xs cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-[#071A3D] group-hover:text-[#F20D2F] transition-colors truncate">
                        {feat.title}
                      </span>
                      <span className="text-[11px] text-[#64748B] truncate">
                        {feat.desc}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Real Interactive 3D Moroccan Driving Environment */}
          <div className="lg:col-span-6 w-full h-[400px] sm:h-[480px] lg:h-[580px] relative z-10">
            <HeroRoadWrapper />
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-10 pt-8 border-t border-[#E2E8F0] grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#F20D2F] border border-red-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-[#071A3D] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#64748B] font-semibold">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
