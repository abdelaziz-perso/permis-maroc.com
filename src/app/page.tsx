import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { MobileHomeScreen } from "@/components/mobile/MobileHomeScreen";
import { HeroSection } from "@/components/home/HeroSection";
import { ScrollTransitionRoadSign } from "@/components/home/ScrollTransitionRoadSign";
import { QuickTestSection } from "@/components/home/QuickTestSection";
import { Interactive3DSection } from "@/components/home/Interactive3DSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { HomePackPreview } from "@/components/home/HomePackPreview";
import { MobileAppPromo } from "@/components/home/MobileAppPromo";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Permis Maroc – Code de la Route, Tests & Examen Blanc",
  description:
    "Préparez votre permis de conduire au Maroc avec des cours de Code de la Route, tests interactifs, examens blancs et fiches de signalisation.",
  alternates: {
    canonical: "https://permis-maroc.com",
  },
};

export default function HomePage() {
  // Structured Data Schema.org
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Permis Maroc",
    url: "https://permis-maroc.com",
    description:
      "La plateforme moderne pour apprendre le Code de la Route et réussir son examen au Maroc.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://permis-maroc.com/panneaux?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Permis Maroc",
    url: "https://permis-maroc.com",
    logo: "https://permis-maroc.com/logo.png",
    sameAs: [],
  };

  return (
    <LanguageProvider>
      <UserProvider>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* MOBILE NATIVE APP VIEW (< 768px) matching reference design */}
        <div className="block md:hidden">
          <MobileAppShell isHome={true}>
            <MobileHomeScreen />
          </MobileAppShell>
        </div>

        {/* DESKTOP WEB EXPERIENCE (>= 768px) with 3D Diorama & Hero */}
        <div className="hidden md:flex min-h-screen flex-col bg-[#0B0F17] text-white">
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <ScrollTransitionRoadSign />
            <QuickTestSection />
            <Interactive3DSection />
            <FeaturesGrid />
            <HomePackPreview />
            <MobileAppPromo />
            <FaqAccordion />
          </main>
          <Footer />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
