"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { AuthGuard } from "@/components/auth/AuthGuard";
import {
  resendEmailVerification,
  sendPhoneCode,
  verifyEmailFromSignedUrl,
  verifyPhoneCode,
} from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { AuthMobileHeader, AuthSubmitButton } from "@/components/auth/AuthShell";

function OtpInputs({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(6, " ").slice(0, 6).split("");

  function setDigit(index: number, char: string) {
    const clean = char.replace(/\D/g, "").slice(-1);
    const next = value.split("");
    while (next.length < 6) next.push("");
    next[index] = clean;
    const joined = next.join("").slice(0, 6);
    onChange(joined);
    if (clean && index < 5) refs.current[index + 1]?.focus();
  }

  return (
    <div className="flex justify-center gap-2 sm:gap-3" dir="ltr">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          maxLength={1}
          value={d.trim()}
          onChange={(e) => setDigit(i, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !digits[i].trim() && i > 0) {
              refs.current[i - 1]?.focus();
            }
          }}
          className="w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border border-[#E2E8F0] bg-white text-[#071A3D] focus:ring-2 focus:ring-[#E30D2B]/40 outline-none"
        />
      ))}
    </div>
  );
}

function VerificationInner() {
  const { user, refreshUser, setUser } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const channel = searchParams.get("channel") || (user?.phone && !user.email ? "phone" : "email");
  const signedUrl = searchParams.get("url");

  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!signedUrl) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await verifyEmailFromSignedUrl(signedUrl);
        if (!cancelled) {
          setUser(res.user);
          setMessage(res.message || "E-mail vérifié.");
          router.replace("/profil");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "Lien invalide.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [signedUrl, router, setUser]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function resendEmail() {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await resendEmailVerification();
      setMessage(res.message);
      setCooldown(60);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur.");
    } finally {
      setLoading(false);
    }
  }

  async function sendOtp() {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const res = await sendPhoneCode();
      setMessage(res.message);
      setCooldown(60);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await verifyPhoneCode(code);
      setUser(res.user);
      await refreshUser();
      router.replace("/profil");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.fieldErrors().code || err.message);
      } else {
        setError("Erreur.");
      }
    } finally {
      setLoading(false);
    }
  }

  const isPhone = channel === "phone";

  return (
    <div
      className="min-h-screen bg-[#F5F7FB] px-4 pb-10"
      dir="ltr"
      lang="fr"
      style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}
    >
      <div className="max-w-md mx-auto">
        <AuthMobileHeader
          title={isPhone ? "Vérifie ton numéro" : "Vérifie ton adresse e-mail"}
          backHref="/profil"
        />

        <div className="mt-4 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-5 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-4xl">
            {isPhone ? "📱" : "✉️"}
          </div>

          <p className="text-sm text-slate-500">
            {isPhone
              ? `Entre le code à 6 chiffres envoyé au ${user?.phone || "numéro"}.`
              : `Nous avons envoyé un lien à ${user?.email || "ton adresse e-mail"}.`}
          </p>

          {isPhone ? (
            <form onSubmit={verifyOtp} className="space-y-5">
              <OtpInputs value={code} onChange={setCode} />
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
              <AuthSubmitButton loading={loading} disabled={code.length !== 6}>
                Vérifier le code
              </AuthSubmitButton>
              <button
                type="button"
                disabled={cooldown > 0 || loading}
                onClick={sendOtp}
                className="text-sm font-semibold text-[#2563EB] disabled:text-slate-400"
              >
                {cooldown > 0
                  ? `Renvoyer le code dans 00:${String(cooldown).padStart(2, "0")}`
                  : "Renvoyer le code"}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
              <button
                type="button"
                disabled={cooldown > 0 || loading}
                onClick={resendEmail}
                className="w-full h-12 rounded-xl bg-[#E30D2B] text-white font-bold disabled:opacity-60"
              >
                {cooldown > 0 ? `Renvoyer dans ${cooldown}s` : "Renvoyer l'e-mail"}
              </button>
              <Link href="/profil" className="block text-sm font-semibold text-slate-500">
                Continuer vers mon profil
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function VerificationClient() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AuthGuard>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement…</div>}>
            <VerificationInner />
          </Suspense>
        </AuthGuard>
      </AuthProvider>
    </LanguageProvider>
  );
}
