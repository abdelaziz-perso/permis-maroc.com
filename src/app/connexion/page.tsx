import type { Metadata } from "next";
import { LoginClient } from "./LoginClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à Permis Maroc pour continuer votre préparation au permis.",
  alternates: { canonical: "https://permis-maroc.com/connexion" },
};

export default function ConnexionPage() {
  return <LoginClient />;
}
