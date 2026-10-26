"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { User as UserIcon } from "lucide-react";
import { AuthProvider, clearAuthRedirect, getAuthRedirect, useAuth } from "@/providers/AuthProvider";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { ApiError } from "@/lib/api/client";
import { PasswordField } from "@/components/auth/PasswordField";
import { TextField } from "@/components/auth/TextField";
import {
  AuthDesktopHero,
  AuthMobileHeader,
  AuthSubmitButton,
} from "@/components/auth/AuthShell";
import { BrandLogo } from "@/components/ui/BrandLogo";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loginValue, setLoginValue] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const redirectTo = useMemo(() => {
    const q = searchParams.get("redirect");
    return q || getAuthRedirect() || "/profil";
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setFormError(null);
    setLoading(true);
    try {
      await login({ login: loginValue.trim(), password, remember });
      clearAuthRedirect();
      router.replace(redirectTo.startsWith("/") ? redirectTo : "/profil");
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(err.fieldErrors());
        setFormError(err.message);
      } else {
        setFormError("Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#F5F7FB]" dir="ltr" lang="fr">
      <AuthDesktopHero />

      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 py-8 lg:py-12">
        <AuthMobileHeader title="Bon retour 👋" backHref="/" />

        <div className="w-full max-w-md mx-auto">
          <div className="hidden lg:block mb-8">
            <BrandLogo size="md" className="mb-8" />
            <h2
              className="text-3xl font-extrabold text-[#071A3D] tracking-tight"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Bon retour 👋
            </h2>
            <p className="mt-2 text-slate-500">
              Connectez-vous pour continuer votre préparation.
            </p>
          </div>

          <p className="lg:hidden text-slate-500 mb-6 -mt-2">
            Connectez-vous pour continuer votre préparation.
          </p>

          <form
            onSubmit={onSubmit}
            className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_8px_40px_rgba(7,26,61,0.06)] p-5 sm:p-7 space-y-4"
          >
            <TextField
              id="login"
              label="Email ou téléphone"
              value={loginValue}
              onChange={setLoginValue}
              error={errors.login}
              placeholder="ex: user@email.com ou 06…"
              autoComplete="username"
              icon={<UserIcon className="w-4 h-4" />}
            />

            <PasswordField
              id="password"
              label="Mot de passe"
              value={password}
              onChange={setPassword}
              error={errors.password}
            />

            <div className="flex items-center justify-between gap-3 pt-1">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#E30D2B] focus:ring-[#E30D2B]"
                />
                Se souvenir de moi
              </label>
              <Link
                href="/mot-de-passe-oublie"
                className="text-sm font-semibold text-[#2563EB] hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {formError && !errors.login ? (
              <p className="text-sm text-red-600 font-medium">{formError}</p>
            ) : null}

            <AuthSubmitButton loading={loading}>Se connecter</AuthSubmitButton>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 pb-[max(16px,env(safe-area-inset-bottom))]">
            Pas encore de compte ?{" "}
            <Link href="/inscription" className="font-bold text-[#E30D2B] hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function LoginClient() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <React.Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">Chargement…</div>
          }
        >
          <LoginForm />
        </React.Suspense>
      </AuthProvider>
    </LanguageProvider>
  );
}
