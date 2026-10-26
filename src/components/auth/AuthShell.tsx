"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { BrandLogo, MoroccanFlag } from "@/components/ui/BrandLogo";

export function AuthDesktopHero({
  title = "Ton permis commence ici",
}: {
  title?: string;
}) {
  return (
    <div className="relative hidden lg:flex lg:w-[48%] xl:w-1/2 min-h-screen overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#071A3D]/85 via-[#071A3D]/55 to-[#E30D2B]/35" />
      <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 text-white w-full">
        <Link href="/" className="inline-flex">
          <BrandLogo size="lg" className="brightness-0 invert" />
        </Link>

        <div className="space-y-6 max-w-md">
          <h1
            className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            {title}
          </h1>
          <ul className="space-y-3 text-white/90 text-sm xl:text-base">
            {[
              "Tests interactifs NARSA 2026",
              "Examens blancs chronométrés",
              "Panneaux & cours en arabe, darija et français",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#20C875] shrink-0" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 text-white/80 text-sm">
          <MoroccanFlag className="w-6 h-4" />
          <span>Fait pour les candidats au Maroc</span>
        </div>
      </div>
    </div>
  );
}

export function AuthMobileHeader({
  title,
  backHref = "/",
}: {
  title: string;
  backHref?: string;
}) {
  return (
    <div
      className="lg:hidden px-4 pb-2"
      style={{ paddingTop: "max(12px, env(safe-area-inset-top))" }}
    >
      <div className="flex items-center justify-between mb-6">
        <Link
          href={backHref}
          className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#071A3D]"
          aria-label="Retour"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <BrandLogo size="sm" />
        <div className="w-10" />
      </div>
      <h1
        className="text-3xl font-extrabold text-[#071A3D] tracking-tight"
        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
      >
        {title}
      </h1>
    </div>
  );
}

export function AuthSubmitButton({
  children,
  loading,
  disabled,
}: {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="w-full h-12 sm:h-13 rounded-xl bg-[#E30D2B] hover:bg-[#D90B28] disabled:opacity-60 text-white font-bold text-base shadow-lg shadow-red-500/25 active:scale-[0.99] transition"
    >
      {loading ? "Patiente…" : children}
    </button>
  );
}
