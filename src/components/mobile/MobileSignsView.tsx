"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { roadSigns } from "@/data/roadSigns";
import { RoadSign } from "@/types/models";
import { SignGraphic } from "@/components/signs/SignGraphic";
import { Search, X, ArrowLeft, ArrowRight } from "lucide-react";

export function MobileSignsView() {
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeSignModal, setActiveSignModal] = useState<RoadSign | null>(null);

  const categories = [
    { id: "all", label: isArabic ? "الكل" : "Tous" },
    { id: "danger", label: isArabic ? "خطر" : "Danger" },
    { id: "priorite", label: isArabic ? "أسبقية" : "Priorité" },
    { id: "interdiction", label: isArabic ? "منع" : "Interdiction" },
    { id: "obligation", label: isArabic ? "إجبار" : "Obligation" },
    { id: "indication", label: isArabic ? "إرشاد" : "Indication" },
  ];

  // Specific high-priority signs to match Screen 5 in the reference
  const displayedSigns = useMemo(() => {
    return roadSigns.filter((sign) => {
      const name = isArabic ? sign.nameAr : sign.name;
      const matchesSearch =
        searchQuery.trim() === "" ||
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sign.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "all" || sign.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory, isArabic]);

  // -------------------------------------------------------------
  // SCREEN 6: SIGN DETAIL MODAL / DRAWER
  // -------------------------------------------------------------
  if (activeSignModal) {
    const signName = isArabic ? activeSignModal.nameAr : activeSignModal.name;
    const signDesc = isArabic
      ? activeSignModal.descriptionAr
      : activeSignModal.description;
    const signAdvice = isArabic
      ? activeSignModal.adviceAr
      : activeSignModal.advice;

    return (
      <div className="space-y-6 pt-1">
        {/* Sign Detail Header with Back Button */}
        <div className="flex items-center gap-3 pb-2 border-b border-[#E5ECF5]">
          <button
            onClick={() => setActiveSignModal(null)}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-[#071A3D]"
            aria-label="Retour aux panneaux"
          >
            <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
          </button>
          <h2 className="text-base font-bold text-[#071A3D]">
            {isArabic ? "تفاصيل العلامة" : "Détail du panneau"}
          </h2>
        </div>

        {/* Large Road Sign Display */}
        <div className="w-full py-8 rounded-3xl bg-white border border-[#E5ECF5] shadow-sm flex items-center justify-center">
          <SignGraphic
            id={activeSignModal.id}
            name={activeSignModal.name}
            category={activeSignModal.category}
            size="xl"
          />
        </div>

        {/* Title & Subtitle */}
        <div>
          <h1 className="text-2xl font-black text-[#071A3D] tracking-tight">
            {activeSignModal.code ? `${activeSignModal.code} • ` : ""}
            {signName}
          </h1>
          <span className="text-sm font-bold text-[#F20D2F] block mt-0.5">
            {activeSignModal.category === "danger"
              ? "Danger immédiat"
              : activeSignModal.category === "interdiction"
              ? "Interdiction stricte"
              : activeSignModal.category === "priorite"
              ? "Arrêt ou priorité"
              : "Indication officielle"}
          </span>
          <p className="text-xs sm:text-sm text-[#64748B] mt-2.5 leading-relaxed font-normal">
            {signDesc}
          </p>
        </div>

        {/* Exemple en situation */}
        <div className="rounded-3xl bg-white border border-[#E5ECF5] p-4 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
            {isArabic ? "مثال في وضعية حقيقية" : "Exemple en situation"}
          </h3>

          {/* Road scenario visual representation */}
          <div className="w-full h-36 rounded-2xl bg-gradient-to-b from-sky-100 via-amber-50 to-slate-200 border border-slate-200 overflow-hidden relative flex items-center justify-center p-3">
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
              Route nationale
            </div>
            {/* Visual sign thumbnail at the intersection */}
            <div className="flex items-center gap-4">
              <SignGraphic
                id={activeSignModal.id}
                name={activeSignModal.name}
                category={activeSignModal.category}
                size="md"
              />
              <div className="text-xs text-[#071A3D] font-bold max-w-[180px] bg-white/90 p-2.5 rounded-xl shadow-sm">
                🚗 {signAdvice || "Marquez l'arrêt et cédez le passage."}
              </div>
            </div>
          </div>

          {activeSignModal.fineMad !== undefined && activeSignModal.fineMad > 0 && (
            <div className="p-3 rounded-2xl bg-red-50 text-red-700 text-xs font-semibold flex items-center justify-between">
              <span>Amende en cas d&apos;infraction :</span>
              <span className="font-bold">{activeSignModal.fineMad} MAD ({activeSignModal.finePoints} pts)</span>
            </div>
          )}
        </div>

        {/* Primary CTA: Tester mes connaissances */}
        <Link
          href="/examen-blanc"
          className="w-full py-4 px-5 rounded-2xl bg-[#F20D2F] hover:bg-[#D90B28] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 active:scale-[0.98] transition-all"
        >
          <span>{isArabic ? "اختبر معلوماتك" : "Tester mes connaissances"}</span>
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </Link>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SCREEN 5: SIGNS GRID VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-4">
      {/* 1. Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 rtl:right-3.5 rtl:left-auto top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            isArabic
              ? "ابحث عن علامة (مثال: قف، أسبقية، 30...)"
              : "Rechercher un panneau..."
          }
          className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 rounded-2xl bg-white border border-[#E5ECF5] text-[#071A3D] placeholder-[#64748B] text-sm focus:outline-none focus:border-[#F20D2F] transition-colors shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. Horizontally Scrollable Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-[#F20D2F] text-white shadow-md shadow-red-500/20"
                : "bg-white text-[#64748B] hover:text-[#071A3D] border border-[#E5ECF5]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. 3-Column / 2-Column Grid matching reference */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {displayedSigns.map((sign) => {
          const name = isArabic ? sign.nameAr : sign.name;

          return (
            <button
              key={sign.id}
              onClick={() => setActiveSignModal(sign)}
              className="p-3.5 rounded-3xl bg-white border border-[#E5ECF5] hover:border-[#F20D2F]/30 hover:shadow-md transition-all flex flex-col items-center justify-between text-center min-h-[140px] group active:scale-[0.96] cursor-pointer"
            >
              {/* Road Sign Graphic */}
              <div className="w-16 h-16 flex items-center justify-center my-1 group-hover:scale-105 transition-transform">
                <SignGraphic
                  id={sign.id}
                  name={sign.name}
                  category={sign.category}
                  size="md"
                />
              </div>

              {/* Road Sign Title */}
              <span className="text-xs font-bold text-[#071A3D] line-clamp-2 leading-tight mt-1">
                {name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
