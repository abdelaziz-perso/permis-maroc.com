"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { MobileProfileView } from "@/components/mobile/MobileProfileView";
import { LanguageProvider, useLanguage } from "@/lib/i18n/useLanguage";
import { UserProvider, useUser } from "@/context/UserContext";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { courseCategories } from "@/data/courses";
import {
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Target,
  Trophy,
  ShieldCheck,
  Calendar,
  Sparkles,
  Settings,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AuthGuard>
          <UserProvider>
            <DashboardContent />
          </UserProvider>
        </AuthGuard>
      </AuthProvider>
    </LanguageProvider>
  );
}

function DashboardContent() {
  const { t } = useLanguage();
  const { user, stats, examHistory } = useUser();

  const inProgressCategories = courseCategories.slice(0, 3);

  return (
    <>
      {/* MOBILE APP PROFILE VIEW (< 768px) matching reference design Screen 8 */}
      <div className="block md:hidden">
        <MobileAppShell
          title="Mon profil"
          rightAction={<Settings className="w-5 h-5 text-[#071A3D]" />}
        >
          <MobileProfileView />
        </MobileAppShell>
      </div>

      {/* DESKTOP WEB DASHBOARD (>= 768px) */}
      <div className="hidden md:flex min-h-screen flex-col bg-[#F8FAFC] text-[#071A3D]">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Top Header greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs text-[#071A3D] font-semibold mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Espace Candidat</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#071A3D]">
              {t.dashboard.welcome}
            </h1>
            <p className="text-xs sm:text-sm text-[#5A6A82] mt-1">
              Connecté en tant que <span className="text-[#071A3D] font-semibold">{user?.name || "Candidat"}</span> ({user?.email})
            </p>
          </div>

          <Link
            href="/examen-blanc"
            className="px-5 py-2.5 rounded-xl bg-[#E30D2B] hover:bg-[#D90B28] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-red-500/20 w-fit"
          >
            <span>Lancer un examen blanc</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>

        {/* 4 Stat Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {/* Card 1: Progression générale */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
            <span className="text-xs font-medium text-[#5A6A82] block mb-2">
              {t.dashboard.generalProgress}
            </span>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl sm:text-4xl font-black text-[#071A3D] tracking-tight">
                72%
              </span>
              <span className="text-xs text-emerald-600 font-bold flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +8%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#F20D2F] to-emerald-500 h-full w-[72%]" />
            </div>
          </div>

          {/* Card 2: Tests réalisés */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
            <span className="text-xs font-medium text-[#5A6A82] block mb-2">
              {t.dashboard.testsTaken}
            </span>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl sm:text-4xl font-black text-[#071A3D] tracking-tight">
                {stats.testsCompleted}
              </span>
              <span className="text-xs text-slate-500">séries</span>
            </div>
            <span className="text-[11px] text-slate-500">
              Format officiel 40 questions
            </span>
          </div>

          {/* Card 3: Score moyen */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
            <span className="text-xs font-medium text-[#5A6A82] block mb-2">
              {t.dashboard.averageScore}
            </span>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl sm:text-4xl font-black text-[#071A3D] tracking-tight">
                {stats.averageScore}
              </span>
              <span className="text-sm text-slate-400 font-bold">/ 40</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              Seuil de validation atteint (34/40)
            </span>
          </div>

          {/* Card 4: Série actuelle */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
            <span className="text-xs font-medium text-[#5A6A82] block mb-2">
              {t.dashboard.currentStreak}
            </span>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl sm:text-4xl font-black text-amber-500 tracking-tight flex items-center gap-1.5">
                <Flame className="w-7 h-7 text-amber-500 fill-amber-500" />
                {stats.streakDays}
              </span>
              <span className="text-xs text-slate-500">{t.dashboard.days}</span>
            </div>
            <span className="text-[11px] text-amber-600">
              +200 XP bonus au 7ème jour !
            </span>
          </div>
        </div>

        {/* Gamification Level & XP Progress Banner */}
        <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] mb-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#C1272D] shrink-0">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">
                  Niveau {stats.level}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-[#071A3D] font-mono">
                  {stats.xp} XP
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#071A3D]">
                Plus que {3000 - stats.xp > 0 ? 3000 - stats.xp : 0} XP pour débloquer le statut « Prêt pour l&apos;examen »
              </h3>
            </div>
          </div>

          <div className="w-full md:w-64">
            <div className="flex justify-between text-xs text-[#5A6A82] mb-1.5">
              <span>Progression du niveau</span>
              <span className="font-mono text-[#071A3D] font-bold">{stats.levelProgress}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-500"
                style={{ width: `${stats.levelProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Two-Column Layout: Courses in progress & Tests history */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Left Column: Continuer mon apprentissage */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#071A3D] mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#C1272D]" />
                <span>{t.dashboard.continueLearning}</span>
              </h2>

              <div className="space-y-4">
                {inProgressCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/code-de-la-route/${cat.slug}`}
                    className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#F20D2F]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-xs hover:shadow-md"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[#C1272D] uppercase tracking-wider block mb-1">
                        Module • {cat.estimatedHours}h de cours
                      </span>
                      <h4 className="font-bold text-base text-[#071A3D] group-hover:text-[#C1272D] transition-colors">
                        {cat.title}
                      </h4>
                      <p className="text-xs text-[#5A6A82] mt-1 line-clamp-1">
                        {cat.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="w-24 sm:w-28 text-right">
                        <span className="text-xs font-mono font-bold text-[#071A3D]">65%</span>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                          <div className="bg-[#E30D2B] h-full w-[65%]" />
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#071A3D] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mes derniers tests */}
            <div>
              <h2 className="text-xl font-bold text-[#071A3D] mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span>{t.dashboard.recentTests}</span>
              </h2>

              <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs">
                <div className="divide-y divide-[#E2E8F0]">
                  {examHistory.map((test) => (
                    <div
                      key={test.id}
                      className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                            test.passed
                              ? "bg-emerald-50 border border-emerald-200 text-emerald-600"
                              : "bg-red-50 border border-red-200 text-[#C1272D]"
                          }`}
                        >
                          {test.passed ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <AlertCircle className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#071A3D]">
                              Permis {test.licenceCategory} • Examen Blanc
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                test.passed
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-red-50 text-[#C1272D]"
                              }`}
                            >
                              {test.passed ? t.dashboard.passed : t.dashboard.failed}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">{test.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-base sm:text-lg font-black font-mono text-[#071A3D]">
                          {test.score} / {test.totalQuestions}
                        </span>
                        <Link
                          href="/examen-blanc"
                          className="text-xs text-[#C1272D] hover:underline font-semibold"
                        >
                          {t.dashboard.review}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Points à améliorer & Badges */}
          <div className="lg:col-span-4 space-y-6">
            {/* Points à améliorer */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h3 className="text-base font-bold text-[#071A3D] mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>{t.dashboard.weakPoints}</span>
              </h3>
              <p className="text-xs text-[#5A6A82] mb-4 leading-relaxed">
                Basé sur l&apos;analyse de vos erreurs lors des 5 derniers tests :
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-[#071A3D]">Arrêt et Stationnement</span>
                    <span className="font-mono text-[#C1272D] font-bold">58%</span>
                  </div>
                  <span className="text-[11px] text-[#5A6A82] block mb-2">
                    Confusions fréquentes entre trottoirs peints et arrêt minute.
                  </span>
                  <Link
                    href="/code-de-la-route/stationnement"
                    className="text-xs font-semibold text-[#C1272D] hover:underline flex items-center gap-1"
                  >
                    <span>Réviser la fiche</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-[#071A3D]">Dépassement et Lignes</span>
                    <span className="font-mono text-amber-600 font-bold">65%</span>
                  </div>
                  <span className="text-[11px] text-[#5A6A82] block mb-2">
                    Distances latérales hors agglomération (1,5m).
                  </span>
                  <Link
                    href="/code-de-la-route/depassement"
                    className="text-xs font-semibold text-[#C1272D] hover:underline flex items-center gap-1"
                  >
                    <span>Réviser la fiche</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Badges débloqués */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
              <h3 className="text-base font-bold text-[#071A3D] mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Badges d&apos;accomplissement</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {stats.achievements.slice(0, 4).map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-xl border flex flex-col items-center text-center ${
                      badge.unlockedAt
                        ? "bg-[#F8FAFC] border-[#E2E8F0] text-[#071A3D]"
                        : "bg-slate-50 border-[#E2E8F0] opacity-50 text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${
                        badge.unlockedAt
                          ? "bg-emerald-50 border border-emerald-200 text-emerald-600"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold line-clamp-1">{badge.title}</span>
                    <span className="text-[10px] text-[#5A6A82] font-mono mt-0.5">
                      +{badge.xpReward} XP
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

        <Footer />
      </div>
    </>
  );
}
