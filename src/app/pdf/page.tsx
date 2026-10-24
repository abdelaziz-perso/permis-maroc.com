import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { PdfResourcesClient } from "@/components/pdf/PdfResourcesClient";
import { FileText, Sparkles, BookOpen, DownloadCloud } from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Code de la Route Maroc PDF : Télécharger Fiches & Cours 2026 Gratuit",
  description:
    "Téléchargez gratuitement les fiches PDF du Code de la Route marocain : calcul des distances, barème des amendes (Loi 52-05), panneaux officiels, feux de nuit, et règles de priorité.",
  keywords: [
    "code de la route maroc pdf",
    "telecharger code de la route maroc pdf gratuit",
    "pdf permis maroc",
    "كود السياقة 2026 pdf",
    "تحميل كود السياقة pdf",
    "ملخصات قانون السير بالمغرب pdf",
    "calcul distances permis maroc pdf",
    "bareme amendes maroc pdf",
  ],
  alternates: {
    canonical: "https://permis-maroc.com/pdf",
  },
  openGraph: {
    title: "Fiches de Révision PDF — Code de la Route Maroc 2026",
    description:
      "Téléchargement gratuit de fiches mémo et résumés officiels du permis au Maroc : distances, priorités, panneaux et amendes.",
    url: "https://permis-maroc.com/pdf",
    type: "website",
  },
};

export default function PdfResourcesPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Fiches de Révision & Cours PDF Code de la Route Maroc 2026",
    description:
      "Bibliothèque complète de résumés et fiches PDF officielles pour réussir l'examen théorique du permis de conduire au Maroc.",
    url: "https://permis-maroc.com/pdf",
    inLanguage: ["fr-MA", "ar-MA"],
    isPartOf: {
      "@type": "WebSite",
      name: "Permis Maroc",
      url: "https://permis-maroc.com",
    },
    about: {
      "@type": "Thing",
      name: "Code de la route marocain et examen théorique du permis B",
    },
  };

  return (
    <LanguageProvider>
      <UserProvider>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />

        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#071A3D]">
          <Navbar />

          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
            {/* Header Hero */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#F20D2F] mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Ressources Pédagogiques & Fiches Pratiques 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071A3D] mb-5 leading-tight">
                Télécharger les Fiches Mémo{" "}
                <span className="text-[#F20D2F]">Code de la Route PDF</span>
              </h1>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl mx-auto font-normal">
                Tous les résumés essentiels pour réviser l&apos;examen théorique NARSA : formules de calcul de distances, règles de priorité, tableau des amendes de la Loi 52-05 et feux en conditions difficiles.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-xs text-[#64748B] font-semibold">
                <span className="flex items-center gap-1.5">
                  <DownloadCloud className="w-4 h-4 text-[#20C875]" />
                  100% Gratuit & Imprimable
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  Conforme Banque de Questions 2026
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-500" />
                  Français & العربية
                </span>
              </div>
            </div>

            {/* Interactive PDF Client with search & filter */}
            <PdfResourcesClient />
          </main>

          <Footer />
          <MobileBottomNav />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
