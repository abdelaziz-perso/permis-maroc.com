import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { MobileSituationView } from "@/components/mobile/MobileSituationView";
import { Interactive3DSection } from "@/components/home/Interactive3DSection";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Situations Réelles 3D — Code de la Route Maroc",
  description:
    "Entraînez-vous sur des intersections 3D réelles pour comprendre les règles de priorité du Code de la Route marocain sans stress.",
  alternates: {
    canonical: "https://permis-maroc.com/situations",
  },
};

export default function SituationsPage() {
  return (
    <LanguageProvider>
      <UserProvider>
        {/* MOBILE VIEW (< 768px) matching reference design Screen 7 */}
        <div className="block md:hidden">
          <MobileAppShell title="Apprends en situation réelle">
            <MobileSituationView />
          </MobileAppShell>
        </div>

        {/* DESKTOP VIEW (>= 768px) */}
        <div className="hidden md:flex min-h-screen flex-col bg-[#F8FAFC] text-[#071A3D]">
          <Navbar />
          <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <Interactive3DSection />
          </main>
          <Footer />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
