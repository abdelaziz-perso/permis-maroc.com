"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="hidden md:block w-full bg-white border-t border-[#E2E8F0] text-[#475569] text-sm mt-auto shadow-[0_-4px_20px_rgba(7,26,61,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F20D2F] to-[#C1272D] flex items-center justify-center border border-red-500/30 shadow-sm shadow-red-500/20">
                <span className="text-white font-black text-lg">PM</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#071A3D]">
                PERMIS<span className="text-[#F20D2F] ml-1">MAROC</span>
              </span>
            </Link>
            <p className="text-[#64748B] text-sm mb-4 leading-relaxed max-w-sm">
              {t.secondaryTagline}
            </p>
            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B] leading-relaxed mb-4">
              <div className="flex items-center gap-1.5 text-[#071A3D] font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-[#20C875]" />
                <span>Plateforme Éducative Indépendante</span>
              </div>
              Permis-Maroc.com est un portail pédagogique privé indépendant de l&apos;Agence Nationale de la Sécurité Routière (NARSA). Les contenus sont conformes aux principes de la Loi 52-05 portant Code de la Route au Maroc.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#071A3D] font-extrabold text-sm mb-3">Code de la Route</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/code-de-la-route" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Tous les cours (12 modules)
                </Link>
              </li>
              <li>
                <Link href="/code-de-la-route/priorites" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Règles de Priorités
                </Link>
              </li>
              <li>
                <Link href="/code-de-la-route/vitesse" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Limitations de Vitesse
                </Link>
              </li>
              <li>
                <Link href="/panneaux" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  150+ Panneaux de signalisation
                </Link>
              </li>
              <li>
                <Link href="/pdf" className="text-[#F20D2F] hover:text-red-700 font-bold transition-colors">
                  Fiches Mémo & Résumés PDF (Nouveau)
                </Link>
              </li>
              <li>
                <Link href="/code-de-la-route-maroc" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Guide Code Maroc 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Tests & Exams */}
          <div>
            <h4 className="text-[#071A3D] font-extrabold text-sm mb-3">Examens & Outils</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/pack-revision" className="text-[#F20D2F] hover:text-red-700 font-bold transition-colors">
                  Pack Révision Permis B (79 MAD)
                </Link>
              </li>
              <li>
                <Link href="/examen-blanc" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Examen Blanc Permis B (40 questions)
                </Link>
              </li>
              <li>
                <Link href="/test-permis-maroc" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Séries de tests gratuits
                </Link>
              </li>
              <li>
                <Link href="/permis-b-maroc" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Permis B Véhicules Légers
                </Link>
              </li>
              <li>
                <Link href="/prix-permis-maroc" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Prix & Tarifs du Permis au Maroc
                </Link>
              </li>
              <li>
                <Link href="/documents-permis-maroc" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Dossier & Documents requis
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides Villes & Blog */}
          <div>
            <h4 className="text-[#071A3D] font-extrabold text-sm mb-3">Centres d&apos;examen</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/villes/casablanca" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Permis à Casablanca
                </Link>
              </li>
              <li>
                <Link href="/villes/rabat" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Permis à Rabat
                </Link>
              </li>
              <li>
                <Link href="/villes/marrakech" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Permis à Marrakech
                </Link>
              </li>
              <li>
                <Link href="/villes/tanger" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Permis à Tanger
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#64748B] hover:text-[#071A3D] transition-colors">
                  Conseils & Blog
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#94A3B8] hover:text-[#64748B] transition-colors">
                  Espace Gestion / Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <p>© {new Date().getFullYear()} PERMIS-MAROC.COM. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="hover:text-[#071A3D]">
              Mentions Légales
            </Link>
            <span>•</span>
            <Link href="/confidentialite" className="hover:text-[#071A3D]">
              Politique de Confidentialité
            </Link>
            <span>•</span>
            <span className="text-[#64748B] flex items-center gap-1">
              Fait avec <Heart className="w-3 h-3 text-[#F20D2F] fill-[#F20D2F]" /> au Maroc
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
