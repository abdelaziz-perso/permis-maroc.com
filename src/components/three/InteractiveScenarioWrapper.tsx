"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Scenario3D } from "@/types/models";
import { Loader2 } from "lucide-react";

interface Props {
  scenario: Scenario3D;
}

const InteractiveScenario3D = dynamic(
  () =>
    import("./InteractiveScenario3D").then((mod) => mod.InteractiveScenario3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] rounded-2xl border border-white/10 bg-[#121824] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-8 h-8 text-[#C1272D] animate-spin mb-3" />
        <span className="text-sm font-medium text-slate-300">
          Initialisation de l&apos;intersection 3D...
        </span>
      </div>
    ),
  }
);

export function InteractiveScenarioWrapper({ scenario }: Props) {
  return <InteractiveScenario3D scenario={scenario} />;
}
