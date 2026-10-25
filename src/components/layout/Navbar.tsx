"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useUser } from "@/context/UserContext";
import { BrandLogo } from "@/components/ui/BrandLogo";
import {
  Menu,
  X,
  Globe,
  Flame,
  User as UserIcon,
  Award,
  Sparkles,
  FileDown,
} from "lucide-react";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { stats } = useUser();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isArabic = language === "ar" || language === "ary";

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/code-de-la-route", label: t.nav.courses },
    { href: "/examen-blanc", label: t.nav.tests },
    { href: "/panneaux", label: t.nav.signs },
    {
      href: "/pdf",
      label: isArabic ? "ملخصات PDF" : "Fiches PDF",
      icon: FileDown,
    },
    {
      href: "/pack-revision",
      label: isArabic ? "باك المراجعة" : "Pack Révision",
      highlight: true,
    },
    { href: "/blog", label: t.nav.blog },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-[0_2px_15px_rgba(7,26,61,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo (Replaces old PM badge) */}
        <Link href="/" className="group shrink-0">
          <BrandLogo size="md" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  link.highlight
                    ? isActive
                      ? "bg-[#F20D2F] text-white shadow-md shadow-red-600/20 font-bold"
                      : "bg-red-50 text-[#F20D2F] border border-red-200 hover:bg-red-100 font-bold"
                    : isActive
                    ? "bg-red-50 text-[#F20D2F] font-bold"
                    : "text-[#475569] hover:text-[#071A3D] hover:bg-slate-100/80"
                }`}
              >
                {link.highlight && (
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                )}
                {Icon && <Icon className="w-3.5 h-3.5 text-[#F20D2F]" />}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side Controls */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Gamification XP & Streak Badge */}
          {stats && (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] hover:border-amber-400/50 transition-all text-xs"
              title={
                isArabic
                  ? "تقدمك ونقاط الخبرة"
                  : "Votre progression et série quotidienne"
              }
            >
              <span className="flex items-center gap-1 text-amber-500 font-bold tabular-nums">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                {stats.streakDays}j
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1 text-emerald-600 font-bold tabular-nums">
                <Award className="w-3.5 h-3.5" />
                {stats.xp} XP
              </span>
            </Link>
          )}

          {/* Language Switcher: العربية | الدارجة | FR */}
          <div className="flex items-center bg-[#F1F5F9] rounded-xl p-1 border border-[#E2E8F0]">
            <Globe className="w-3.5 h-3.5 text-slate-500 mx-1.5" />
            <button
              onClick={() => setLanguage("ar")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                language === "ar"
                  ? "bg-[#F20D2F] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#071A3D]"
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => setLanguage("ary")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                language === "ary"
                  ? "bg-[#F20D2F] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#071A3D]"
              }`}
              title="الدارجة المغربية"
            >
              الدارجة
            </button>
            <button
              onClick={() => setLanguage("fr")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                language === "fr"
                  ? "bg-[#F20D2F] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#071A3D]"
              }`}
            >
              FR
            </button>
          </div>

          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className={`p-2 rounded-xl border transition-all ${
              pathname === "/dashboard"
                ? "bg-red-50 border-red-200 text-[#F20D2F]"
                : "bg-[#F8FAFC] border-[#E2E8F0] text-slate-600 hover:text-[#071A3D]"
            }`}
            aria-label={t.nav.dashboard}
            title={t.nav.dashboard}
          >
            <UserIcon className="w-4 h-4" />
          </Link>

          {/* Primary CTA */}
          <Link
            href="/examen-blanc"
            className="px-4 py-2 rounded-xl bg-[#F20D2F] hover:bg-[#D90B28] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-red-500/20 active:scale-95 whitespace-nowrap shrink-0"
          >
            {t.nav.takeTest}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex items-center bg-[#F1F5F9] rounded-lg p-0.5 border border-[#E2E8F0]">
            <button
              onClick={() => setLanguage("ar")}
              className={`px-2 py-1 text-[11px] font-bold rounded-md ${
                language === "ar"
                  ? "bg-[#F20D2F] text-white"
                  : "text-slate-600"
              }`}
            >
              عربي
            </button>
            <button
              onClick={() => setLanguage("ary")}
              className={`px-2 py-1 text-[11px] font-bold rounded-md ${
                language === "ary"
                  ? "bg-[#F20D2F] text-white"
                  : "text-slate-600"
              }`}
            >
              دارجة
            </button>
            <button
              onClick={() => setLanguage("fr")}
              className={`px-2 py-1 text-[11px] font-bold rounded-md ${
                language === "fr"
                  ? "bg-[#F20D2F] text-white"
                  : "text-slate-600"
              }`}
            >
              FR
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#071A3D] hover:bg-slate-100"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-bold ${
                  isActive
                    ? "bg-red-50 text-[#F20D2F] border border-red-200"
                    : "text-[#334155] hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-bold text-[#334155] hover:bg-slate-50"
          >
            {t.nav.dashboard}
          </Link>
          <div className="pt-2">
            <Link
              href="/examen-blanc"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-xl bg-[#F20D2F] text-white font-bold text-sm shadow-lg shadow-red-500/20"
            >
              {t.nav.startFree}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
