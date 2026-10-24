import type { Metadata } from "next";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { MobileProfileView } from "@/components/mobile/MobileProfileView";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import DashboardPage from "@/app/dashboard/page";
import { Settings } from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Mon Profil — Permis Maroc",
  description: "Consultez votre progression, vos points XP, statistiques et historique des tests au permis de conduire.",
  alternates: {
    canonical: "https://permis-maroc.com/profil",
  },
};

export default function ProfilPage() {
  return (
    <LanguageProvider>
      <UserProvider>
        {/* MOBILE VIEW (< 768px) matching reference design Screen 8 */}
        <div className="block md:hidden">
          <MobileAppShell
            title="Mon profil"
            rightAction={<Settings className="w-5 h-5 text-[#071A3D]" />}
          >
            <MobileProfileView />
          </MobileAppShell>
        </div>

        {/* DESKTOP VIEW (>= 768px): redirect to or render Dashboard */}
        <div className="hidden md:block">
          <DashboardPage />
        </div>
      </UserProvider>
    </LanguageProvider>
  );
}
