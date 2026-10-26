"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useUser } from "@/context/UserContext";
import { sampleQuestions } from "@/data/questions";
import { AudioButton } from "@/components/audio/AudioButton";
import { useAudioOptional } from "@/providers/AudioProvider";
import {
  buildCorrectionSpeech,
  buildQuestionSpeech,
  mapUiLanguageToAudio,
} from "@/lib/audio/speechBuilders";
import {
  Clock,
  Bookmark,
  ArrowRight,
  RotateCcw,
  Award,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export function MobileTestView() {
  const { language } = useLanguage();
  const { recordExamResult } = useUser();
  const audio = useAudioOptional();
  const isArabic = language === "ar" || language === "ary";
  const audioLang = audio?.settings.audioLanguage ?? mapUiLanguageToAudio(language);

  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(1122); // 18:42
  const [isCompleted, setIsCompleted] = useState(false);
  const score = 35;
  const autoReadToken = useRef(0);

  const totalQuestions = 40;
  const questionsList = sampleQuestions;
  const currentQuestion =
    questionsList[currentQuestionIndex % questionsList.length];

  const situationText =
    audioLang === "fr"
      ? currentQuestion.audioDescription?.fr
      : audioLang === "darija"
        ? currentQuestion.audioDescription?.darija ||
          currentQuestion.audioDescription?.ar
        : currentQuestion.audioDescription?.ar;

  const questionSpeech = buildQuestionSpeech({
    question: currentQuestion,
    index: currentQuestionIndex + 1,
    total: totalQuestions,
    language: audioLang,
    includeAnswers: audio?.settings.autoReadAnswers ?? true,
    situationText,
  });

  // Timer countdown
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  // Auto-read question when Audio Mode is on
  useEffect(() => {
    if (!audio?.settings.audioMode || !audio.settings.autoReadQuestions) return;
    if (isCompleted || revealed) return;
    const token = ++autoReadToken.current;
    const t = window.setTimeout(() => {
      if (token !== autoReadToken.current) return;
      void audio.play({
        id: `q-${currentQuestion.id}-${currentQuestionIndex}`,
        text: questionSpeech,
        language: audioLang,
      });
    }, 350);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional on question change
  }, [currentQuestionIndex, audio?.settings.audioMode]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectAnswer = (answerId: string) => {
    if (revealed) return;
    setSelectedAnswerId(answerId);
    setRevealed(true);
    audio?.stop();

    if (audio?.settings.audioMode && audio.settings.autoReadCorrections) {
      const correct = currentQuestion.answers.find((a) => a.isCorrect);
      const isCorrect = correct?.id === answerId;
      const speech = buildCorrectionSpeech({
        question: currentQuestion,
        isCorrect,
        language: audioLang,
      });
      void audio.play({
        id: `corr-${currentQuestion.id}-${currentQuestionIndex}`,
        text: speech,
        language: audioLang,
      });
    }
  };

  const handleNext = () => {
    audio?.stop();
    if (currentQuestionIndex >= totalQuestions - 1) {
      // Finish exam
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
      recordExamResult({
        id: `exam-${Date.now()}`,
        date: new Date().toISOString(),
        licenceCategory: "B",
        score: score,
        totalQuestions: totalQuestions,
        passed: score >= 34,
        timeSpentSeconds: 1200 - secondsRemaining,
        categoryBreakdown: {
          priorites: { total: 10, correct: 9 },
          signalisation: { total: 10, correct: 8 },
          stationnement: { total: 10, correct: 7 },
          "securite-routiere": { total: 10, correct: 9 },
          intersections: { total: 0, correct: 0 },
          vitesse: { total: 0, correct: 0 },
          depassement: { total: 0, correct: 0 },
          autoroute: { total: 0, correct: 0 },
          "conduite-nuit": { total: 0, correct: 0 },
          "meteo-pluie": { total: 0, correct: 0 },
          "premiers-secours": { total: 0, correct: 0 },
          "eco-conduite": { total: 0, correct: 0 },
        },
        answers: [],
      });
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswerId(null);
      setRevealed(false);
    }
  };

  const progressPercentage = Math.round(
    ((currentQuestionIndex + 1) / totalQuestions) * 100
  );

  // -------------------------------------------------------------
  // SCREEN 4: RESULTS VIEW
  // -------------------------------------------------------------
  if (isCompleted) {
    const passed = score >= 34;

    const themeResults = [
      {
        grade: "A",
        label: isArabic ? "الأسبقيات" : "Priorités",
        pct: 90,
        color: "text-emerald-700 bg-emerald-100",
        barColor: "bg-[#20C875]",
      },
      {
        grade: "A",
        label: isArabic ? "التشوير الطرقي" : "Signalisation",
        pct: 85,
        color: "text-emerald-700 bg-emerald-100",
        barColor: "bg-[#20C875]",
      },
      {
        grade: "B",
        label: isArabic ? "الوقوف والتوقف" : "Stationnement",
        pct: 65,
        color: "text-amber-700 bg-amber-100",
        barColor: "bg-[#FFB020]",
      },
      {
        grade: "A",
        label: isArabic ? "السلامة الطرقية" : "Sécurité routière",
        pct: 92,
        color: "text-emerald-700 bg-emerald-100",
        barColor: "bg-[#20C875]",
      },
    ];

    return (
      <div className="space-y-6 pt-2 pb-6">
        {/* Results Heading */}
        <div className="text-center pt-2">
          {/* Circular Score Visualization matching Screen 4 */}
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-4">
            {/* SVG Circular Green Ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#E5ECF5"
                strokeWidth="7"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#20C875"
                strokeWidth="7"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * score) / totalQuestions}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Award className="w-7 h-7 text-amber-400 mb-0.5" />
              <span className="text-3xl font-black text-[#071A3D] tracking-tight">
                {score} <span className="text-xl text-[#5A6A82]">/ {totalQuestions}</span>
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-black text-[#071A3D]">
            {passed
              ? isArabic
                ? "مبروك النجاح 🎉"
                : "Examen réussi !"
              : isArabic
              ? "استمر في التدريب 💪"
              : "Continue tes révisions !"}
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6A82] max-w-xs mx-auto mt-1 leading-relaxed">
            {passed
              ? isArabic
                ? "ممتاز ! أنت مستعد لاجتياز الامتحان الرسمي بنجاح."
                : "Excellent ! Tu es prêt pour l'examen. Continue sur cette lancée."
              : isArabic
              ? "أنت قريب من النجاح، راجع أخطاءك وحاول مرة أخرى."
              : "Tu es presque prêt, revois tes points faibles pour décrocher le permis."}
          </p>
        </div>

        {/* Theme breakdown section */}
        <div className="rounded-3xl bg-white border border-[#E5ECF5] p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-[#5A6A82] uppercase tracking-wider">
            {isArabic ? "نتائجك حسب المحور" : "Vos résultats par thème"}
          </h3>

          <div className="space-y-3.5">
            {themeResults.map((t, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${t.color}`}
                    >
                      {t.grade}
                    </span>
                    <span className="font-bold text-[#071A3D]">{t.label}</span>
                  </div>
                  <span className="font-bold text-[#071A3D]">{t.pct}%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${t.barColor}`}
                    style={{ width: `${t.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons matching reference */}
        <div className="space-y-3">
          <button
            onClick={() => {
              setIsCompleted(false);
              setCurrentQuestionIndex(0);
              setSelectedAnswerId(null);
              setRevealed(false);
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#E30D2B] hover:bg-[#D90B28] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{isArabic ? "مراجعة أخطائي" : "Revoir mes erreurs"}</span>
          </button>

          <button
            onClick={() => {
              setIsCompleted(false);
              setCurrentQuestionIndex(0);
              setSelectedAnswerId(null);
              setRevealed(false);
              setSecondsRemaining(1200);
            }}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-[#071A3D] font-bold text-sm flex items-center justify-center gap-2 border border-[#E5ECF5] active:scale-[0.98] transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#5A6A82]" />
            <span>{isArabic ? "إعادة الاختبار" : "Refaire un test"}</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 3: ACTIVE TEST VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-4">
      {/* Top Test Header: Timer & Question Counter */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex flex-col">
          <span className="text-base font-black text-[#071A3D]">
            {isArabic ? (
              <>السؤال {currentQuestionIndex + 1} / {totalQuestions}</>
            ) : (
              <>Question {currentQuestionIndex + 1} / {totalQuestions}</>
            )}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-mono font-bold text-[#C1272D]">
          <Clock className="w-3.5 h-3.5 text-[#C1272D]" />
          <span>{formatTimer(secondsRemaining)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full bg-[#E5ECF5] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#E30D2B] transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="text-xs font-bold text-[#5A6A82]">
          {progressPercentage}%
        </span>
      </div>

      {/* Road Scenario Illustration / Scene */}
      <div className="w-full h-44 sm:h-52 rounded-3xl overflow-hidden relative border border-[#E5ECF5] bg-gradient-to-b from-sky-100 via-amber-50 to-slate-100 shadow-sm flex items-center justify-center">
        {/* Driving perspective cockpit illustration */}
        <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none">
          <div className="flex justify-between items-start">
            <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white text-[10px] font-bold">
              Situation réelle • Intersection
            </span>
            <div className="w-8 h-8 rounded-full bg-[#DC2626] border-2 border-white flex items-center justify-center text-white text-[9px] font-black shadow-md">
              STOP
            </div>
          </div>
          {/* Dashboard wheel bottom outline */}
          <div className="w-48 h-14 mx-auto rounded-t-full bg-slate-800/80 border-t-2 border-slate-600 shadow-inner flex items-center justify-center text-[10px] text-slate-300 font-semibold">
            Poste de conduite
          </div>
        </div>
      </div>

      {/* Question Text */}
      <div className="pt-1 space-y-3">
        <h2 className="text-base sm:text-lg font-black text-[#071A3D] leading-snug">
          {isArabic
            ? currentQuestion.questionAr || currentQuestion.question
            : currentQuestion.question}
        </h2>
        <AudioButton
          id={`q-${currentQuestion.id}-${currentQuestionIndex}`}
          text={questionSpeech}
          language={audioLang}
          label={isArabic ? "استمع للسؤال" : "Écouter la question"}
          playingLabel={isArabic ? "إيقاف مؤقت" : "Pause"}
          variant="ghost"
          size="sm"
        />
      </div>

      {/* Answer Choice Cards (A, B, C) */}
      <div className="space-y-2.5" role="group" aria-label={isArabic ? "الإجابات" : "Réponses"}>
        {currentQuestion.answers.map((answer, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C...
          const isSelected = selectedAnswerId === answer.id;
          const answerText = isArabic ? answer.textAr || answer.text : answer.text;
          const isCorrectAnswer = answer.isCorrect;
          const showResult = revealed;
          const answerSpeech =
            (isArabic ? "الجواب" : "Réponse") +
            ` ${letter}. ${answerText}`;

          let cardClass =
            "bg-white border-[#E5ECF5] hover:border-slate-300 text-[#071A3D]";
          if (showResult && isCorrectAnswer) {
            cardClass =
              "bg-emerald-50 border-emerald-400 ring-1 ring-emerald-400 text-[#071A3D]";
          } else if (showResult && isSelected && !isCorrectAnswer) {
            cardClass =
              "bg-red-50 border-[#F20D2F] ring-1 ring-[#F20D2F] text-[#071A3D]";
          } else if (isSelected) {
            cardClass =
              "bg-red-50/70 border-[#F20D2F] shadow-sm ring-1 ring-[#F20D2F]";
          }

          return (
            <button
              key={answer.id}
              type="button"
              onClick={() => handleSelectAnswer(answer.id)}
              disabled={revealed}
              className={`w-full p-4 rounded-2xl border text-left rtl:text-right flex items-center gap-3.5 transition-all cursor-pointer disabled:cursor-default ${cardClass}`}
            >
              <div
                className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 transition-colors ${
                  showResult && isCorrectAnswer
                    ? "bg-[#20C875] text-white"
                    : isSelected
                      ? "bg-[#E30D2B] text-white"
                      : "bg-[#F6F9FD] border border-[#E5ECF5] text-[#071A3D]"
                }`}
              >
                {letter}
              </div>
              <span className="text-sm font-bold text-[#071A3D] flex-1">
                {answerText}
              </span>
              <AudioButton
                id={`ans-${currentQuestion.id}-${answer.id}`}
                text={answerSpeech}
                language={audioLang}
                variant="icon"
                size="sm"
                stopPropagation
                label={`${isArabic ? "استمع للإجابة" : "Écouter la réponse"} ${letter}`}
              />
            </button>
          );
        })}
      </div>

      {/* Correction feedback */}
      {revealed && selectedAnswerId && (
        <div
          className="p-4 rounded-2xl border border-[#E2E8F0] bg-white space-y-3"
          aria-live="polite"
        >
          {(() => {
            const correct = currentQuestion.answers.find((a) => a.isCorrect);
            const isCorrect = correct?.id === selectedAnswerId;
            return (
              <>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                    isCorrect
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4" aria-hidden />
                  ) : (
                    <XCircle className="w-4 h-4" aria-hidden />
                  )}
                  <span>
                    {isCorrect
                      ? isArabic
                        ? "إجابة صحيحة"
                        : "Bonne réponse"
                      : isArabic
                        ? "إجابة خاطئة"
                        : "Mauvaise réponse"}
                  </span>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {isArabic
                    ? currentQuestion.explanationAr || currentQuestion.explanation
                    : currentQuestion.explanation}
                </p>
                <AudioButton
                  id={`corr-${currentQuestion.id}-${currentQuestionIndex}`}
                  text={buildCorrectionSpeech({
                    question: currentQuestion,
                    isCorrect,
                    language: audioLang,
                  })}
                  language={audioLang}
                  label={isArabic ? "استمع للشرح" : "Écouter l'explication"}
                  variant="ghost"
                  size="sm"
                />
              </>
            );
          })()}
        </div>
      )}

      {/* Bottom Action Bar in Thumb Zone */}
      <div className="pt-2 flex items-center gap-3">
        {/* Bookmark Favorite Button */}
        <button
          type="button"
          onClick={() => setBookmarked(!bookmarked)}
          className={`min-h-11 min-w-11 p-3.5 rounded-2xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D2F] ${
            bookmarked
              ? "bg-amber-50 border-amber-300 text-amber-500"
              : "bg-white border-[#E5ECF5] text-[#5A6A82] hover:text-[#071A3D]"
          }`}
          aria-label="Enregistrer la question"
        >
          <Bookmark
            className={`w-5 h-5 ${bookmarked ? "fill-amber-500" : ""}`}
          />
        </button>

        {/* Large Primary Red CTA */}
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 min-h-11 py-3.5 px-5 rounded-2xl bg-[#E30D2B] hover:bg-[#D90B28] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D2F] focus-visible:ring-offset-2"
        >
          <span>
            {currentQuestionIndex >= totalQuestions - 1
              ? isArabic
                ? "إنهاء الاختبار"
                : "Terminer le test"
              : isArabic
                ? "السؤال الموالي"
                : "Question suivante"}
          </span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
}
