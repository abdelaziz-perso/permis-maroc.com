"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { ApiError } from "@/lib/api/client";
import { PasswordField } from "@/components/auth/PasswordField";
import { TextField } from "@/components/auth/TextField";
import {
  AuthDesktopHero,
  AuthMobileHeader,
  AuthSubmitButton,
} from "@/components/auth/AuthShell";
import { BrandLogo, MoroccanFlag } from "@/components/ui/BrandLogo";

function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<"email" | "phone">("email");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setFormError(null);
    setLoading(true);

    try {
      const user = await register({
        name: name.trim(),
        email: mode === "email" ? email.trim() : undefined,
        phone: mode === "phone" ? phone.trim() : undefined,
        password,
        password_confirmation: passwordConfirmation,
        preferred_language: "fr",
      });

      if (mode === "phone") {
        router.replace("/verification?channel=phone");
      } else if (user.email && !user.email_verified_at) {
        router.replace("/verification?channel=email");
      } else {
        router.replace("/profil");
      }
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
      <AuthDesktopHero title="Commence ta préparation" />

      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 py-8 lg:py-12">
        <AuthMobileHeader title="Crée ton compte" backHref="/connexion" />

        <div className="w-full max-w-md mx-auto">
          <div className="hidden lg:block mb-8">
            <BrandLogo size="md" className="mb-8" />
            <h2
              className="text-3xl font-extrabold text-[#071A3D] tracking-tight"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Crée ton compte
            </h2>
            <p className="mt-2 text-slate-500">
              Commence ta préparation au permis gratuitement.
            </p>
          </div>

          <p className="lg:hidden text-slate-500 mb-6 -mt-2">
            Commence ta préparation au permis gratuitement.
          </p>

          <div className="flex p-1 mb-5 rounded-xl bg-[#EEF2F7] border border-[#E2E8F0]">
            {(["email", "phone"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 h-10 rounded-lg text-sm font-bold transition ${
                  mode === m
                    ? "bg-[#E30D2B] text-white shadow-sm"
                    : "text-slate-600 hover:text-[#071A3D]"
                }`}
              >
                {m === "email" ? "E-mail" : "Téléphone"}
              </button>
            ))}
          </div>

          <form
            onSubmit={onSubmit}
            className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_8px_40px_rgba(7,26,61,0.06)] p-5 sm:p-7 space-y-4"
          >
            <TextField
              id="name"
              label="Nom complet"
              value={name}
              onChange={setName}
              error={errors.name}
              autoComplete="name"
              placeholder="Yassine Elhathout"
            />

            {mode === "email" ? (
              <TextField
                id="email"
                label="Adresse e-mail"
                type="email"
                inputMode="email"
                value={email}
                onChange={setEmail}
                error={errors.email}
                autoComplete="email"
                placeholder="ton@email.com"
              />
            ) : (
              <TextField
                id="phone"
                label="Téléphone"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={setPhone}
                error={errors.phone}
                autoComplete="tel"
                placeholder="612345678"
                prefix={
                  <>
                    <MoroccanFlag className="w-5 h-3.5" />
                    <span>+212</span>
                  </>
                }
              />
            )}

            <PasswordField
              id="password"
              label="Mot de passe"
              value={password}
              onChange={setPassword}
              error={errors.password}
              autoComplete="new-password"
            />

            <PasswordField
              id="password_confirmation"
              label="Confirmer le mot de passe"
              value={passwordConfirmation}
              onChange={setPasswordConfirmation}
              error={errors.password_confirmation}
              autoComplete="new-password"
            />

            {formError ? (
              <p className="text-sm text-red-600 font-medium">{formError}</p>
            ) : null}

            <AuthSubmitButton loading={loading}>Créer mon compte</AuthSubmitButton>

            <p className="text-[11px] text-center text-slate-400 leading-relaxed">
              En créant un compte, tu acceptes nos{" "}
              <Link href="/mentions-legales" className="underline">
                conditions
              </Link>{" "}
              et la{" "}
              <Link href="/confidentialite" className="underline">
                confidentialité
              </Link>
              .
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600 pb-[max(16px,env(safe-area-inset-bottom))]">
            Déjà inscrit ?{" "}
            <Link href="/connexion" className="font-bold text-[#E30D2B] hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function RegisterClient() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <RegisterForm />
      </AuthProvider>
    </LanguageProvider>
  );
}
