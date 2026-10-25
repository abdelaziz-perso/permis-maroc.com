"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { MobileCoursesView } from "@/components/mobile/MobileCoursesView";
import { LanguageProvider, useLanguage } from "@/lib/i18n/useLanguage";
import { UserProvider, useUser } from "@/context/UserContext";
import { courseCategories } from "@/data/courses";
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  ShieldAlert,
  Compass,
  TrafficCone,
  Gauge,
  ArrowRightLeft,
  ParkingSquare,
  Route,
  Moon,
  CloudRain,
  HeartPulse,
  Cross,
  Leaf,
} from "lucide-react";

export default function CoursesPage() {
  return (
    <LanguageProvider>
      <UserProvider>
        <CoursesContent />
      </UserProvider>
    </LanguageProvider>
  );
}

function CoursesContent() {
  const { stats } = useUser();

  // Helper to map icon names
  const getIcon = (name: string) => {
    switch (name) {
      case "ShieldAlert":
        return ShieldAlert;
      case "Compass":
        return Compass;
      case "TrafficCone":
        return TrafficCone;
      case "Gauge":
        return Gauge;
      case "ArrowRightLeft":
        return ArrowRightLeft;
      case "ParkingSquare":
        return ParkingSquare;
      case "Route":
        return Route;
      case "Moon":
        return Moon;
      case "CloudRain":
        return CloudRain;
      case "HeartPulse":
        return HeartPulse;
      case "Cross":
        return Cross;
      case "Leaf":
        return Leaf;
      default:
        return BookOpen;
    }
  };

  return (
    <>
      {/* MOBILE APP VIEW (< 768px) matching reference design */}
      <div className="block md:hidden">
        <MobileAppShell
          title="Code de la route"
          rightAction={<Search className="w-5 h-5 text-[#071A3D]" />}
        >
          <MobileCoursesView />
        </MobileAppShell>
      </div>

      {/* DESKTOP WEB EXPERIENCE (>= 768px) */}
      <div className="hidden md:flex min-h-screen flex-col bg-[#F8FAFC] text-[#071A3D]">
        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-blue-600 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Programme Officiel 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#071A3D] tracking-tight mb-4">
            Code de la Route au Maroc
          </h1>
          <p className="text-[#5A6A82] text-sm sm:text-base leading-relaxed">
            12 modules complets pour assimiler toutes les notions du Code de la Route marocain à votre rythme, avec fiches et mini-quiz.
          </p>
        </div>

        {/* 12 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseCategories.map((category, idx) => {
            const Icon = getIcon(category.iconName);
            // Completed count in this category
            const completedCount = category.lessons.filter((l) =>
              stats.completedLessonIds.includes(l.id)
            ).length;
            const progress =
              category.lessons.length > 0
                ? Math.round((completedCount / category.lessons.length) * 100)
                : 0;

            return (
              <Link
                key={category.id}
                href={`/code-de-la-route/${category.slug}`}
                className="group p-6 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#F20D2F]/30 hover:-translate-y-1 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#C1272D] border border-red-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#F8FAFC] text-[#5A6A82] border border-[#E2E8F0]">
                      Module {idx + 1} / 12
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#071A3D] group-hover:text-[#C1272D] transition-colors mb-2">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#5A6A82] line-clamp-2 leading-relaxed mb-6 font-normal">
                    {category.description}
                  </p>
                </div>

                <div>
                  {/* Progress Indicator */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[11px] text-[#5A6A82] mb-1.5 font-semibold">
                      <span>Progression</span>
                      <span className="font-mono font-bold text-[#071A3D]">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#F20D2F] to-[#20C875] h-full transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#5A6A82]">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{category.estimatedHours}h estimées</span>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-[#071A3D] group-hover:text-[#C1272D]">
                      <span>Accéder</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

        <Footer />
      </div>
    </>
  );
}
