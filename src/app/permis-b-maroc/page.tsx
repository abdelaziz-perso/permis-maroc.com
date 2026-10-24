import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { Car, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Permis B Maroc 2026 : Voitures & Véhicules Légers (Conditions & Examen)",
  description:
    "Tout savoir sur le Permis B au Maroc : véhicules autorisés jusqu'à 3,5 tonnes, seuil de 34/40 questions, manœuvres pratiques et période probatoire de 2 ans.",
  alternates: {
    canonical: "https://permis-maroc.com/permis-b-maroc",
  },
};

export default function PermisBMarocPage() {
  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#071A3D]">
          <Navbar />

          <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            <div className="mb-10">
              <span className="text-xs font-mono font-bold text-[#F20D2F] uppercase tracking-wider block mb-2">
                Catégorie B • Tourisme & Utilitaires Légers
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-[#071A3D] tracking-tight mb-4 leading-tight">
                Le Permis B au Maroc en 2026
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Le permis de conduire le plus demandé au Royaume : découvrez les véhicules autorisés, le seuil d&apos;examen officiel et le fonctionnement de la période probatoire.
              </p>
            </div>

            <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
              <section className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
                <h2 className="text-xl sm:text-2xl font-bold text-[#071A3D] mb-3">
                  Quels véhicules peut-on conduire avec le Permis B ?
                </h2>
                <ul className="space-y-2.5 list-disc list-inside">
                  <li>Véhicules automobiles dont le Poids Total Autorisé en Charge (PTAC) ne dépasse pas <strong>3 500 kg (3,5 tonnes)</strong>.</li>
                  <li>Véhicules conçus et construits pour le transport de <strong>9 personnes au maximum</strong> (conducteur inclus).</li>
                  <li>Possibilité d&apos;atteler une remorque dont le PTAC ne dépasse pas 750 kg.</li>
                </ul>
              </section>

              <section className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
                <h2 className="text-xl sm:text-2xl font-bold text-[#071A3D] mb-3">
                  L&apos;examen théorique du Permis B : 34/40 obligatoire
                </h2>
                <p className="mb-4">
                  Pour valider l&apos;épreuve théorique du permis B, le candidat doit obtenir un score d&apos;au moins 34 points sur 40. Contrairement aux anciennes versions de l&apos;examen, les questions portent davantage sur la perception des risques, la courtoisie au volant et le respect des piétons.
                </p>
                <Link
                  href="/examen-blanc"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F20D2F] hover:bg-[#d60b29] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-500/20"
                >
                  <span>Passer un examen blanc Permis B</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </section>
            </div>
          </main>

          <Footer />
          <MobileBottomNav />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
