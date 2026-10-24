import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Actualités Permis de Conduire au Maroc 2026",
  description:
    "Guides pratiques, astuces d'auto-école, démarches administratives NARSA, tarifs officiels et conseils pour réussir le permis de conduire au Maroc.",
  alternates: {
    canonical: "https://permis-maroc.com/blog",
  },
  openGraph: {
    title: "Blog Permis Maroc – Conseils & Guides Examen",
    description:
      "Tout ce que vous devez savoir pour réussir le permis de conduire au Maroc : démarches, prix, examens et astuces.",
    url: "https://permis-maroc.com/blog",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Permis Maroc",
    description: "Guides, conseils et actualités sur le permis de conduire et le Code de la Route au Maroc.",
    url: "https://permis-maroc.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Permis Maroc",
      url: "https://permis-maroc.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {children}
    </>
  );
}
