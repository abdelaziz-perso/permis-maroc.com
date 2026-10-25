"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useUser } from "@/context/UserContext";
import { courseCategories } from "@/data/courses";
import { ChevronRight, Lock, Clock, HelpCircle } from "lucide-react";

export function MobileCoursesView() {
  const { language } = useLanguage();
  const { stats } = useUser();
  const isArabic = language === "ar" || language === "ary";

  const [activeFilter, setActiveFilter] = useState("all");

  const filterChips = [
    { id: "all", label: isArabic ? "الكل" : "Tous" },
    { id: "priorites", label: isArabic ? "الأسبقيات" : "Priorités" },
    { id: "panneaux", label: isArabic ? "البلايك" : "Panneaux" },
    { id: "securite", label: isArabic ? "السلامة" : "Sécurité" },
  ];

  // Specific course illustrations / badges matching the mockup
  const courseVisuals: Record<
    string,
    { emoji: string; bg: string; defaultProgress: number; isLocked?: boolean }
  > = {
    priorites: { emoji: "🚦", bg: "from-blue-500 to-indigo-600", defaultProgress: 80 },
    intersections: { emoji: "🛣️", bg: "from-emerald-500 to-teal-600", defaultProgress: 0 },
    signalisation: { emoji: "⚠️", bg: "from-amber-500 to-orange-600", defaultProgress: 0 },
    vitesse: { emoji: "⏱️", bg: "from-rose-500 to-red-600", defaultProgress: 0 },
    depassement: { emoji: "🚗", bg: "from-purple-500 to-violet-600", defaultProgress: 0, isLocked: true },
    stationnement: { emoji: "🅿️", bg: "from-cyan-500 to-blue-600", defaultProgress: 0 },
    autoroute: { emoji: "🛣️", bg: "from-slate-700 to-slate-900", defaultProgress: 0 },
    "conduite-nuit": { emoji: "🌙", bg: "from-indigo-900 to-slate-900", defaultProgress: 0 },
  };

  const filteredCourses = courseCategories.filter((c) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "priorites")
      return c.slug.includes("priorite") || c.slug.includes("intersection");
    if (activeFilter === "panneaux")
      return c.slug.includes("signalisation") || c.slug.includes("panneaux");
    if (activeFilter === "securite")
      return (
        c.slug.includes("securite") ||
        c.slug.includes("vitesse") ||
        c.slug.includes("nuit")
      );
    return true;
  });

  return (
    <div className="space-y-4">
      {/* 1. Horizontally Scrollable Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setActiveFilter(chip.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === chip.id
                ? "bg-[#E30D2B] text-white shadow-md shadow-red-500/20"
                : "bg-white text-[#5A6A82] hover:text-[#071A3D] border border-[#E5ECF5]"
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* 2. Vertical Course Cards */}
      <div className="space-y-3">
        {filteredCourses.map((course) => {
          const visual = courseVisuals[course.slug] || {
            emoji: "📚",
            bg: "from-slate-600 to-slate-800",
            defaultProgress: 0,
          };

          const isCompleted = stats.completedLessonIds.includes(course.id);
          const progress = isCompleted ? 100 : visual.defaultProgress;
          const isLocked = visual.isLocked && !isCompleted;

          const title = isArabic ? course.titleAr : course.title;
          const estimatedMins = Math.round(course.estimatedHours * 60);
          const questionsCount = course.lessonsCount * 4;

          return (
            <Link
              key={course.id}
              href={`/code-de-la-route/${course.slug}`}
              className="p-3.5 rounded-3xl bg-white border border-[#E5ECF5] hover:border-[#F20D2F]/30 hover:shadow-md transition-all flex items-center justify-between gap-3.5 active:scale-[0.98]"
            >
              {/* Left: Thumbnail with Moroccan / Road theme icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${visual.bg} flex items-center justify-center text-2xl shadow-inner shrink-0 text-white`}
              >
                {visual.emoji}
              </div>

              {/* Middle: Course Details & Progress */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-[#071A3D] truncate">
                    {title}
                  </h3>
                  <span className="text-xs font-bold text-[#5A6A82]">
                    {progress}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-[#F1F5F9] overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${
                      progress > 0
                        ? "bg-gradient-to-r from-[#20C875] to-[#10B981]"
                        : "bg-transparent"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Meta details */}
                <div className="flex items-center gap-3 text-[11px] text-[#5A6A82]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{estimatedMins} min</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" />
                    <span>{questionsCount} questions</span>
                  </span>
                </div>
              </div>

              {/* Right: Chevron or Lock Icon */}
              <div className="shrink-0 pl-1">
                {isLocked ? (
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#F6F9FD] flex items-center justify-center text-[#5A6A82]">
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
