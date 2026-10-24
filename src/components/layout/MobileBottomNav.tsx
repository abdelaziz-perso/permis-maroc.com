"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { Home, BookOpen, CheckSquare, ShieldAlert, User } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const items = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: "/code-de-la-route", label: "Cours", icon: BookOpen },
    { href: "/examen-blanc", label: "Tests", icon: CheckSquare },
    { href: "/panneaux", label: "Panneaux", icon: ShieldAlert },
    { href: "/dashboard", label: "Profil", icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F17]/95 backdrop-blur-lg border-t border-white/10 px-2 py-1.5 pb-safe">
      <nav className="flex items-center justify-around">
        {items.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? "text-[#C1272D] font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <item.icon
                className={`w-5 h-5 mb-0.5 transition-transform ${
                  isActive ? "scale-110 stroke-[2.5]" : "stroke-[1.75]"
                }`}
              />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
