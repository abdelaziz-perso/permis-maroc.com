import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courseCategories } from "@/data/courses";
import { CourseCategoryClient } from "@/components/courses/CourseCategoryClient";

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return courseCategories.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: catSlug } = await params;
  const category = courseCategories.find((c) => c.slug === catSlug);
  if (!category) return { title: "Catégorie non trouvée" };

  return {
    title: `${category.title} : Cours & Règles Code de la Route Maroc`,
    description: category.description,
    alternates: {
      canonical: `https://permis-maroc.com/code-de-la-route/${category.slug}`,
    },
  };
}

export default async function CategoryCoursePage({ params }: PageProps) {
  const { category: catSlug } = await params;
  const category = courseCategories.find((c) => c.slug === catSlug);

  if (!category) {
    notFound();
  }

  return <CourseCategoryClient category={category} />;
}
