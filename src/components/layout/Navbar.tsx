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
    { href: "/pdf", label: language === "ar" || language === "ary" ? "ملفات PDF" : "Fiches PDF", icon: FileText },
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { href: "/blog", label: t.nav.blog, icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0F17]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C1272D] to-[#9E1F24] flex items-center justify-center shadow-lg shadow-red-950/50 border border-red-500/30 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-xl tracking-tighter">PM</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-red-400 transition-colors">
              PERMIS<span className="text-[#C1272D] ml-1">MAROC</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase -mt-1">
              Code de la Route 2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "bg-white/10 text-white font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <link.icon className="w-4 h-4 text-slate-400" />
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
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs font-medium text-amber-300 hover:border-amber-500/50 transition-colors shadow-sm"
              title={`${stats.xp} XP - ${stats.level}`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{stats.xp} XP</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">{stats.streakDays}j</span>
            </Link>
          )}

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/10 bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-all cursor-pointer"
              aria-label="Changer de langue"
            >
              <Globe className="w-3.5 h-3.5 text-red-400" />
              <span className="uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div
                className={`absolute ${
                  isRtl ? "left-0" : "right-0"
                } mt-2 w-36 rounded-xl border border-white/10 bg-[#121824] shadow-2xl py-1.5 z-50`}
              >
                <button
                  onClick={() => {
                    setLanguage("fr");
                    setLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-white/5 ${
                    language === "fr" ? "text-red-400 font-bold" : "text-slate-300"
                  }`}
                >
                  <span>Français</span>
                  <span className="text-[10px] text-slate-500 font-mono">FR</span>
                </button>
                <button
                  onClick={() => {
                    setLanguage("ar");
                    setLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-white/5 ${
                    language === "ar" ? "text-red-400 font-bold" : "text-slate-300"
                  }`}
                >
                  <span>العربية الفصحى</span>
                  <span className="text-[10px] text-slate-500 font-mono">AR</span>
                </button>
                <button
                  onClick={() => {
                    setLanguage("ary");
                    setLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-white/5 ${
                    language === "ary" ? "text-red-400 font-bold" : "text-slate-300"
                  }`}
                >
                  <span>الدارجة المغربية</span>
                  <span className="text-[10px] text-slate-500 font-mono">ARY</span>
                </button>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <Link
            href="/examen-blanc"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#C1272D] hover:bg-[#9E1F24] text-white shadow-lg shadow-red-950/40 hover:shadow-red-700/30 transition-all border border-red-500/30"
          >
            <span>{t.nav.takeTest}</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            aria-label="Ouvrir le menu mobile"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0B0F17] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              <link.icon className="w-4 h-4 text-red-400" />
              <span>{link.label}</span>
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/examen-blanc"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-semibold bg-[#C1272D] text-white"
            >
              {t.nav.takeTest}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
