"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

/**
 * Official Flag of Morocco (Exact Wikimedia Commons official specification:
 * #c1272d field with the authentic interlaced #006233 pentagram)
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

const sizeMap = {
  sm: { full: { w: 120, h: 40 }, mark: 32 },
  md: { full: { w: 148, h: 48 }, mark: 40 },
  lg: { full: { w: 180, h: 58 }, mark: 48 },
};

export function BrandLogo({
  size = "md",
  showText = true,
  className = "",
}: BrandLogoProps) {
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";
  const dims = sizeMap[size];

  // Arabic wordmark stays text-based; FR uses the official logo artwork
  if (isArabic) {
    const titleSize =
      size === "sm"
        ? "text-base"
        : size === "lg"
          ? "text-xl sm:text-2xl"
          : "text-lg sm:text-xl";

    return (
      <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
        <Image
          src="/images/logo-mark.png"
          alt=""
          width={dims.mark}
          height={dims.mark}
          className="object-contain shrink-0"
          priority
        />
        {showText && (
          <div className="flex items-center gap-2 leading-none">
            <span
              className={`font-black tracking-tight text-[#071A3D] whitespace-nowrap ${titleSize}`}
            >
              بيرمي <span className="text-[#C1272D]">المغرب</span>
            </span>
            <MoroccanFlag className="w-6 h-4 border border-slate-200/80 shadow-xs" />
          </div>
        )}
      </div>
    );
  }

  if (!showText) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Image
          src="/images/logo-mark.png"
          alt="Permis Maroc"
          width={dims.mark}
          height={dims.mark}
          className="object-contain"
          priority
        />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/images/logo-transparent.png"
        alt="Permis Maroc"
        width={dims.full.w}
        height={dims.full.h}
        className="object-contain object-left h-auto"
        priority
      />
      <MoroccanFlag className="w-6 h-4 border border-slate-200/80 shadow-xs hidden sm:inline-block" />
    </span>
  );
}
