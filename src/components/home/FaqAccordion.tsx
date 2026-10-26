"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
  {
    question:
      "Quel est le score minimum pour réussir l'examen théorique du permis B au Maroc en 2026 ?",
    questionAr:
      "ما هي النقطة الدنيا للنجاح في الامتحان النظري لرخصة السياقة صنف B بالمغرب سنة 2026؟",
    answer:
      "Depuis la réforme de la banque de questions NARSA, le candidat doit obtenir au minimum 34 bonnes réponses sur 40 (soit un taux de réussite de 85%) pour valider l'épreuve théorique du permis de conduire de catégorie B (voitures de tourisme). Pour le permis motocycles (catégorie A), le seuil est de 24 sur 30.",
    answerAr:
      "وفقاً لنظام الامتحان الجديد للوكالة الوطنية للسلامة الطرقية (نارسا - NARSA)، يجب على المترشح الحصول على 34 إجابة صحيحة على الأقل من أصل 40 سؤالاً (أي بنسبة نجاح 85%) لاجتياز الامتحان النظري لرخصة السياقة صنف B. أما بالنسبة للدراجات النارية (صنف A) فالعتبة هي 24 على 30.",
  },
  {
    question: "Combien coûte en moyenne le permis de conduire au Maroc ?",
    questionAr: "كم تبلغ تكلفة الحصول على رخصة السياقة (البيرمي) في المغرب؟",
    answer:
      "Le coût global moyen d'un permis B au Maroc est généralement compris entre 3 350 MAD et 4 350 MAD. Cela comprend le forfait légal obligatoire (20h de cours théoriques et 20h de pratique au volant pour environ 2 500 à 3 200 MAD), la visite médicale d'aptitude (150 MAD) et les droits de timbre fiscal et d'inscription (environ 700 MAD).",
    answerAr:
      "تتراوح التكلفة الإجمالية المتوسطة لرخصة السياقة صنف B في المغرب بين 3,350 درهم و 4,350 درهم، وتشمل التكوين القانوني الإلزامي بمدرسة تعليم السياقة (20 ساعة نظري و 20 ساعة تطبيقي)، الفحص الطبي للعيون (حوالي 150 درهم)، وواجبات التسجيل والتمبر الجبائي (حوالي 700 درهم).",
  },
  {
    question:
      "Combien de temps dure la période probatoire du permis neuf au Maroc ?",
    questionAr:
      "كم تدوم الفترة الاختبارية لرخصة السياقة الجديدة في المغرب؟",
    answer:
      "La période probatoire dure exactement 2 ans à compter de la date de réussite à l'examen. Durant cette période, le conducteur dispose d'un capital initial de 20 points (au lieu de 30 points pour le permis définitif) et sa vitesse est strictement plafonnée à 90 km/h sur tout le réseau marocain, y compris les autoroutes.",
    answerAr:
      "تدوم الفترة الاختبارية سنتين كاملتين ابتداءً من تاريخ الحصول على رخصة السياقة. خلال هذه الفترة يتوفر السائق المبتدئ على رصيد أولي قدره 20 نقطة (عوض 30 نقطة في الرخصة النهائية)، وتحدد سرعته القصوى في 90 كلم/ساعة في جميع الطرق بما فيها الطريق السيار مع وضع شارة 90.",
  },
  {
    question:
      "Comment se déroule la nouvelle épreuve théorique informatisée de la NARSA ?",
    questionAr:
      "كيف يمر الامتحان النظري الجديد عبر الحاسوب في مراكز نارسا؟",
    answer:
      "L'examen théorique se déroule sur un écran tactile individuel dans l'un des centres d'immatriculation de la NARSA. Le système tire aléatoirement 40 questions parmi une banque nationale sécurisée de 1 000 questions illustrées et vidéos. Le candidat dispose de 30 secondes par question pour sélectionner sa réponse.",
    answerAr:
      "يجرى الامتحان النظري على شاشة لمس فردية مع سماعات صوتية داخل مركز تسجيل السيارات التابع لنارسا. يختار النظام آلياً 40 سؤالاً من بنك الأسئلة الوطني المحين، ويتوفر المترشح على 30 ثانية للإجابة عن كل سؤال باللغة العربية أو الفرنسية.",
  },
  {
    question: "Puis-je réviser en ligne gratuitement avec Permis Maroc ?",
    questionAr: "هل يمكنني المراجعة والتدريب مجاناً عبر منصة بيرمي المغرب؟",
    answer:
      "Oui ! Permis-Maroc.com propose des séries de tests gratuites, un catalogue complet de tous les panneaux de signalisation avec leurs sanctions associées, 12 modules de cours interactifs et des simulations d'intersections 3D pour s'entraîner dans des conditions réelles.",
    answerAr:
      "نعم بكل تأكيد! تتيح لك منصة بيرمي المغرب سلاسل اختبارات مجانية، دليلاً شاملاً لجميع علامات التشوير الطرقي مع الغرامات المطبقة، 12 محوراً تعليمياً، ومحاكاة تفاعلية ثلاثية الأبعاد لملتقيات الطرق.",
  },
  {
    question: "Que signifie la catégorie A1 du permis de conduire ?",
    questionAr: "ماذا تعني A1 في رخصة السياقة؟",
    answer:
      "La catégorie A1 est une classe de permis marocain qui autorise la conduite des motocyclettes dont la cylindrée n'excède pas 125 cm³ et la puissance 11 kW. Elle est accessible dès l'âge de 16 ans.",
    answerAr:
      "رخصة A1 هي صنف من أصناف رخص السياقة بالمغرب، تسمح بقيادة الدراجات النارية التي لا يتجاوز حجم محركها 125 سنتمتر مكعب وقوتها لا تتعدى 11 كيلوواط. يمكن الحصول عليها ابتداءً من سن 16 سنة.",
  },
  {
    question: "Quelles sont toutes les règles de circulation ?",
    questionAr: "ما هي جميع قواعد السير؟",
    answer:
      "Les règles de circulation couvrent : le respect de la signalisation routière, le droit de priorité, les limitations de vitesse, le port de la ceinture, l'interdiction du téléphone au volant, les distances de sécurité, les règles de dépassement et d'intersection, ainsi que l'arrêt et le stationnement. Elles sont détaillées dans le Code de la Route marocain (Loi 52-05).",
    answerAr:
      "تشمل قواعد السير: احترام إشارات المرور والتشوير الطرقي، احترام حق الأسبقية، الالتزام بالسرعة القانونية، ربط حزام السلامة، عدم استعمال الهاتف أثناء القيادة، احترام مسافة الأمان، قواعد التجاوز والتقاطعات، وقواعد الوقوف والتوقف. يتم تفصيل هذه القواعد في مدونة السير المغربية.",
  },
  {
    question: "Combien de questions y a-t-il à l'examen du code ?",
    questionAr: "كم سؤال في امتحان السياقة؟",
    answer:
      "L'examen théorique (code) comporte 40 questions. Il faut au minimum 34 bonnes réponses sur 40 (85%) pour réussir l'épreuve de catégorie B. Chaque question dispose d'un temps limité de réponse.",
    answerAr:
      "يتكون امتحان كود السياقة (الامتحان النظري) من 40 سؤالاً. يجب الإجابة بشكل صحيح على 34 سؤالاً على الأقل من أصل 40 (أي 85%) للنجاح في الامتحان النظري صنف B. مدة الاختبار محددة ولكل سؤال وقت محدد للإجابة.",
  },
  {
    question: "Quelles sont les catégories de permis au Maroc ?",
    questionAr: "أصناف رخصة السياقة بالمغرب؟",
    answer:
      "Les catégories de permis au Maroc sont : A1 (petites motos), A (motos), B (véhicules légers), C (camions), D (autocars), EB (voiture + remorque), EC (camion + remorque), ED (autocar + remorque). La catégorie B est la plus courante.",
    answerAr:
      "أصناف رخص السياقة بالمغرب هي: A1 (دراجات نارية صغيرة)، A (دراجات نارية كبيرة)، B (سيارات خفيفة)، C (شاحنات)، D (حافلات نقل المسافرين)، EB (سيارات بمقطورة)، EC (شاحنات بمقطورة)، ED (حافلات بمقطورة). الصنف B هو الأكثر شيوعاً.",
  },
  {
    question: "Combien existe-t-il de types de permis ?",
    questionAr: "كم عدد أنواع الرخص؟",
    answer:
      "Il existe 8 catégories principales de permis au Maroc : A1, A, B, C, D, EB, EC et ED. Chacune autorise un type de véhicule précis et impose des conditions d'âge et de formation spécifiques.",
    answerAr:
      "يوجد 8 أصناف رئيسية لرخص السياقة بالمغرب: A1، A، B، C، D، EB، EC، ED. كل صنف يسمح بقيادة نوع معين من المركبات ويتطلب شروطاً خاصة من حيث السن والتكوين.",
  },
  {
    question: "Quelle est la vitesse maximale autorisée au Maroc ?",
    questionAr: "ما هي السرعة القصوى المسموح بها في المغرب؟",
    answer:
      "Les vitesses maximales autorisées au Maroc sont : 60 km/h en agglomération, 100 km/h sur les routes nationales et 120 km/h sur autoroute. Ces limites peuvent varier selon la signalisation locale.",
    answerAr:
      "السرعات القصوى المسموح بها في المغرب هي: 60 كم/س داخل المدن، 100 كم/س على الطرق الوطنية، و120 كم/س على الطرق السيارة. يمكن أن تختلف هذه الحدود حسب التشوير الطرقي في بعض المناطق.",
  },
  {
    question: "Rouler à 140 km/h : est-ce autorisé ?",
    questionAr: "إذا السرعة 140 كم الحد المسموح به؟",
    answer:
      "La vitesse maximale sur autoroute au Maroc est de 120 km/h. Rouler à 140 km/h constitue un excès de 20 km/h passible d'amende et de retrait de points. Un dépassement supérieur à 50 km/h est une infraction grave.",
    answerAr:
      "السرعة القصوى على الطريق السيار بالمغرب هي 120 كم/س. القيادة بسرعة 140 كم/س تعتبر تجاوزاً بـ 20 كم/س وتعرض السائق لغرامة مالية وسحب نقط من رخصة السياقة. التجاوز بأكثر من 50 كم/س يعتبر مخالفة خطيرة.",
  },
  {
    question: "Quelle est l'amende maximale pour excès de vitesse ?",
    questionAr: "ما هي أقصى غرامة للسرعة الزائدة؟",
    answer:
      "Les amendes pour excès de vitesse au Maroc dépendent de l'ampleur du dépassement. Elles peuvent atteindre environ 400 MAD pour un dépassement léger, 700 MAD pour un dépassement moyen, et jusqu'à 5 000 MAD pour un dépassement grave, avec possible retrait du permis et immobilisation du véhicule.",
    answerAr:
      "تتراوح غرامات السرعة الزائدة بالمغرب حسب مقدار التجاوز. يمكن أن تصل الغرامة إلى 400 درهم للتجاوز البسيط، و700 درهم للتجاوز المتوسط، وقد تصل إلى 5000 درهم للتجاوز الخطير مع إمكانية سحب الرخصة وتوقيف المركبة.",
  },
  {
    question:
      "Quelle est la vitesse maximale autorisée sur l'autoroute A3 au Maroc ?",
    questionAr:
      "ما هي السرعة القصوى المسموح بها على الطريق السريع A3 في المغرب؟",
    answer:
      "Sur l'autoroute A3 comme sur les autres autoroutes marocaines, la vitesse maximale est de 120 km/h et le minimum est de 60 km/h. Il faut toujours respecter la vitesse indiquée par la signalisation en place.",
    answerAr:
      "السرعة القصوى المسموح بها على الطريق السيار A3 بالمغرب هي 120 كم/س كحد أقصى، وذلك مثل باقي الطرق السيارة. الحد الأدنى للسرعة على الطريق السيار هو 60 كم/س. يجب دائماً الالتزام بالسرعة المشار إليها في لوحات التشوير.",
  },
];

