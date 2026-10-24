"use client";

import React, { createContext, useContext, useState } from "react";
import { Language } from "@/types/models";
import { translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)["fr"];
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
  t: translations.fr,
  isRtl: false,
});

function applyDirection(lang: Language) {
  if (typeof document === "undefined") return;
  const isRtl = lang === "ar" || lang === "ary";
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = lang === "ary" ? "ar-MA" : lang;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("permis_maroc_lang") as Language;
      if (saved && (saved === "fr" || saved === "ar" || saved === "ary")) {
        applyDirection(saved);
        return saved;
      }
    }
    return "fr";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("permis_maroc_lang", lang);
    }
    applyDirection(lang);
  };

  const isRtl = language === "ar" || language === "ary";
  const t = translations[language] || translations.fr;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
