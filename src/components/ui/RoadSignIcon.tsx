"use client";

import React from "react";

interface RoadSignIconProps {
  iconName: string;
  className?: string;
  size?: number;
}

export function RoadSignIcon({
  iconName,
  className = "",
  size = 64,
}: RoadSignIconProps) {
  switch (iconName) {
    case "stop":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          {/* Octagon shape */}
          <polygon
            points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
            fill="#C1272D"
            stroke="#FFFFFF"
            strokeWidth="3.5"
          />
          <text
            x="50"
            y="58"
            fontSize="26"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            fill="#FFFFFF"
            textAnchor="middle"
            letterSpacing="1"
          >
            STOP
          </text>
        </svg>
      );

    case "yield":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          {/* Inverted triangle */}
          <polygon
            points="50,92 8,14 92,14"
            fill="#FFFFFF"
            stroke="#C1272D"
            strokeWidth="10"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "curve-right":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          {/* Danger Triangle */}
          <polygon
            points="50,8 8,86 92,86"
            fill="#FFFFFF"
            stroke="#C1272D"
            strokeWidth="9"
            strokeLinejoin="round"
          />
          {/* Curve right symbol */}
          <path
            d="M 45 74 L 45 52 Q 45 38 62 38 L 68 38 M 62 30 L 72 38 L 62 46"
            fill="none"
            stroke="#111827"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "pedestrian":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          {/* Danger Triangle */}
          <polygon
            points="50,8 8,86 92,86"
            fill="#FFFFFF"
            stroke="#C1272D"
            strokeWidth="9"
            strokeLinejoin="round"
          />
          {/* Pedestrian pictogram */}
          <circle cx="50" cy="38" r="4.5" fill="#111827" />
          <path
            d="M 46 47 L 54 47 L 57 60 M 43 56 L 50 47 L 46 72 M 52 57 L 59 72"
            fill="none"
            stroke="#111827"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="32"
            y1="76"
            x2="68"
            y2="76"
            stroke="#111827"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "bump":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          <polygon
            points="50,8 8,86 92,86"
            fill="#FFFFFF"
            stroke="#C1272D"
            strokeWidth="9"
            strokeLinejoin="round"
          />
          {/* Two speed bumps */}
          <path
            d="M 28 66 Q 36 50 44 66 Q 52 50 60 66 Q 66 66 72 66"
            fill="none"
            stroke="#111827"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "construction":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          <polygon
            points="50,8 8,86 92,86"
            fill="#FACC15"
            stroke="#C1272D"
            strokeWidth="9"
            strokeLinejoin="round"
          />
          {/* Worker with shovel */}
          <circle cx="53" cy="38" r="4" fill="#111827" />
          <line x1="53" y1="44" x2="48" y2="60" stroke="#111827" strokeWidth="4" />
          <line x1="42" y1="52" x2="62" y2="70" stroke="#111827" strokeWidth="3" />
          <polygon points="62,68 68,74 65,77 59,71" fill="#111827" />
          <path d="M 36 74 Q 45 68 52 74" fill="#111827" />
        </svg>
      );

    case "no-entry":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="44" fill="#C1272D" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="18" y="42" width="64" height="16" rx="2" fill="#FFFFFF" />
        </svg>
      );

    case "speed-60":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="44" fill="#FFFFFF" stroke="#C1272D" strokeWidth="10" />
          <text
            x="50"
            y="60"
            fontSize="32"
            fontWeight="900"
            fontFamily="Arial, sans-serif"
            fill="#111827"
            textAnchor="middle"
          >
            60
          </text>
        </svg>
      );

    case "no-overtaking":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="44" fill="#FFFFFF" stroke="#C1272D" strokeWidth="10" />
          {/* Left car (red) overtaking */}
          <rect x="25" y="40" width="18" height="22" rx="4" fill="#C1272D" />
          {/* Right car (black) */}
          <rect x="52" y="40" width="18" height="22" rx="4" fill="#111827" />
        </svg>
      );

    case "turn-right":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="44" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="3" />
          {/* White arrow curving right */}
          <path
            d="M 38 68 L 38 48 Q 38 34 56 34 L 64 34 M 58 26 L 68 34 L 58 42"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "roundabout":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="44" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="3" />
          {/* 3 circular arrows */}
          <circle cx="50" cy="50" r="18" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeDasharray="25 15" />
          <polygon points="68,45 74,52 64,52" fill="#FFFFFF" />
          <polygon points="40,28 48,24 45,34" fill="#FFFFFF" />
          <polygon points="42,72 34,68 37,78" fill="#FFFFFF" />
        </svg>
      );

    case "priority-road":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          {/* Yellow diamond inside white border */}
          <polygon
            points="50,8 92,50 50,92 8,50"
            fill="#FFFFFF"
            stroke="#111827"
            strokeWidth="2"
          />
          <polygon
            points="50,18 82,50 50,82 18,50"
            fill="#FACC15"
            stroke="#111827"
            strokeWidth="1.5"
          />
        </svg>
      );

    case "no-parking":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="44" fill="#1D4ED8" stroke="#C1272D" strokeWidth="10" />
          <line x1="22" y1="22" x2="78" y2="78" stroke="#C1272D" strokeWidth="10" />
        </svg>
      );

    case "no-stopping":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="44" fill="#1D4ED8" stroke="#C1272D" strokeWidth="10" />
          <line x1="20" y1="20" x2="80" y2="80" stroke="#C1272D" strokeWidth="10" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="#C1272D" strokeWidth="10" />
        </svg>
      );

    case "highway":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          <rect x="8" y="8" width="84" height="84" rx="10" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="3" />
          {/* Highway bridge over lanes */}
          <rect x="22" y="32" width="56" height="8" rx="2" fill="#FFFFFF" />
          {/* Lanes */}
          <polygon points="32,80 38,40 44,40 40,80" fill="#FFFFFF" />
          <polygon points="60,80 56,40 62,40 68,80" fill="#FFFFFF" />
        </svg>
      );

    case "hospital":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          <rect x="8" y="8" width="84" height="84" rx="10" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="3" />
          <text
            x="50"
            y="65"
            fontSize="44"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            fill="#FFFFFF"
            textAnchor="middle"
          >
            H
          </text>
        </svg>
      );

    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={className}
          aria-hidden="true"
        >
          <circle cx="50" cy="50" r="44" fill="#1E293B" stroke="#C1272D" strokeWidth="6" />
          <text
            x="50"
            y="58"
            fontSize="28"
            fontWeight="bold"
            fill="#FFFFFF"
            textAnchor="middle"
          >
            !
          </text>
        </svg>
      );
  }
}
