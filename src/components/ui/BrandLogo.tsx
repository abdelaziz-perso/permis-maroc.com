"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

/**
 * Official Flag of Morocco (Exact Wikimedia Commons official specification:
 * #c1272d field with the authentic interlaced #006233 pentagram and black fimbriation)
 */
export function MoroccanFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 600"
      className={`inline-block rounded-[3px] shadow-xs overflow-hidden shrink-0 ${className}`}
      role="img"
      aria-label="Drapeau officiel du Royaume du Maroc"
    >
      <rect width="900" height="600" fill="#c1272d" />
      <path
        d="M 450,159.45787 366.85272,415.35877 584.53564,257.20233 H 315.46436 L 533.14728,415.35877 Z"
        fill="none"
        stroke="#006233"
        strokeWidth="29.33"
        strokeMiterlimit="4"
      />
    </svg>
  );
}

export function BrandLogo({
  size = "md",
  showText = true,
  className = "",
}: BrandLogoProps) {
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  const iconDimensions =
    size === "sm"
      ? "w-9 h-9 rounded-xl"
      : size === "lg"
      ? "w-12 h-12 rounded-2xl"
      : "w-10 h-10 rounded-xl";

  const titleSize =
    size === "sm"
      ? "text-base"
      : size === "lg"
      ? "text-xl sm:text-2xl"
      : "text-lg sm:text-xl";

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Minimalist Driving School Car Icon + Official Moroccan Flag */}
      <div className="relative shrink-0">
        <div
          className={`${iconDimensions} relative flex items-center justify-center bg-gradient-to-br from-[#071A3D] to-[#0F295A] border border-[#C1272D]/40 shadow-md shadow-red-500/15 overflow-hidden group-hover:scale-105 transition-transform duration-200`}
        >
          <svg
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            aria-hidden="true"
          >
            {/* Perspective Curved Road */}
            <path
              d="M14 96C34 80 86 80 106 96"
              stroke="#334155"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M26 93C44 82 76 82 94 93"
              stroke="#F8FAFC"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />

            {/* Driving School Roof Sign */}
            <path
              d="M46 28H74L70 39H50L46 28Z"
              fill="#C1272D"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Minimalist Car Cabin / Windshield */}
            <path d="M29 56L40 39H80L91 56H29Z" fill="#FFFFFF" />
            <path d="M36 54L44 43H76L84 54H36Z" fill="#071A3D" />

            {/* Car Main Chassis */}
            <rect
              x="18"
              y="54"
              width="84"
              height="22"
              rx="8"
              fill="#C1272D"
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />

            {/* Headlights & Grille */}
            <rect x="24" y="60" width="13" height="7" rx="3.5" fill="#FEF08A" />
            <rect x="83" y="60" width="13" height="7" rx="3.5" fill="#FEF08A" />
            <rect x="43" y="61" width="34" height="5" rx="2.5" fill="#071A3D" />

            {/* Car Wheels */}
            <circle
              cx="35"
              cy="77"
              r="9.5"
              fill="#0F172A"
              stroke="#FFFFFF"
              strokeWidth="2.8"
            />
            <circle cx="35" cy="77" r="3.5" fill="#E2E8F0" />
            <circle
              cx="85"
              cy="77"
              r="9.5"
              fill="#0F172A"
              stroke="#FFFFFF"
              strokeWidth="2.8"
            />
            <circle cx="85" cy="77" r="3.5" fill="#E2E8F0" />
          </svg>
        </div>
      </div>

      {/* Brand Wordmark + Official Flag of Morocco */}
      {showText && (
        <div className="flex items-center gap-2 leading-none">
          {isArabic ? (
            <span
              className={`font-black tracking-tight text-[#071A3D] whitespace-nowrap ${titleSize}`}
            >
              بيرمي <span className="text-[#C1272D]">المغرب</span>
            </span>
          ) : (
            <span
              className={`font-extrabold tracking-tight text-[#071A3D] whitespace-nowrap ${titleSize}`}
            >
              PERMIS <span className="text-[#C1272D]">MAROC</span>
            </span>
          )}
          <MoroccanFlag className="w-6 h-4 border border-slate-200/80 shadow-xs" />
        </div>
      )}
    </div>
  );
}
