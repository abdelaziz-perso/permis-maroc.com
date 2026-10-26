"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ShieldCheck,
  Boxes,
  Sparkles,
} from "lucide-react";

export function HeroSection() {
  const { language, t } = useLanguage();
  const isArabic = language === "ar" || language === "ary";
  const [interactiveMode, setInteractiveMode] = useState(false);

  const featureCards = [
    {
      title:
        language === "ary"
          ? "دروس مشروحة بالدارجة"
          : isArabic
          ? "دروس شاملة ومبسطة"
          : "Cours complets",
      desc: isArabic ? "12 محوراً رسمياً" : "12 thèmes officiels",
      href: "/code-de-la-route",
      icon: BookOpen,
      color:
        "from-blue-500/15 to-blue-600/5 text-blue-600 border-blue-500/20",
    },
    {
      title:
        language === "ary"
          ? "تيستات تفاعلية"
          : isArabic
          ? "اختبارات تفاعلية"
          : "Tests interactifs",
      desc: isArabic ? "+1,200 سؤال مع الشرح" : "+1 200 questions",
      href: "#quick-test",
      icon: CheckCircle2,
      color:
        "from-emerald-500/15 to-emerald-600/5 text-emerald-600 border-emerald-500/20",
    },
    {
      title:
        language === "ary"
          ? "امتحانات بحال السيرفيس"
          : isArabic
          ? "امتحانات تجريبية"
          : "Examens blancs",
      desc: isArabic ? "40 سؤالاً بمؤقت زمني" : "Chronométrés 40 Q",
      href: "/examen-blanc",
      icon: Award,
      color:
        "from-amber-500/15 to-amber-600/5 text-amber-600 border-amber-500/20",
    },
    {
      title:
        language === "ary"
          ? "تبع النيفو ديالك"
          : isArabic
          ? "تتبع دقيق للمستوى"
          : "Suivi de progression",
      desc: isArabic ? "نقاط القوة والضعف" : "Score & XP en direct",
      href: "/dashboard",
      icon: TrendingUp,
      color:
        "from-purple-500/15 to-purple-600/5 text-purple-600 border-purple-500/20",
    },
  ];

  const stats = [
    {
      value: "25,000+",
      label: isArabic ? "مترشح مسجل بالمغرب" : "Étudiants formés",
      icon: Users,
    },
    {
      value: "92%",
      label: isArabic ? "نسبة النجاح من المحاولة الأولى" : "Taux de réussite",
      icon: Percent,
    },
    {
      value: "40",
      label: isArabic ? "سؤالاً في كل امتحان رسمي" : "Questions par test",
      icon: HelpCircle,
    },
    {
      value: "3",
      label: isArabic ? "لغات (العربية • الدارجة • FR)" : "Langues (AR / Darija / FR)",
      icon: Languages,
    },
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9]">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-red-500/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Primary Content Column (Zero-latency DOM rendering, RTL/LTR adaptive) */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start z-10">
            {/* Editorial Kicker with Red Moroccan Line */}
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-6 h-[2.5px] bg-[#E30D2B] rounded-full inline-block" />
              <span className="text-xs sm:text-sm font-extrabold tracking-wide text-[#C1272D]">
                {t.hero.badge}
              </span>
            </div>

            {/* Main H1 */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.35rem] font-black tracking-tight text-[#071A3D] leading-[1.18] mb-5"
              style={{ textWrap: "balance" }}
            >
              {language === "ary" ? (
                <>
                  جيب{" "}
                  <span className="text-[#C1272D] underline decoration-red-500/30 underline-offset-8">
                    البيرمي ديالك
                  </span>{" "}
                  فالمغرب من الدقة الأولى.
                </>
              ) : isArabic ? (
                <>
                  اضمن{" "}
                  <span className="text-[#C1272D] underline decoration-red-500/30 underline-offset-8">
                    رخصة السياقة
                  </span>{" "}
                  في المغرب من المرة الأولى.
                </>
              ) : (
                <>
                  Réussis ton{" "}
                  <span className="text-[#C1272D] underline decoration-red-500/30 underline-offset-4">
                    permis
                  </span>{" "}
                  au Maroc.
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-7 max-w-xl font-normal">
              {t.hero.subtitle}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
              <Link
                href="/examen-blanc"
                className="px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#E30D2B] hover:bg-[#D90B28] transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-red-500/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>

              <Link
                href="#quick-test"
                className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#071A3D] bg-white hover:bg-slate-50 transition-all flex items-center justify-center gap-2.5 border border-[#E2E8F0] hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0 shadow-xs cursor-pointer whitespace-nowrap"
              >
                <div className="w-5 h-5 rounded-full bg-red-50 text-[#C1272D] flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 fill-current" />
                </div>
                <span>{t.hero.secondaryCta}</span>
              </Link>
            </div>

            {/* 4 Feature Navigation Cards */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xl mb-6">
              {featureCards.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <Link
                    key={idx}
                    href={feat.href}
                    className="p-3.5 rounded-2xl bg-white hover:bg-slate-50/90 border border-[#E2E8F0] hover:border-[#F20D2F]/35 hover:shadow-md transition-all flex items-center gap-3 group shadow-xs cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-[#071A3D] group-hover:text-[#C1272D] transition-colors truncate">
                        {feat.title}
                      </span>
                      <span className="text-xs text-[#5A6A82] truncate">
                        {feat.desc}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Unboxed Trust Line */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A6A82] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#20C875] shrink-0" />
              <span>
                {isArabic
                  ? "محتوى تعليمي محين وفق مدونة السير المغربية (القانون 52-05)"
                  : "Conforme à la Loi 52-05 du Code de la Route marocain"}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-[#071A3D] font-bold">
                {isArabic ? "مجاني بدون تسجيل معقد" : "Accès immédiat"}
              </span>
            </div>
          </div>

          {/* Hero visual: HD scene by default, optional live 3D */}
          <div className="lg:col-span-6 relative w-full h-[420px] sm:h-[490px] lg:h-[560px] z-10 overflow-hidden rounded-3xl bg-[#DCE9F6] border border-[#E2E8F0]">
            {!interactiveMode ? (
              <>
                <Image
                  src="/images/hero.jpg"
                  alt="Permis Maroc — scène de conduite 3D au Maroc"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center select-none"
                />
                <button
                  type="button"
                  onClick={() => setInteractiveMode(true)}
                  className="absolute bottom-3 right-3 z-20 px-3.5 py-2 rounded-xl bg-white/95 hover:bg-white text-[#071A3D] border border-[#E2E8F0] shadow-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-sm"
                >
                  <Boxes className="w-3.5 h-3.5 text-[#E30D2B]" />
                  <span>{isArabic ? "تفعيل المشهد التفاعلي" : "Activer la 3D interactive"}</span>
                </button>
              </>
            ) : (
              <>
                <HeroRoadWrapper />
                <button
                  type="button"
                  onClick={() => setInteractiveMode(false)}
                  className="absolute bottom-3 right-3 z-30 px-3.5 py-2 rounded-xl bg-white/95 hover:bg-white text-[#071A3D] border border-[#E2E8F0] shadow-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>{isArabic ? "عرض عالي الدقة" : "Vue Haute Définition"}</span>
                </button>
              </>
            )}
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
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C1272D] border border-red-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-[#071A3D] tracking-tight tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#5A6A82] font-semibold">
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
