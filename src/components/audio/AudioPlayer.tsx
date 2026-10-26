"use client";

import React from "react";
import { RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { AudioButton } from "@/components/audio/AudioButton";
import { useAudioOptional } from "@/providers/AudioProvider";
import type { AudioLanguage, AudioPlaybackRate } from "@/lib/audio/types";
import { PLAYBACK_RATES } from "@/lib/audio/types";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface AudioPlayerProps {
  id: string;
  text: string;
  language?: AudioLanguage;
  url?: string;
  title?: string;
}

/**
 * Compact lesson/course audio control.
 * Uses the shared AudioProvider (browser TTS fallback when no URL).
 */
export function AudioPlayer({
  id,
  text,
  language,
  url,
  title,
}: AudioPlayerProps) {
  const audio = useAudioOptional();
  const { language: uiLang } = useLanguage();
  const isArabic = uiLang === "ar" || uiLang === "ary";

  if (!audio) return null;

  const resolvedLang =
    language ??
    (uiLang === "fr" ? "fr" : uiLang === "ary" ? "darija" : "ar");

  const isCurrent = audio.currentId === id;
  const progressPct =
    isCurrent && audio.duration > 0
      ? Math.min(100, (audio.progress / audio.duration) * 100)
      : 0;

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-xs space-y-3">
      {title && (
        <p className="text-xs font-bold text-[#5A6A82] uppercase tracking-wider">
          {title}
        </p>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        <AudioButton
          id={id}
          text={text}
          language={resolvedLang}
          url={url}
          label={isArabic ? "استمع للدرس" : "Écouter le cours"}
          variant="primary"
          size="sm"
        />

        <button
          type="button"
          aria-label={isArabic ? "إعادة من البداية" : "Recommencer"}
          onClick={() =>
            void audio.play({ id, text, language: resolvedLang, url })
          }
          className="min-h-11 min-w-11 p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F6F9FD] hover:bg-slate-100 text-[#071A3D] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D2F]"
        >
          <RotateCcw className="w-4 h-4" aria-hidden />
        </button>

        <button
          type="button"
          aria-label="-10s"
          disabled={!isCurrent || !url}
          onClick={() => {
            /* browser TTS has no seek; only URL audio supports approximate restart */
            if (url) void audio.play({ id, text, language: resolvedLang, url });
          }}
          className="min-h-11 min-w-11 p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F6F9FD] hover:bg-slate-100 text-[#071A3D] disabled:opacity-40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D2F]"
        >
          <SkipBack className="w-4 h-4" aria-hidden />
        </button>

        <button
          type="button"
          aria-label="+10s"
          disabled={!isCurrent || !url}
          onClick={() => {
            if (url) void audio.play({ id, text, language: resolvedLang, url });
          }}
          className="min-h-11 min-w-11 p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F6F9FD] hover:bg-slate-100 text-[#071A3D] disabled:opacity-40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D2F]"
        >
          <SkipForward className="w-4 h-4" aria-hidden />
        </button>
      </div>

      {/* Progress (meaningful when URL audio has duration) */}
      <div
        className="h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(progressPct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-[#F20D2F] transition-all"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] font-bold text-[#94A3B8] uppercase me-1">
          {isArabic ? "السرعة" : "Vitesse"}
        </span>
        {PLAYBACK_RATES.map((rate: AudioPlaybackRate) => (
          <button
            key={rate}
            type="button"
            onClick={() => audio.setRate(rate)}
            className={`min-h-9 px-2.5 rounded-lg text-[11px] font-bold border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F20D2F] ${
              audio.settings.playbackRate === rate
                ? "bg-[#F20D2F] text-white border-[#F20D2F]"
                : "bg-white text-[#071A3D] border-[#E2E8F0]"
            }`}
          >
            {rate}x
          </button>
        ))}
      </div>
    </div>
  );
}
