"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const { language, t } = useLanguage();
  const isArabic = language === "ar" || language === "ary";

  return (
    <footer className="hidden md:block w-full bg-white border-t border-[#E2E8F0] text-[#475569] text-sm mt-auto shadow-[0_-4px_20px_rgba(7,26,61,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Column (Replaces old PM badge) */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4 group">
              <BrandLogo size="md" />
            </Link>
            <p className="text-[#5A6A82] text-sm mb-4 leading-relaxed max-w-sm">
              {t.secondaryTagline}
            </p>
            <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#5A6A82] leading-relaxed mb-4">
              <div className="flex items-center gap-1.5 text-[#071A3D] font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-[#20C875] shrink-0" />
                <span>
                  {isArabic
                    ? "منصة تعليمية مستقلة للتدريب على قانون السير"
                    : "Plateforme Éducative Indépendante"}
                </span>
              </div>
              {isArabic
                ? "بيرمي المغرب (Permis-Maroc.com) هي منصة تعليمية خاصة ومستقلة عن الوكالة الوطنية للسلامة الطرقية (نارسا - NARSA). جميع الدروس والاختبارات مطابقة لمقتضيات القانون 52-05 المتعلق بمدونة السير على الطرق بالمغرب."
                : "Permis-Maroc.com est un portail pédagogique privé indépendant de l'Agence Nationale de la Sécurité Routière (NARSA). Les contenus sont conformes aux principes de la Loi 52-05 portant Code de la Route au Maroc."}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#071A3D] font-extrabold text-sm mb-3">
              {isArabic ? "دروس قانون السير" : "Code de la Route"}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/code-de-la-route"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "جميع الدروس (12 محوراً)" : "Tous les cours (12 modules)"}
                </Link>
              </li>
              <li>
                <Link
                  href="/code-de-la-route/priorites"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "قواعد الأسبقية والملتقيات" : "Règles de Priorités"}
                </Link>
              </li>
              <li>
                <Link
                  href="/code-de-la-route/vitesse"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "تحديد السرعة والمسافات" : "Limitations de Vitesse"}
                </Link>
              </li>
              <li>
                <Link
                  href="/panneaux"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "+150 علامة وإشارة مرورية" : "150+ Panneaux de signalisation"}
                </Link>
              </li>
              <li>
                <Link
                  href="/pdf"
                  className="text-[#C1272D] hover:text-red-700 font-bold transition-colors"
                >
                  {isArabic ? "ملخصات وجذاذات PDF (جديد)" : "Fiches Mémo & Résumés PDF (Nouveau)"}
                </Link>
              </li>
              <li>
                <Link
                  href="/code-de-la-route-maroc"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "دليل قانون السير المغربي 2026" : "Guide Code Maroc 2026"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Tests & Exams */}
          <div>
            <h3 className="text-[#071A3D] font-extrabold text-sm mb-3">
              {isArabic ? "الامتحانات والأدوات" : "Examens & Outils"}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/pack-revision"
                  className="text-[#C1272D] hover:text-red-700 font-bold transition-colors"
                >
                  {isArabic ? "باك المراجعة الشامل (79 درهم)" : "Pack Révision Permis B (79 MAD)"}
                </Link>
              </li>
              <li>
                <Link
                  href="/examen-blanc"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "امتحان تجريبي صنف B (40 سؤال)" : "Examen Blanc Permis B (40 questions)"}
                </Link>
              </li>
              <li>
                <Link
                  href="/test-permis-maroc"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "سلاسل اختبارات مجانية" : "Séries de tests gratuits"}
                </Link>
              </li>
              <li>
                <Link
                  href="/permis-b-maroc"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "رخصة السياقة صنف B" : "Permis B Véhicules Légers"}
                </Link>
              </li>
              <li>
                <Link
                  href="/prix-permis-maroc"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "تكلفة وأثمنة البيرمي بالمغرب" : "Prix & Tarifs du Permis au Maroc"}
                </Link>
              </li>
              <li>
                <Link
                  href="/documents-permis-maroc"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "الوثائق المطلوبة لملف البيرمي" : "Dossier & Documents requis"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides Villes & Blog */}
          <div>
            <h3 className="text-[#071A3D] font-extrabold text-sm mb-3">
              {isArabic ? "مراكز الامتحان بالمدن" : "Centres d'examen"}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/villes/casablanca"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "رخصة السياقة بالدار البيضاء" : "Permis à Casablanca"}
                </Link>
              </li>
              <li>
                <Link
                  href="/villes/rabat"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "رخصة السياقة بالرباط" : "Permis à Rabat"}
                </Link>
              </li>
              <li>
                <Link
                  href="/villes/marrakech"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "رخصة السياقة بمراكش" : "Permis à Marrakech"}
                </Link>
              </li>
              <li>
                <Link
                  href="/villes/tanger"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "رخصة السياقة بطنجة" : "Permis à Tanger"}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-[#5A6A82] hover:text-[#071A3D] transition-colors"
                >
                  {isArabic ? "نصائح ومقالات" : "Conseils & Blog"}
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-[#94A3B8] hover:text-[#5A6A82] transition-colors"
                >
                  {isArabic ? "فضاء الإدارة" : "Espace Gestion / Admin"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <p>
            © {new Date().getFullYear()} PERMIS-MAROC.COM.{" "}
            {isArabic ? "جميع الحقوق محفوظة." : "Tous droits réservés."}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/mentions-legales" className="hover:text-[#071A3D]">
              {isArabic ? "إشعار قانوني" : "Mentions Légales"}
            </Link>
            <span>·</span>
            <Link href="/confidentialite" className="hover:text-[#071A3D]">
              {isArabic ? "سياسة الخصوصية" : "Politique de Confidentialité"}
            </Link>
            <span>·</span>
            <span className="text-[#5A6A82] flex items-center gap-1">
              {isArabic ? "صنع بـ" : "Fait avec"}{" "}
              <Heart className="w-3 h-3 text-[#C1272D] fill-[#F20D2F]" />{" "}
              {isArabic ? "في المغرب" : "au Maroc"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
