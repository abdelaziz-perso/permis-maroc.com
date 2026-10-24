import type { Metadata } from "next";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { MobileTestView } from "@/components/mobile/MobileTestView";
import ExamPage from "@/app/examen-blanc/page";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [
    { id: "permis-b" },
    { id: "1" },
    { id: "2" },
  ];
}

export const metadata: Metadata = {
  title: "Test Permis B — Examen Blanc Chronométré",
  description:
    "Passez votre test d'entraînement au permis B en conditions réelles : 40 questions officielles, chronomètre et correction détaillée.",
};

export default function MobileTestRoute() {
  return (
    <LanguageProvider>
      <UserProvider>
        {/* MOBILE VIEW (< 768px) matching reference design Screen 3 */}
        <div className="block md:hidden">
          <MobileAppShell title="Test permis B" hideBottomNav={true}>
            <MobileTestView />
          </MobileAppShell>
        </div>

        {/* DESKTOP VIEW (>= 768px) */}
        <div className="hidden md:block">
          <ExamPage />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
