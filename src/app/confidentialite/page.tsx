import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de protection des données et respect de la vie privée sur Permis-Maroc.com (Loi 09-08).",
};

export default function ConfidentialitePage() {
  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#071A3D]">
          <Navbar />
          <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <h1 className="text-3xl font-black mb-6 text-[#071A3D]">Politique de Confidentialité</h1>
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4 text-sm text-slate-700 leading-relaxed">
              <h2 className="text-lg font-bold text-[#071A3D]">1. Protection des données personnelles (Loi 09-08)</h2>
              <p>
                Permis-Maroc.com respecte scrupuleusement la législation marocaine en vigueur, notamment la Loi n° 09-08 relative à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel.
              </p>
              <h2 className="text-lg font-bold text-[#071A3D]">2. Stockage local de la progression</h2>
              <p>
                Votre progression d&apos;apprentissage, vos points d&apos;expérience (XP), vos statistiques de tests et vos badges sont stockés de manière décentralisée et sécurisée via le stockage local (localStorage) de votre navigateur, vous garantissant un contrôle total sur vos données d&apos;entraînement.
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
