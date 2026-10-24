"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { interactiveScenarios } from "@/data/scenarios3D";
import { InteractiveScenarioWrapper } from "@/components/three/InteractiveScenarioWrapper";
import { Sparkles, Layers, CheckCircle2 } from "lucide-react";

export function Interactive3DSection() {
  const { t } = useLanguage();
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const scenario = interactiveScenarios[activeScenarioIndex];

  return (
    <section className="py-16 lg:py-24 bg-[#070A0F] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.interactive3dSection.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.interactive3dSection.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {t.interactive3dSection.subtitle}
          </p>

          {/* Scenario Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {interactiveScenarios.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => setActiveScenarioIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  activeScenarioIndex === idx
                    ? "bg-[#C1272D] text-white shadow-lg shadow-red-950/50"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Situation {idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D Interactive Component */}
        <div className="max-w-5xl mx-auto">
          <InteractiveScenarioWrapper key={scenario.id} scenario={scenario} />
        </div>
      </div>
    </section>
  );
}
