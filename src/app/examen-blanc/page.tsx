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
      <div className="hidden md:flex min-h-screen flex-col bg-[#F8FAFC] text-[#071A3D]">
        <Navbar />

        <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Category Selector Bar (before exam or when restarting) */}
        {!isFinished && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#64748B] font-bold">Catégorie :</span>
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
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      category === cat
                        ? "bg-[#F20D2F] text-white shadow-md shadow-red-500/20"
                        : "bg-[#F8FAFC] text-slate-600 hover:bg-slate-100 border border-[#E2E8F0]"
                    }`}
                  >
                    Permis {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer Display */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-700">
              <Timer className="w-4 h-4 text-amber-600" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>
        )}

        {/* --- VIEW 1: ACTIVE EXAM SIMULATION --- */}
        {!isFinished && currentQ && (
          <div className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-xl">
            {/* Top Bar with Question Count and Progress */}
            <div className="px-6 py-4 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-[#F20D2F] text-white font-mono font-bold text-sm">
                  {currentIndex + 1} / {config.totalQuestions}
                </span>
                <span className="text-xs text-[#64748B] font-bold">
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
                className="text-xs text-[#64748B] hover:text-[#F20D2F] font-bold transition-colors cursor-pointer"
              >
                {t.exam.finish}
              </button>
            </div>

            {/* Progress track */}
            <div className="w-full bg-slate-100 h-1.5">
              <div
                className="bg-gradient-to-r from-[#F20D2F] to-[#20C875] h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentIndex + 1) / config.totalQuestions) * 100}%`,
                }}
              />
            </div>

            {/* Question Body */}
            <div className="p-6 sm:p-8">
              {/* Question Text */}
              <span className="text-xs font-bold text-[#F20D2F] uppercase tracking-wider block mb-2">
                Question {currentIndex + 1}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#071A3D] mb-6 leading-snug">
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
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-[#F20D2F] bg-red-50/60 text-[#071A3D] shadow-md shadow-red-500/10 ring-1 ring-[#F20D2F]"
                          : "border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#071A3D]"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                            isSelected
                              ? "bg-[#F20D2F] text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {letters[index]}
                        </span>
                        <span className="text-sm sm:text-base font-semibold">
                          {answer.text}
                        </span>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? "border-[#F20D2F] bg-[#F20D2F]"
                            : "border-slate-300 bg-transparent"
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls: Prev / Next */}
              <div className="flex items-center justify-between pt-6 border-t border-[#F1F5F9]">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold text-[#071A3D] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>{t.exam.previous}</span>
                </button>

                {currentIndex < config.totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="px-6 py-2.5 rounded-xl bg-[#F20D2F] hover:bg-[#D90B28] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md shadow-red-500/20 cursor-pointer active:scale-95"
                  >
                    <span>{t.exam.next}</span>
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinish}
                    className="px-6 py-2.5 rounded-xl bg-[#20C875] hover:bg-[#1bb267] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer active:scale-95"
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
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl text-center relative overflow-hidden">
              <div className="relative z-10">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${
                    examResult.passed
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>
                    {examResult.passed ? "Examen Validé" : "Examen Non Validé"}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-[#071A3D] mb-2">
                  {examResult.passed ? t.exam.congrats : t.exam.keepPracticing}
                </h2>

                <p className="text-[#64748B] text-sm max-w-md mx-auto mb-6">
                  {examResult.passed
                    ? "Vous avez atteint le score officiel requis par la NARSA pour cette épreuve."
                    : `Il vous manquait ${config.passingScore - examResult.score} point(s) pour atteindre le seuil éliminatoire de ${config.passingScore}/${config.totalQuestions}.`}
                </p>

                {/* Score Number Badge */}
                <div className="inline-block p-6 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] mb-8">
                  <span className="text-5xl sm:text-7xl font-black tracking-tight text-[#071A3D]">
                    {examResult.score}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#64748B] ml-2">
                    / {examResult.totalQuestions}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleRestart}
                    className="px-6 py-3 rounded-2xl bg-[#F20D2F] hover:bg-[#D90B28] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-red-500/20 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{t.exam.retryExam}</span>
                  </button>

                  <Link
                    href="/code-de-la-route"
                    className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-[#071A3D] border border-[#E2E8F0] font-bold text-sm flex items-center gap-2 transition-all shadow-xs"
                  >
                    <BookOpen className="w-4 h-4 text-[#F20D2F]" />
                    <span>Réviser les cours</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Questions Detailed Correction Review */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-bold text-[#071A3D]">
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
                      className={`p-4 rounded-2xl border ${
                        isAnsCorrect
                          ? "bg-[#F8FAFC] border-[#E2E8F0]"
                          : "bg-red-50/50 border-red-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                              isAnsCorrect
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <span className="font-bold text-sm text-[#071A3D]">
                            {q.question}
                          </span>
                        </div>
                        {isAnsCorrect ? (
                          <span className="text-xs text-emerald-600 font-bold shrink-0">
                            +1 pt
                          </span>
                        ) : (
                          <span className="text-xs text-red-600 font-bold shrink-0">
                            0 pt
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#64748B] pl-8 leading-relaxed mb-2 font-normal">
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
