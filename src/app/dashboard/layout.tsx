import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de Bord & Progression | Permis Maroc",
  description:
    "Suivez vos statistiques d'entraînement, votre historique d'examens blancs, vos points d'XP et vos modules à réviser.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
