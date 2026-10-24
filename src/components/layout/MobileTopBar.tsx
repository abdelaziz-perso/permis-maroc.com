"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { ArrowLeft, Bell, ChevronDown, Check } from "lucide-react";
import { Language } from "@/types/models";

interface MobileTopBarProps {
  isHome?: boolean;
  title?: string;
  rightAction?: React.ReactNode;
  backHref?: string;
}

export function MobileTopBar({
  isHome = false,
  title,
  rightAction,
  backHref,
}: MobileTopBarProps) {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "fr", label: "Français", flag: "🇲🇦 FR" },
    { code: "ar", label: "العربية", flag: "🇲🇦 عربية" },
    { code: "ary", label: "الدارجة", flag: "🇲🇦 دارجة" },
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <header className="md:hidden sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#E5ECF5] text-[#071A3D] pt-safe">
      <div className="h-14 px-4 flex items-center justify-between relative max-w-md mx-auto">
        {isHome ? (
          <>
            {/* Left: Brand Logo matching Reference */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#C1272D] to-[#F20D2F] flex items-center justify-center text-white font-black text-sm shadow-sm">
                🎓
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight leading-none text-[#071A3D]">
                  PERMIS
                </span>
                <span className="font-black text-xs tracking-tight text-[#F20D2F] leading-none">
                  MAROC
                </span>
              </div>
            </Link>

            {/* Right: Language Selector & Notifications */}
            <div className="flex items-center gap-2 relative">
              {/* Language Selector Dropdown */}
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#F6F9FD] border border-[#E5ECF5] text-xs font-semibold text-[#071A3D] cursor-pointer"
                aria-label="Changer de langue"
              >
                <span>{currentLang.flag}</span>
                <ChevronDown className="w-3 h-3 text-[#64748B]" />
              </button>

              {/* Notification Bell */}
              <button
                className="p-2 rounded-full bg-[#F6F9FD] border border-[#E5ECF5] text-[#071A3D] relative"
                aria-label="Notifications"
                onClick={() => alert("Aucune nouvelle notification.")}
              >
                <Bell className="w-4 h-4 text-[#071A3D]" />
                <span className="w-2 h-2 rounded-full bg-[#F20D2F] absolute top-1.5 right-1.5 ring-2 ring-white" />
              </button>

              {/* Language Menu Dropdown Modal */}
              {langMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-12 z-50 w-36 rounded-2xl bg-white border border-[#E5ECF5] shadow-xl p-1.5 animate-in fade-in zoom-in-95">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${
                          language === l.code
                            ? "bg-red-50 text-[#F20D2F]"
                            : "text-[#071A3D] hover:bg-slate-50"
                        }`}
                      >
                        <span>{l.flag}</span>
                        {language === l.code && <Check className="w-3.5 h-3.5 text-[#F20D2F]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Back Button */}
            <div className="w-9 flex items-center justify-start">
              <button
                onClick={() => {
                  if (backHref) router.push(backHref);
                  else router.back();
                }}
                className="p-2 -ml-1 rounded-full hover:bg-[#F6F9FD] active:scale-95 transition-all text-[#071A3D]"
                aria-label="Retour"
              >
                <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>

            {/* Centered Title */}
            <h1 className="text-base font-bold text-[#071A3D] tracking-tight truncate max-w-[200px] text-center">
              {title}
            </h1>

            {/* Right Contextual Action or Spacer */}
            <div className="w-9 flex items-center justify-end">
              {rightAction || <div className="w-5" />}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
