"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { MobileSignsView } from "@/components/mobile/MobileSignsView";
import { LanguageProvider, useLanguage } from "@/lib/i18n/useLanguage";
import { UserProvider, useUser } from "@/context/UserContext";
import { roadSigns } from "@/data/roadSigns";
import { RoadSign, SignCategory } from "@/types/models";
import { RoadSignIcon } from "@/components/ui/RoadSignIcon";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  X,
  AlertOctagon,
  ShieldAlert,
  Info,
  DollarSign,
  Award,
} from "lucide-react";

export default function PanneauxPage() {
  return (
    <LanguageProvider>
      <UserProvider>
        <RoadSignsContent />
      </UserProvider>
    </LanguageProvider>
  );
}

function RoadSignsContent() {
  const { t } = useLanguage();
  const { stats, toggleSaveSign } = useUser();

  const [activeCategory, setActiveCategory] = useState<SignCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSign, setSelectedSign] = useState<RoadSign | null>(null);

  const categories: { id: SignCategory | "all"; label: string }[] = [
    { id: "all", label: t.signs.all },
    { id: "danger", label: t.signs.danger },
    { id: "interdiction", label: t.signs.interdiction },
    { id: "obligation", label: t.signs.obligation },
    { id: "priorite", label: t.signs.priorite },
    { id: "stationnement", label: t.signs.stationnement },
    { id: "indication", label: t.signs.indication },
  ];

  const filteredSigns = roadSigns.filter((sign) => {
    const matchesCat =
      activeCategory === "all" || sign.category === activeCategory;
    const matchesSearch =
      sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sign.nameAr.includes(searchQuery) ||
      sign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sign.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      {/* MOBILE APP VIEW (< 768px) matching reference design */}
      <div className="block md:hidden">
        <MobileAppShell title="Panneaux de signalisation">
          <MobileSignsView />
        </MobileAppShell>
      </div>

      {/* DESKTOP WEB EXPERIENCE (>= 768px) */}
      <div className="hidden md:flex min-h-screen flex-col bg-[#F8FAFC] text-[#071A3D]">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#F20D2F] mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Signalisation Officielle</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#071A3D] tracking-tight mb-4">
            {t.signs.title}
          </h1>
          <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
            {t.signs.subtitle}
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mb-10 space-y-4 max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rtl:left-auto rtl:right-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.signs.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3.5 rtl:pr-12 rtl:pl-4 rounded-2xl bg-white border border-[#E2E8F0] text-[#071A3D] placeholder-slate-400 focus:outline-none focus:border-[#F20D2F] text-sm shadow-xs"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#F20D2F] text-white shadow-md shadow-red-500/20"
                    : "bg-white text-slate-600 hover:text-[#071A3D] border border-[#E2E8F0] shadow-2xs"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Road Signs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSigns.map((sign) => {
            const isSaved = stats.savedSignIds.includes(sign.id);

            return (
              <div
                key={sign.id}
                onClick={() => setSelectedSign(sign)}
                className="group relative p-6 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#F20D2F]/30 transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer"
              >
                {/* Top Code Badge & Bookmark */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]">
                    {sign.code}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveSign(sign.id);
                    }}
                    className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
                    aria-label="Enregistrer ce panneau"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* SVG Road Sign Visual */}
                <div className="w-full aspect-square max-w-[120px] mx-auto flex items-center justify-center my-2 group-hover:scale-105 transition-transform">
                  <RoadSignIcon iconName={sign.svgIconName} size={88} />
                </div>

                {/* Name & Short description */}
                <div className="mt-4">
                  <h3 className="font-bold text-base text-[#071A3D] group-hover:text-[#F20D2F] transition-colors mb-1 line-clamp-1">
                    {sign.name}
                  </h3>
                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {sign.description}
                  </p>
                </div>

                {/* Bottom Fine tag if infraction exists */}
                {sign.fineMad ? (
                  <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-amber-600 font-mono font-semibold">
                    <span>Amende : {sign.fineMad} MAD</span>
                    {sign.finePoints ? <span>-{sign.finePoints} pts</span> : null}
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-[#F1F5F9] text-[11px] text-[#64748B]">
                    Cliquez pour voir les conseils
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredSigns.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E2E8F0] max-w-md mx-auto shadow-xs">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#071A3D]">
              Aucun panneau ne correspond à votre recherche.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-3 text-xs text-[#F20D2F] font-bold hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Detailed Road Sign Modal */}
        {selectedSign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-8 shadow-2xl overflow-hidden">
              <button
                onClick={() => setSelectedSign(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-[#071A3D] hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shrink-0">
                  <RoadSignIcon iconName={selectedSign.svgIconName} size={72} />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#F20D2F] uppercase tracking-wider block mb-1">
                    Code {selectedSign.code} • {selectedSign.category}
                  </span>
                  <h3 className="text-xl font-black text-[#071A3D] leading-tight">
                    {selectedSign.name}
                  </h3>
                  <p className="text-xs text-[#64748B] font-arabic mt-1">
                    {selectedSign.nameAr}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <h4 className="text-xs font-bold text-[#071A3D] uppercase tracking-wider mb-1.5">
                    Signification légale
                  </h4>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {selectedSign.description}
                  </p>
                </div>

                {selectedSign.fineMad ? (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-900 block mb-0.5">
                        Sanction en cas de non-respect
                      </span>
                      <span className="text-xs text-amber-700">
                        Amende transactionnelle et forfaitaire
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-amber-600 font-mono block">
                        {selectedSign.fineMad} MAD
                      </span>
                      {selectedSign.finePoints ? (
                        <span className="text-xs font-bold text-red-600 font-mono">
                          -{selectedSign.finePoints} points
                        </span>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1.5">
                    Conseil de conduite
                  </h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    {selectedSign.advice}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSign(null)}
                className="w-full mt-6 py-3 rounded-2xl bg-[#F20D2F] hover:bg-[#D90B28] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-red-500/20"
              >
                {t.signs.close}
              </button>
            </div>
          </div>
        )}
      </main>

        <Footer />
      </div>
    </>
  );
}
