"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  HelpCircle,
  Award,
  TrendingUp,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { getWhatsAppPackOrderUrl } from "@/data/packRevision";

interface PackDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  isArabic?: boolean;
}

export function PackDemoModal({
  isOpen,
  onClose,
  isArabic = false,
}: PackDemoModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "1. Cours complets & Fiches visuelles",
      titleAr: "1. دروس شاملة وملخصات بصرية سريعة",
      description:
        "Accédez aux 12 thèmes officiels du Code de la Route marocain : priorités, panneaux, croisements, vitesse, arrêts et sanctions.",
      descriptionAr:
        "ولوج فوري للمحاور الرسمية لقانون السير المغربي : الأسبقية، التشوير الطرقي، السرعة، مسافات الأمان والغرامات.",
      icon: BookOpen,
      iconColor: "text-blue-500 bg-blue-500/10",
      highlight: "12 Modules avec fiches récapitulatives",
    },
    {
      title: "2. Tests QCM avec explications détaillées",
      titleAr: "2. سلاسل أسئلة تفاعلية مع شروحات دقيقة",
      description:
        "Entraînez-vous sur des questions réelles en conditions d'examen. Pour chaque question, comprenez pourquoi une réponse est exacte avec un rappel de la règle de sécurité routière.",
      descriptionAr:
        "تدرب على أسئلة حقيقية تطابق بنك الأسئلة. كل سؤال يحتوي على شرح واضح ومبسط للقاعدة باش تفهم ماشي تحفظ.",
      icon: HelpCircle,
      iconColor: "text-emerald-500 bg-emerald-500/10",
      highlight: "Explication claire pour chaque question",
    },
    {
      title: "3. Examens blancs chronométrés (40 questions)",
      titleAr: "3. امتحانات بيضاء مطابقة للاختبار الرسمي",
      description:
        "Passez l'examen blanc dans les mêmes conditions que le centre d'immatriculation NARSA : 40 questions aléatoires, 30 secondes par question, seuil de 34/40 pour réussir.",
      descriptionAr:
        "عِش أجواء الامتحان الحقيقي : 40 سؤالا عشوائيا، 30 ثانية لكل سؤال، مع وجوب الحصول على 34/40 على الأقل للنجاح.",
      icon: Award,
      iconColor: "text-red-500 bg-red-500/10",
      highlight: "Conditions réelles & seuil 34/40",
    },
    {
      title: "4. Suivi de progression & Analyse des faiblesses",
      titleAr: "4. تتبع النيفو ونقاط الضعف بكل دقة",
      description:
        "Visualisez votre taux de réussite par thème, repérez vos erreurs récurrentes et révisez de façon ciblée pour maximiser vos chances du premier coup.",
      descriptionAr:
        "شوف نقاط القوة والضعف ديالك بكل وضوح، وركز المراجعة على المحاور لي كتغلط فيها باش تضمن النجاح من أول ضربة.",
      icon: TrendingUp,
      iconColor: "text-purple-500 bg-purple-500/10",
      highlight: "Statistiques et recommandations personnalisées",
    },
  ];

  if (!isOpen) return null;

  const current = steps[currentStep];
  const StepIcon = current.icon;
  const whatsappUrl = getWhatsAppPackOrderUrl(isArabic);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-lg rounded-3xl bg-[#0F172A] border border-slate-700/80 p-6 text-white shadow-2xl overflow-hidden"
        >
          {/* Top subtle red flare */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/30 text-[#F20D2F] font-bold text-xs uppercase tracking-wider">
              {isArabic ? "دليل المنصة" : "Aperçu interactif"}
            </span>
            <span className="text-xs text-slate-400">
              Étape {currentStep + 1} sur {steps.length}
            </span>
          </div>

          {/* Content Card */}
          <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${current.iconColor}`}>
                <StepIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">
                  {isArabic ? current.titleAr : current.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {current.highlight}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {isArabic ? current.descriptionAr : current.description}
            </p>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStep(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentStep === idx
                    ? "w-8 bg-[#F20D2F]"
                    : "w-2 bg-slate-700 hover:bg-slate-600"
                }`}
              />
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
            <button
              type="button"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              className={`py-2 px-3 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors ${
                currentStep === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              }`}
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{isArabic ? "السابق" : "Précédent"}</span>
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{isArabic ? "التالي" : "Suivant"}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            ) : (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isArabic ? "طلب الباك عبر الواتساب" : "Commander via WhatsApp"}</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
