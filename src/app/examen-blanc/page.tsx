"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { MobileTestView } from "@/components/mobile/MobileTestView";
import { LanguageProvider, useLanguage } from "@/lib/i18n/useLanguage";
import { UserProvider, useUser } from "@/context/UserContext";
import { sampleQuestions, examConfigs } from "@/data/questions";
import { LicenceCategory, Question, ExamResult, QuestionCategory } from "@/types/models";
import {
  Timer,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Award,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

export default function ExamPage() {
  return (
    <LanguageProvider>
      <UserProvider>
        <ExamSimulator />
      </UserProvider>
    </LanguageProvider>
  );
}

function ExamSimulator() {
  const { t } = useLanguage();
  const { recordExamResult } = useUser();

  const [category, setCategory] = useState<LicenceCategory>("B");
  const config = examConfigs[category];

  // Filter or duplicate sample questions to match exam length
  const examQuestions = React.useMemo(() => {
    // We tile questions to give full 40/30 question experience
    const base = sampleQuestions.filter(
      (q) => q.licenceCategory === category || category === "B"
    );
    const result: Question[] = [];
    while (result.length < config.totalQuestions) {
      for (const q of base) {
        if (result.length >= config.totalQuestions) break;
        result.push({
          ...q,
          id: `${q.id}-${result.length + 1}`,
        });
      }
    }
    return result;
  }, [category, config.totalQuestions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(
    config.totalQuestions * config.timePerQuestionSeconds
  );
  const [isFinished, setIsFinished] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  const handleFinish = React.useCallback(() => {
    let score = 0;
    const breakdown = {} as Record<QuestionCategory, { total: number; correct: number }>;

    examQuestions.forEach((q, idx) => {
      if (!breakdown[q.category]) {
        breakdown[q.category] = { total: 0, correct: 0 };
      }
      breakdown[q.category].total += 1;

      const chosen = userAnswers[idx];
      const correctOption = q.answers.find((a) => a.isCorrect);
      if (chosen && correctOption && chosen === correctOption.id) {
        score += 1;
        breakdown[q.category].correct += 1;
      }
    });

    const passed = score >= config.passingScore;
    const result: ExamResult = {
      id: `exam-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      licenceCategory: category,
      score,
      totalQuestions: config.totalQuestions,
      passed,
      timeSpentSeconds:
        config.totalQuestions * config.timePerQuestionSeconds - timeRemaining,
      categoryBreakdown: breakdown,
      answers: [],
    };

    setExamResult(result);
    setIsFinished(true);
    recordExamResult(result);

    if (passed) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#C1272D", "#10B981", "#F59E0B"],
        });
      } catch {}
    }
  }, [category, config.passingScore, config.timePerQuestionSeconds, config.totalQuestions, examQuestions, recordExamResult, timeRemaining, userAnswers]);

  // Timer
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished, handleFinish]);

  const handleSelectAnswer = (answerId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: answerId,
    }));
  };

  const handleRestart = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setTimeRemaining(config.totalQuestions * config.timePerQuestionSeconds);
    setIsFinished(false);
    setExamResult(null);
  };

  const currentQ = examQuestions[currentIndex];
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* MOBILE APP TEST VIEW (< 768px) matching reference design */}
      <div className="block md:hidden">
        <MobileAppShell title="Test permis B" hideBottomNav={true}>
          <MobileTestView />
        </MobileAppShell>
      </div>

      {/* DESKTOP WEB EXPERIENCE (>= 768px) */}
      <div className="hidden md:flex min-h-screen flex-col bg-[#070A0F] text-white">
        <Navbar />

        <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Category Selector Bar (before exam or when restarting) */}
        {!isFinished && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Catégorie :</span>
              <div className="flex items-center gap-1.5">
                {(["B", "A", "C"] as LicenceCategory[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      if (cat !== category) {
                        setCategory(cat);
                        handleRestart();
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      category === cat
                        ? "bg-[#C1272D] text-white shadow-md shadow-red-950/50"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    Permis {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer Display */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono font-bold text-amber-400">
              <Timer className="w-4 h-4 text-amber-400" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
        )}

        {/* --- VIEW 1: ACTIVE EXAM SIMULATION --- */}
        {!isFinished && currentQ && (
          <div className="bg-[#121824] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            {/* Top Bar with Question Count and Progress */}
            <div className="px-6 py-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-[#C1272D] text-white font-mono font-bold text-sm">
                  {currentIndex + 1} / {config.totalQuestions}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {config.title} • Seuil requis : {config.passingScore}/{config.totalQuestions}
                </span>
              </div>

              {/* Finish Exam CTA */}
              <button
                onClick={() => {
                  if (confirm(t.exam.confirmFinish)) {
                    handleFinish();
                  }
                }}
                className="text-xs text-slate-400 hover:text-red-400 font-semibold transition-colors cursor-pointer"
              >
                {t.exam.finish}
              </button>
            </div>

            {/* Progress track */}
            <div className="w-full bg-slate-950 h-1.5">
              <div
                className="bg-gradient-to-r from-[#C1272D] to-amber-500 h-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / config.totalQuestions) * 100}%`,
                }}
              />
            </div>

            {/* Question Body */}
            <div className="p-6 sm:p-8">
              {/* Question Text */}
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-2">
                Question {currentIndex + 1}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mb-6 leading-snug">
                {currentQ.question}
              </h2>

              {/* Multiple Choice Options */}
              <div className="space-y-3.5 mb-8">
                {currentQ.answers.map((answer, index) => {
                  const letters = ["A", "B", "C", "D"];
                  const isSelected = userAnswers[currentIndex] === answer.id;

                  return (
                    <button
                      key={answer.id}
                      onClick={() => handleSelectAnswer(answer.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-[#C1272D] bg-red-950/40 text-white shadow-lg shadow-red-950/30 ring-1 ring-[#C1272D]"
                          : "border-white/10 bg-slate-900/70 hover:bg-slate-800 text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                            isSelected
                              ? "bg-[#C1272D] text-white"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {letters[index]}
                        </span>
                        <span className="text-sm sm:text-base font-medium">
                          {answer.text}
                        </span>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? "border-[#C1272D] bg-[#C1272D]"
                            : "border-slate-600 bg-transparent"
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls: Prev / Next */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl border border-white/10 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>{t.exam.previous}</span>
                </button>

                {currentIndex < config.totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="px-6 py-2.5 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md shadow-red-950/40 cursor-pointer"
                  >
                    <span>{t.exam.next}</span>
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
                  >
                    <span>{t.exam.finish}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 2: COMPREHENSIVE POST-EXAM RESULTS --- */}
        {isFinished && examResult && (
          <div className="space-y-8">
            {/* Score Hero Card */}
            <div className="p-8 sm:p-12 rounded-3xl bg-[#121824] border border-white/10 shadow-2xl text-center relative overflow-hidden">
              {/* Radial glow */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blur-[120px] pointer-events-none rounded-full ${
                  examResult.passed ? "bg-emerald-600/20" : "bg-red-600/20"
                }`}
              />

              <div className="relative z-10">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${
                    examResult.passed
                      ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                      : "bg-red-950/80 border-red-500/40 text-red-300"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>
                    {examResult.passed ? "Examen Validé" : "Examen Non Validé"}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-white mb-2">
                  {examResult.passed ? t.exam.congrats : t.exam.keepPracticing}
                </h2>

                <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                  {examResult.passed
                    ? "Vous avez atteint le score officiel requis par la NARSA pour cette épreuve."
                    : `Il vous manquait ${config.passingScore - examResult.score} point(s) pour atteindre le seuil éliminatoire de ${config.passingScore}/${config.totalQuestions}.`}
                </p>

                {/* Score Number Badge */}
                <div className="inline-block p-6 rounded-2xl bg-slate-950 border border-white/10 mb-8">
                  <span className="text-5xl sm:text-7xl font-black tracking-tight text-white">
                    {examResult.score}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-slate-500 ml-2">
                    / {examResult.totalQuestions}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleRestart}
                    className="px-6 py-3 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t.exam.retryExam}</span>
                  </button>

                  <Link
                    href="/code-de-la-route"
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 font-semibold text-sm flex items-center gap-2 transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-red-400" />
                    <span>Réviser les cours</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Questions Detailed Correction Review */}
            <div className="bg-[#121824] rounded-2xl border border-white/10 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold text-white">
                  Correction détaillée des questions
                </h3>
              </div>

              <div className="space-y-4">
                {examQuestions.map((q, idx) => {
                  const chosenId = userAnswers[idx];
                  const correctOption = q.answers.find((a) => a.isCorrect);
                  const isAnsCorrect = chosenId === correctOption?.id;

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border ${
                        isAnsCorrect
                          ? "bg-slate-900/60 border-white/5"
                          : "bg-red-950/20 border-red-500/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                              isAnsCorrect
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                                : "bg-red-950 text-red-400 border border-red-500/40"
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-sm text-slate-200">
                            {q.question}
                          </span>
                        </div>
                        {isAnsCorrect ? (
                          <span className="text-xs text-emerald-400 font-bold shrink-0">
                            +1 pt
                          </span>
                        ) : (
                          <span className="text-xs text-red-400 font-bold shrink-0">
                            0 pt
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 pl-8 leading-relaxed mb-2">
                        {q.explanation}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono pl-8 block">
                        Réf : {q.officialRef}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

        <Footer />
      </div>
    </>
  );
}
