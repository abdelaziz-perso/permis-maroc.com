import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { DollarSign, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Prix du Permis au Maroc 2026 : Tarifs Officiels, Frais & Heures Obligatoires",
  description:
    "Découvrez le coût réel et transparent du permis de conduire au Maroc en 2026 : tarif légal homologué des 20h de théorie et 20h de conduite, visite médicale et timbres.",
  alternates: {
    canonical: "https://permis-maroc.com/prix-permis-maroc",
  },
};

export default function PrixPermisMarocPage() {
  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#070A0F] text-white">
          <Navbar />

          <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            <div className="mb-10">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-2">
                Tarification & Budget 2026
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Combien coûte le permis au Maroc ?
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Le détail transparent de tous les frais obligatoires pour obtenir son permis de catégorie B au Maroc : forfait auto-école, timbres fiscaux, visite médicale et réinscriptions.
              </p>
            </div>

            {/* Estimated Total Price Banner */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#121824] to-[#1A2234] border border-white/10 mb-10 shadow-2xl text-center">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">
                Budget global moyen estimé (Permis B)
              </span>
              <div className="text-4xl sm:text-6xl font-black text-white mb-3">
                3 350 <span className="text-2xl sm:text-3xl font-bold text-red-500">MAD</span> – 4 350 <span className="text-2xl sm:text-3xl font-bold text-red-500">MAD</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                Ce montant total comprend la formation légale minimale (40 heures), les taxes d&apos;examen d&apos;État et le certificat médical officiel.
              </p>
            </div>

            {/* Table of Breakdown */}
            <div className="bg-[#121824] rounded-2xl border border-white/10 overflow-hidden shadow-xl mb-10">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-lg font-bold text-white">
                  Détail exhaustif des postes de dépense
                </h2>
              </div>

              <div className="divide-y divide-white/5">
                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white text-sm">Formation théorique obligatoire (20 heures)</h3>
                    <p className="text-xs text-slate-400">Cours de code de la route en salle homologuée (~37 MAD / heure)</p>
                  </div>
                  <span className="text-base font-bold text-white font-mono shrink-0">~750 – 800 MAD</span>
                </div>

                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white text-sm">Formation pratique au volant (20 heures)</h3>
                    <p className="text-xs text-slate-400">Conduite sur circuit fermé et circulation avec moniteur agréé (~85 MAD / heure)</p>
                  </div>
                  <span className="text-base font-bold text-white font-mono shrink-0">~1 700 – 2 200 MAD</span>
                </div>

                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white text-sm">Visite médicale d&apos;aptitude physique et visuelle</h3>
                    <p className="text-xs text-slate-400">Chez un médecin généraliste agréé par le Ministère de la Santé et la NARSA</p>
                  </div>
                  <span className="text-base font-bold text-white font-mono shrink-0">150 MAD</span>
                </div>

                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white text-sm">Frais de timbre fiscal & dossier d&apos;immatriculation</h3>
                    <p className="text-xs text-slate-400">Droits d&apos;enregistrement Trésorerie Générale du Royaume et émission carte plastique</p>
                  </div>
                  <span className="text-base font-bold text-white font-mono shrink-0">~700 MAD</span>
                </div>
              </div>
            </div>

            {/* Critical advice */}
            <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 mb-8">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Mise en garde contre les tarifs cassés</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Le Ministère du Transport a fixé des tarifs horaires minimaux pour garantir que les auto-écoles dispensent effectivement les 20 heures complètes de conduite au volant. Méfiez-vous des forfaits à 1 500 MAD : ils réduisent souvent la pratique à 4 ou 5 heures seulement, provoquant un échec massif à l&apos;examen pratique de la NARSA et des frais de rattrapage onéreux.
              </p>
            </div>

            {/* CTA */}
            <div className="p-6 rounded-2xl bg-[#121824] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-white text-base">Économisez en réussissant du premier coup !</h4>
                <p className="text-xs text-slate-400">
                  Entraînez-vous gratuitement sur nos 40 questions d&apos;examen pour éviter les frais de rattrapage.
                </p>
              </div>
              <Link
                href="/examen-blanc"
                className="px-5 py-2.5 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-lg"
              >
                Faire un test gratuit
              </Link>
            </div>
          </main>

          <Footer />
          <MobileBottomNav />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
