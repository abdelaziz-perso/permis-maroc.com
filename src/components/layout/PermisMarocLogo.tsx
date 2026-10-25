"use client";

import React from "react";
import Image from "next/image";

interface PermisMarocLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizeMap = {
  sm: { full: { w: 120, h: 40 }, mark: 32 },
  md: { full: { w: 148, h: 48 }, mark: 40 },
  lg: { full: { w: 180, h: 58 }, mark: 48 },
};

export function PermisMarocLogo({
  className = "",
  size = "md",
  showText = true,
}: PermisMarocLogoProps) {
  const dims = sizeMap[size];

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
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/images/logo-transparent.png"
        alt="Permis Maroc"
        width={dims.full.w}
        height={dims.full.h}
        className="object-contain object-left h-auto"
        priority
      />
    </span>
  );
}
