"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Lock,
  Smartphone,
  Zap,
  MessageCircle,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { revisionPackData } from "@/data/packRevision";
import { PackInteractivePreview } from "./PackInteractivePreview";
import { PackDemoModal } from "./PackDemoModal";
import { MobileStickyPurchaseBar } from "./MobileStickyPurchaseBar";

interface MobilePackScreenProps {
  isArabic?: boolean;
}

export function MobilePackScreen({ isArabic = false }: MobilePackScreenProps) {
  const [demoOpen, setDemoOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const trustIcons: Record<string, React.ElementType> = {
    Lock,
    Smartphone,
    Zap,
    MessageCircle,
  };

  return (
    <div className="space-y-4 pb-20">
      {/* 1. Header & Price Badge */}
      <div className="rounded-3xl bg-white border border-[#E5ECF5] p-5 shadow-[0_4px_20px_rgba(7,26,61,0.04)] space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-lg bg-red-50 text-[#C1272D] font-black text-[10px] uppercase tracking-wider">
            {isArabic ? "باك شامل وكامل" : "PACK COMPLET"}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 font-extrabold text-[11px]">
            -{revisionPackData.discountPercent}%
          </span>
        </div>

        <div>
          <h1 className="text-xl font-black text-[#071A3D] tracking-tight leading-snug">
            {isArabic ? revisionPackData.nameAr : revisionPackData.name}
          </h1>
          <p className="text-xs text-[#5A6A82] mt-0.5 font-medium">
            {isArabic ? revisionPackData.subtitleAr : revisionPackData.subtitle}
          </p>
        </div>

        <div className="flex items-baseline gap-2 pt-1 border-t border-[#F1F5F9]">
          <span className="text-2xl font-black text-[#071A3D]">
            {revisionPackData.price} {revisionPackData.currency}
          </span>
          <span className="text-xs text-[#94A3B8] line-through font-semibold">
            {revisionPackData.previousPrice} {revisionPackData.currency}
          </span>
          <span className="text-[10px] font-semibold text-[#20C875] ml-auto">
            {isArabic ? "أداء لمرة واحدة" : "Paiement unique"}
          </span>
        </div>
      </div>

      {/* 2. Interactive Screen Mockup Preview */}
      <div className="rounded-3xl bg-[#0B0F17] p-4 shadow-xl">
        <PackInteractivePreview
          isArabic={isArabic}
          onOpenDemo={() => setDemoOpen(true)}
        />
      </div>

      {/* 3. Feature Checklist */}
      <div className="rounded-3xl bg-white border border-[#E5ECF5] p-5 shadow-[0_4px_20px_rgba(7,26,61,0.04)] space-y-3">
        <h2 className="text-sm font-extrabold text-[#071A3D]">
          {isArabic ? "محتوى الباك الشامل" : "Ce qui est inclus dans le Pack"}
        </h2>
        <div className="space-y-2">
          {(isArabic ? revisionPackData.featuresAr : revisionPackData.features).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-[#334155]">
              <CheckCircle2 className="w-4 h-4 text-[#20C875] shrink-0 mt-0.5" />
              <span className="font-medium leading-tight">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Value Propositions */}
      <div className="grid grid-cols-2 gap-3">
        {revisionPackData.valueProps.map((prop, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-white border border-[#E5ECF5] p-4 shadow-[0_4px_20px_rgba(7,26,61,0.04)] flex flex-col justify-between min-h-[110px]"
          >
            <span className="text-xs font-bold text-[#071A3D] leading-snug">
              {isArabic ? prop.titleAr : prop.title}
            </span>
            <span className="text-[10px] text-[#5A6A82] leading-tight mt-1">
              {isArabic ? prop.descriptionAr : prop.description}
            </span>
          </div>
        ))}
      </div>

      {/* 5. Trust Indicators */}
      <div className="rounded-3xl bg-white border border-[#E5ECF5] p-4 shadow-[0_4px_20px_rgba(7,26,61,0.04)] grid grid-cols-2 gap-3">
        {revisionPackData.trustItems.map((item, idx) => {
          const Icon = trustIcons[item.icon] || ShieldCheck;
          return (
            <div key={idx} className="flex items-center gap-2 text-[#475569]">
              <div className="w-7 h-7 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#071A3D] shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-semibold">
                {isArabic ? item.titleAr : item.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* 6. FAQ Accordion */}
      <div className="rounded-3xl bg-white border border-[#E5ECF5] p-5 shadow-[0_4px_20px_rgba(7,26,61,0.04)] space-y-3">
        <h2 className="text-sm font-extrabold text-[#071A3D] flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-[#C1272D]" />
          <span>{isArabic ? "الأسئلة الشائعة" : "Questions fréquentes"}</span>
        </h2>
        <div className="space-y-2">
          {revisionPackData.faq.map((item, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#F1F5F9] overflow-hidden bg-[#F8FAFC]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-3 text-left rtl:text-right flex items-center justify-between gap-2"
                >
                  <span className="font-bold text-xs text-[#071A3D]">
                    {isArabic ? item.questionAr : item.question}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform ${
                      isOpen ? "rotate-180 text-[#071A3D]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 text-[11px] text-[#475569] leading-relaxed border-t border-[#F1F5F9] pt-2">
                    {isArabic ? item.answerAr : item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Demo Modal */}
      <PackDemoModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        isArabic={isArabic}
      />

      {/* Mobile Sticky Purchase Bar above safe-area */}
      <MobileStickyPurchaseBar isArabic={isArabic} />
    </div>
  );
}
