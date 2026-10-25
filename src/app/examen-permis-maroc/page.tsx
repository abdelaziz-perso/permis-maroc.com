import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { Award, CheckCircle2, ArrowRight, ShieldCheck, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Examen Permis Maroc 2026 : Réussir l'Épreuve Théorique NARSA",
  description:
    "Guide stratégique pour réussir l'examen du permis de conduire au Maroc du premier coup : score de 34/40, gestion des 30 secondes, pièges éliminatoires et conseils d'examinateurs.",
  alternates: {
    canonical: "https://permis-maroc.com/examen-permis-maroc",
  },
};

export default function ExamenPermisMarocPage() {
  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#071A3D]">
          <Navbar />

          <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            <div className="mb-10">
              <span className="text-xs font-mono font-bold text-[#C1272D] uppercase tracking-wider block mb-2">
                Épreuve Officielle NARSA
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-[#071A3D] tracking-tight mb-4 leading-tight">
                L&apos;Examen du Permis au Maroc en 2026
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Comment se déroule l&apos;épreuve officielle dans les centres d&apos;immatriculation, comment gérer le chronomètre de 30 secondes et éviter les erreurs éliminatoires.
              </p>
            </div>

            <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
              <section className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
                <h2 className="text-xl sm:text-2xl font-bold text-[#071A3D] mb-4">
                  Le jour de l&apos;épreuve théorique : le déroulement minute par minute
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center font-bold text-xs text-[#C1272D] shrink-0">1</span>
                    <div>
                      <h3 className="font-bold text-[#071A3D] text-sm">Vérification de l&apos;identité et enregistrement biométrique</h3>
                      <p className="text-xs text-[#5A6A82] mt-1">
                        Présentation de la CIN originale et de la convocation. L&apos;examinateur NARSA vérifie votre signature et vous assigne un poste informatique numéroté.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center font-bold text-xs text-[#C1272D] shrink-0">2</span>
                    <div>
                      <h3 className="font-bold text-[#071A3D] text-sm">Session de prise en main (2 questions d&apos;essai)</h3>
                      <p className="text-xs text-[#5A6A82] mt-1">
                        Avant le lancement du chronomètre officiel, vous testez l&apos;écran tactile sur deux questions fictives pour vous familiariser avec le clavier de validation.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-red-50 border border-red-100 flex items-center justify-center font-bold text-xs text-[#C1272D] shrink-0">3</span>
                    <div>
                      <h3 className="font-bold text-[#071A3D] text-sm">Les 40 questions d&apos;examen</h3>
                      <p className="text-xs text-[#5A6A82] mt-1">
                        Chaque question dure 30 secondes. Vous pouvez modifier votre choix jusqu&apos;à l&apos;expiration du décompte. À la fin, votre résultat s&apos;affiche instantanément à l&apos;écran (Admis ou Ajourné avec note sur 40).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Action */}
              <div className="p-8 rounded-2xl bg-red-50 border border-red-100 text-center">
                <h3 className="text-xl font-bold text-[#071A3D] mb-2">Mettez-vous en conditions réelles dès maintenant</h3>
                <p className="text-xs text-slate-600 mb-6 max-w-md mx-auto">
                  Notre simulateur reproduit fidèlement la cadence et les formats officiels de la NARSA.
                </p>
                <Link
                  href="/examen-blanc"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E30D2B] hover:bg-[#D90B28] text-white font-bold text-sm shadow-md shadow-red-500/20"
                >
                  <span>Lancer le simulateur d&apos;examen</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
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
