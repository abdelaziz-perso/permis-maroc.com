"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { LanguageProvider } from "@/lib/i18n/useLanguage";
import { UserProvider, useUser } from "@/context/UserContext";
import { sampleQuestions } from "@/data/questions";
import { roadSigns } from "@/data/roadSigns";
import { Question, QuestionCategory } from "@/types/models";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Plus,
  Edit,
  Trash2,
  Users,
  BarChart3,
  BookOpen,
  FileText,
  Lock,
  Sparkles,
} from "lucide-react";

export default function AdminPage() {
  return (
    <LanguageProvider>
      <UserProvider>
        <AdminContent />
      </UserProvider>
    </LanguageProvider>
  );
}

function AdminContent() {
  const { user, login } = useUser();
  const [pinCode, setPinCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Tab navigation
  const [activeTab, setActiveTab] = useState<"questions" | "signs" | "stats" | "blog">(
    "questions"
  );

  // State for dynamic questions in admin
  const [questionsList, setQuestionsList] = useState<Question[]>(sampleQuestions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionCat, setNewQuestionCat] = useState("priorites");
  const [newQuestionOfficialRef, setNewQuestionOfficialRef] = useState("Loi 52-05");

  // Admin access check (mock PIN or user role)
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode === "2026" || user?.role === "admin") {
      setIsAuthenticated(true);
      login("admin@permis-maroc.com", "Administrateur NARSA");
    } else {
      alert("Code PIN d'administration incorrect (Code démo : 2026)");
    }
  };

  const toggleVerifyQuestion = (id: string) => {
    setQuestionsList((prev) =>
      prev.map((q) => (q.id === id ? { ...q, verified: !q.verified } : q))
    );
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ: Question = {
      id: `q-custom-${Date.now()}`,
      category: newQuestionCat as QuestionCategory,
      difficulty: "medium",
      question: newQuestionText,
      licenceCategory: "B",
      source: "Proposition auto-école agréée",
      verified: true,
      officialRef: newQuestionOfficialRef,
      answers: [
        { id: "a", text: "Proposition A (Correcte)", isCorrect: true },
        { id: "b", text: "Proposition B", isCorrect: false },
        { id: "c", text: "Proposition C", isCorrect: false },
      ],
      explanation: "Explication pédagogique conforme au Code de la Route marocain.",
    };

    setQuestionsList([newQ, ...questionsList]);
    setNewQuestionText("");
    setShowAddModal(false);
  };

  if (!isAuthenticated && user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col bg-[#070A0F] text-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md p-8 rounded-3xl bg-[#121824] border border-white/10 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white mb-2">
              Accès Administration
            </h1>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Espace réservé à l&apos;équipe pédagogique et aux directeurs d&apos;auto-école autorisés.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="password"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="Code PIN d'accès (Démo : 2026)"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-center text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 font-mono tracking-widest"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                Déverrouiller le panneau
              </button>
            </form>
          </div>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#070A0F] text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950 border border-red-500/30 text-xs font-semibold text-red-400 mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Back-office Pédagogique Permis Maroc</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Gestion des Contenus & Examen
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle Question</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8">
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "questions"
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Questions ({questionsList.length})
          </button>
          <button
            onClick={() => setActiveTab("signs")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "signs"
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Panneaux ({roadSigns.length})
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "stats"
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Statistiques Examens
          </button>
        </div>

        {/* TAB 1: QUESTIONS MANAGER */}
        {activeTab === "questions" && (
          <div className="bg-[#121824] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                Banque de questions d&apos;examen
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {questionsList.filter((q) => q.verified).length} vérifiées sur {questionsList.length}
              </span>
            </div>

            <div className="divide-y divide-white/5">
              {questionsList.map((q) => (
                <div
                  key={q.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-white/5 uppercase">
                        {q.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Réf: {q.officialRef || "Loi 52-05"}
                      </span>
                      {q.verified ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Vérifié officiel</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/30">
                          <span>En attente de relecture</span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-white mb-1">{q.question}</p>
                    <p className="text-xs text-slate-400 line-clamp-1">{q.explanation}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleVerifyQuestion(q.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        q.verified
                          ? "border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/50"
                          : "border-amber-500/40 text-amber-400 hover:bg-amber-950/50"
                      }`}
                    >
                      {q.verified ? "Certifié" : "Valider"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ROAD SIGNS MANAGER */}
        {activeTab === "signs" && (
          <div className="bg-[#121824] rounded-2xl border border-white/10 p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">
              Catalogue de signalisation ({roadSigns.length} panneaux enregistrés)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {roadSigns.map((sign) => (
                <div
                  key={sign.id}
                  className="p-4 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-red-400 block">
                      {sign.code} • {sign.category}
                    </span>
                    <span className="text-xs font-bold text-white block mt-0.5">
                      {sign.name}
                    </span>
                    {sign.fineMad ? (
                      <span className="text-[10px] text-amber-400 font-mono">
                        {sign.fineMad} MAD
                      </span>
                    ) : null}
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">Actif</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EXAM STATS */}
        {activeTab === "stats" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#121824] border border-white/10">
              <span className="text-xs text-slate-400 block mb-2">Taux de réussite global</span>
              <span className="text-4xl font-black text-emerald-400 font-mono block mb-1">
                78.4%
              </span>
              <span className="text-xs text-slate-400">Sur 4 820 examens blancs complétés</span>
            </div>
            <div className="p-6 rounded-2xl bg-[#121824] border border-white/10">
              <span className="text-xs text-slate-400 block mb-2">Score moyen national</span>
              <span className="text-4xl font-black text-white font-mono block mb-1">
                35.2 / 40
              </span>
              <span className="text-xs text-slate-400">Objectif NARSA : 34 / 40</span>
            </div>
            <div className="p-6 rounded-2xl bg-[#121824] border border-white/10">
              <span className="text-xs text-slate-400 block mb-2">Thème le plus échoué</span>
              <span className="text-xl font-black text-red-400 block mb-1">
                Arrêt & Stationnement
              </span>
              <span className="text-xs text-slate-400">42% d&apos;erreurs sur les bordures</span>
            </div>
          </div>
        )}

        {/* Modal: Add New Question */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#121824] border border-white/10 p-6 sm:p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">
                Ajouter une question d&apos;examen
              </h3>

              <form onSubmit={handleAddQuestion} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Énoncé de la question
                  </label>
                  <textarea
                    rows={3}
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Ex: À cette intersection sans feux..."
                    className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-red-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Catégorie
                    </label>
                    <select
                      value={newQuestionCat}
                      onChange={(e) => setNewQuestionCat(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none"
                    >
                      <option value="priorites">Priorités</option>
                      <option value="vitesse">Vitesse</option>
                      <option value="signalisation">Signalisation</option>
                      <option value="stationnement">Stationnement</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Référence légale
                    </label>
                    <input
                      type="text"
                      value={newQuestionOfficialRef}
                      onChange={(e) => setNewQuestionOfficialRef(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#C1272D] hover:bg-[#9E1F24] text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Enregistrer la question
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
