import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Test Permis Maroc Gratuit 2026 : Séries & Questions d'Entraînement en Ligne",
  description:
    "Entraînez-vous gratuitement aux tests du permis de conduire au Maroc : séries interactives de 40 questions avec correction détaillée et explications conformes NARSA.",
  alternates: {
    canonical: "https://permis-maroc.com/test-permis-maroc",
  },
};

export default function TestPermisMarocPage() {
  const series = [
    { id: 1, title: "Série 1 : Priorités & Intersections", count: 40, duration: "20 min", difficulty: "Facile" },
    { id: 2, title: "Série 2 : Panneaux & Signalisation", count: 40, duration: "20 min", difficulty: "Moyen" },
    { id: 3, title: "Série 3 : Vitesse & Distances de sécurité", count: 40, duration: "20 min", difficulty: "Moyen" },
    { id: 4, title: "Série 4 : Arrêt, Stationnement & Nuit", count: 40, duration: "20 min", difficulty: "Difficile" },
    { id: 5, title: "Série 5 : Pièges fréquents & Examen NARSA", count: 40, duration: "20 min", difficulty: "Expert" },
  ];

  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#071A3D]">
          <Navbar />

          <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            <div className="mb-10 text-center">
              <span className="text-xs font-mono font-bold text-[#F20D2F] uppercase tracking-wider block mb-2">
                Entraînement Libre & Gratuit
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-[#071A3D] tracking-tight mb-4 leading-tight">
                Tests Permis Maroc Gratuits 2026
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Testez vos connaissances du Code de la Route marocain avec nos séries thématiques corrigées en temps réel.
              </p>
            </div>

            {/* Test Series List */}
            <div className="space-y-4 mb-10">
              {series.map((s) => (
                <div
                  key={s.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#F20D2F]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-[#E2E8F0] flex items-center justify-center font-bold text-[#071A3D] text-sm">
                      {s.id}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#071A3D]">{s.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span>{s.count} questions</span>
                        <span>•</span>
                        <span>{s.duration}</span>
                        <span>•</span>
                        <span className="text-amber-600 font-semibold">{s.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/examen-blanc"
                    className="px-5 py-2.5 rounded-xl bg-[#F20D2F] hover:bg-[#d60b29] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md shadow-red-500/20 shrink-0"
                  >
                    <span>Lancer ce test</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Banner */}
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs text-center">
              <h2 className="text-xl font-bold text-[#071A3D] mb-2">
                Vous visez le score de 34/40 à l&apos;examen officiel ?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
                Passez un examen blanc complet dans les conditions réelles avec décompte chronométré de 30 secondes par question.
              </p>
              <Link
                href="/examen-blanc"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F20D2F] hover:bg-[#d60b29] text-white font-bold text-sm shadow-md shadow-red-500/20"
              >
                <span>Démarrer un examen blanc complet</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
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
