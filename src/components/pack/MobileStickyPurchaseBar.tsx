"use client";

import React from "react";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { revisionPackData, getWhatsAppPackOrderUrl } from "@/data/packRevision";

interface MobileStickyPurchaseBarProps {
  isArabic?: boolean;
  onOpenOrder?: () => void;
}

export function MobileStickyPurchaseBar({
  isArabic = false,
  onOpenOrder,
}: MobileStickyPurchaseBarProps) {
  const whatsappUrl = getWhatsAppPackOrderUrl(isArabic);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E5ECF5] shadow-[0_-8px_25px_rgba(7,26,61,0.08)] px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Price column */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black text-[#071A3D] leading-none">
              {revisionPackData.price} {revisionPackData.currency}
            </span>
            {revisionPackData.previousPrice && (
              <span className="text-xs text-slate-400 line-through">
                {revisionPackData.previousPrice} {revisionPackData.currency}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold text-[#20C875] flex items-center gap-0.5 mt-0.5">
            <Sparkles className="w-2.5 h-2.5" />
            {isArabic ? "ولوج كامل وفوري" : "Accès numérique immédiat"}
          </span>
        </div>

        {/* Action Button */}
        {onOpenOrder ? (
          <button
            type="button"
            onClick={onOpenOrder}
            className="flex-1 max-w-[200px] py-3 px-4 rounded-2xl bg-[#F20D2F] hover:bg-[#D90B28] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-red-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <span>{isArabic ? "طلب الباك" : "Obtenir le Pack"}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        ) : (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 max-w-[210px] py-3 px-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/20 active:scale-95 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {isArabic ? "طلب عبر الواتساب" : "Commander (WhatsApp)"}
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
