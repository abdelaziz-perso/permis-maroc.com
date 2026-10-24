import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cityGuides } from "@/data/cities";
import { CityGuideClient } from "@/components/cities/CityGuideClient";

interface Props {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return cityGuides.map((c) => ({
    city: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = cityGuides.find((c) => c.slug === citySlug);
  if (!city) return { title: "Ville non trouvée" };

  return {
    title: `Passer son Permis à ${city.name} : Centres NARSA & Conseils`,
    description: city.description,
    alternates: {
      canonical: `https://permis-maroc.com/villes/${city.slug}`,
    },
  };
}

export default async function CityGuidePage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = cityGuides.find((c) => c.slug === citySlug);

  if (!city) {
    notFound();
  }

  return <CityGuideClient city={city} />;
}
