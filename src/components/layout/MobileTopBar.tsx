"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ArrowLeft } from "lucide-react";

interface MobileTopBarProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  rightAction?: React.ReactNode;
  isHome?: boolean;
}

export function MobileTopBar({
  title,
  showBack = false,
  backHref,
  rightAction,
  isHome = false,
}: MobileTopBarProps) {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  const handleBack = () => {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  if (isHome) {
    return (
      <header className="md:hidden sticky top-0 z-40 bg-[#F8FAFC]/90 backdrop-blur-md px-4 pt-3 pb-2.5 flex items-center justify-between border-b border-[#E2E8F0]">
        {/* Brand Lockup with New Driving School Car Logo */}
        <Link href="/" className="group">
          <BrandLogo size="sm" />
        </Link>

        {/* Arabic-first Pill Language Toggle */}
        <div className="flex items-center bg-white border border-[#E2E8F0] rounded-full p-0.5 shadow-2xs">
          <button
            onClick={() => setLanguage("ar")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all ${
              language === "ar"
                ? "bg-[#F20D2F] text-white shadow-xs"
                : "text-[#64748B]"
            }`}
          >
            العربية
          </button>
          <button
            onClick={() => setLanguage("ary")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all ${
              language === "ary"
                ? "bg-[#F20D2F] text-white shadow-xs"
                : "text-[#64748B]"
            }`}
          >
            الدارجة
          </button>
          <button
            onClick={() => setLanguage("fr")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all ${
              language === "fr"
                ? "bg-[#F20D2F] text-white shadow-xs"
                : "text-[#64748B]"
            }`}
          >
            FR
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5ECF5] px-4 h-14 flex items-center justify-between">
      <div className="flex items-center gap-2.5 min-w-0">
        {showBack && (
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-xl bg-[#F6F9FD] border border-[#E5ECF5] flex items-center justify-center text-[#071A3D] active:scale-95 transition-transform shrink-0"
            aria-label="Retour"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
        )}
        <h1 className="font-extrabold text-base text-[#071A3D] truncate">
          {title || "بيرمي المغرب"}
        </h1>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {rightAction || (
          <div className="flex items-center bg-[#F6F9FD] border border-[#E5ECF5] rounded-full p-0.5">
            <button
              onClick={() => setLanguage("ar")}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all ${
                language === "ar"
                  ? "bg-[#F20D2F] text-white"
                  : "text-[#64748B]"
              }`}
            >
              عربي
            </button>
            <button
              onClick={() => setLanguage("ary")}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all ${
                language === "ary"
                  ? "bg-[#F20D2F] text-white"
                  : "text-[#64748B]"
              }`}
            >
              دارجة
            </button>
            <button
              onClick={() => setLanguage("fr")}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all ${
                language === "fr"
                  ? "bg-[#F20D2F] text-white"
                  : "text-[#64748B]"
              }`}
            >
              FR
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
