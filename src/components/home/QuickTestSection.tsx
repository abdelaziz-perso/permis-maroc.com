"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { sampleQuestions } from "@/data/questions";
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function QuickTestSection() {
  const { t } = useLanguage();
  // Question 1: Priorité à droite
  const question = sampleQuestions[0];
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);

  const selectedAnswer = question.answers.find((a) => a.id === selectedAnswerId);
  const isCorrect = selectedAnswer ? selectedAnswer.isCorrect : null;

  return (
    <section id="quick-test" className="py-16 lg:py-24 bg-[#0B0F17] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-red-500/30 text-xs font-semibold text-red-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.quickTest.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {t.quickTest.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.quickTest.subtitle}
          </p>
        </div>

        {/* Question Card Box */}
        <div className="bg-[#121824] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Top Progress Bar & Header */}
          <div className="px-6 py-4 bg-slate-900/80 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-[#C1272D] text-white text-xs font-mono font-bold">
                1 / 40
              </span>
              <span className="text-xs font-medium text-slate-300">
                {t.quickTest.questionNumber}
              </span>
            </div>

            {/* Simulated Progress bar (1/40 = 2.5%) */}
            <div className="w-full sm:w-48 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#C1272D] to-amber-500 h-full w-[2.5%]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 lg:p-8">
            {/* Visual Scenario Illustration */}
            <div className="md:col-span-6 flex flex-col items-center justify-center">
              <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-slate-900 to-[#1A2234] border border-white/10 flex flex-col items-center justify-center p-6 relative overflow-hidden group">
                {/* Visual Intersection Vector Graphic */}
                <svg
                  viewBox="0 0 240 180"
                  className="w-full h-full max-w-[280px] drop-shadow-lg"
                  aria-label="Illustration carrefour sans signalisation"
                >
                  {/* Ground */}
                  <rect x="0" y="0" width="240" height="180" fill="#0F172A" />

                  {/* Vertical Road */}
                  <rect x="90" y="0" width="60" height="180" fill="#1E293B" />
                  {/* Horizontal Road */}
                  <rect x="0" y="60" width="240" height="60" fill="#1E293B" />

                  {/* Junction Center */}
                  <rect x="90" y="60" width="60" height="60" fill="#293548" />

                  {/* White Dashed lines */}
                  <line x1="120" y1="5" x2="120" y2="55" stroke="#F8FAFC" strokeWidth="2.5" strokeDasharray="6 4" />
                  <line x1="120" y1="125" x2="120" y2="175" stroke="#F8FAFC" strokeWidth="2.5" strokeDasharray="6 4" />
                  <line x1="5" y1="90" x2="85" y2="90" stroke="#F8FAFC" strokeWidth="2.5" strokeDasharray="6 4" />
                  <line x1="155" y1="90" x2="235" y2="90" stroke="#F8FAFC" strokeWidth="2.5" strokeDasharray="6 4" />

                  {/* Vehicle A (You / Red) waiting at bottom */}
                  <g transform="translate(100, 130)">
                    <rect x="0" y="0" width="20" height="34" rx="4" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1" />
                    <rect x="2" y="6" width="16" height="18" rx="2" fill="#0F172A" />
                    <text x="10" y="24" fontSize="10" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">VOUS</text>
                  </g>

                  {/* Vehicle B (Blue) coming from RIGHT */}
                  <g transform="translate(170, 70)">
                    <rect x="0" y="0" width="34" height="20" rx="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />
                    <rect x="6" y="2" width="18" height="16" rx="2" fill="#0F172A" />
                    <text x="17" y="14" fontSize="9" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">B</text>
                  </g>

                  {/* Arrow indicating Vehicle B's approach */}
                  <line x1="165" y1="80" x2="140" y2="80" stroke="#FACC15" strokeWidth="2.5" markerEnd="url(#arrow)" />
                </svg>

                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 backdrop-blur text-[10px] text-slate-400 font-mono">
                  Intersection non régulée
                </div>
              </div>
            </div>

            {/* Question & Options */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wider block mb-1">
                  Code de la Route Marocain • Priorités
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
                  {question.question}
                </h3>

                {/* Answer Cards */}
                <div className="space-y-3 mb-6">
                  {question.answers.map((answer, index) => {
                    const letters = ["A", "B", "C"];
                    const isSelected = selectedAnswerId === answer.id;

                    let cardClass =
                      "border-white/10 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-600 text-slate-200";

                    if (isSelected) {
                      if (answer.isCorrect) {
                        cardClass =
                          "border-emerald-500 bg-emerald-950/40 text-emerald-100 shadow-md shadow-emerald-950/50";
                      } else {
                        cardClass =
                          "border-red-500 bg-red-950/40 text-red-100 shadow-md shadow-red-950/50";
                      }
                    }

                    return (
                      <button
                        key={answer.id}
                        onClick={() => setSelectedAnswerId(answer.id)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${cardClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                              isSelected
                                ? answer.isCorrect
                                  ? "bg-emerald-500 text-white"
                                  : "bg-red-500 text-white"
                                : "bg-slate-800 text-slate-300"
                            }`}
                          >
                            {letters[index]}
                          </span>
                          <span className="text-sm font-medium">{answer.text}</span>
                        </div>

                        {isSelected && (
                          <span>
                            {answer.isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" />
                            )}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback & Explanation */}
              {selectedAnswerId && (
                <div
                  className={`p-4 rounded-xl border mb-6 transition-all ${
                    isCorrect
                      ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                      : "bg-red-950/40 border-red-500/40 text-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{t.quickTest.correct}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span>{t.quickTest.incorrect}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {question.explanation}
                  </p>
                  <span className="block mt-2 text-[10px] text-slate-400 font-mono">
                    Réf : {question.officialRef}
                  </span>
                </div>
              )}

              {/* CTA to Full Exam */}
              <Link
                href="/examen-blanc"
                className="w-full py-3.5 px-4 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-950/40"
              >
                <span>{t.quickTest.cta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* Legal / Educational disclaimer */}
          <div className="px-6 py-3 bg-slate-950 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{t.quickTest.disclaimer}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
