import type { Metadata } from "next";
import { VerificationClient } from "./VerificationClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Vérification",
  alternates: { canonical: "https://permis-maroc.com/verification" },
};

export default function VerificationPage() {
  return <VerificationClient />;
}
