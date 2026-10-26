"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useAudioOptional } from "@/providers/AudioProvider";
import { useLanguage } from "@/lib/i18n/useLanguage";

/** Compact header control to enable/disable Audio Mode. */
export function AudioModeToggle() {
  const audio = useAudioOptional();
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  if (!audio) return null;

  const on = audio.settings.audioMode;

  return (
    <button
      type="button"
      onClick={() => audio.updateSettings({ audioMode: !on })}
      aria-pressed={on}
      aria-label={
        on
          ? isArabic
            ? "إيقاف وضع الصوت"
            : "Désactiver le mode audio"
          : isArabic
            ? "تفعيل وضع الصوت"
            : "Activer le mode audio"
      }
      className={`min-h-11 min-w-11 p-2.5 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D2F] ${
        on
          ? "bg-[#071A3D] text-white border-[#071A3D]"
          : "bg-white text-[#071A3D] border-[#E2E8F0]"
      }`}
    >
      {on ? (
        <Volume2 className="w-4 h-4" aria-hidden />
      ) : (
        <VolumeX className="w-4 h-4" aria-hidden />
      )}
    </button>
  );
}
