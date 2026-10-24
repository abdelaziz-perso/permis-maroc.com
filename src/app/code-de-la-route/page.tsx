"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider, useLanguage } from "@/lib/i18n/useLanguage";
import { UserProvider, useUser } from "@/context/UserContext";
import { courseCategories } from "@/data/courses";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
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
    <div className="min-h-screen flex flex-col bg-[#070A0F] text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-blue-500/30 text-xs font-semibold text-blue-400 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Programme Officiel 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Code de la Route au Maroc
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
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
                className="group p-6 rounded-2xl bg-[#121824] border border-white/10 hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-slate-950 text-slate-400 border border-white/5">
                      Module {idx + 1} / 12
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                    {category.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                <div>
                  {/* Progress Indicator */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                      <span>Progression</span>
                      <span className="font-mono font-bold text-white">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#C1272D] to-amber-500 h-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{category.estimatedHours}h estimées</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-slate-300 group-hover:text-white">
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
      <MobileBottomNav />
    </div>
  );
}
