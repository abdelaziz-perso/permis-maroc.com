import type { Metadata } from "next";
import { ResetPasswordClient } from "./ResetPasswordClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Réinitialiser le mot de passe",
  alternates: { canonical: "https://permis-maroc.com/reinitialiser-mot-de-passe" },
};

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
