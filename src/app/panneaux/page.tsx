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
      <div className="hidden md:flex min-h-screen flex-col bg-[#070A0F] text-white">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-red-500/30 text-xs font-semibold text-red-400 mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Signalisation Officielle</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            {t.signs.title}
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
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
              className="w-full pl-12 pr-4 py-3.5 rtl:pr-12 rtl:pl-4 rounded-2xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 text-sm shadow-xl"
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
                    ? "bg-[#C1272D] text-white shadow-lg shadow-red-950/40"
                    : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-white/5"
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
                className="group relative p-6 rounded-2xl bg-[#121824] border border-white/10 hover:border-red-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between cursor-pointer"
              >
                {/* Top Code Badge & Bookmark */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-slate-950 text-slate-400 border border-white/5">
                    {sign.code}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveSign(sign.id);
                    }}
                    className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                    aria-label="Enregistrer ce panneau"
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-400" />
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
                  <h3 className="font-bold text-base text-white group-hover:text-red-400 transition-colors mb-1 line-clamp-1">
                    {sign.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {sign.description}
                  </p>
                </div>

                {/* Bottom Fine tag if infraction exists */}
                {sign.fineMad ? (
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-amber-400 font-mono">
                    <span>Amende : {sign.fineMad} MAD</span>
                    {sign.finePoints ? <span>-{sign.finePoints} pts</span> : null}
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400">
                    Cliquez pour voir les conseils
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredSigns.length === 0 && (
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-white/10 max-w-md mx-auto">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">
              Aucun panneau ne correspond à votre recherche.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-3 text-xs text-red-400 font-bold hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Detailed Road Sign Modal */}
        {selectedSign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#121824] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden">
              <button
                onClick={() => setSelectedSign(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 shrink-0">
                  <RoadSignIcon iconName={selectedSign.svgIconName} size={72} />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block mb-1">
                    Code {selectedSign.code} • {selectedSign.category}
                  </span>
                  <h3 className="text-xl font-black text-white leading-tight">
                    {selectedSign.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-arabic mt-1">
                    {selectedSign.nameAr}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Signification légale
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedSign.description}
                  </p>
                </div>

                {selectedSign.fineMad ? (
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-300 block mb-0.5">
                        Sanction en cas de non-respect
                      </span>
                      <span className="text-xs text-amber-200/80">
                        Amende transactionnelle et forfaitaire
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-amber-400 font-mono block">
                        {selectedSign.fineMad} MAD
                      </span>
                      {selectedSign.finePoints ? (
                        <span className="text-xs font-bold text-red-400 font-mono">
                          -{selectedSign.finePoints} points
                        </span>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                    Conseil de conduite
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedSign.advice}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSign(null)}
                className="w-full mt-6 py-3 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
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
