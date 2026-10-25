"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { Home, BookOpen, TriangleAlert, User } from "lucide-react";

// Custom SVG Steering Wheel icon for the center dominant button
function SteeringWheelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v7" />
      <path d="M4.93 15.07l6.14-3.54" />
      <path d="M19.07 15.07l-6.14-3.54" />
    </svg>
  );
}

interface MobileBottomNavProps {
  hidden?: boolean;
}

export function MobileBottomNav({ hidden = false }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  if (hidden) return null;

  const isHomeActive = pathname === "/";
  const isCoursesActive = pathname.startsWith("/code-de-la-route");
  const isTestsActive =
    pathname.startsWith("/examen-blanc") || pathname.startsWith("/tests");
  const isSignsActive = pathname.startsWith("/panneaux");
  const isProfileActive =
    pathname.startsWith("/profil") || pathname.startsWith("/dashboard");

  return (
    <nav
      aria-label="Navigation mobile"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5ECF5] rounded-t-2xl shadow-[0_-4px_24px_rgba(7,26,61,0.08)] px-4 pt-2"
      style={{
        paddingBottom: "max(12px, env(safe-area-inset-bottom, 12px))",
      }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {/* 1. ACCUEIL */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isHomeActive
              ? "text-[#C1272D] font-bold"
              : "text-[#5A6A82] hover:text-[#071A3D]"
          }`}
        >
          <Home
            className={`w-5 h-5 mb-1 transition-transform ${
              isHomeActive ? "scale-110 stroke-[2.4]" : "stroke-[1.8]"
            }`}
          />
          <span className="text-[10px] tracking-tight">
            {isArabic ? "الرئيسية" : "Accueil"}
          </span>
        </Link>

        {/* 2. COURS */}
        <Link
          href="/code-de-la-route"
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isCoursesActive
              ? "text-[#C1272D] font-bold"
              : "text-[#5A6A82] hover:text-[#071A3D]"
          }`}
        >
          <BookOpen
            className={`w-5 h-5 mb-1 transition-transform ${
              isCoursesActive ? "scale-110 stroke-[2.4]" : "stroke-[1.8]"
            }`}
          />
          <span className="text-[10px] tracking-tight">
            {isArabic ? "الدروس" : "Cours"}
          </span>
        </Link>

        {/* 3. CENTER TESTS BUTTON (Dominant Raised Red Circle) */}
        <div className="flex-1 flex flex-col items-center justify-center relative -top-4">
          <Link
            href="/examen-blanc"
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#C1272D] to-[#F20D2F] text-white flex items-center justify-center shadow-lg shadow-red-500/40 border-4 border-white active:scale-95 transition-transform"
            aria-label="Passer un test"
          >
            <SteeringWheelIcon className="w-7 h-7" />
          </Link>
          <span
            className={`text-[10px] mt-0.5 tracking-tight ${
              isTestsActive ? "text-[#C1272D] font-bold" : "text-[#5A6A82]"
            }`}
          >
            {isArabic ? "امتحانات" : "Tests"}
          </span>
        </div>

        {/* 4. PANNEAUX */}
        <Link
          href="/panneaux"
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isSignsActive
              ? "text-[#C1272D] font-bold"
              : "text-[#5A6A82] hover:text-[#071A3D]"
          }`}
        >
          <TriangleAlert
            className={`w-5 h-5 mb-1 transition-transform ${
              isSignsActive ? "scale-110 stroke-[2.4]" : "stroke-[1.8]"
            }`}
          />
          <span className="text-[10px] tracking-tight">
            {isArabic ? "البلايك" : "Panneaux"}
          </span>
        </Link>

        {/* 5. PROFIL */}
        <Link
          href="/profil"
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            isProfileActive
              ? "text-[#C1272D] font-bold"
              : "text-[#5A6A82] hover:text-[#071A3D]"
          }`}
        >
          <User
            className={`w-5 h-5 mb-1 transition-transform ${
              isProfileActive ? "scale-110 stroke-[2.4]" : "stroke-[1.8]"
            }`}
          />
          <span className="text-[10px] tracking-tight">
            {isArabic ? "حسابي" : "Profil"}
          </span>
        </Link>
      </div>
    </nav>
  );
}
