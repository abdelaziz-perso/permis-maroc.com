import type { Metadata } from "next";
import { RegisterClient } from "./RegisterClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Crée ton compte Permis Maroc et commence ta préparation gratuitement.",
  alternates: { canonical: "https://permis-maroc.com/inscription" },
};

export default function InscriptionPage() {
  return <RegisterClient />;
}
