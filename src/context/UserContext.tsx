"use client";

import React, { createContext, useContext, useState } from "react";
import { UserStats, ExamResult, QuestionCategory } from "@/types/models";
import { defaultAchievements } from "@/data/achievements";

interface UserContextType {
  user: { name: string; email: string; role: "user" | "admin" } | null;
  stats: UserStats;
  examHistory: ExamResult[];
  addXP: (amount: number, reason?: string) => void;
  completeLesson: (lessonId: string) => void;
  recordExamResult: (result: ExamResult) => void;
  toggleSaveSign: (signId: string) => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
  resetProgress: () => void;
}

const defaultStats: UserStats = {
  xp: 1450,
  level: "Apprenti conducteur",
  levelProgress: 65,
  streakDays: 7,
  testsCompleted: 14,
  averageScore: 35.5,
  completedLessonIds: ["prio-1", "prio-2", "vit-1", "sign-1", "sign-2"],
  savedSignIds: ["sign-stop", "sign-cede", "sign-60"],
  achievements: defaultAchievements,
  weakCategories: ["stationnement", "depassement"],
};

const initialExamHistory: ExamResult[] = [
  {
    id: "res-1",
    date: "2026-10-22",
    licenceCategory: "B",
    score: 36,
    totalQuestions: 40,
    passed: true,
    timeSpentSeconds: 1120,
    categoryBreakdown: {} as Record<QuestionCategory, { total: number; correct: number }>,
    answers: [],
  },
  {
    id: "res-2",
    date: "2026-10-20",
    licenceCategory: "B",
    score: 34,
    totalQuestions: 40,
    passed: true,
    timeSpentSeconds: 1250,
    categoryBreakdown: {} as Record<QuestionCategory, { total: number; correct: number }>,
    answers: [],
  },
  {
    id: "res-3",
    date: "2026-10-18",
    licenceCategory: "B",
    score: 31,
    totalQuestions: 40,
    passed: false,
    timeSpentSeconds: 1400,
    categoryBreakdown: {} as Record<QuestionCategory, { total: number; correct: number }>,
    answers: [],
  },
];

const UserContext = createContext<UserContextType>({
  user: null,
  stats: defaultStats,
  examHistory: [],
  addXP: () => {},
  completeLesson: () => {},
  recordExamResult: () => {},
  toggleSaveSign: () => {},
  login: () => {},
  logout: () => {},
  resetProgress: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: "user" | "admin";
  } | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("pm_user");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {
      name: "Yassine B.",
      email: "yassine@permis-maroc.com",
      role: "user",
    };
  });

  const [stats, setStats] = useState<UserStats>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("pm_stats");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return defaultStats;
  });

  const [examHistory, setExamHistory] = useState<ExamResult[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("pm_history");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return initialExamHistory;
  });

  const calculateLevel = (xp: number) => {
    if (xp < 500) {
      return { level: "Débutant", progress: Math.min(100, Math.round((xp / 500) * 100)) };
    } else if (xp < 1500) {
      return {
        level: "Apprenti conducteur",
        progress: Math.min(100, Math.round(((xp - 500) / 1000) * 100)),
      };
    } else if (xp < 3000) {
      return {
        level: "Conducteur confirmé",
        progress: Math.min(100, Math.round(((xp - 1500) / 1500) * 100)),
      };
    } else {
      return { level: "Prêt pour l'examen", progress: 100 };
    }
  };

  const addXP = (amount: number) => {
    setStats((prev) => {
      const newXP = prev.xp + amount;
      const { level, progress } = calculateLevel(newXP);
      const updated = {
        ...prev,
        xp: newXP,
        level,
        levelProgress: progress,
      };
      try {
        localStorage.setItem("pm_stats", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const completeLesson = (lessonId: string) => {
    setStats((prev) => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      const updated = {
        ...prev,
        completedLessonIds: [...prev.completedLessonIds, lessonId],
      };
      addXP(50);
      try {
        localStorage.setItem("pm_stats", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const recordExamResult = (result: ExamResult) => {
    setExamHistory((prev) => {
      const updatedHistory = [result, ...prev];
      try {
        localStorage.setItem("pm_history", JSON.stringify(updatedHistory));
      } catch {}
      return updatedHistory;
    });

    setStats((prev) => {
      const newTotal = prev.testsCompleted + 1;
      const newAvg = Number(
        ((prev.averageScore * prev.testsCompleted + result.score) / newTotal).toFixed(1)
      );
      const xpEarned = result.passed ? 150 : 50;
      const newXP = prev.xp + xpEarned;
      const { level, progress } = calculateLevel(newXP);

      const updated = {
        ...prev,
        testsCompleted: newTotal,
        averageScore: newAvg,
        xp: newXP,
        level,
        levelProgress: progress,
      };
      try {
        localStorage.setItem("pm_stats", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleSaveSign = (signId: string) => {
    setStats((prev) => {
      const exists = prev.savedSignIds.includes(signId);
      const updatedSigns = exists
        ? prev.savedSignIds.filter((id) => id !== signId)
        : [...prev.savedSignIds, signId];
      const updated = { ...prev, savedSignIds: updatedSigns };
      try {
        localStorage.setItem("pm_stats", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const login = (email: string, name = "Candidat") => {
    const role: "user" | "admin" = email.includes("admin") ? "admin" : "user";
    const newUser = { name, email, role };
    setUser(newUser);
    try {
      localStorage.setItem("pm_user", JSON.stringify(newUser));
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("pm_user");
    } catch {}
  };

  const resetProgress = () => {
    setStats(defaultStats);
    setExamHistory([]);
    try {
      localStorage.removeItem("pm_stats");
      localStorage.removeItem("pm_history");
    } catch {}
  };

  return (
    <UserContext.Provider
      value={{
        user,
        stats,
        examHistory,
        addXP,
        completeLesson,
        recordExamResult,
        toggleSaveSign,
        login,
        logout,
        resetProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
