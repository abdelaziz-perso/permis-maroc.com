"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User as UserIcon } from "lucide-react";
import { AuthProvider } from "@/providers/AuthProvider";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { forgotPassword } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { TextField } from "@/components/auth/TextField";
import {
  AuthDesktopHero,
  AuthMobileHeader,
  AuthSubmitButton,
} from "@/components/auth/AuthShell";
import { BrandLogo } from "@/components/ui/BrandLogo";

function ForgotForm() {
  const [loginValue, setLoginValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await forgotPassword(loginValue.trim());
      setSuccess(res.message);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#F5F7FB]" dir="ltr" lang="fr">
      <AuthDesktopHero />
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 py-8">
        <AuthMobileHeader title="Mot de passe oublié" backHref="/connexion" />
        <div className="w-full max-w-md mx-auto">
          <div className="hidden lg:block mb-8">
            <BrandLogo size="md" className="mb-8" />
            <h2 className="text-3xl font-extrabold text-[#071A3D]">Mot de passe oublié</h2>
            <p className="mt-2 text-slate-500">
              Indique ton e-mail ou téléphone. Si un compte e-mail existe, tu recevras un lien.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 sm:p-7 space-y-4"
          >
            <TextField
              id="login"
              label="Email ou téléphone"
              value={loginValue}
              onChange={setLoginValue}
              icon={<UserIcon className="w-4 h-4" />}
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {success ? <p className="text-sm text-emerald-600 font-medium">{success}</p> : null}
            <AuthSubmitButton loading={loading}>Envoyer le lien</AuthSubmitButton>
          </form>

          <p className="mt-6 text-center text-sm">
            <Link href="/connexion" className="font-bold text-[#E30D2B]">
              Retour à la connexion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function ForgotPasswordClient() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ForgotForm />
      </AuthProvider>
    </LanguageProvider>
  );
}
