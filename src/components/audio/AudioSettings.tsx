"use client";

import React from "react";
import { Volume2, Play } from "lucide-react";
import { useAudioOptional } from "@/providers/AudioProvider";
import { PLAYBACK_RATES, type AudioLanguage, type AudioPlaybackRate } from "@/lib/audio/types";
import { useLanguage } from "@/lib/i18n/useLanguage";

export function AudioSettings() {
  const audio = useAudioOptional();
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  if (!audio) return null;

  const { settings, updateSettings, setRate, testVoice, isPlaying, currentId } =
    audio;

  const langOptions: { id: AudioLanguage; label: string }[] = [
    { id: "fr", label: "Français" },
    { id: "ar", label: "العربية" },
    { id: "darija", label: "Darija" },
  ];

  return (
    <section
      aria-labelledby="audio-settings-title"
      className="rounded-3xl bg-white border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C1272D] border border-red-100 flex items-center justify-center shrink-0">
          <Volume2 className="w-5 h-5" aria-hidden />
        </div>
        <div>
          <h2
            id="audio-settings-title"
            className="text-base font-black text-[#071A3D]"
          >
            {isArabic ? "الصوت وإمكانية الوصول" : "Audio et accessibilité"}
          </h2>
          <p className="text-xs text-[#5A6A82] mt-1 leading-relaxed">
            {isArabic
              ? "استمع للأسئلة والشروحات بالصوت. مفيد لمن يفضل الاستماع أو يجد صعوبة في القراءة."
              : "Écoutez les questions et explications. Idéal si vous préférez l'écoute ou avez des difficultés de lecture."}
          </p>
        </div>
      </div>

      {/* Mode Audio toggle */}
      <label className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] cursor-pointer">
        <span className="text-sm font-bold text-[#071A3D]">
          {isArabic ? "وضع الصوت" : "Mode Audio"} 🔊
        </span>
        <input
          type="checkbox"
          className="w-5 h-5 accent-[#F20D2F] cursor-pointer"
          checked={settings.audioMode}
          onChange={(e) => updateSettings({ audioMode: e.target.checked })}
        />
      </label>

      {/* Language */}
      <fieldset>
        <legend className="text-xs font-bold text-[#5A6A82] uppercase tracking-wider mb-2">
          {isArabic ? "لغة الصوت" : "Langue audio"}
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {langOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateSettings({ audioLanguage: opt.id })}
              className={`min-h-11 px-2 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D2F] ${
                settings.audioLanguage === opt.id
                  ? "bg-[#071A3D] text-white border-[#071A3D]"
                  : "bg-white text-[#071A3D] border-[#E2E8F0] hover:bg-slate-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Auto-read options */}
      <fieldset className="space-y-2">
        <legend className="text-xs font-bold text-[#5A6A82] uppercase tracking-wider mb-1">
          {isArabic ? "القراءة التلقائية" : "Lecture automatique"}
        </legend>
        {(
          [
            {
              key: "autoReadQuestions" as const,
              fr: "Lire automatiquement les questions",
              ar: "قراءة الأسئلة تلقائياً",
            },
            {
              key: "autoReadAnswers" as const,
              fr: "Lire les réponses",
              ar: "قراءة الإجابات",
            },
            {
              key: "autoReadCorrections" as const,
              fr: "Lire les corrections",
              ar: "قراءة التصحيحات",
            },
          ] as const
        ).map((opt) => (
          <label
            key={opt.key}
            className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#E2E8F0] cursor-pointer"
          >
            <span className="text-sm text-[#071A3D] font-medium">
              {isArabic ? opt.ar : opt.fr}
            </span>
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#F20D2F] cursor-pointer"
              checked={settings[opt.key]}
              onChange={(e) =>
                updateSettings({ [opt.key]: e.target.checked })
              }
            />
          </label>
        ))}
      </fieldset>

      {/* Playback rate */}
      <fieldset>
        <legend className="text-xs font-bold text-[#5A6A82] uppercase tracking-wider mb-2">
          {isArabic ? "سرعة التشغيل" : "Vitesse de lecture"}
        </legend>
        <div className="grid grid-cols-4 gap-2">
          {PLAYBACK_RATES.map((rate: AudioPlaybackRate) => (
            <button
              key={rate}
              type="button"
              onClick={() => setRate(rate)}
              className={`min-h-11 rounded-xl text-xs font-bold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D2F] ${
                settings.playbackRate === rate
                  ? "bg-[#F20D2F] text-white border-[#F20D2F]"
                  : "bg-white text-[#071A3D] border-[#E2E8F0] hover:bg-slate-50"
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={() => void testVoice()}
        className="w-full min-h-11 px-4 py-3 rounded-2xl bg-[#F6F9FD] hover:bg-slate-100 border border-[#E2E8F0] text-[#071A3D] text-sm font-bold flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D2F]"
      >
        <Play className="w-4 h-4" aria-hidden />
        <span>
          {isPlaying && currentId === "voice-test"
            ? isArabic
              ? "جاري الاختبار..."
              : "Test en cours..."
            : isArabic
              ? "تجربة الصوت"
              : "Tester la voix"}
        </span>
      </button>
    </section>
  );
}
