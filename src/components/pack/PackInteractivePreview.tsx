"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  HelpCircle,
  ShieldAlert,
  Award,
  CheckCircle2,
  Play,
  Sparkles,
  Smartphone,
  ChevronRight,
  TrendingUp,
  Clock,
} from "lucide-react";

export type PreviewTab = "tests" | "cours" | "panneaux" | "examens";

interface PackInteractivePreviewProps {
  onOpenDemo?: () => void;
  isArabic?: boolean;
}

export function PackInteractivePreview({
  onOpenDemo,
  isArabic = false,
}: PackInteractivePreviewProps) {
  const [activeTab, setActiveTab] = useState<PreviewTab>("tests");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(1); // Option B selected by default

  const tabs: { id: PreviewTab; label: string; labelAr: string; icon: React.ElementType }[] = [
    { id: "tests", label: "Tests QCM", labelAr: "الأسئلة", icon: HelpCircle },
    { id: "cours", label: "Cours", labelAr: "الدروس", icon: BookOpen },
    { id: "panneaux", label: "Panneaux", labelAr: "البلايك", icon: ShieldAlert },
    { id: "examens", label: "Examens", labelAr: "الامتحانات", icon: Award },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center">
      {/* Background Ambient Glow */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Side Card 1 - Courses (Desktop only, behind right) */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute -top-4 -right-14 z-0 w-44 rounded-2xl bg-[#0F172A]/90 border border-slate-700/60 p-3 shadow-xl backdrop-blur-md items-center gap-2.5"
      >
        <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
          <BookOpen className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-bold text-white truncate">12 Modules Officiels</div>
          <div className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            100% à jour 2026
          </div>
        </div>
      </motion.div>

      {/* Floating Side Card 2 - Score (Desktop only, behind left) */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="hidden lg:flex absolute -bottom-6 -left-12 z-0 w-48 rounded-2xl bg-[#0F172A]/90 border border-slate-700/60 p-3 shadow-xl backdrop-blur-md items-center gap-2.5"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <Award className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-bold text-white truncate">Score moyen: 36/40</div>
          <div className="text-[9px] text-slate-400 truncate">Seuil de réussite: 34/40</div>
        </div>
      </motion.div>

      {/* Main Smartphone Shell Mockup */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[360px] rounded-[44px] bg-[#070D18] p-3 sm:p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border-[4px] border-[#1E293B]">
        {/* Phone Speaker Notch & Dynamic Island */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2 border border-slate-800" />
          <div className="w-8 h-1 rounded-full bg-slate-800" />
        </div>

        {/* Screen Content Container */}
        <div className="relative w-full rounded-[36px] bg-[#F8FAFC] text-slate-900 overflow-hidden min-h-[460px] flex flex-col font-sans pt-6">
          {/* Status Bar */}
          <div className="px-5 pt-1.5 pb-2 flex items-center justify-between text-[11px] font-semibold text-[#5A6A82] select-none">
            <span>09:41</span>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-4 h-2 rounded-sm border border-slate-400 flex items-center px-0.5">
                <div className="w-2.5 h-1 bg-slate-700 rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Mini App Header inside screen */}
          <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#C1272D] flex items-center justify-center text-white font-black text-xs">
                PM
              </div>
              <span className="text-xs font-black tracking-tight text-slate-800">
                PERMIS<span className="text-[#C1272D]">MAROC</span>
              </span>
            </div>
            <div className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-[#C1272D]">
              PACK PRO
            </div>
          </div>

          {/* Dynamic Interactive View */}
          <div className="flex-1 p-3.5 overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              {activeTab === "tests" && (
                <motion.div
                  key="tab-tests"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col space-y-2.5"
                >
                  {/* Progress info */}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700">Question 14/40</span>
                    <span className="text-[#5A6A82] font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-500" /> 00:28s
                    </span>
                  </div>

                  {/* Road Scenario Illustration */}
                  <div className="relative w-full h-28 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden flex flex-col items-center justify-center border border-slate-200 shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />
                    {/* Road line */}
                    <div className="w-full h-8 bg-slate-950 flex items-center justify-center">
                      <div className="w-full border-t-2 border-dashed border-yellow-400" />
                    </div>
                    {/* Simulated car and sign */}
                    <div className="absolute bottom-2 left-6 flex items-center gap-1.5">
                      <div className="w-7 h-5 rounded bg-blue-600 text-[8px] font-bold text-white flex items-center justify-center shadow">
                        Moi
                      </div>
                    </div>
                    {/* Red Stop sign indicator */}
                    <div className="absolute top-2 right-4 w-7 h-7 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white text-[8px] font-black shadow-lg">
                      STOP
                    </div>
                    <span className="absolute bottom-1 right-2 text-[9px] text-slate-300 font-medium">
                      Intersection prioritaire
                    </span>
                  </div>

                  {/* Question Prompt */}
                  <div className="text-[12px] font-bold text-slate-800 leading-snug">
                    {isArabic
                      ? "عند هذه العلامة، هل يجب عليّ التوقف الإجباري ومتابعة السير ؟"
                      : "À ce croisement avec panneau STOP, je dois obligatoirement :"}
                  </div>

                  {/* Options */}
                  <div className="space-y-1.5 flex-1">
                    {[
                      {
                        id: 0,
                        text: isArabic
                          ? "أ - التباطؤ ومتابعة السير إن كانت الطريق خالية"
                          : "A. Ralentir et passer si la voie est libre",
                        correct: false,
                      },
                      {
                        id: 1,
                        text: isArabic
                          ? "ب - التوقف التام عند الخط ومراقبة اليمين واليسار"
                          : "B. Marquer un arrêt absolu à la ligne",
                        correct: true,
                      },
                    ].map((opt) => {
                      const isSelected = selectedAnswer === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedAnswer(opt.id)}
                          className={`w-full text-left p-2 rounded-xl text-[11px] font-semibold transition-all border flex items-center justify-between ${
                            isSelected
                              ? opt.correct
                                ? "bg-emerald-50 border-emerald-400 text-emerald-900"
                                : "bg-red-50 border-red-300 text-red-900"
                              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <span className="leading-tight">{opt.text}</span>
                          {isSelected && opt.correct && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanatory bubble */}
                  <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-[10px] text-emerald-800 flex items-start gap-1.5">
                    <Sparkles className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      {isArabic
                        ? "الشرح: علامة قف توجب التوقف الكامل حتى ولو كانت الطريق خالية تماماً."
                        : "Explication : L'arrêt est obligatoire et absolu à la ligne d'effet du feu ou du panneau."}
                    </span>
                  </div>
                </motion.div>
              )}

              {activeTab === "cours" && (
                <motion.div
                  key="tab-cours"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-slate-800">
                      {isArabic ? "محاور قانون السير" : "Modules du Code"}
                    </span>
                    <span className="text-[10px] font-semibold text-blue-600">
                      {isArabic ? "12 محورا" : "12 thèmes"}
                    </span>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    {[
                      {
                        title: "1. Priorités de passage",
                        titleAr: "1. أولويات المرور والتقاطعات",
                        progress: 85,
                        lessons: "14 fiches",
                        color: "bg-blue-600",
                      },
                      {
                        title: "2. Signalisation routière",
                        titleAr: "2. علامات وإشارات المرور",
                        progress: 100,
                        lessons: "28 fiches",
                        color: "bg-emerald-600",
                      },
                      {
                        title: "3. Vitesses & Distances",
                        titleAr: "3. السرعة ومسافات الأمان",
                        progress: 60,
                        lessons: "10 fiches",
                        color: "bg-amber-600",
                      },
                      {
                        title: "4. Croisements & Dépassements",
                        titleAr: "4. التجاوز والتقابل",
                        progress: 40,
                        lessons: "12 fiches",
                        color: "bg-purple-600",
                      },
                    ].map((mod, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between"
                      >
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="text-[11px] font-bold text-slate-800 truncate">
                            {isArabic ? mod.titleAr : mod.title}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${mod.color} rounded-full`}
                                style={{ width: `${mod.progress}%` }}
                              />
                            </div>
                            <span className="text-[9px] font-bold text-slate-500">
                              {mod.progress}%
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "panneaux" && (
                <motion.div
                  key="tab-panneaux"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-slate-800">
                      {isArabic ? "دليل إشارات المرور" : "Signalisation Maroc"}
                    </span>
                    <span className="text-[10px] font-semibold text-red-600">
                      {isArabic ? "جميع البلايك" : "180+ panneaux"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 flex-1">
                    {[
                      {
                        name: "Arrêt STOP",
                        type: "Priorité",
                        shape: "octagon",
                        fine: "700 MAD",
                        color: "border-red-500 bg-red-600 text-white",
                      },
                      {
                        name: "Limitation 30",
                        type: "Interdiction",
                        shape: "circle",
                        fine: "300 MAD",
                        color: "border-red-500 bg-white text-slate-900 border-4",
                      },
                      {
                        name: "Cédez le passage",
                        type: "Priorité",
                        shape: "triangle-down",
                        fine: "500 MAD",
                        color: "border-red-500 bg-white text-slate-900 border-4",
                      },
                      {
                        name: "Stationnement",
                        type: "Indication",
                        shape: "square",
                        fine: "150 MAD",
                        color: "border-blue-500 bg-blue-600 text-white",
                      },
                    ].map((sign, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col items-center justify-between text-center"
                      >
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-[10px] shadow-sm mb-1 bg-red-50 text-red-700 border border-red-200">
                          {idx === 0 && "STOP"}
                          {idx === 1 && "30"}
                          {idx === 2 && "▽"}
                          {idx === 3 && "P"}
                        </div>
                        <div className="text-[11px] font-bold text-slate-800 leading-tight">
                          {sign.name}
                        </div>
                        <div className="text-[9px] font-semibold text-red-600 mt-1">
                          Amende: {sign.fine}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "examens" && (
                <motion.div
                  key="tab-examens"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-2.5"
                >
                  {/* Circular Score Badge */}
                  <div className="relative w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-500 flex flex-col items-center justify-center shadow-md">
                    <span className="text-2xl font-black text-emerald-600 leading-none">36</span>
                    <span className="text-[10px] font-bold text-slate-500">/ 40</span>
                  </div>

                  <div>
                    <div className="text-[13px] font-black text-slate-800">
                      {isArabic ? "مبروك ! الامتحان ناجح" : "Félicitations ! Examen validé"}
                    </div>
                    <div className="text-[10px] text-[#5A6A82] mt-0.5">
                      {isArabic
                        ? "المعدل المطلوب: 34/40 (أنت جاهز للامتحان)"
                        : "Score minimum requis : 34/40"}
                    </div>
                  </div>

                  <div className="w-full space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-600 px-1">
                      <span>Priorités & Croisements</span>
                      <span className="font-bold text-emerald-600">10/10</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-600 px-1">
                      <span>Signalisation & Règles</span>
                      <span className="font-bold text-emerald-600">14/15</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-600 px-1">
                      <span>Vitesses & Distances</span>
                      <span className="font-bold text-emerald-600">12/15</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mini Bottom Nav Bar inside Screen */}
          <div className="px-4 py-2 border-t border-slate-100 bg-white flex items-center justify-around text-slate-400">
            <Smartphone className="w-4 h-4 text-[#C1272D]" />
            <BookOpen className="w-4 h-4" />
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Interactive Screen Selector Tabs Under Phone */}
      <div className="relative z-20 mt-5 w-full flex items-center justify-center gap-1.5 sm:gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-[#C1272D] text-white shadow-lg shadow-red-500/30 scale-105"
                  : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{isArabic ? tab.labelAr : tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Demo Modal Trigger Button */}
      {onOpenDemo && (
        <button
          type="button"
          onClick={onOpenDemo}
          className="mt-3.5 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors group cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
            <Play className="w-2.5 h-2.5 fill-current" />
          </div>
          <span>{isArabic ? "شاهد طريقة العمل (فيديو تفاعلي)" : "Voir comment ça fonctionne (Démo)"}</span>
        </button>
      )}
    </div>
  );
}
