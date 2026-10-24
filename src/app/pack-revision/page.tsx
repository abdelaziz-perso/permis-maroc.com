import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { PackHeroSection } from "@/components/pack/PackHeroSection";
import { PackValueProps } from "@/components/pack/PackValueProps";
import { PackFaq } from "@/components/pack/PackFaq";
import { MobilePackScreen } from "@/components/pack/MobilePackScreen";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { revisionPackData } from "@/data/packRevision";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Pack Révision Permis B – Code de la Route Maroc | Permis Maroc",
  description:
    "Tout ce qu'il te faut pour préparer ton examen : cours complets, questions d'entraînement, examens blancs et panneaux de signalisation. Accessible sur téléphone, tablette et PC.",
  alternates: {
    canonical: "https://permis-maroc.com/pack-revision",
  },
  openGraph: {
    title: "Pack Révision Permis B – Permis Maroc",
    description:
      "Révise à ton rythme avec un pack complet de cours, questions, panneaux et examens blancs accessible partout.",
    url: "https://permis-maroc.com/pack-revision",
    type: "website",
  },
};

export default function PackRevisionPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: revisionPackData.name,
    description: revisionPackData.description,
    image: "https://permis-maroc.com/logo.png",
    offers: {
      "@type": "Offer",
      price: revisionPackData.price.toString(),
      priceCurrency: revisionPackData.currency,
      availability: "https://schema.org/InStock",
      url: "https://permis-maroc.com/pack-revision",
    },
  };

  return (
    <LanguageProvider>
      <UserProvider>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />

        {/* MOBILE VIEW (< 768px): Native App Shell without bottom nav (sticky purchase bar is shown) */}
        <div className="block md:hidden">
          <MobileAppShell title="Pack Révision" hideBottomNav={true}>
            <MobilePackScreen />
          </MobileAppShell>
        </div>

        {/* DESKTOP VIEW (>= 768px): Full width modern experience */}
        <div className="hidden md:flex min-h-screen flex-col bg-[#0B0F17] text-white">
          <Navbar />
          <main className="flex-1">
            <PackHeroSection />
            <PackValueProps />
            <PackFaq />
          </main>
          <Footer />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
