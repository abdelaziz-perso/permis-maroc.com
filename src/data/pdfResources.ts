export interface PdfResource {
  id: string;
  slug: string;
  titleFr: string;
  titleAr: string;
  categoryFr: string;
  categoryAr: string;
  descriptionFr: string;
  descriptionAr: string;
  icon: string; // Lucide icon identifier or emoji
  badgeFr: string;
  badgeAr: string;
  fileSize: string;
  downloads: string;
  updatedYear: string;
  /** Real PDF served from /public/pdf */
  pdfUrl: string;
  keySummaryFr: string[];
  keySummaryAr: string[];
  detailedContentFr: string;
  detailedContentAr: string;
  examTipsFr: string;
  examTipsAr: string;
  formulas?: {
    label: string;
    formula: string;
    example: string;
  }[];
  finesTable?: {
    classification: string;
    amount: string;
    points: string;
    examples: string;
  }[];
}

export const moroccanPdfResources: PdfResource[] = [
  {
    id: "panneaux-signalisation",
    slug: "panneaux-signalisation-maroc-pdf",
    titleFr: "Guide Complet des Panneaux de Signalisation au Maroc",
    titleAr: "الدليل الشامل لجميع إشارات المرور مع الشرح",
    categoryFr: "Signalisation",
    categoryAr: "الإشارات الطرقية",
    descriptionFr:
      "Récapitulatif officiel illustré de l'ensemble des panneaux : danger, interdiction, obligation, indication et priorité selon la réglementation marocaine.",
    descriptionAr:
      "ملف شامل يتضمن جميع إشارات المرور الطرقية (الخطر، المنع، الإجبار، الإرشاد والأسبقية) مع شرح مفصل باللغة العربية والدارجة.",
    icon: "ShieldAlert",
    badgeFr: "Indispensable 100% Examen",
    badgeAr: "أساسي للامتحان 100%",
    fileSize: "15 Mo",
    downloads: "42 500+",
    updatedYear: "2026",
    pdfUrl: "/pdf/guide-isharat-al-morour-2026.pdf",
    keySummaryFr: [
      "Panneaux triangulaires à bord rouge : Danger (positionnés à 50m en ville, 150m hors agglomération).",
      "Panneaux circulaires à bord rouge : Interdiction (application immédiate à hauteur du panneau).",
      "Panneaux circulaires bleus : Obligation stricte.",
      "Panneaux carrés/rectangulaires bleus : Indication et services utiles.",
      "Panneaux de fin d'interdiction (fond blanc barré de noir).",
    ],
    keySummaryAr: [
      "علامات الخطر مثلثة بحاشية حمراء (توضع على بعد 50 متر داخل المدينة و150 متر خارجها).",
      "علامات المنع دائرية بحاشية حمراء (يبدأ تطبيقها فوراً عند موضع العلامة).",
      "علامات الإجبار دائرية زرقاء تلزم السائق باتباع اتجاه أو سرعة محددة.",
      "علامات الإرشاد مربعة أو مستطيلة زرقاء تقدم معلومات وتوجيهات عملية.",
      "علامات نهاية المنع بيضاء مع خط رمادي مائل.",
    ],
    detailedContentFr:
      "La signalisation verticale marocaine est régie par l'instruction interministérielle sur la signalisation routière. Chaque catégorie répond à un code de forme et de couleur précis pour garantir une lisibilité instantanée de jour comme de nuit grâce aux revêtements rétro-réfléchissants.",
    detailedContentAr:
      "التشوير العمودي بالمغرب يخضع للقرارات الوزارية المشتركة، حيث تتميز كل فئة بأشكال وألوان هندسية معيارية لضمان قراءتها بوضوح ليلاً ونهاراً بفضل الأشرطة العاكسة للضوء.",
    examTipsFr:
      "À l'examen NARSA, faites très attention aux panonceaux additionnels sous les panneaux : ils précisent la distance d'application ou la catégorie de véhicules concernée.",
    examTipsAr:
      "في امتحان نارسا، انتبه جيداً للعلامات الصغرى التكميلية تحت البلاكة، فهي تحدد المسافة أو أصناف المركبات المعنية بالمنع أو الخطر.",
  },
  {
    id: "calcul-distances",
    slug: "calcul-des-distances-code-route-maroc-pdf",
    titleFr: "Fiche Mémo : Formules de Calcul des Distances",
    titleAr: "الدليل الشامل لحساب المسافات في قانون السير",
    categoryFr: "Sécurité & Vitesse",
    categoryAr: "الحسابات والسرعة",
    descriptionFr:
      "Toutes les formules mathématiques indispensables pour l'examen théorique : distance de réaction, distance de freinage/arrêt, et distance de sécurité.",
    descriptionAr:
      "شرح مبسط لمعادلات حساب مسافة الأمان، مسافة الوقوف، ومسافة رد الفعل المطلوبة في الامتحان النظري مع أمثلة عملية.",
    icon: "Ruler",
    badgeFr: "Formules Examen",
    badgeAr: "معادلات الامتحان",
    fileSize: "547 Ko",
    downloads: "38 200+",
    updatedYear: "2026",
    pdfUrl: "/pdf/hisab-al-masafat.pdf",
    keySummaryFr: [
      "Temps de réaction moyen : 1 seconde dans des conditions normales (augmente avec la fatigue, l'alcool ou le téléphone).",
      "Distance de réaction = Chiffre des dizaines de la vitesse multiplié par 3.",
      "Distance de sécurité = Chiffre des dizaines de la vitesse multiplié par 6.",
      "Distance d'arrêt sur sol sec = Chiffre des dizaines multiplié par lui-même.",
      "Sur sol mouillé ou chaussée glissante : la distance d'arrêt est MULTIPLIÉE PAR 2 !",
    ],
    keySummaryAr: [
      "وقت رد الفعل المتوسط هو ثانية واحدة في الظروف العادية (ويزيد مع التعب أو الهاتف أو النعاس).",
      "مسافة رد الفعل = رقم العشرات للسرعة مضروب في 3.",
      "مسافة الأمان = رقم العشرات للسرعة مضروب في 6.",
      "مسافة الوقوف على طريق جافة = رقم العشرات مضروب في نفسه.",
      "على طريق مبللة أو زالقة : مسافة الوقوف تُضرب في 2 (تتضاعف مرتين) !",
    ],
    detailedContentFr:
      "Ces calculs sont systématiquement posés lors de l'examen théorique marocain. La formule du chiffre des dizaines permet un calcul mental immédiat sans calculatrice.",
    detailedContentAr:
      "هذه الحسابات تتكرر دائماً في الامتحان النظري بالمغرب. طريقة حساب رقم العشرات تمكن المرشح من إيجاد الجواب ذهنياً وبسرعة.",
    examTipsFr:
      "Attention au piège classique : 'Sur route mouillée, à 80 km/h, quelle est la distance d'arrêt ?' Réponse : (8 x 8) = 64m x 2 = 128m !",
    examTipsAr:
      "انتبه للفخ الشائع: 'في طريق مبللة على سرعة 80 كم/س، ما هي مسافة الوقوف؟' الجواب: (8 × 8) = 64م ثم نضاعفها 64 × 2 = 128 متراً !",
    formulas: [
      {
        label: "Distance de Réaction (D.R)",
        formula: "Dizaine de la vitesse × 3",
        example: "À 90 km/h : 9 × 3 = 27 mètres",
      },
      {
        label: "Distance de Sécurité (D.S)",
        formula: "Dizaine de la vitesse × 6",
        example: "À 100 km/h : 10 × 6 = 60 mètres",
      },
      {
        label: "Distance d'Arrêt (Sol sec)",
        formula: "Dizaine de la vitesse × Dizaine",
        example: "À 60 km/h : 6 × 6 = 36 mètres",
      },
      {
        label: "Distance d'Arrêt (Sol mouillé)",
        formula: "(Dizaine × Dizaine) × 2",
        example: "À 60 km/h : (6 × 6) × 2 = 72 mètres",
      },
    ],
  },
  {
    id: "infractions-amendes-maroc",
    slug: "bareme-infractions-amendes-points-maroc-pdf",
    titleFr: "Barème des Infractions, Amendes & Points (Loi 52-05)",
    titleAr: "المخالفات والجنح والغرامات ورصيد النقط بالمغرب",
    categoryFr: "Législation & Amendes",
    categoryAr: "المخالفات والعقوبات",
    descriptionFr:
      "Guide complet du permis à points marocain, classification des infractions en 1ère, 2ème et 3ème classe, montants des amendes transactionnelles et retrait de points.",
    descriptionAr:
      "دليل مرجعي شامل لجميع المخالفات والجنح المرورية بالمغرب (القانون 52-05)، الغرامات التصالحية والجزافية، ورصيد النقط المخصومة.",
    icon: "Scale",
    badgeFr: "Loi 52-05 Révisée",
    badgeAr: "مدونة السير 52-05",
    fileSize: "1.5 Mo",
    downloads: "29 100+",
    updatedYear: "2026",
    pdfUrl: "/pdf/mukhalafat-darajat-examen.pdf",
    keySummaryFr: [
      "Capital initial : 20 points pendant la période probatoire (2 ans), puis 30 points pour le permis définitif.",
      "1ère classe (700 MAD) : Non-respect du feu rouge, sens interdit, dépassement dangereux, défaut de ceinture.",
      "2ème classe (500 MAD) : Téléphone au volant, non-respect de la priorité, défaut de contrôle technique.",
      "3ème classe (300 MAD) : Défaut d'éclairage en agglomération éclairée, arrêt gênant.",
      "Réduction immédiate en cas de paiement rapide (sous 24h ou 15 jours).",
    ],
    keySummaryAr: [
      "رصيد النقط الأولي: 20 نقطة في الفترة الاختبارية (سنتين)، وتصبح 30 نقطة بعد تثبيت الرخصة.",
      "مخالفات الدرجة الأولى (700 درهم): عدم احترام الضوء الأحمر، السير في الاتجاه الممنوع، التجاوز المعيب، عدم ربط حزام السلامة.",
      "مخالفات الدرجة الثانية (500 درهم): استعمال الهاتف أثناء السياقة، عدم احترام الأسبقية، غياب الفحص التقني.",
      "مخالفات الدرجة الثالثة (300 درهم): عدم تشغيل الإنارة عند الحاجة داخل التجمع السكني، الوقوف غير القانوني.",
      "تخفيض في مبلغ الغرامة عند الأداء الفوري (خلال 24 ساعة أو 15 يوماً).",
    ],
    detailedContentFr:
      "La Loi 52-05 portant Code de la Route au Maroc a institué un régime précis de sanctions pécuniaires et de retraits de points sur le permis de conduire afin de responsabiliser les usagers.",
    detailedContentAr:
      "كرست مدونة السير المغربية 52-05 نظام رخصة السياقة بالنقط، مع تحديد مسطرة الغرامات التصالحية والجزافية وإجراءات استرجاع النقط عبر الدورات التكوينية.",
    examTipsFr:
      "Retenez les infractions majeures qui retirent 4 points : brûler un feu rouge, franchir une ligne continue, excès de vitesse supérieur à 30 km/h.",
    examTipsAr:
      "احفظ المخالفات التي تخصم 4 نقط: حرق الضوء الأحمر، قطع الخط المتصل، وتجاوز السرعة القصوى بأكثر من 30 كم/ساعة.",
    finesTable: [
      {
        classification: "1ère Classe (درجة 1)",
        amount: "700 MAD (400 MAD si payé sous 24h)",
        points: "-4 points",
        examples: "Feu rouge, Stop non marqué, Sens interdit, Dépassement prohibé",
      },
      {
        classification: "2ème Classe (درجة 2)",
        amount: "500 MAD (300 MAD si payé sous 24h)",
        points: "-3 points",
        examples: "Téléphone tenu en main, Défaut de ceinture, Non-respect priorité",
      },
      {
        classification: "3ème Classe (درجة 3)",
        amount: "300 MAD (150 MAD si payé sous 24h)",
        points: "0 point",
        examples: "Défaut d'éclairage en ville, Pneu lisse, Non-port du gilet rétro-réfléchissant",
      },
    ],
  },
  {
    id: "regles-priorite-intersections",
    slug: "regles-priorite-intersections-maroc-pdf",
    titleFr: "Règles de Priorité dans les Intersections & Giratoires",
    titleAr: "الدليل الشامل لقواعد الأسبقية في ملتقيات الطرق والمدارات",
    categoryFr: "Priorités & Carrefours",
    categoryAr: "الأسبقية والملتقيات",
    descriptionFr:
      "Maîtrisez la hiérarchie des règles : agent de circulation, feux tricolores, panneaux de signalisation, règle de la priorité à droite et rond-point giratoire.",
    descriptionAr:
      "دليل شامل لحق الأسبقية في التقاطعات والمدارات الدائرية، تراتبية الإشارات (الشرطي، الأضواء، البلايك، واليمين).",
    icon: "RotateCw",
    badgeFr: "Top Questions Examen",
    badgeAr: "أهم أسئلة الامتحان",
    fileSize: "946 Ko",
    downloads: "35 800+",
    updatedYear: "2026",
    pdfUrl: "/pdf/qawaid-asbaqiya-multaqayat.pdf",
    keySummaryFr: [
      "Hiérarchie absolue : 1. Agent de police / Gendarme > 2. Feux tricolores > 3. Panneaux de priorité > 4. Priorité à droite par défaut.",
      "L'agent de profil = passage autorisé. L'agent de face ou de dos = arrêt obligatoire.",
      "Au rond-point avec panneau 'Sens giratoire' + 'Cédez le passage' : priorité absolue à GAUCHE (ceux qui sont engagés).",
      "Au rond-point SANS panneau de priorité : priorité à DROITE.",
      "Feu jaune clignotant : les feux sont hors service ou au ralenti, on applique les panneaux ou la priorité à droite.",
    ],
    keySummaryAr: [
      "التراتبية الإلزامية: 1. إشارات شرطي المرور > 2. الأضواء الثلاثية > 3. علامات الأسبقية > 4. قاعدة الأسبقية لليمين عند غياب التشوير.",
      "الشرطي بالجنب = مسموح بالمرور. الشرطي في مواجهتك أو بظهره = توقف إجباري.",
      "في المدار مع علامة 'مدار' و'ليس لكم حق الأسبقية' = الأسبقية لليسار (لمن هم بداخل المدار).",
      "في المدار بدون أي علامة تشوير = نطبق الأسبقية لليمين.",
      "الضوء الأصفر الرفاف = الأضواء معطلة، ويجب تطبيق علامات التشوير أو الأسبقية لليمين.",
    ],
    detailedContentFr:
      "Les intersections concentrent plus de 45% des accidents urbains au Maroc. L'épreuve théorique vérifie méticuleusement votre compréhension des situations d'engagement et des refus de priorité.",
    detailedContentAr:
      "تعتبر ملتقيات الطرق من أكثر النقاط الحساسة في السير، ويركز عليها الامتحان النظري بشكل كبير لاختبار سرعة التقدير والتحليل لدى المترشح.",
    examTipsFr:
      "Quand un véhicule tourne à gauche à une intersection, il doit TOUJOURS céder le passage aux véhicules venant en face.",
    examTipsAr:
      "عندما تريد الدوران نحو اليسار في ملتقى طرق، يجب دائماً إعطاء الأسبقية للعربات القادمة في الاتجاه المعاكس.",
  },
  {
    id: "arret-stationnement-maroc",
    slug: "arret-stationnement-maroc-pdf",
    titleFr: "Règles d'Arrêt et de Stationnement au Maroc",
    titleAr: "دليل علامات وقواعد الوقوف والتوقف بالمغرب",
    categoryFr: "Stationnement",
    categoryAr: "الوقوف والتوقف",
    descriptionFr:
      "Distinction fondamentale entre arrêt temporaire et stationnement, signification des trottoirs peints (rouge/blanc vs jaune), et stationnement en pente.",
    descriptionAr:
      "شرح الفرق بين الوقوف المؤقت والتوقف، لوحات المنع، الأرصفة الملونة بالأحمر والأبيض أو الأصفر، وطريقة ركن السيارة في المنحدر.",
    icon: "SquareParking",
    badgeFr: "Fiche Pratique",
    badgeAr: "بطاقة عملية",
    fileSize: "548 Ko",
    downloads: "24 700+",
    updatedYear: "2026",
    pdfUrl: "/pdf/alamat-wuquf-tawaqquf.pdf",
    keySummaryFr: [
      "Arrêt : immobilisation momentanée pour faire monter/descendre un passager ou charger des bagages, conducteur reste au volant.",
      "Stationnement : immobilisation prolongée du véhicule avec le conducteur qui quitte son véhicule.",
      "Trottoir peint en Rouge et Blanc : Stationnement interdit, mais l'arrêt court reste autorisé !",
      "Trottoir peint en Jaune continu : Arrêt ET Stationnement strictement interdits !",
      "En pente montante : braquer les roues vers la chaussée. En pente descendante : braquer les roues vers le trottoir et serrer le frein à main.",
    ],
    keySummaryAr: [
      "الوقوف (Arrêt): توقف مؤقت ومحدود لركوب أو نزول شخص أو شحن بضائع، مع بقاء السائق قريباً من المقود.",
      "التوقف (Stationnement): ركن العربة لمدة طويلة ومغادرتها.",
      "الرصيف المصبوغ بالأحمر والأبيض: التوقف ممنوع، لكن الوقوف المؤقت مسموح به !",
      "الرصيف المصبوغ بالأصفر المتصل: الوقوف والتوقف ممنوعان معاً منعاً باتاً !",
      "عند الركن في العقبة: نوجه العجلات نحو الشارع، وفي الهبطة (المنحدر): نوجه العجلات نحو الرصيف مع استعمال فرامل اليد.",
    ],
    detailedContentFr:
      "Le stationnement abusif ou dangereux fait l'objet de sanctions strictes par le Code de la Route marocain. Un véhicule mal stationné peut être mis en fourrière communale (Dépôt) avec frais de remorquage.",
    detailedContentAr:
      "يمنع القانون الوقوف في الأماكن التي تحجب الرؤية كمنعرج أو قمة منحدر أو ممر الراجلين، وتتعرض العربات المخالفة للحجز في المحجز البلدي (الفوريان).",
    examTipsFr:
      "Le panneau circulaire rouge barré d'UN trait oblique interdit le stationnement (arrêt autorisé). Le panneau avec une CROIX (deux traits) interdit l'arrêt ET le stationnement.",
    examTipsAr:
      "البلاكة التي تحتوي على خط مائل واحد تمنع التوقف فقط (الوقوف مسموح). البلاكة بعلامة X (خطين متقاطعين) تمنع الوقوف والتوقف معاً.",
  },
  {
    id: "feux-eclairage-meteo",
    slug: "feux-voiture-eclairage-conditions-meteo-pdf",
    titleFr: "Types de Feux & Conduite par Temps Difficile",
    titleAr: "أنواع الأضواء وقواعد السياقة في الطقس الصعب",
    categoryFr: "Visibilité & Éclairage",
    categoryAr: "الإنارة والطقس",
    descriptionFr:
      "Quand allumer les feux de position, de croisement, de route et antibrouillard ? Règles en cas de pluie battante, brouillard épais, nuit en ville et hors agglomération.",
    descriptionAr:
      "متى نستعمل أضواء الوضع، التقابل، الطريق وأضواء الضباب ؟ القواعد الدقيقة للسياقة أثناء المطر، الضباب، الثلج، والليل داخل وخارج المدينة.",
    icon: "Lightbulb",
    badgeFr: "Essentiel Sécurité",
    badgeAr: "ضروري للسلامة",
    fileSize: "3.7 Mo",
    downloads: "28 300+",
    updatedYear: "2026",
    pdfUrl: "/pdf/anwa-al-adwa-taqs.pdf",
    keySummaryFr: [
      "Feux de position (Veilleuses) : visibles à 150m, n'éclairent pas la route. Utilisés en ville éclairée.",
      "Feux de croisement (Codes) : éclairent à 30m au moins sans éblouir. Feux universels pour la pluie, le brouillard, les tunnels et la nuit.",
      "Feux de route (Phares) : éclairent à 100m au moins. Uniquement la nuit sur route NON éclairée sans aucun véhicule en face ni devant.",
      "Par temps de pluie : Feux de croisement OBLIGATOIRES. Feux de brouillard arrière INTERDITS car ils éblouissent !",
      "Par temps de brouillard ou neige : Feux de croisement + Feux de brouillard avant ET arrière.",
    ],
    keySummaryAr: [
      "أضواء الوضع (الفيوز): ترى على بعد 150 متراً ولا تضيء الطريق، تستعمل داخل التجمع السكني المضاء.",
      "أضواء التقابل (الكود): تضيء على مسافة 30 متراً على الأقل دون إبهار، تستعمل عند المطر والضباب والأنفاق وفي الليل عند وجود سيارات.",
      "أضواء الطريق (الفار): تضيء على مسافة 100 متر على الأقل، تستعمل ليلاً في طريق مظلمة تماماً عند خلو الطريق من أي عربة.",
      "أثناء تساقط المطر: يجب تشغيل أضواء التقابل، ويمنع تشغيل ضوء الضباب الخلفي لأنه يزعج السائقين !",
      "أثناء الضباب الكثيف أو الثلج: نشغل أضواء التقابل + أضواء الضباب الأمامية والخلفية معاً.",
    ],
    detailedContentFr:
      "La vue et l'éclairage représentent 90% des informations nécessaires à la conduite. Une mauvaise utilisation des phares peut causer un éblouissement fatal pour les usagers arrivant en sens inverse.",
    detailedContentAr:
      "الرؤية والإنارة تشكلان الركيزة الأساسية للسياقة الآمنة. الاستعمال الخاطئ للأضواء يترتب عنه انخفاض الرؤية أو إبهار السائقين الآخرين.",
    examTipsFr:
      "Retenez cette règle d'or pour l'examen : En cas de croisement d'un véhicule la nuit, passez TOUJOURS de feux de route en feux de croisement dès que vous apercevez ses phares.",
    examTipsAr:
      "قاعدة ذهبية للامتحان: عند التقابل مع أي سيارة ليلاً، يجب فوراً الانتقال من ضوء الطريق إلى ضوء التقابل لتفادي إبهار السائق المقابل.",
  },
  {
    id: "secourisme-accidents-pas",
    slug: "secourisme-accidents-route-protocole-pas-pdf",
    titleFr: "Accidents de la Route & Protocole de Premiers Secours (PAS)",
    titleAr: "حوادث السير والإسعافات الأولية بنظام PAS",
    categoryFr: "Secourisme & Urgences",
    categoryAr: "الإسعافات والطوارئ",
    descriptionFr:
      "Les gestes qui sauvent et les erreurs éliminatoires : Protocole Protéger-Alerter-Secourir, position latérale de sécurité (PLS), numéros d'urgence marocains.",
    descriptionAr:
      "السلوك الصحيح عند مصادفة حادثة سير: بروتوكول حماية - إخبار - إغاثة (PAS)، وضعية الإفاقة الجانبية (PLS)، وأرقام الطوارئ بالمغرب.",
    icon: "HeartPulse",
    badgeFr: "Gestes qui Sauvent",
    badgeAr: "إسعافات أولية",
    fileSize: "390 Ko",
    downloads: "21 900+",
    updatedYear: "2026",
    pdfUrl: "/pdf/isafat-awwaliya-haditha.pdf",
    keySummaryFr: [
      "Protocole P.A.S : 1. PROTÉGER (gilet, triangle de présignalisation à 30m ou 100m en virage) > 2. ALERTER > 3. SECOURIR.",
      "Numéros d'urgence : 15 (Protection Civile / SAMU), 177 (Gendarmerie Royale hors agglomération), 19 (Police en ville).",
      "Interdictions absolues : NE JAMAIS déplacer un blessé (sauf incendie ou danger de mort immédiat).",
      "NE JAMAIS retirer le casque d'un motocycliste accidenté !",
      "NE JAMAIS donner à boire à une victime d'accident !",
    ],
    keySummaryAr: [
      "بروتوكول P.A.S: 1. الحماية (ارتداء السترة العاكسة، وضع مثلث التنبيه على بعد 30م أو 100م عند منعرج) > 2. الإخبار > 3. الإغاثة.",
      "أرقام الطوارئ بالمغرب: 15 (الوقاية المدنية والإسعاف)، 177 (الدرك الملكي خارج المدينة)، 19 (الأمن الوطني داخل المدينة).",
      "ممنوعات قطعية: لا تنقل المصاب من مكانه إلا في حالة خطر الموت المحقق كاشتعال النيران.",
      "ممنوع منعاً كلياً نزع خوذة سائق دراجة نارية مصاب !",
      "لا تعطِ الماء بتاتاً لأي شخص مصاب في حادثة سير !",
    ],
    detailedContentFr:
      "L'intervention des premiers témoins sur les lieux d'un sinistre routier dans les 5 premières minutes (l'heure d'or) conditionne à 70% les chances de survie des victimes avant l'arrivée des secours organisés.",
    detailedContentAr:
      "التصرف الواعي والسريع في الدقائق الأولى من وقوع الحادثة ينقذ أرواح المصابين ويمنع تفاقم الإصابات أو وقوع حوادث أخرى متسلسلة.",
    examTipsFr:
      "Question fréquente : 'Dois-je enlever le casque d'un motard blessé inconscient ?' Réponse : NON, JAMAIS, pour éviter une lésion irréversible de la moelle épinière.",
    examTipsAr:
      "سؤال كلاسيكي: 'واش نحيد الخوذة لسائق دراجة مصاب وفاقد الوعي ؟' الجواب: لا أبداً، تفادياً لأي كسر خطير في النخاع الشوكي أو الرقبة.",
  },
  {
    id: "mecanique-maintenance-voyants",
    slug: "mecanique-automobile-maintenance-voyants-pdf",
    titleFr: "Mécanique Automobile & Témoins du Tableau de Bord",
    titleAr: "الدليل الشامل لصيانة العربة وميكانيك السيارات",
    categoryFr: "Mécanique & Véhicule",
    categoryAr: "الميكانيك والصيانة",
    descriptionFr:
      "Tout ce qu'un conducteur doit vérifier : niveau d'huile, liquide de frein, refroidissement, état des pneus (profondeur minimale 1,6 mm) et signification des voyants rouges et oranges.",
    descriptionAr:
      "دليل الميكانيك للمبتدئين: فحص زيت المحرك، سائل الفرامل، ماء التبريد، عمق نقوش العجلات (1.6 مم كحد أدنى) ودلالات ألوان أضواء لوحة القيادة.",
    icon: "Wrench",
    badgeFr: "Contrôles Techniques",
    badgeAr: "فحص تقني",
    fileSize: "476 Ko",
    downloads: "26 400+",
    updatedYear: "2026",
    pdfUrl: "/pdf/mikanik-al-sayara.pdf",
    keySummaryFr: [
      "Voyants ROUGES : Danger immédiat ! Obligation de s'arrêter dès que possible en toute sécurité (pression d'huile, température moteur, système de freinage).",
      "Voyants ORANGES : Avertissement technique qui nécessite un contrôle rapide sans arrêt immédiat (réserve de carburant, voyant moteur, préchauffage).",
      "Pneumatiques : Profondeur minimale légale des rainures de la bande de roulement = 1,6 millimètre.",
      "Vérification des niveaux : Toujours moteur froid et sur terrain plat.",
      "Pression des pneus : À contrôler tous les mois et avant un long trajet, toujours à froid.",
    ],
    keySummaryAr: [
      "الأضواء الحمراء في لوحة القيادة: خطر داهم ! توقف فوري في أقرب مكان آمن (ضغط الزيت، حرارة المحرك، نظام الفرامل).",
      "الأضواء البرتقالية: تنبيه يتطلب الفحص قريباً دون توقف فوري (احتياطي الوقود، فحص المحرك، مانع الانزلاق ABS).",
      "العجلات المطاطية: الحد الأدنى القانوني لعمق النقوش في الإطار هو 1.6 مليمتر.",
      "فحص مستويات الزيوت والسوائل: يجب أن يتم دائماً والمحرك بارد وعلى أرض مستوية.",
      "ضغط العجلات: يتم فحصه شهرياً وقبل السفر في طريق طويلة، وتكون العجلات باردة.",
    ],
    detailedContentFr:
      "Un mauvais entretien du véhicule augmente la consommation de carburant de 15 à 25% et multiplie par trois le risque de défaillance mécanique critique sur autoroute.",
    detailedContentAr:
      "الصيانة الدورية للعربة تحمي السائق وركابه وتقلل من استهلاك الوقود وتمنع الحوادث الناتجة عن انفجار العجلات أو تلف الفرامل.",
    examTipsFr:
      "Sur les questions de pneus : un sous-gonflage provoque un échauffement excessif et un risque d'éclatement du pneu à haute vitesse.",
    examTipsAr:
      "في أسئلة العجلات: نقص ضغط الهواء في العجلة يسبب سخونتها الشديدة ويعرضها لخطر الانفجار المفاجئ على الطريق السيار.",
  },
  {
    id: "tashwir-afqi-lignes-fleches",
    slug: "tashwir-afqi-lignes-marquages-au-sol-maroc-pdf",
    titleFr: "Toutes les Lignes & Marquages au Sol (Signalisation Horizontale)",
    titleAr: "الدليل الشامل للتشوير الأفقي والخطوط على الطريق",
    categoryFr: "Signalisation",
    categoryAr: "التشوير الأفقي",
    descriptionFr:
      "Ligne continue, ligne discontinue, ligne mixte, ligne de dissuasion, flèches de sélection et de rabattement, zébras et bandes de guidage.",
    descriptionAr:
      "شرح تفصيلي لخطوط الطريق: الخط المتصل، المتقطع، المختلط، خط التحذير، وأسهم الانحياز وأسهم اختيار الاتجاه.",
    icon: "Milestone",
    badgeFr: "Marquages au Sol",
    badgeAr: "خطوط الطريق",
    fileSize: "544 Ko",
    downloads: "23 100+",
    updatedYear: "2026",
    pdfUrl: "/pdf/tashwir-afqi.pdf",
    keySummaryFr: [
      "Ligne continue : Mur infranchissable ! Interdiction absolue de la franchir ou de la chevaucher.",
      "Ligne discontinue : Dépassement autorisé si la visibilité le permet.",
      "Ligne mixte (continue d'un côté, discontinue de l'autre) : On respecte uniquement la ligne située du CÔTÉ DE NOTRE VÉHICULE.",
      "Ligne de dissuasion (traits rapprochés) : Dépassement uniquement autorisé sur les véhicules très lents (tracteurs, cyclomoteurs).",
      "Flèches de rabattement : Annoncent l'apparition imminente d'une ligne continue (3 flèches successives au maximum).",
    ],
    keySummaryAr: [
      "الخط المتصل: بمثابة جدار ! يمنع قطعاً تجاوزه أو حتى الدوس فوقه بالعجلات.",
      "الخط المتقطع: يسمح بالتجاوز إذا كانت الرؤية واضحة والطريق خالية.",
      "الخط المختلط (متصل من جهة ومتقطع من أخرى): نأخذ بعين الاعتبار الخط الأقرب لجهتنا نحن فقط.",
      "خط التحذير (خطوط متقاربة): يسمح بتجاوز العربات البطيئة جداً فقط كجرار فلاحي أو دراجة.",
      "أسهم الانحياز: تنبه إلى قرب بداية خط متصل، ويجب الرجوع للمسار الأيمن فوراً.",
    ],
    detailedContentFr:
      "La signalisation horizontale guide la trajectoire du véhicule sur la chaussée. En cas de désaccord temporaire entre marquage jaune de chantier et marquage blanc normal, le marquage JAUNE prime toujours.",
    detailedContentAr:
      "التشوير الأفقي يحدد مسارات السير بدقة. وفي حالة وجود أشغال مع خطوط صفراء مؤقتة، فإن الخطوط الصفراء هي التي تطبق وتلغي الخطوط البيضاء.",
    examTipsFr:
      "À la 1ère flèche de rabattement, vous devez commencer à vous rabattre à droite. À la 3ème flèche, tout dépassement est formellement interdit.",
    examTipsAr:
      "عند رؤية السهم الأول للانحياز يجب الشروع في الرجوع لليمين، وعند السهم الثالث يمنع أي تجاوز تماماً.",
  },
  {
    id: "isharat-amudiya",
    slug: "isharat-amudiya-signalisation-verticale-maroc-pdf",
    titleFr: "Signalisation Verticale : Formes, Couleurs & Règles",
    titleAr: "الإشارات العمودية: الأشكال والألوان والقواعد",
    categoryFr: "Signalisation",
    categoryAr: "الإشارات الطرقية",
    descriptionFr:
      "Fiche dédiée au code géométrique de la signalisation verticale marocaine : triangle danger, cercle interdiction/obligation, carré indication, et panneaux de fin.",
    descriptionAr:
      "ملخص مركز للتشوير العمودي المغربي: المثلث للخطر، الدائرة للمنع والإجبار، المربع للإرشاد، وعلامات نهاية المنع والإجبار.",
    icon: "ShieldAlert",
    badgeFr: "Code Forme & Couleur",
    badgeAr: "شكل ولون الإشارة",
    fileSize: "633 Ko",
    downloads: "19 400+",
    updatedYear: "2026",
    pdfUrl: "/pdf/isharat-amudiya.pdf",
    keySummaryFr: [
      "6 familles : danger, interdiction, obligation, indication, fin d'interdiction, fin d'obligation.",
      "Danger = triangle rouge avancé (50 m en ville / 150 m hors agglomération).",
      "Interdiction = cercle rouge à effet immédiat jusqu'à la prochaine intersection ou panneau de fin.",
      "Obligation = cercle bleu ; Indication = carré/rectangle bleu.",
      "Référence visuelle alignée sur le catalogue 2026 des isharat al-morour bi-al-suwar.",
    ],
    keySummaryAr: [
      "6 أصناف: خطر، منع، إجبار، إرشاد، نهاية المنع، نهاية الإجبار.",
      "الخطر = مثلث أحمر متقدم (50م داخل المدينة / 150م خارجها).",
      "المنع = دائرة حمراء مفعولها فوري حتى الملتقى أو علامة النهاية.",
      "الإجبار = دائرة زرقاء ؛ الإرشاد = مربع/مستطيل أزرق.",
      "مرجع بصري متوافق مع دليل إشارات المرور بالصور 2026.",
    ],
    detailedContentFr:
      "La signalisation verticale est le langage immédiat du Code de la Route. Maîtriser la forme et la couleur permet de répondre rapidement aux questions d'examen NARSA sans hésitation.",
    detailedContentAr:
      "التشوير العمودي هو لغة قانون السير الفورية. إتقان الشكل واللون يمكّن المترشح من الإجابة بسرعة ودقة في امتحان نارسا.",
    examTipsFr:
      "Si l'énoncé parle d'une 'marque avancée', pensez toujours triangle rouge (danger). Si c'est une 'marque de position', pensez cercle (interdiction ou obligation).",
    examTipsAr:
      "إذا قال السؤال 'علامة متقدمة' فكّر في المثلث الأحمر (خطر). وإذا قال 'علامة وضعية' فكّر في الدائرة (منع أو إجبار).",
  },
];
