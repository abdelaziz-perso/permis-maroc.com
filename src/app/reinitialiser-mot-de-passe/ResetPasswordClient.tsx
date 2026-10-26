"use client";

import React, { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthProvider } from "@/providers/AuthProvider";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { resetPassword } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { PasswordField } from "@/components/auth/PasswordField";
import { TextField } from "@/components/auth/TextField";
import {
  AuthDesktopHero,
  AuthMobileHeader,
  AuthSubmitButton,
} from "@/components/auth/AuthShell";
import { BrandLogo } from "@/components/ui/BrandLogo";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const emailFromQuery = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromQuery);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const missingToken = useMemo(() => !token, [token]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setFormError(null);
    setLoading(true);
    try {
      await resetPassword({
        token,
        email: email.trim(),
        password,
        password_confirmation: passwordConfirmation,
      });
      router.replace("/connexion");
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
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 py-8">
        <AuthMobileHeader title="Nouveau mot de passe" backHref="/connexion" />
        <div className="w-full max-w-md mx-auto">
          <div className="hidden lg:block mb-8">
            <BrandLogo size="md" className="mb-8" />
            <h2 className="text-3xl font-extrabold text-[#071A3D]">Réinitialiser</h2>
            <p className="mt-2 text-slate-500">Choisis un nouveau mot de passe sécurisé.</p>
          </div>

          {missingToken ? (
            <div className="bg-white rounded-2xl border p-6 text-sm text-slate-600">
              Lien invalide.{" "}
              <Link href="/mot-de-passe-oublie" className="text-[#E30D2B] font-bold">
                Demander un nouveau lien
              </Link>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5 sm:p-7 space-y-4"
            >
              <TextField
                id="email"
                label="Adresse e-mail"
                type="email"
                value={email}
                onChange={setEmail}
                error={errors.email}
                autoComplete="email"
              />
              <PasswordField
                id="password"
                label="Nouveau mot de passe"
                value={password}
                onChange={setPassword}
                error={errors.password}
                autoComplete="new-password"
              />
              <PasswordField
                id="password_confirmation"
                label="Confirmer"
                value={passwordConfirmation}
                onChange={setPasswordConfirmation}
                error={errors.password_confirmation}
                autoComplete="new-password"
              />
              {formError ? <p className="text-sm text-red-600">{formError}</p> : null}
              <AuthSubmitButton loading={loading}>Enregistrer</AuthSubmitButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function ResetPasswordClient() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement…</div>}>
          <ResetForm />
        </Suspense>
      </AuthProvider>
    </LanguageProvider>
  );
}
