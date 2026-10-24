"use client";

import React from "react";
import { BookOpen, CheckCircle2, Smartphone, TrendingUp } from "lucide-react";
import { revisionPackData } from "@/data/packRevision";

interface PackValuePropsProps {
  isArabic?: boolean;
}

export function PackValueProps({ isArabic = false }: PackValuePropsProps) {
  const iconMap: Record<string, React.ElementType> = {
    BookOpen,
    CheckCircle2,
    Smartphone,
    TrendingUp,
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-[#F20D2F] uppercase tracking-wider">
            {isArabic ? "مميزات الباك" : "Pourquoi choisir ce pack ?"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#071A3D] tracking-tight mt-1">
            {isArabic
              ? "طريقة حديثة للتحضير بدون تعقيد"
              : "Une méthode moderne pour réussir du premier coup"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {revisionPackData.valueProps.map((prop, idx) => {
            const Icon = iconMap[prop.icon] || BookOpen;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-white border border-[#E2E8F0] p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${prop.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-lg text-[#071A3D] mb-2">
                    {isArabic ? prop.titleAr : prop.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed font-normal">
                    {isArabic ? prop.descriptionAr : prop.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
