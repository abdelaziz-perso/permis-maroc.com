"use client";

import React from "react";

interface SignGraphicProps {
  id?: string;
  name?: string;
  category?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function SignGraphic({
  id = "",
  name = "",
  category = "danger",
  size = "md",
}: SignGraphicProps) {
  const dimensions = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-36 h-36",
  }[size];

  // 1. STOP Sign (Octagon)
  if (id.includes("stop") || name.toLowerCase().includes("stop")) {
    return (
      <div
        className={`${dimensions} flex items-center justify-center relative select-none`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Red Octagon */}
          <polygon
            points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
            fill="#DC2626"
            stroke="#FFFFFF"
            strokeWidth="4"
          />
          {/* Inner border */}
          <polygon
            points="31,9 69,9 91,31 91,69 69,91 31,91 9,69 9,31"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <text
            x="50"
            y="58"
            fill="#FFFFFF"
            fontSize="24"
            fontWeight="900"
            fontFamily="sans-serif"
            textAnchor="middle"
            letterSpacing="1"
          >
            STOP
          </text>
        </svg>
      </div>
    );
  }

  // 2. Cédez le passage (Inverted Triangle)
  if (id.includes("cedez") || name.toLowerCase().includes("cédez")) {
    return (
      <div
        className={`${dimensions} flex items-center justify-center relative select-none`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* White inverted triangle with red border */}
          <polygon
            points="50,92 8,14 92,14"
            fill="#FFFFFF"
            stroke="#DC2626"
            strokeWidth="12"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  // 3. Speed Limit 30
  if (
    id.includes("30") ||
    name.includes("30") ||
    id.includes("vitesse") ||
    name.toLowerCase().includes("vitesse")
  ) {
    return (
      <div
        className={`${dimensions} flex items-center justify-center relative select-none`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Circle with red border */}
          <circle cx="50" cy="50" r="44" fill="#FFFFFF" stroke="#DC2626" strokeWidth="12" />
          <text
            x="50"
            y="61"
            fill="#0F172A"
            fontSize="34"
            fontWeight="900"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            30
          </text>
        </svg>
      </div>
    );
  }

  // 4. Sens interdit (Red circle with white horizontal bar)
  if (
    id.includes("sens-interdit") ||
    name.toLowerCase().includes("sens interdit")
  ) {
    return (
      <div
        className={`${dimensions} flex items-center justify-center relative select-none`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <circle cx="50" cy="50" r="45" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="18" y="42" width="64" height="16" rx="2" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // 5. Rond-Point (Blue circle with 3 rotating arrows)
  if (
    id.includes("giratoire") ||
    id.includes("rond-point") ||
    name.toLowerCase().includes("rond-point")
  ) {
    return (
      <div
        className={`${dimensions} flex items-center justify-center relative select-none`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <circle cx="50" cy="50" r="45" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="3" />
          {/* 3 circular arrows */}
          <g fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round">
            <path d="M 50,22 A 28 28 0 0 1 78,50" />
            <path d="M 78,50 A 28 28 0 0 1 50,78" />
            <path d="M 50,78 A 28 28 0 0 1 22,50" />
          </g>
          <polygon points="52,16 66,24 52,32" fill="#FFFFFF" />
          <polygon points="84,52 76,66 68,52" fill="#FFFFFF" />
          <polygon points="20,48 28,34 36,48" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // 6. Parking [P] (Blue square)
  if (
    id.includes("parking") ||
    id.includes("stationnement") ||
    name.toLowerCase().includes("stationnement")
  ) {
    return (
      <div
        className={`${dimensions} flex items-center justify-center relative select-none`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="16"
            fill="#1D4ED8"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
          <text
            x="50"
            y="68"
            fill="#FFFFFF"
            fontSize="54"
            fontWeight="900"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            P
          </text>
        </svg>
      </div>
    );
  }

  // 7. Passage Piéton (Blue square with pedestrian symbol)
  if (id.includes("pieton") || name.toLowerCase().includes("piéton")) {
    return (
      <div
        className={`${dimensions} flex items-center justify-center relative select-none`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="16"
            fill="#1D4ED8"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
          {/* White inner triangle */}
          <polygon points="50,18 18,80 82,80" fill="#FFFFFF" />
          {/* Walking pedestrian silhouette */}
          <circle cx="50" cy="38" r="5" fill="#0F172A" />
          <line
            x1="50"
            y1="43"
            x2="50"
            y2="58"
            stroke="#0F172A"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="50"
            y1="58"
            x2="42"
            y2="74"
            stroke="#0F172A"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="50"
            y1="58"
            x2="60"
            y2="74"
            stroke="#0F172A"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Zebra stripes under feet */}
          <line x1="32" y1="76" x2="68" y2="76" stroke="#0F172A" strokeWidth="2.5" />
        </svg>
      </div>
    );
  }

  // 8. Feux Tricolores
  if (id.includes("feu") || name.toLowerCase().includes("feu")) {
    return (
      <div
        className={`${dimensions} flex items-center justify-center relative select-none`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Danger triangle */}
          <polygon
            points="50,10 8,86 92,86"
            fill="#FFFFFF"
            stroke="#DC2626"
            strokeWidth="12"
            strokeLinejoin="round"
          />
          {/* Traffic light inside */}
          <rect x="42" y="38" width="16" height="34" rx="4" fill="#1E293B" />
          <circle cx="50" cy="44" r="3.5" fill="#EF4444" />
          <circle cx="50" cy="55" r="3.5" fill="#F59E0B" />
          <circle cx="50" cy="66" r="3.5" fill="#10B981" />
        </svg>
      </div>
    );
  }

  // 9. Enfants
  if (id.includes("enfant") || name.toLowerCase().includes("enfant")) {
    return (
      <div
        className={`${dimensions} flex items-center justify-center relative select-none`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <polygon
            points="50,10 8,86 92,86"
            fill="#FFFFFF"
            stroke="#DC2626"
            strokeWidth="12"
            strokeLinejoin="round"
          />
          {/* Child silhouettes */}
          <circle cx="44" cy="44" r="4" fill="#0F172A" />
          <line x1="44" y1="48" x2="44" y2="66" stroke="#0F172A" strokeWidth="3" />
          <circle cx="58" cy="50" r="3" fill="#0F172A" />
          <line x1="58" y1="53" x2="58" y2="68" stroke="#0F172A" strokeWidth="2.5" />
        </svg>
      </div>
    );
  }

  // Default: generic danger triangle or obligation circle based on category
  if (category === "interdiction") {
    return (
      <div className={`${dimensions} flex items-center justify-center relative select-none`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <circle cx="50" cy="50" r="44" fill="#FFFFFF" stroke="#DC2626" strokeWidth="12" />
        </svg>
      </div>
    );
  }

  if (category === "obligation") {
    return (
      <div className={`${dimensions} flex items-center justify-center relative select-none`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <circle cx="50" cy="50" r="45" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="3" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${dimensions} flex items-center justify-center relative select-none`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <polygon
          points="50,10 8,86 92,86"
          fill="#FFFFFF"
          stroke="#DC2626"
          strokeWidth="12"
          strokeLinejoin="round"
        />
        <text
          x="50"
          y="68"
          fill="#0F172A"
          fontSize="28"
          fontWeight="900"
          fontFamily="sans-serif"
          textAnchor="middle"
        >
          !
        </text>
      </svg>
    </div>
  );
}
