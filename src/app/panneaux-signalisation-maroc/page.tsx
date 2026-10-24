import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { roadSigns } from "@/data/roadSigns";
import { RoadSignIcon } from "@/components/ui/RoadSignIcon";
import { ShieldAlert, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Panneaux de Signalisation au Maroc 2026 : Liste & Significations Officielles",
  description:
    "Guide complet des panneaux du Code de la Route au Maroc : danger, interdiction, obligation, indication, priorité et amendes en dirhams (MAD).",
  alternates: {
    canonical: "https://permis-maroc.com/panneaux-signalisation-maroc",
  },
};

export default function PanneauxSignalisationMarocPage() {
  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#071A3D]">
          <Navbar />

          <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            <div className="mb-10 text-center">
              <span className="text-xs font-mono font-bold text-[#F20D2F] uppercase tracking-wider block mb-2">
                Catalogue Pédagogique
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-[#071A3D] tracking-tight mb-4 leading-tight">
                Les Panneaux de Signalisation au Maroc
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                Apprenez à identifier les panneaux routiers officiels de la Convention de Vienne appliqués par la NARSA et les forces de l&apos;ordre au Maroc.
              </p>
            </div>

            {/* Quick Interactive Link */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div>
                <h3 className="font-bold text-[#071A3D] text-base">Catalogue complet interactif</h3>
                <p className="text-xs text-slate-500">
                  Consultez les fiches détaillées avec moteur de recherche, filtres par catégorie et sanctions en dirhams.
                </p>
              </div>
              <Link
                href="/panneaux"
                className="px-5 py-2.5 rounded-xl bg-[#F20D2F] hover:bg-[#d60b29] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-md shadow-red-500/20"
              >
                Explorer tous les panneaux
              </Link>
            </div>

            {/* Categories Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
                <span className="text-xs font-mono font-bold text-[#F20D2F] uppercase tracking-wider block mb-2">
                  Triangles Rouges
                </span>
                <h3 className="text-xl font-bold text-[#071A3D] mb-2">Panneaux de Danger</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Implantés à 50 mètres du danger en agglomération et à 150 mètres hors agglomération. Ils vous avertissent d&apos;un virage serré, d&apos;un passage piétons ou d&apos;un dos d&apos;âne.
                </p>
                <div className="flex items-center gap-3">
                  <RoadSignIcon iconName="curve-right" size={44} />
                  <RoadSignIcon iconName="pedestrian" size={44} />
                  <RoadSignIcon iconName="bump" size={44} />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
                <span className="text-xs font-mono font-bold text-[#F20D2F] uppercase tracking-wider block mb-2">
                  Cercles Bord Rouge
                </span>
                <h3 className="text-xl font-bold text-[#071A3D] mb-2">Panneaux d&apos;Interdiction</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Prennent effet immédiatement à la hauteur du panneau. Limitation de vitesse (60 km/h, 40 km/h), sens interdit ou interdiction formelle de dépasser.
                </p>
                <div className="flex items-center gap-3">
                  <RoadSignIcon iconName="no-entry" size={44} />
                  <RoadSignIcon iconName="speed-60" size={44} />
                  <RoadSignIcon iconName="no-overtaking" size={44} />
                </div>
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
