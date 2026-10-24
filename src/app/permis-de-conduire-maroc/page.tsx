import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { CheckCircle2, ArrowRight, ShieldCheck, FileText, Clock, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Permis de Conduire au Maroc 2026 : Démarches, Examens & Réforme NARSA",
  description:
    "Guide officiel et complet pour passer son permis de conduire au Maroc en 2026 : âge légal, banque de 1000 questions, épreuve pratique et permis probatoire.",
  alternates: {
    canonical: "https://permis-maroc.com/permis-de-conduire-maroc",
  },
};

export default function PermisDeConduireMarocPage() {
  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#070A0F] text-white">
          <Navbar />

          <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            {/* Header */}
            <div className="mb-10">
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block mb-2">
                Dossier Officiel • Guide de Référence
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Le Permis de Conduire au Maroc en 2026
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Toutes les règles actualisées pour obtenir son permis de conduire au Maroc : inscription en auto-école, nouvelle banque de questions NARSA, examen pratique et période probatoire.
              </p>
            </div>

            {/* Quick summary box */}
            <div className="p-6 rounded-2xl bg-[#121824] border border-white/10 mb-10 shadow-xl">
              <h2 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Les 5 chiffres clés à connaître</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-2xl font-black text-white font-mono block">18 ans</span>
                  <span className="text-[11px] text-slate-400">Âge minimum requis</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-2xl font-black text-emerald-400 font-mono block">34 / 40</span>
                  <span className="text-[11px] text-slate-400">Score pour réussir</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-2xl font-black text-red-400 font-mono block">20h + 20h</span>
                  <span className="text-[11px] text-slate-400">Volume horaire légal</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-2xl font-black text-blue-400 font-mono block">2 ans</span>
                  <span className="text-[11px] text-slate-400">Permis probatoire (90 km/h)</span>
                </div>
              </div>
            </div>

            {/* Informational Sections */}
            <article className="prose prose-invert max-w-none space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
              <section className="p-6 sm:p-8 rounded-2xl bg-[#121824] border border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  1. Les catégories de permis au Maroc
                </h2>
                <p className="mb-4">
                  Conformément à la Loi 52-05 portant Code de la Route au Maroc, les titres de conduite se divisent en plusieurs catégories :
                </p>
                <ul className="space-y-2 list-disc list-inside text-slate-300">
                  <li><strong>Catégorie A / A1</strong> : Motocyclettes de cylindrée moyenne ou grosse cylindrée.</li>
                  <li><strong>Catégorie B</strong> : Véhicules automobiles affectés au transport de personnes (9 places assises maximum conducteur compris) ou de marchandises avec un PTAC n&apos;excédant pas 3 500 kg.</li>
                  <li><strong>Catégorie C</strong> : Véhicules isolés de transport de marchandises dont le PTAC dépasse 3 500 kg (Poids lourd).</li>
                  <li><strong>Catégorie D</strong> : Véhicules de transport en commun de personnes comportant plus de 9 places assises.</li>
                  <li><strong>Catégorie E</strong> : Ensembles de véhicules attelés d&apos;une remorque dont le PTAC excède 750 kg.</li>
                </ul>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-[#121824] border border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  2. La nouvelle banque de questions informatisée NARSA 2026
                </h2>
                <p className="mb-4">
                  Depuis la refonte opérée par l&apos;Agence Nationale de la Sécurité Routière (NARSA), l&apos;examen théorique repose sur une banque dynamique de 1 000 questions illustrées par des photographies et animations 3D réalistes reproduisant les axes routiers marocains.
                </p>
                <p>
                  Les questions sont générées de manière aléatoire pour chaque candidat sur des tablettes tactiles sécurisées afin de garantir une équité absolue. Le seuil de validation est fixé à <strong>34 bonnes réponses sur 40</strong> pour la catégorie B.
                </p>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-[#121824] border border-white/10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  3. L&apos;épreuve pratique au volant
                </h2>
                <p className="mb-4">
                  L&apos;épreuve pratique se décompose en deux phases consécutives :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                    <h3 className="font-bold text-white mb-1">Épreuve sur piste fermée</h3>
                    <p className="text-xs text-slate-400">
                      Rangement en créneau entre deux piquets sans toucher la bordure, stationnement en bataille, arrêt de précision et démarrage en côte sans recul.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                    <h3 className="font-bold text-white mb-1">Épreuve en circulation</h3>
                    <p className="text-xs text-slate-400">
                      Parcours de 15 à 20 minutes en conditions réelles avec examinateur NARSA : respect des ronds-points, franchissement des feux et courtoisie piétons.
                    </p>
                  </div>
                </div>
              </section>

              {/* Related Internal Links */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-base">Prêt à tester votre niveau ?</h4>
                  <p className="text-xs text-slate-400">
                    Découvrez notre simulateur d&apos;examen blanc gratuit conforme au format 40 questions.
                  </p>
                </div>
                <Link
                  href="/examen-blanc"
                  className="px-5 py-2.5 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-lg"
                >
                  Lancer l&apos;examen blanc
                </Link>
              </div>
            </article>
          </main>

          <Footer />
          <MobileBottomNav />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
