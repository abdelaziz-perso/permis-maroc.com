"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider, useUser } from "@/context/UserContext";
import { CourseCategory } from "@/types/models";
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Award,
} from "lucide-react";

export function CourseCategoryClient({ category }: { category: CourseCategory }) {
  const { stats, completeLesson } = useUser();
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const currentLesson = category.lessons[activeLessonIndex] || category.lessons[0];
  const isCompleted = stats.completedLessonIds.includes(currentLesson.id);

  const handleNext = () => {
    if (activeLessonIndex < category.lessons.length - 1) {
      setActiveLessonIndex((prev) => prev + 1);
      setQuizAnswer(null);
    }
  };

  const handlePrev = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex((prev) => prev - 1);
      setQuizAnswer(null);
    }
  };

  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#070A0F] text-white">
          <Navbar />

          <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <Link href="/code-de-la-route" className="hover:text-white transition-colors">
                Code de la Route
              </Link>
              <span>/</span>
              <span className="text-white font-medium">{category.title}</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#121824] border border-white/10 mb-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block mb-1">
                    Leçon {activeLessonIndex + 1} sur {category.lessons.length}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    {currentLesson.title}
                  </h1>
                </div>

                <button
                  onClick={() => completeLesson(currentLesson.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isCompleted
                      ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300"
                      : "bg-[#C1272D] hover:bg-[#9E1F24] text-white shadow-lg shadow-red-950/50"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCompleted ? "Leçon Validée (+50 XP)" : "Marquer comme terminé"}</span>
                </button>
              </div>

              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#C1272D] to-emerald-500 h-full transition-all duration-300"
                  style={{
                    width: `${((activeLessonIndex + 1) / category.lessons.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-white/10">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Résumé essentiel</span>
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {currentLesson.summary}
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#121824] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Explications détaillées</h3>
                {currentLesson.content.map((paragraph, idx) => (
                  <p key={idx} className="text-sm text-slate-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30">
                <h3 className="text-sm font-bold text-red-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span>Règles d&apos;or à retenir pour l&apos;examen</span>
                </h3>
                <ul className="space-y-2">
                  {currentLesson.keyRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentLesson.quiz && (
                <div className="p-6 rounded-2xl bg-[#121824] border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <HelpCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Mini-Quiz de vérification
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-4">
                    {currentLesson.quiz.question}
                  </h4>

                  <div className="space-y-2.5 mb-4">
                    {currentLesson.quiz.options.map((option, idx) => {
                      const isSelected = quizAnswer === idx;
                      const isCorrect = idx === currentLesson.quiz?.correctIndex;

                      let style =
                        "border-white/10 bg-slate-900/80 hover:bg-slate-800 text-slate-200";
                      if (isSelected) {
                        if (isCorrect) {
                          style = "border-emerald-500 bg-emerald-950/40 text-emerald-200";
                        } else {
                          style = "border-red-500 bg-red-950/40 text-red-200";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => setQuizAnswer(idx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${style}`}
                        >
                          <span>{option}</span>
                          {isSelected && (
                            <span>
                              {isCorrect ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <span className="text-xs text-red-400 font-bold">Incorrect</span>
                              )}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizAnswer !== null && (
                    <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/5 text-xs text-slate-300">
                      <span className="font-bold text-white block mb-1">Explication :</span>
                      {currentLesson.quiz.explanation}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  disabled={activeLessonIndex === 0}
                  onClick={handlePrev}
                  className="px-4 py-2.5 rounded-xl border border-white/10 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>Leçon précédente</span>
                </button>

                {activeLessonIndex < category.lessons.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md shadow-red-950/40 cursor-pointer"
                  >
                    <span>Leçon suivante</span>
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                ) : (
                  <Link
                    href="/examen-blanc"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all"
                  >
                    <span>Faire un test sur ce thème</span>
                    <Award className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </main>

          <Footer />
          <MobileBottomNav />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
