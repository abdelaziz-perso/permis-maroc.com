"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { revisionPackData } from "@/data/packRevision";

interface PackFaqProps {
  isArabic?: boolean;
}

export function PackFaq({ isArabic = false }: PackFaqProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#F20D2F] text-xs font-bold mb-3 border border-red-200">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isArabic ? "أسئلة شائعة" : "Questions Fréquentes"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#071A3D] tracking-tight">
            {isArabic ? "كل ما تود معرفته عن باك المراجعة" : "Tout savoir sur le Pack Révision"}
          </h2>
        </div>

        <div className="space-y-3">
          {revisionPackData.faq.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left rtl:text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50"
                >
                  <span className="font-bold text-sm sm:text-base text-[#071A3D]">
                    {isArabic ? item.questionAr : item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#64748B] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#F20D2F]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9]">
                    {isArabic ? item.answerAr : item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
