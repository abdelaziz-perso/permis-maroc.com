import type { Metadata } from "next";
import { ProfilClient } from "./ProfilClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Mon Profil — Permis Maroc",
  description:
    "Consultez votre progression, vos points XP, statistiques et historique des tests au permis de conduire.",
  alternates: {
    canonical: "https://permis-maroc.com/profil",
  },
};

export default function ProfilPage() {
  return <ProfilClient />;
}
