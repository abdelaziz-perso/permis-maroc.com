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
  // Structured Data Schema.org for SEO & SGO (Search Generative Optimization)
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

  const educationalOrgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Permis Maroc",
    url: "https://permis-maroc.com",
    logo: "https://permis-maroc.com/logo.png",
    description:
      "Plateforme éducative indépendante d'apprentissage du Code de la Route marocain (Loi 52-05) et de simulation d'examen blanc.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+212630258502",
      contactType: "customer service",
      areaServed: "MA",
      availableLanguage: ["French", "Arabic"],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment se déroule l'examen théorique du permis de conduire au Maroc ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'examen théorique du permis B au Maroc se déroule sur ordinateur dans un centre d'immatriculation NARSA. Le candidat répond à une série de 40 questions à choix multiples chronométrées (environ 30 secondes par question).",
        },
      },
      {
        "@type": "Question",
        name: "Quel est le score minimum pour réussir l'examen du permis B au Maroc ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pour réussir l'examen théorique de la catégorie B (véhicules légers), le candidat doit obtenir un minimum de 34 bonnes réponses sur 40 (soit un taux de réussite de 85%). Pour les permis poids lourds (C, D), le seuil est de 38/46.",
        },
      },
      {
        "@type": "Question",
        name: "Combien coûte le permis de conduire au Maroc en 2026 ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le tarif légal minimum de base de la formation théorique et pratique en auto-école est fixé à environ 2 250 DH HT. En comptant les frais d'inscription, le timbre fiscal d'examen (environ 700 DH) et la visite médicale (environ 150 DH), le coût moyen total se situe généralement entre 3 200 et 4 000 DH.",
        },
      },
      {
        "@type": "Question",
        name: "Combien de points comporte le permis de conduire marocain ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pendant la période probatoire de 2 ans qui suit l'obtention du permis, le capital est de 20 points. À l'issue des 2 années sans infraction entraînant l'annulation du permis, le capital est automatiquement porté à 30 points.",
        },
      },
    ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
