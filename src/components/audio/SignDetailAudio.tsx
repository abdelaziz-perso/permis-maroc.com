"use client";

import React from "react";
import { AudioProvider } from "@/providers/AudioProvider";
import { AudioButton } from "@/components/audio/AudioButton";
import { buildSignSpeech } from "@/lib/audio/speechBuilders";
import type { RoadSign } from "@/types/models";

export function SignDetailAudio({ sign }: { sign: RoadSign }) {
  return (
    <AudioProvider>
      <div className="mt-3">
        <AudioButton
          id={`sign-page-${sign.id}`}
          text={buildSignSpeech(sign, "fr")}
          language="fr"
          label="Écouter"
          variant="ghost"
          size="sm"
        />
      </div>
    </AudioProvider>
  );
}
