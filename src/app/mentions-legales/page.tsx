import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales et informations éditoriales de la plateforme Permis-Maroc.com.",
};

export default function MentionsLegalesPage() {
  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#070A0F] text-white">
          <Navbar />
          <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <h1 className="text-3xl font-black mb-6">Mentions Légales</h1>
            <div className="p-6 rounded-2xl bg-[#121824] border border-white/10 space-y-4 text-sm text-slate-300 leading-relaxed">
              <h2 className="text-lg font-bold text-white">1. Éditeur de la plateforme</h2>
              <p>
                Permis-Maroc.com est un service éducatif en ligne indépendant destiné à la préparation des examens du Code de la Route au Maroc. Le site n&apos;est en aucun cas affilié, sponsorisé ou rattaché à l&apos;Agence Nationale de la Sécurité Routière (NARSA) ou au Ministère du Transport et de la Logistique marocain.
              </p>
              <h2 className="text-lg font-bold text-white">2. Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus, marques, logos, graphismes 3D, code source et architectures pédagogiques présents sur ce site sont protégés par les lois relatives à la propriété intellectuelle au Royaume du Maroc.
              </p>
              <h2 className="text-lg font-bold text-white">3. Avertissement pédagogique</h2>
              <p>
                Les questions d&apos;entraînement, simulations 3D et tests proposés sont des outils d&apos;apprentissage conçus selon les principes de la Loi 52-05 et ne se substituent pas à la formation pratique et théorique obligatoire dispensée au sein d&apos;une auto-école agréée.
              </p>
            </div>
          </main>
          <Footer />
          <MobileBottomNav />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
