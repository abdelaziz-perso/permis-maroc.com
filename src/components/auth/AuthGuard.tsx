"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setAuthRedirect, useAuth } from "@/providers/AuthProvider";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      setAuthRedirect(pathname || "/profil");
      router.replace(
        `/connexion?redirect=${encodeURIComponent(pathname || "/profil")}`
      );
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-[#071A3D]">
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-[#E30D2B] border-t-transparent"
            aria-hidden
          />
          <p className="text-sm font-medium text-slate-500">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
