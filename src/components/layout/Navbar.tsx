"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useUser } from "@/context/UserContext";
import {
  Menu,
  X,
  Globe,
  BookOpen,
  CheckCircle,
  ShieldAlert,
  FileText,
  Flame,
  LayoutDashboard,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t, isRtl } = useLanguage();
  const { user, stats } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navLinks = [
    { href: "/code-de-la-route", label: t.nav.courses, icon: BookOpen },
    { href: "/examen-blanc", label: t.nav.tests, icon: CheckCircle },
    { href: "/panneaux", label: t.nav.signs, icon: ShieldAlert },
    { href: "/pack-revision", label: language === "ar" || language === "ary" ? "باك المراجعة" : "Pack Révision", icon: Sparkles, highlight: true },
    { href: "/pdf", label: language === "ar" || language === "ary" ? "ملفات PDF" : "Fiches PDF", icon: FileText },
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/blog", label: t.nav.blog, icon: Sparkles },
  ];

  return (
    <header className="hidden md:block sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md shadow-[0_2px_15px_rgba(7,26,61,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F20D2F] to-[#C1272D] flex items-center justify-center shadow-md shadow-red-500/20 border border-red-500/30 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-xl tracking-tighter">PM</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#071A3D] group-hover:text-[#F20D2F] transition-colors">
              PERMIS<span className="text-[#F20D2F] ml-1">MAROC</span>
            </span>
            <span className="text-[10px] font-semibold text-[#64748B] tracking-wider uppercase -mt-1">
              Code de la Route 2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "bg-slate-100 text-[#071A3D] font-bold"
                    : link.highlight
                    ? "text-[#F20D2F] font-bold hover:bg-red-50"
                    : "text-[#334155] hover:text-[#071A3D] hover:bg-slate-100/70"
                }`}
              >
                <link.icon className={`w-4 h-4 ${link.highlight ? "text-[#F20D2F]" : isActive ? "text-[#071A3D]" : "text-[#64748B]"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section: XP Pill, Language Switcher, CTA */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* User Gamification XP Pill (if logged in) */}
          {user && (
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#071A3D] hover:border-[#F20D2F]/40 transition-colors shadow-xs"
              title={`${stats.xp} XP - ${stats.level}`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>{stats.xp} XP</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#64748B]">{stats.streakDays}j</span>
            </Link>
          )}

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-bold text-[#071A3D] transition-all cursor-pointer shadow-xs"
              aria-label="Changer de langue"
            >
              <Globe className="w-3.5 h-3.5 text-[#F20D2F]" />
              <span className="uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-[#64748B]" />
            </button>

            {langMenuOpen && (
              <div
                className={`absolute ${
                  isRtl ? "left-0" : "right-0"
                } mt-2 w-40 rounded-2xl border border-[#E2E8F0] bg-white shadow-xl py-1.5 z-50`}
              >
                <button
                  onClick={() => {
                    setLanguage("fr");
                    setLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                    language === "fr" ? "text-[#F20D2F] font-bold" : "text-[#334155]"
                  }`}
                >
                  <span>Français</span>
                  <span className="text-[10px] text-slate-400 font-mono">FR</span>
                </button>
                <button
                  onClick={() => {
                    setLanguage("ar");
                    setLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                    language === "ar" ? "text-[#F20D2F] font-bold" : "text-[#334155]"
                  }`}
                >
                  <span>العربية الفصحى</span>
                  <span className="text-[10px] text-slate-400 font-mono">AR</span>
                </button>
                <button
                  onClick={() => {
                    setLanguage("ary");
                    setLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                    language === "ary" ? "text-[#F20D2F] font-bold" : "text-[#334155]"
                  }`}
                >
                  <span>الدارجة المغربية</span>
                  <span className="text-[10px] text-slate-400 font-mono">ARY</span>
                </button>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <Link
            href="/examen-blanc"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#F20D2F] hover:bg-[#D90B28] text-white shadow-md shadow-red-500/20 active:scale-95 transition-all"
          >
            <span>{t.nav.takeTest}</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-[#071A3D] hover:bg-slate-100"
            aria-label="Ouvrir le menu mobile"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#071A3D] hover:bg-slate-100"
            >
              <link.icon className="w-4 h-4 text-[#F20D2F]" />
              <span>{link.label}</span>
            </Link>
          ))}
          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
            <Link
              href="/examen-blanc"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-bold bg-[#F20D2F] text-white"
            >
              {t.nav.takeTest}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
