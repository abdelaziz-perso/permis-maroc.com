"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="hidden md:block w-full bg-[#070A0F] border-t border-white/10 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C1272D] to-[#9E1F24] flex items-center justify-center border border-red-500/30">
                <span className="text-white font-black text-lg">PM</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                PERMIS<span className="text-[#C1272D] ml-1">MAROC</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed max-w-sm">
              {t.secondaryTagline}
            </p>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-400 leading-relaxed mb-4">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Plateforme Éducative Indépendante</span>
              </div>
              Permis-Maroc.com est un portail pédagogique privé indépendant de l&apos;Agence Nationale de la Sécurité Routière (NARSA). Les contenus sont conformes aux principes de la Loi 52-05 portant Code de la Route au Maroc.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Code de la Route</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/code-de-la-route" className="hover:text-white transition-colors">
                  Tous les cours (12 modules)
                </Link>
              </li>
              <li>
                <Link href="/code-de-la-route/priorites" className="hover:text-white transition-colors">
                  Règles de Priorités
                </Link>
              </li>
              <li>
                <Link href="/code-de-la-route/vitesse" className="hover:text-white transition-colors">
                  Limitations de Vitesse
                </Link>
              </li>
              <li>
                <Link href="/panneaux" className="hover:text-white transition-colors">
                  150+ Panneaux de signalisation
                </Link>
              </li>
              <li>
                <Link href="/pdf" className="text-red-400 hover:text-red-300 font-semibold transition-colors">
                  Fiches Mémo & Résumés PDF (Nouveau)
                </Link>
              </li>
              <li>
                <Link href="/code-de-la-route-maroc" className="hover:text-white transition-colors">
                  Guide Code Maroc 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Tests & Exams */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Examens & Outils</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/pack-revision" className="text-red-400 hover:text-red-300 font-semibold transition-colors">
                  Pack Révision Permis B (79 MAD)
                </Link>
              </li>
              <li>
                <Link href="/examen-blanc" className="hover:text-white transition-colors">
                  Examen Blanc Permis B (40 questions)
                </Link>
              </li>
              <li>
                <Link href="/test-permis-maroc" className="hover:text-white transition-colors">
                  Séries de tests gratuits
                </Link>
              </li>
              <li>
                <Link href="/permis-b-maroc" className="hover:text-white transition-colors">
                  Permis B Véhicules Légers
                </Link>
              </li>
              <li>
                <Link href="/prix-permis-maroc" className="hover:text-white transition-colors">
                  Prix & Tarifs du Permis au Maroc
                </Link>
              </li>
              <li>
                <Link href="/documents-permis-maroc" className="hover:text-white transition-colors">
                  Dossier & Documents requis
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides Villes & Blog */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Centres d&apos;examen</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/villes/casablanca" className="hover:text-white transition-colors">
                  Permis à Casablanca
                </Link>
              </li>
              <li>
                <Link href="/villes/rabat" className="hover:text-white transition-colors">
                  Permis à Rabat
                </Link>
              </li>
              <li>
                <Link href="/villes/marrakech" className="hover:text-white transition-colors">
                  Permis à Marrakech
                </Link>
              </li>
              <li>
                <Link href="/villes/tanger" className="hover:text-white transition-colors">
                  Permis à Tanger
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Conseils & Blog
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-slate-300 transition-colors">
                  Espace Gestion / Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} PERMIS-MAROC.COM. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="hover:text-slate-400">
              Mentions Légales
            </Link>
            <span>•</span>
            <Link href="/confidentialite" className="hover:text-slate-400">
              Politique de Confidentialité
            </Link>
            <span>•</span>
            <span className="text-slate-400 flex items-center gap-1">
              Fait avec <Heart className="w-3 h-3 text-red-500 fill-red-500" /> au Maroc
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
