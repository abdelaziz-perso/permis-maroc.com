import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Examen Blanc Permis B Maroc 2026 – 40 Questions Chronométrées",
  description:
    "Simulateur officiel de l'examen théorique du permis de conduire au Maroc en conditions réelles : 40 questions aléatoires, seuil de 34/40 pour réussir, chronomètre et explications des règles.",
  alternates: {
    canonical: "https://permis-maroc.com/examen-blanc",
  },
  openGraph: {
    title: "Examen Blanc Permis B Maroc 2026 – Test Gratuit",
    description:
      "Passez l'examen blanc officiel du Code de la Route marocain. 40 questions chronométrées avec correction détaillée.",
    url: "https://permis-maroc.com/examen-blanc",
    type: "website",
  },
};

export default function ExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: "Examen Blanc Permis B Maroc",
    description:
      "Test théorique blanc officiel de 40 questions pour préparer le permis de conduire au Maroc.",
    educationalLevel: "Intermédiaire",
    learningResourceType: "Quiz",
    typicalAgeRange: "18-65",
    timeRequired: "PT30M",
    about: {
      "@type": "Thing",
      name: "Code de la Route au Maroc",
    },
    educationalAlignment: {
      "@type": "AlignmentObject",
      alignmentType: "educationalSubject",
      educationalFramework: "Loi 52-05 portant Code de la Route au Maroc (NARSA)",
      targetName: "Examen Théorique Permis B",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />
      {children}
    </>
  );
}
