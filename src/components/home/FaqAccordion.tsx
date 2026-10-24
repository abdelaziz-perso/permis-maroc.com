"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "Quel est le score minimum pour réussir l'examen théorique du permis B au Maroc en 2026 ?",
    answer:
      "Depuis la réforme de la banque de questions NARSA, le candidat doit obtenir au minimum 34 bonnes réponses sur 40 (soit un taux de réussite de 85%) pour valider l'épreuve théorique du permis de conduire de catégorie B (voitures de tourisme). Pour le permis motocycles (catégorie A), le seuil est de 24 sur 30.",
  },
  {
    question: "Combien coûte en moyenne le permis de conduire au Maroc ?",
    answer:
      "Le coût global moyen d'un permis B au Maroc est généralement compris entre 3 350 MAD et 4 350 MAD. Cela comprend le forfait légal obligatoire (20h de cours théoriques et 20h de pratique au volant pour environ 2 500 à 3 200 MAD), la visite médicale d'aptitude (150 MAD) et les droits de timbre fiscal et d'inscription (environ 700 MAD).",
  },
  {
    question: "Combien de temps dure la période probatoire du permis neuf au Maroc ?",
    answer:
      "La période probatoire dure exactement 2 ans à compter de la date de réussite à l'examen. Durant cette période, le conducteur dispose d'un capital initial de 20 points (au lieu de 30 points pour le permis définitif) et sa vitesse est strictement plafonnée à 90 km/h sur tout le réseau marocain, y compris les autoroutes.",
  },
  {
    question: "Comment se déroule la nouvelle épreuve théorique informatisée de la NARSA ?",
    answer:
      "L'examen théorique se déroule sur un écran tactile individuel dans l'un des centres d'immatriculation de la NARSA. Le système tire aléatoirement 40 questions parmi une banque nationale sécurisée de 1 000 questions illustrées et vidéos. Le candidat dispose de 30 secondes par question pour sélectionner sa réponse.",
  },
  {
    question: "Puis-je réviser en ligne gratuitement avec Permis Maroc ?",
    answer:
      "Oui ! Permis-Maroc.com propose des séries de tests gratuites, un catalogue complet de tous les panneaux de signalisation avec leurs sanctions associées, 12 modules de cours interactifs et des simulations d'intersections 3D pour s'entraîner dans des conditions réelles.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Schema.org FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-16 lg:py-24 bg-[#0B0F17] relative border-t border-white/5">
      {/* Inject FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs text-slate-300 font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-red-400" />
            <span>Foire Aux Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Questions fréquentes sur le permis au Maroc
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Tout ce qu&apos;il faut savoir sur les démarches, les tarifs officiels et l&apos;examen théorique NARSA.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#121824] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-white text-base sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-red-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
