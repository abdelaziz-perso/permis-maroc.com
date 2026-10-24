import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panneaux de Signalisation Routière Maroc – Guide & Amendes MAD",
  description:
    "Guide interactif des panneaux de signalisation routière au Maroc : panneaux de danger, interdiction, obligation, indication et priorité avec montants officiels des amendes en dirhams (MAD).",
  alternates: {
    canonical: "https://permis-maroc.com/panneaux",
  },
  openGraph: {
    title: "Panneaux de Signalisation Routière au Maroc",
    description:
      "Tous les panneaux du Code de la Route marocain décryptés avec montants des amendes et règles de priorité.",
    url: "https://permis-maroc.com/panneaux",
    type: "website",
  },
};

export default function PanneauxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guide Officiel des Panneaux de Signalisation au Maroc",
    description:
      "Répertoire complet et interactif des panneaux du Code de la Route au Maroc avec explication des règles et amendes associées.",
    url: "https://permis-maroc.com/panneaux",
    isPartOf: {
      "@type": "WebSite",
      name: "Permis Maroc",
      url: "https://permis-maroc.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {children}
    </>
  );
}
