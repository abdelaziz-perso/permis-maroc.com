"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { moroccanPdfResources, PdfResource } from "@/data/pdfResources";
import {
  FileText,
  Search,
  Printer,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Ruler,
  Scale,
  RotateCw,
  SquareParking,
  Lightbulb,
  HeartPulse,
  Wrench,
  Milestone,
  ShieldAlert,
  X,
} from "lucide-react";

export function PdfResourcesClient() {
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalResource, setActiveModalResource] = useState<PdfResource | null>(null);

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Ruler":
        return <Ruler className="w-5 h-5 text-blue-400" />;
      case "Scale":
        return <Scale className="w-5 h-5 text-amber-400" />;
      case "RotateCw":
        return <RotateCw className="w-5 h-5 text-emerald-400" />;
      case "SquareParking":
        return <SquareParking className="w-5 h-5 text-purple-400" />;
      case "Lightbulb":
        return <Lightbulb className="w-5 h-5 text-yellow-400" />;
      case "HeartPulse":
        return <HeartPulse className="w-5 h-5 text-red-400" />;
      case "Wrench":
        return <Wrench className="w-5 h-5 text-teal-400" />;
      case "Milestone":
        return <Milestone className="w-5 h-5 text-orange-400" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-red-400" />;
    }
  };

  const categories = useMemo(() => {
    const cats = new Set(
      moroccanPdfResources.map((r) => (isArabic ? r.categoryAr : r.categoryFr))
    );
    return ["all", ...Array.from(cats)];
  }, [isArabic]);

  const filteredResources = useMemo(() => {
    return moroccanPdfResources.filter((res) => {
      const title = isArabic ? res.titleAr : res.titleFr;
      const desc = isArabic ? res.descriptionAr : res.descriptionFr;
      const cat = isArabic ? res.categoryAr : res.categoryFr;

      const matchesSearch =
        searchQuery.trim() === "" ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || cat === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, isArabic]);

  const handlePrint = (res: PdfResource) => {
    setActiveModalResource(res);
    setTimeout(() => {
      window.print();
    }, 250);
  };

  return (
    <div>
      {/* Search & Filter Header Bar */}
      <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 rtl:right-3.5 rtl:left-auto top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isArabic
                ? "ابحث في ملخصات الدروس (مثال: المسافات، الغرامات، الأسبقية...)"
                : "Rechercher une fiche (ex: distances, amendes, priorités, feux...)"
            }
            className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 rounded-2xl bg-white border border-[#E2E8F0] text-[#071A3D] placeholder-slate-400 text-sm focus:outline-none focus:border-[#F20D2F]/50 transition-colors shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#071A3D]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#E30D2B] text-white shadow-md shadow-red-500/20"
                  : "bg-white text-slate-600 hover:text-[#071A3D] hover:bg-slate-50 border border-[#E2E8F0] shadow-2xs"
              }`}
            >
              {cat === "all" ? (isArabic ? "الكل" : "Toutes les fiches") : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const title = isArabic ? res.titleAr : res.titleFr;
          const desc = isArabic ? res.descriptionAr : res.descriptionFr;
          const badge = isArabic ? res.badgeAr : res.badgeFr;
          const summaryPoints = isArabic ? res.keySummaryAr : res.keySummaryFr;

          return (
            <div
              key={res.id}
              className="rounded-3xl bg-white border border-[#E2E8F0] hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="p-6">
                {/* Top Badge & Size */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#C1272D] text-[11px] font-bold">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{badge}</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {res.fileSize}
                  </span>
                </div>

                {/* Card Title with Icon */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shrink-0">
                    {getIcon(res.icon)}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#071A3D] group-hover:text-[#C1272D] transition-colors leading-snug">
                    {title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mb-5 leading-relaxed">
                  {desc}
                </p>

                {/* Key Summary Bullet points preview */}
                <div className="space-y-2 mb-6 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[11px] font-bold text-[#5A6A82] uppercase tracking-wider block">
                    {isArabic ? "أهم النقاط المضمونة للامتحان :" : "Points clés de révision :"}
                  </span>
                  {summaryPoints.slice(0, 3).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Formula Highlight if exists */}
                {res.formulas && (
                  <div className="mb-4 p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs">
                    <span className="font-semibold text-blue-900 block mb-1">
                      {isArabic ? "معادلة سريعة :" : "Formule rapide :"}
                    </span>
                    <span className="font-mono text-[#071A3D] text-xs font-semibold">
                      {res.formulas[0].label}: {res.formulas[0].formula}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalResource(res)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 border border-[#E2E8F0] text-[#071A3D] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>{isArabic ? "عرض الفيش كامل" : "Consulter la fiche"}</span>
                </button>

                <button
                  onClick={() => handlePrint(res)}
                  title={isArabic ? "طباعة أو حفظ PDF" : "Imprimer ou enregistrer en PDF"}
                  className="py-2.5 px-3 rounded-xl bg-[#E30D2B] hover:bg-[#D90B28] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {isArabic ? "طباعة / PDF" : "PDF"}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-16 p-6 rounded-3xl bg-white border border-[#E2E8F0] max-w-md mx-auto shadow-xs">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#071A3D] mb-2">
            {isArabic ? "لم يتم العثور على أي ملف" : "Aucune fiche trouvée"}
          </h3>
          <p className="text-xs text-[#5A6A82] mb-4">
            {isArabic
              ? "جرب البحث بكلمة أخرى مثل: إشارات، مسافات، غرامات، أو أسبقية."
              : "Essayez avec d'autres mots-clés : distances, panneaux, amendes..."}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-[#071A3D]"
          >
            {isArabic ? "إعادة الضبط" : "Réinitialiser les filtres"}
          </button>
        </div>
      )}

      {/* Detailed Modal / Print Preview Drawer */}
      {activeModalResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:text-black">
          <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-8 shadow-2xl text-[#071A3D] my-8 print:border-none print:bg-white print:text-black print:shadow-none print:p-0">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6 print:hidden">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center shrink-0">
                  {getIcon(activeModalResource.icon)}
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#C1272D] uppercase tracking-wider">
                    {isArabic
                      ? activeModalResource.categoryAr
                      : activeModalResource.categoryFr}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#071A3D]">
                    {isArabic
                      ? activeModalResource.titleAr
                      : activeModalResource.titleFr}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setActiveModalResource(null)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Print Header Visible only when printing */}
            <div className="hidden print:block mb-6 border-b pb-4">
              <h1 className="text-2xl font-bold text-[#C1272D]">
                PERMIS-MAROC.COM — FICHE DE RÉVISION OFFICIELLE
              </h1>
              <h2 className="text-lg font-semibold text-gray-900 mt-1">
                {isArabic ? activeModalResource.titleAr : activeModalResource.titleFr}
              </h2>
              <span className="text-xs text-gray-500">
                Conforme au Code de la Route Marocain (Loi 52-05 & NARSA 2026)
              </span>
            </div>

            {/* Modal Body Content */}
            <div className="space-y-6 text-sm text-slate-700 print:text-black">
              {/* Detailed intro */}
              <p className="leading-relaxed text-slate-600 print:text-gray-800">
                {isArabic
                  ? activeModalResource.detailedContentAr
                  : activeModalResource.detailedContentFr}
              </p>

              {/* Key points box */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] print:bg-gray-50 print:border-gray-300">
                <h4 className="font-bold text-[#071A3D] print:text-black mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    {isArabic ? "قواعد الحفظ الإلزامية :" : "Règles d'or à mémoriser :"}
                  </span>
                </h4>
                <ul className="space-y-2">
                  {(isArabic
                    ? activeModalResource.keySummaryAr
                    : activeModalResource.keySummaryFr
                  ).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E30D2B] mt-2 shrink-0" />
                      <span className="text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Formulas Table if available */}
              {activeModalResource.formulas && (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60 print:bg-blue-50 print:border-blue-200">
                  <h4 className="font-bold text-blue-900 print:text-blue-900 mb-3 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-blue-500" />
                    <span>
                      {isArabic ? "جدول حساب المسافات :" : "Formules de calcul des distances :"}
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalResource.formulas.map((f, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-white border border-blue-100 print:bg-white print:border-gray-200 shadow-2xs"
                      >
                        <span className="text-xs font-bold text-amber-700 print:text-amber-800 block">
                          {f.label}
                        </span>
                        <span className="font-mono text-xs text-[#071A3D] print:text-black block font-semibold my-1">
                          {f.formula}
                        </span>
                        <span className="text-[11px] text-[#5A6A82] print:text-gray-600 block">
                          Exemple : {f.example}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fines Table if available */}
              {activeModalResource.finesTable && (
                <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0] print:border-gray-300">
                  <table className="w-full text-left rtl:text-right text-xs">
                    <thead className="bg-[#F8FAFC] print:bg-gray-100 text-[#071A3D] print:text-gray-700 border-b border-[#E2E8F0]">
                      <tr>
                        <th className="p-3">Classe</th>
                        <th className="p-3">Amende</th>
                        <th className="p-3">Points</th>
                        <th className="p-3">Exemples</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] print:divide-gray-200 bg-white">
                      {activeModalResource.finesTable.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-[#071A3D] print:text-black">
                            {row.classification}
                          </td>
                          <td className="p-3 font-semibold text-amber-600 print:text-amber-700">
                            {row.amount}
                          </td>
                          <td className="p-3 font-bold text-[#C1272D] print:text-red-700">
                            {row.points}
                          </td>
                          <td className="p-3 text-slate-600 print:text-gray-700">
                            {row.examples}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Exam Tip */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 print:bg-yellow-50 print:text-yellow-900 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">
                    {isArabic ? "فخ يتكرر في الامتحان :" : "Astuce clé pour le jour J :"}
                  </span>{" "}
                  <span>
                    {isArabic
                      ? activeModalResource.examTipsAr
                      : activeModalResource.examTipsFr}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3 print:hidden">
              <button
                onClick={() => setActiveModalResource(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#071A3D] text-xs font-semibold"
              >
                {isArabic ? "إغلاق" : "Fermer"}
              </button>

              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-xl bg-[#E30D2B] hover:bg-[#D90B28] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-500/25"
              >
                <Printer className="w-4 h-4" />
                <span>{isArabic ? "طباعة الفيش PDF" : "Imprimer en PDF"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
