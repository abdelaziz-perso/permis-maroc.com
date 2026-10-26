"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useUser } from "@/context/UserContext";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { AuthNavControls } from "@/components/auth/AuthNavControls";
import {
  Menu,
  X,
  Flame,
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
        <nav className="hidden xl:flex items-center gap-0.5 min-w-0">
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
                className={`px-2.5 py-2 rounded-xl text-[13px] font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  link.highlight
                    ? isActive
                      ? "bg-[#E30D2B] text-white shadow-md shadow-red-600/20 font-bold"
                      : "bg-red-50 text-[#C1272D] border border-red-200 hover:bg-red-100 font-bold"
                    : isActive
                    ? "bg-red-50 text-[#C1272D] font-bold"
                    : "text-[#475569] hover:text-[#071A3D] hover:bg-slate-100/80"
                }`}
              >
                {link.highlight && (
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                )}
                {Icon && <Icon className="w-3.5 h-3.5 text-[#C1272D]" />}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side Controls */}
        <div className="hidden xl:flex items-center gap-2 shrink-0">
          {/* Gamification XP & Streak Badge */}
          {stats && (
            <Link
              href="/dashboard"
              className="hidden 2xl:flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] hover:border-amber-400/50 transition-all text-xs"
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
          <div className="flex items-center bg-[#F1F5F9] rounded-xl p-1 border border-[#E2E8F0] min-h-9">
            <button
              onClick={() => setLanguage("ar")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg min-h-8 transition-all cursor-pointer whitespace-nowrap ${
                language === "ar"
                  ? "bg-[#E30D2B] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#071A3D]"
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => setLanguage("ary")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg min-h-8 transition-all cursor-pointer whitespace-nowrap ${
                language === "ary"
                  ? "bg-[#E30D2B] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#071A3D]"
              }`}
              title="الدارجة المغربية"
            >
              الدارجة
            </button>
            <button
              onClick={() => setLanguage("fr")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg min-h-8 transition-all cursor-pointer whitespace-nowrap ${
                language === "fr"
                  ? "bg-[#E30D2B] text-white shadow-xs"
                  : "text-slate-600 hover:text-[#071A3D]"
              }`}
            >
              FR
            </button>
          </div>

          <AuthNavControls />
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <div className="flex items-center bg-[#F1F5F9] rounded-lg p-0.5 border border-[#E2E8F0]">
            <button
              onClick={() => setLanguage("ar")}
              className={`px-2 py-1.5 text-[11px] font-bold rounded-md min-h-8 ${
                language === "ar"
                  ? "bg-[#E30D2B] text-white"
                  : "text-slate-600"
              }`}
            >
              عربي
            </button>
            <button
              onClick={() => setLanguage("ary")}
              className={`px-2 py-1.5 text-[11px] font-bold rounded-md min-h-8 ${
                language === "ary"
                  ? "bg-[#E30D2B] text-white"
                  : "text-slate-600"
              }`}
            >
              دارجة
            </button>
            <button
              onClick={() => setLanguage("fr")}
              className={`px-2 py-1.5 text-[11px] font-bold rounded-md min-h-8 ${
                language === "fr"
                  ? "bg-[#E30D2B] text-white"
                  : "text-slate-600"
              }`}
            >
              FR
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#071A3D] hover:bg-slate-100"
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
                className={`block px-4 py-3 min-h-11 rounded-xl text-sm font-bold ${
                  isActive
                    ? "bg-red-50 text-[#C1272D] border border-red-200"
                    : "text-[#334155] hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2" onClick={() => setMobileMenuOpen(false)}>
            <AuthNavControls compact />
          </div>
        </div>
      )}
    </header>
  );
}
