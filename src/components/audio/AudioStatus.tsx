"use client";

import React from "react";
import { Volume2, Pause } from "lucide-react";
import { useAudioOptional } from "@/providers/AudioProvider";
import { useLanguage } from "@/lib/i18n/useLanguage";

/**
 * Compact floating control when Audio Mode is active.
 * Sits above the mobile bottom nav / safe area.
 */
export function AudioStatus() {
  const audio = useAudioOptional();
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  if (!audio?.settings.audioMode) return null;
  if (audio.status === "idle" && !audio.error) return null;

  return (
    <div
      className="fixed z-40 right-3 md:right-6 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] md:bottom-6"
      role="status"
      aria-live="polite"
    >
      <button
        type="button"
        onClick={() => void audio.toggle()}
        aria-label={
          audio.isPlaying
            ? isArabic
              ? "إيقاف مؤقت للصوت"
              : "Mettre l'audio en pause"
            : isArabic
              ? "استئناف الصوت"
              : "Reprendre l'audio"
        }
        className="min-h-11 min-w-11 p-3 rounded-full bg-[#071A3D] text-white shadow-lg shadow-slate-900/20 border border-white/10 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D2F] focus-visible:ring-offset-2"
      >
        {audio.isPlaying ? (
          <Pause className="w-4 h-4" aria-hidden />
        ) : (
          <Volume2 className="w-4 h-4" aria-hidden />
        )}
      </button>
    </div>
  );
}
