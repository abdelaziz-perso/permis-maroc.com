"use client";

import React from "react";
import { AudioProvider } from "@/providers/AudioProvider";
import { AudioButton } from "@/components/audio/AudioButton";
import { buildSignSpeech } from "@/lib/audio/speechBuilders";
import { mapUiLanguageToAudio } from "@/lib/i18n/localizeContent";
import { useLanguage } from "@/lib/i18n/useLanguage";
import type { RoadSign } from "@/types/models";

function SignDetailAudioInner({ sign }: { sign: RoadSign }) {
  const { language } = useLanguage();
  const audioLang = mapUiLanguageToAudio(language);

  return (
    <div className="mt-3">
      <AudioButton
        id={`sign-page-${sign.id}`}
        text={buildSignSpeech(sign, audioLang)}
        language={audioLang}
        label={
          language === "ary"
            ? "سمع البلاكة"
            : language === "ar"
              ? "استمع للعلامة"
              : "Écouter"
        }
        variant="ghost"
        size="sm"
      />
    </div>
  );
}

export function SignDetailAudio({ sign }: { sign: RoadSign }) {
  return (
    <AudioProvider>
      <SignDetailAudioInner sign={sign} />
    </AudioProvider>
  );
}
