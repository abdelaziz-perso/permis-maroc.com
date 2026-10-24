"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Loader2 } from "lucide-react";

const HeroRoadScene = dynamic(
  () => import("./HeroRoadScene").then((mod) => mod.HeroRoadScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] lg:min-h-[540px] rounded-2xl border border-white/10 bg-[#0B0F17] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-8 h-8 text-[#C1272D] animate-spin mb-3" />
        <span className="text-sm font-medium text-slate-300">
          Chargement de la scène 3D marocaine...
        </span>
        <span className="text-xs text-slate-400 mt-1">
          Optimisé pour WebGL & mobile
        </span>
      </div>
    ),
  }
);

export function HeroRoadWrapper() {
  return <HeroRoadScene />;
}
