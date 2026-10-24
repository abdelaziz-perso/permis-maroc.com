export interface ValueProp {
  icon: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  color: string;
}

export interface PackFaq {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

export interface RevisionPack {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  subtitle: string;
  subtitleAr: string;
  headline: string;
  headlineAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  previousPrice?: number;
  discountPercent?: number;
  currency: "MAD";
  features: string[];
  featuresAr: string[];
  valueProps: ValueProp[];
  trustItems: { title: string; titleAr: string; icon: string }[];
  faq: PackFaq[];
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappMessageAr: string;
  whatsappEnabled: boolean;
  active: boolean;
}

export const siteContactConfig = {
  whatsappNumber: "+212630258502",
  cleanWhatsappNumber: "212630258502",
  email: "contact@permis-maroc.com",
};

export function getWhatsAppPackOrderUrl(isArabic = false): string {
  const message = isArabic
    ? "السلام عليكم، أريد طلب باك المراجعة الشامل لرخصة السياقة B من منصة Permis Maroc (بسعر 79 درهم)."
    : "Salam, je souhaite commander le Pack Révision Permis Maroc (79 MAD).";
  return `https://wa.me/${siteContactConfig.cleanWhatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const revisionPackData: RevisionPack = {
  id: "pack-revision-permis-b",
  slug: "pack-revision",
  name: "Pack Révision Permis B",
  nameAr: "باك المراجعة الشامل رخصة السياقة B",
  subtitle: "Préparation complète au Code de la Route au Maroc",
  subtitleAr: "الاستعداد الكامل للامتحان النظري لرخصة السياقة بالمغرب",
  headline: "Tout ce qu'il te faut pour préparer ton examen.",
  headlineAr: "كل ما تحتاجه للنجاح في امتحان رخصة السياقة من المحاولة الأولى.",
  description:
    "Révise à ton rythme avec un pack complet de cours, questions, panneaux et examens blancs accessible sur téléphone, tablette et ordinateur.",
  descriptionAr:
    "راجع بالريتم لي كيريحك مع باقة متكاملة من الدروس، الأسئلة، البلايك والامتحانات التجريبية متوفرة على الهاتف، التابليت والحاسوب.",
  price: 79,
  previousPrice: 199,
  discountPercent: 60,
  currency: "MAD",
  whatsappNumber: siteContactConfig.whatsappNumber,
  whatsappMessage: "Salam, je souhaite commander le Pack Révision Permis Maroc.",
  whatsappMessageAr: "السلام عليكم، أريد طلب باك المراجعة الشامل لرخصة السياقة B من منصة Permis Maroc.",
  whatsappEnabled: true,
  active: true,
  features: [
    "Cours complets du Code de la Route",
    "Questions d'entraînement",
    "Examens blancs",
    "Panneaux de signalisation",
    "Explications des réponses",
    "Accès mobile, tablette et ordinateur",
    "Suivi de progression",
    "Français & العربية",
  ],
  featuresAr: [
    "دروس شاملة لقانون السير المغربي",
    "سلاسل أسئلة تدريبية تفاعلية",
    "امتحانات بيضاء في ظروف حقيقية",
    "دليل كامل لإشارات المرور (البلايك)",
    "شرح مبسط لكل سؤال وجواب",
    "تطبيق متوافق مع الهاتف، التابليت والحاسوب",
    "تتبع دقيق للمستوى ونقاط الضعف",
    "متوفر باللغتين الفرنسية والعربية",
  ],
  valueProps: [
    {
      icon: "BookOpen",
      title: "500+ questions",
      titleAr: "أكثر من 500 سؤال",
      description: "Basées sur le programme officiel NARSA",
      descriptionAr: "مطابقة للبنك الرسمي للأسئلة",
      color: "text-blue-500 bg-blue-50",
    },
    {
      icon: "CheckCircle2",
      title: "Explications détaillées",
      titleAr: "شروحات مفصلة",
      description: "Comprenez chaque règle en profondeur",
      descriptionAr: "افهم علاش هاد الجواب ماشي الحفظ الأعمى",
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      icon: "Smartphone",
      title: "Accessible partout",
      titleAr: "متاح في كل مكان",
      description: "Téléphone, tablette et ordinateur",
      descriptionAr: "راجع في أي وقت ومن أي جهاز",
      color: "text-amber-500 bg-amber-50",
    },
    {
      icon: "TrendingUp",
      title: "Suivi de progression",
      titleAr: "تتبع المستوى",
      description: "Visualisez vos statistiques et XP",
      descriptionAr: "شوف نقطتك كتطلع ونقاط ضعفك كتقل",
      color: "text-purple-500 bg-purple-50",
    },
  ],
  trustItems: [
    {
      icon: "Lock",
      title: "Paiement sécurisé",
      titleAr: "أداء آمن",
    },
    {
      icon: "Smartphone",
      title: "Compatible mobile",
      titleAr: "متوافق مع الهاتف",
    },
    {
      icon: "Zap",
      title: "Accès numérique",
      titleAr: "ولوج رقمي فوري",
    },
    {
      icon: "MessageCircle",
      title: "Support WhatsApp",
      titleAr: "دعم عبر الواتساب",
    },
  ],
  faq: [
    {
      question: "Comment accéder au Pack ?",
      questionAr: "كيف يمكنني الولوج إلى الباك بعد الطلب ؟",
      answer:
        "Après validation de votre commande (en ligne ou via WhatsApp), votre compte Permis Maroc est instantanément activé et vous recevez vos identifiants d'accès.",
      answerAr:
        "مباشرة بعد تأكيد طلبك (عبر الموقع أو عبر الواتساب)، يتم تفعيل حسابك على منصة Permis Maroc وتتوصل بمعلومات الدخول فوراً.",
    },
    {
      question: "Puis-je l'utiliser sur téléphone ?",
      questionAr: "هل يمكنني استعماله من الهاتف الذكي ؟",
      answer:
        "Oui, le Pack Révision est une Progressive Web App (PWA) 100% optimisée pour smartphones (iPhone et Android), tablettes et ordinateurs, sans installation obligatoire.",
      answerAr:
        "نعم بالتأكيد، المنصة مهيأة بنسبة 100% لتعمل كتطبيق سريع على جميع الهواتف الذكية (آيفون وأندرويد)، اللوحات الإلكترونية، والحواسيب.",
    },
    {
      question: "Combien de temps ai-je accès au contenu ?",
      questionAr: "كم هي مدة صلاحية الولوج إلى المحتوى ؟",
      answer:
        "Vous bénéficiez d'un accès illimité pendant toute la durée de préparation de votre permis de conduire, avec mises à jour gratuites des cours.",
      answerAr:
        "تستفيد من ولوج كامل ومستمر طيلة فترة تحضيرك لرخصة السياقة، مع الاستفادة من جميع التحديثات والمستجدات مجاناً.",
    },
    {
      question: "Le contenu est-il disponible en arabe ?",
      questionAr: "هل المحتوى متوفر باللغة العربية والدارجة ؟",
      answer:
        "Oui, l'intégralité des cours, questions, panneaux et explications est disponible en Français, en Arabe classique et avec explications en Darija marocaine.",
      answerAr:
        "نعم، جميع الدروس والأسئلة وعلامات التشوير والشروحات متوفرة باللغة الفرنسية، العربية الفصحى ومع تبسيط دقيق بالدارجة المغربية.",
    },
    {
      question: "Comment fonctionne le paiement ?",
      questionAr: "كيف تتم عملية الأداء ؟",
      answer:
        "Le paiement s'effectue en toute simplicité en dirhams marocains (MAD) par virement bancaire, versement (Wafacash, Cash Plus) ou en ligne, ou via assistance WhatsApp directe.",
      answerAr:
        "الأداء يتم بسهولة بالدرهم المغربي (MAD) عبر التحويل البنكي، وكالات تحويل الأموال (وفاكاش، كاش بلوس)، أو مباشرة عبر المساعدة السريعة في الواتساب.",
    },
    {
      question: "Puis-je suivre ma progression ?",
      questionAr: "واش نقدر نتبع النيفو ديالي ؟",
      answer:
        "Absolument. Votre espace personnel enregistre l'historique complet de vos examens, vos scores par thème (priorités, panneaux, vitesse) et vos points à améliorer.",
      answerAr:
        "نعم بكل تأكيد. حسابك الشخصي يسجل أوتوماتيكياً كل الامتحانات التي قمت باجتيازها، المعدل العام، والمحاور التي تحتاج إلى مزيد من التركيز.",
    },
  ],
};
