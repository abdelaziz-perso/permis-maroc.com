import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cours Code de la Route Maroc 2026 – 12 Modules Officiels",
  description:
    "Apprenez le Code de la Route marocain en ligne avec les 12 modules officiels : priorités, signalisation, vitesse, sanctions et conduite sécurisée selon les normes NARSA.",
  alternates: {
    canonical: "https://permis-maroc.com/code-de-la-route",
  },
  openGraph: {
    title: "Cours Code de la Route Maroc 2026 – 12 Modules Officiels",
    description:
      "Toutes les leçons du Code de la Route marocain : fiches illustrées, résumés et règles de circulation.",
    url: "https://permis-maroc.com/code-de-la-route",
    type: "website",
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Programme Officiel du Code de la Route au Maroc",
    description:
      "Formation complète aux 12 thèmes du Code de la Route marocain pour réussir l'examen théorique du permis de conduire.",
    provider: {
      "@type": "EducationalOrganization",
      name: "Permis Maroc",
      url: "https://permis-maroc.com",
    },
    educationalCredentialAwarded: "Préparation Examen Permis B",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      inLanguage: ["fr-MA", "ar-MA"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {children}
    </>
  );
}
