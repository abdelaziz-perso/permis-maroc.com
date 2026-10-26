"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider, useUser } from "@/context/UserContext";
import { AudioProvider } from "@/providers/AudioProvider";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
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

  const lessonSpeech = [
    currentLesson.title,
    currentLesson.summary,
    ...currentLesson.content,
    "Règles d'or à retenir :",
    ...currentLesson.keyRules,
  ].join(" ");

  return (
    <LanguageProvider>
      <UserProvider>
        <AudioProvider>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#071A3D]">
          <Navbar />

          <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
            <div className="flex items-center gap-2 text-xs text-[#5A6A82] mb-6">
              <Link href="/code-de-la-route" className="hover:text-[#071A3D] transition-colors">
                Code de la Route
              </Link>
              <span>/</span>
              <span className="text-[#071A3D] font-medium">{category.title}</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] mb-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#C1272D] uppercase tracking-wider block mb-1">
                    Leçon {activeLessonIndex + 1} sur {category.lessons.length}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-[#071A3D]">
                    {currentLesson.title}
                  </h1>
                </div>

                <button
                  onClick={() => completeLesson(currentLesson.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isCompleted
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                      : "bg-[#E30D2B] hover:bg-[#D90B28] text-white shadow-md shadow-red-500/20"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCompleted ? "Leçon Validée (+50 XP)" : "Marquer comme terminé"}</span>
                </button>
              </div>

              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#F20D2F] to-emerald-500 h-full transition-all duration-300"
                  style={{
                    width: `${((activeLessonIndex + 1) / category.lessons.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <AudioPlayer
                id={`lesson-${currentLesson.id}`}
                text={lessonSpeech}
                language="fr"
                title="Audio du cours"
              />

              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
                <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Résumé essentiel</span>
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {currentLesson.summary}
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
                <h3 className="text-lg font-bold text-[#071A3D] mb-2">Explications détaillées</h3>
                {currentLesson.content.map((paragraph, idx) => (
                  <p key={idx} className="text-sm text-slate-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-red-50 border border-red-100">
                <h3 className="text-sm font-bold text-[#C1272D] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#C1272D]" />
                  <span>Règles d&apos;or à retenir pour l&apos;examen</span>
                </h3>
                <ul className="space-y-2">
                  {currentLesson.keyRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E30D2B] mt-2 shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {currentLesson.quiz && (
                <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                      Mini-Quiz de vérification
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#071A3D] mb-4">
                    {currentLesson.quiz.question}
                  </h4>

                  <div className="space-y-2.5 mb-4">
                    {currentLesson.quiz.options.map((option, idx) => {
                      const isSelected = quizAnswer === idx;
                      const isCorrect = idx === currentLesson.quiz?.correctIndex;

                      let style =
                        "border-[#E2E8F0] bg-[#F8FAFC] hover:bg-slate-100 text-[#071A3D]";
                      if (isSelected) {
                        if (isCorrect) {
                          style = "border-emerald-500 bg-emerald-50 text-emerald-800";
                        } else {
                          style = "border-red-500 bg-red-50 text-red-800";
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
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <span className="text-xs text-[#C1272D] font-bold">Incorrect</span>
                              )}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizAnswer !== null && (
                    <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-slate-600">
                      <span className="font-bold text-[#071A3D] block mb-1">Explication :</span>
                      {currentLesson.quiz.explanation}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-[#E2E8F0]">
                <button
                  disabled={activeLessonIndex === 0}
                  onClick={handlePrev}
                  className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold text-[#071A3D] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>Leçon précédente</span>
                </button>

                {activeLessonIndex < category.lessons.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-[#E30D2B] hover:bg-[#D90B28] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md shadow-red-500/20 cursor-pointer"
                  >
                    <span>Leçon suivante</span>
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                ) : (
                  <Link
                    href="/examen-blanc"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
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
        </AudioProvider>
      </UserProvider>
    </LanguageProvider>
  );
}
