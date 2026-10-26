"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/types/models";
import { translations } from "./translations";
import { mapUiLanguageToAudio } from "./localizeContent";
import {
  AUDIO_STORAGE_KEY,
  DEFAULT_AUDIO_SETTINGS,
} from "@/lib/audio/types";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.ar;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "ar",
  setLanguage: () => {},
  t: translations.ar,
  isRtl: true,
});

const STORAGE_KEY = "permis_maroc_lang_v2";

function syncAudioLanguage(lang: Language) {
  try {
    const raw = localStorage.getItem(AUDIO_STORAGE_KEY);
    const current = raw
      ? { ...DEFAULT_AUDIO_SETTINGS, ...JSON.parse(raw) }
      : { ...DEFAULT_AUDIO_SETTINGS };
    const nextLang = mapUiLanguageToAudio(lang);
    if (current.audioLanguage === nextLang) return;
    localStorage.setItem(
      AUDIO_STORAGE_KEY,
      JSON.stringify({ ...current, audioLanguage: nextLang })
    );
    window.dispatchEvent(
      new CustomEvent("pm-audio-settings", {
        detail: { audioLanguage: nextLang },
      })
    );
  } catch {
    /* ignore */
  }
}

function readSavedLanguage(): Language {
  if (typeof window === "undefined") return "ar";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === "ar" || saved === "ary" || saved === "fr") return saved;
  } catch {
    /* ignore */
  }
  return "ar";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readSavedLanguage);

  useEffect(() => {
    document.documentElement.dir =
      language === "ar" || language === "ary" ? "rtl" : "ltr";
    document.documentElement.lang = language === "ary" ? "ar" : language;
    syncAudioLanguage(language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const isRtl = language === "ar" || language === "ary";

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        isRtl,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
