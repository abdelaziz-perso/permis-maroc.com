"use client";

import React from "react";
import { Volume2, Pause, Loader2, RotateCcw } from "lucide-react";
import { useAudioOptional } from "@/providers/AudioProvider";
import type { AudioLanguage } from "@/lib/audio/types";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface AudioButtonProps {
  id: string;
  text: string;
  language?: AudioLanguage;
  url?: string;
  label?: string;
  playingLabel?: string;
  size?: "sm" | "md";
  variant?: "primary" | "ghost" | "icon";
  className?: string;
  stopPropagation?: boolean;
}

export function AudioButton({
  id,
  text,
  language,
  url,
  label,
  playingLabel,
  size = "md",
  variant = "primary",
  className = "",
  stopPropagation = false,
}: AudioButtonProps) {
  const audio = useAudioOptional();
  const { language: uiLang } = useLanguage();
  const isArabic = uiLang === "ar" || uiLang === "ary";

  if (!audio) return null;

  const resolvedLang =
    language ??
    (uiLang === "fr" ? "fr" : uiLang === "ary" ? "darija" : "ar");

  const isCurrent = audio.currentId === id;
  const isPlaying = isCurrent && audio.isPlaying;
  const isLoading = isCurrent && audio.status === "loading";
  const isError = isCurrent && audio.status === "error";

  const defaultLabel =
    uiLang === "ary" ? "سمع" : uiLang === "ar" ? "استمع" : "Écouter";
  const defaultPlaying =
    uiLang === "ary" ? "وقف" : uiLang === "ar" ? "إيقاف مؤقت" : "Pause";

  const handleClick = async (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isError) {
      await audio.play({ id, text, language: resolvedLang, url });
      return;
    }
    await audio.toggle({ id, text, language: resolvedLang, url });
  };

  const minSize = size === "sm" ? "min-h-11 min-w-11" : "min-h-11";
  const pad =
    variant === "icon"
      ? "p-2.5"
      : size === "sm"
        ? "px-3 py-2.5"
        : "px-4 py-2.5";

  const variantClass =
    variant === "primary"
      ? "bg-[#071A3D] hover:bg-[#0F295A] text-white shadow-sm"
      : variant === "ghost"
        ? "bg-white hover:bg-slate-50 text-[#071A3D] border border-[#E2E8F0]"
        : "bg-[#F6F9FD] hover:bg-slate-100 text-[#071A3D] border border-[#E2E8F0]";

  const aria =
    isPlaying
      ? playingLabel || defaultPlaying
      : isError
        ? isArabic
          ? "إعادة المحاولة"
          : "Réessayer"
        : label || defaultLabel;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={aria}
      aria-pressed={isPlaying}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D2F] focus-visible:ring-offset-2 cursor-pointer ${minSize} ${pad} ${variantClass} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
      ) : isError ? (
        <RotateCcw className="w-4 h-4" aria-hidden />
      ) : isPlaying ? (
        <Pause className="w-4 h-4" aria-hidden />
      ) : (
        <Volume2 className="w-4 h-4" aria-hidden />
      )}
      {variant !== "icon" && (
        <span>
          {isError
            ? isArabic
              ? "إعادة"
              : "Réessayer"
            : isPlaying
              ? playingLabel || defaultPlaying
              : label || defaultLabel}
        </span>
      )}
    </button>
  );
}
