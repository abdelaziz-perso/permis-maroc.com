"use client";

import React from "react";
import { Settings } from "lucide-react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider } from "@/context/UserContext";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { AuthProfileView } from "@/components/auth/AuthProfileView";
import { AudioSettings } from "@/components/audio/AudioSettings";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function ProfilClient() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <UserProvider>
          <AuthGuard>
            <div className="block md:hidden">
              <MobileAppShell
                title="Mon profil"
                rightAction={<Settings className="w-5 h-5 text-[#071A3D]" />}
              >
                <AuthProfileView />
                <div id="audio" className="px-4 pb-8">
                  <AudioSettings />
                </div>
              </MobileAppShell>
            </div>

            <div className="hidden md:block min-h-screen bg-[#F8FAFC]">
              <Navbar />
              <div className="max-w-3xl mx-auto py-10 px-4">
                <AuthProfileView />
                <div id="audio" className="mt-6">
                  <AudioSettings />
                </div>
              </div>
              <Footer />
            </div>
          </AuthGuard>
        </UserProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
