import type { Metadata } from "next";
import { ForgotPasswordClient } from "./ForgotPasswordClient";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  alternates: { canonical: "https://permis-maroc.com/mot-de-passe-oublie" },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
