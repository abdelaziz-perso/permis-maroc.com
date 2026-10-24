"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useUser } from "@/context/UserContext";
import {
  Settings,
  ChevronRight,
  Award,
  CheckCircle2,
  FileText,
  Flame,
  TrendingUp,
  AlertTriangle,
  Heart,
  LogOut,
} from "lucide-react";

export function MobileProfileView() {
  const { language } = useLanguage();
  const { user, stats, logout } = useUser();
  const isArabic = language === "ar" || language === "ary";

  const userName = user?.name || "Yassine";
  const userEmail = user?.email || "yassine@gmail.com";
  const userXp = stats?.xp || 850;
  const userLevel = stats?.level || "Apprenti conducteur";

  const statItems = [
    {
      value: "72%",
      label: isArabic ? "التقدم الإجمالي" : "Progression",
      icon: CheckCircle2,
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      value: `${stats?.testsCompleted || 24}`,
      label: isArabic ? "الاختبارات" : "Tests réalisés",
      icon: FileText,
      color: "text-blue-500 bg-blue-50",
    },
    {
      value: `${stats?.streakDays || 7}`,
      label: isArabic ? "أيام الاستمرار" : "Jours de série",
      icon: Flame,
      color: "text-amber-500 bg-amber-50",
    },
    {
      value: "35/40",
      label: isArabic ? "معدل النقط" : "Score moyen",
      icon: TrendingUp,
      color: "text-teal-500 bg-teal-50",
    },
  ];

  const menuRows = [
    {
      href: "/examen-blanc",
      title: isArabic ? "امتحاناتي السابقة" : "Mes examens",
      icon: FileText,
      badge: null,
      color: "text-blue-500",
    },
    {
      href: "/examen-blanc",
      title: isArabic ? "أخطائي للمراجعة" : "Mes erreurs",
      icon: AlertTriangle,
      badge: "12",
      badgeColor: "bg-red-500 text-white",
      color: "text-red-500",
    },
    {
      href: "/panneaux",
      title: isArabic ? "المفضلة المحفوظة" : "Mes favoris",
      icon: Heart,
      badge: "8",
      badgeColor: "bg-rose-500 text-white",
      color: "text-rose-500",
    },
    {
      href: "/dashboard",
      title: isArabic ? "الإعدادات العامة" : "Paramètres",
      icon: Settings,
      badge: null,
      color: "text-slate-600",
    },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Profile Header Card */}
      <div className="p-5 rounded-3xl bg-white border border-[#E5ECF5] shadow-sm text-center relative overflow-hidden">
        {/* Subtle decorative background circle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-gradient-to-b from-red-50 to-transparent pointer-events-none" />

        {/* Avatar */}
        <div className="relative w-20 h-20 mx-auto mb-3">
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#071A3D] to-slate-700 flex items-center justify-center text-3xl shadow-md border-4 border-white">
            👨‍✈️
          </div>
          <div className="w-6 h-6 rounded-full bg-[#20C875] border-2 border-white absolute bottom-0 right-0 flex items-center justify-center text-white text-[10px] font-bold">
            ✓
          </div>
        </div>

        {/* Name & Email */}
        <h2 className="text-lg font-black text-[#071A3D]">{userName}</h2>
        <span className="text-xs text-[#64748B]">{userEmail}</span>

        {/* Level & XP */}
        <div className="mt-3.5 p-3 rounded-2xl bg-[#F6F9FD] border border-[#E5ECF5] text-left rtl:text-right">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#071A3D]">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Niveau : {userLevel}</span>
            </div>
            <span className="font-mono font-bold text-[#F20D2F]">
              {userXp} XP
            </span>
          </div>

          {/* XP Progress Bar */}
          <div className="w-full h-2 rounded-full bg-[#E5ECF5] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#F20D2F]"
              style={{ width: "65%" }}
            />
          </div>
        </div>
      </div>

      {/* 2. Statistics 4-Card Grid matching reference */}
      <div className="grid grid-cols-4 gap-2">
        {statItems.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-white border border-[#E5ECF5] text-center shadow-xs flex flex-col items-center justify-between min-h-[82px]"
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1 ${stat.color}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-black text-[#071A3D] tracking-tight">
                {stat.value}
              </span>
              <span className="text-[9px] text-[#64748B] font-medium leading-none truncate w-full mt-0.5">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3. Native App Style List Rows matching reference */}
      <div className="rounded-3xl bg-white border border-[#E5ECF5] overflow-hidden divide-y divide-[#E5ECF5] shadow-sm">
        {menuRows.map((row, idx) => {
          const Icon = row.icon;
          return (
            <Link
              key={idx}
              href={row.href}
              className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors active:bg-slate-100"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl bg-[#F6F9FD] flex items-center justify-center ${row.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-[#071A3D]">
                  {row.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {row.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-black ${row.badgeColor}`}
                  >
                    {row.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-[#64748B] rtl:rotate-180" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Log out button if logged in */}
      {user && (
        <button
          onClick={logout}
          className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{isArabic ? "تسجيل الخروج" : "Se déconnecter"}</span>
        </button>
      )}
    </div>
  );
}