export function FaqAccordion() {
  const { language } = useLanguage();
  const isArabic = language === "ar" || language === "ary";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: isArabic ? item.questionAr : item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: isArabic ? item.answerAr : item.answer,
      },
    })),
  };

  return (
    <section
      id="faq-section"
      className="faq-section py-16 lg:py-24 bg-[#F8FAFC] relative border-t border-[#E2E8F0]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="faq-header text-center max-w-2xl mx-auto mb-12">
          <div className="faq-title-wrap inline-flex flex-col items-center gap-3">
            <div className="faq-icon inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#C1272D]">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{isArabic ? "الأسئلة الشائعة" : "Foire Aux Questions"}</span>
            </div>
            <div>
              <h2 className="faq-title text-3xl sm:text-4xl font-extrabold text-[#071A3D] tracking-tight mb-4">
                {isArabic
                  ? "أسئلة شائعة حول كود السياقة ورخصة القيادة"
                  : "Questions fréquentes sur le permis au Maroc"}
              </h2>
              <p className="faq-subtitle text-[#5A6A82] text-sm leading-relaxed">
                {isArabic
                  ? "إجابات على أكثر الأسئلة المتداولة حول رخصة السياقة وقواعد المرور"
                  : "Tout ce qu'il faut savoir sur les démarches, les tarifs officiels et l'examen théorique NARSA."}
              </p>
            </div>
          </div>
        </div>

        <div className="faq-list space-y-3.5">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="faq-item rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-2xs transition-all"
              >
                <h3 className="faq-item-title text-base sm:text-lg font-bold m-0">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="faq-question w-full text-start p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-[#071A3D]">
                      {isArabic ? item.questionAr : item.question}
                    </span>
                    <span className="faq-chevron shrink-0">
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#C1272D]" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div className="faq-answer px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9] pt-4 font-normal">
                    <p>{isArabic ? item.answerAr : item.answer}</p>
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
