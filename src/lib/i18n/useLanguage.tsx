"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/types/models";
import { translations } from "./translations";

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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default language is Standard Arabic ("ar")
  const [language, setLanguageState] = useState<Language>("ar");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === "ar" || saved === "ary" || saved === "fr") {
      setLanguageState(saved);
      document.documentElement.dir =
        saved === "ar" || saved === "ary" ? "rtl" : "ltr";
      document.documentElement.lang = saved === "ary" ? "ar" : saved;
    } else {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.dir =
      lang === "ar" || lang === "ary" ? "rtl" : "ltr";
    document.documentElement.lang = lang === "ary" ? "ar" : lang;
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
