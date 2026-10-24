"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { CityGuide } from "@/types/models";
import { MapPin, Navigation, Building2, ArrowRight } from "lucide-react";

export function CityGuideClient({ city }: { city: CityGuide }) {
  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#070A0F] text-white">
          <Navbar />

          <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            <div className="mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs text-slate-300 font-semibold mb-3">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Région {city.region}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                Passer son Permis à {city.name}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {city.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="p-5 rounded-2xl bg-[#121824] border border-white/10 shadow-xl">
                <span className="text-xs text-slate-400 block mb-1">Délai d&apos;attente moyen</span>
                <span className="text-2xl font-black text-white font-mono block">
                  ~{city.averageWaitWeeks} semaines
                </span>
                <span className="text-[11px] text-slate-500">Pour date d&apos;examen théorique</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#121824] border border-white/10 shadow-xl">
                <span className="text-xs text-slate-400 block mb-1">Auto-écoles agréées</span>
                <span className="text-2xl font-black text-emerald-400 font-mono block">
                  ~{city.autoEcolesEstimated}
                </span>
                <span className="text-[11px] text-slate-500">Établissements homologués NARSA</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#121824] border border-white/10 shadow-xl">
                <span className="text-xs text-slate-400 block mb-1">Score requis</span>
                <span className="text-2xl font-black text-red-400 font-mono block">
                  34 / 40
                </span>
                <span className="text-[11px] text-slate-500">Seuil national permis B</span>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#121824] border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-red-400" />
                  <span>Centres d&apos;immatriculation NARSA à {city.name}</span>
                </h2>
                <div className="p-4 rounded-xl bg-slate-900 border border-white/5 mb-4">
                  <span className="font-bold text-white text-xs block mb-1">Adresse principale :</span>
                  <p className="text-xs text-slate-300">{city.narsaCenterAddress}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                  <span className="font-bold text-white text-xs block mb-1">Circuit et piste d&apos;examen pratique :</span>
                  <p className="text-xs text-slate-300">{city.practicalTestTrackInfo}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#121824] border border-white/10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-amber-400" />
                  <span>Conseils spécifiques pour la circulation à {city.name}</span>
                </h2>
                <ul className="space-y-3">
                  {city.localDrivingTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-200">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-base">Vous préparez votre permis à {city.name} ?</h4>
                  <p className="text-xs text-slate-400">
                    Passez un test blanc dès aujourd&apos;hui pour vérifier si vous êtes prêt pour l&apos;examen.
                  </p>
                </div>
                <Link
                  href="/examen-blanc"
                  className="px-5 py-2.5 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-lg"
                >
                  Faire un examen blanc
                </Link>
              </div>
            </div>
          </main>

          <Footer />
          <MobileBottomNav />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
