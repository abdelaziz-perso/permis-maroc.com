export type Language = 'fr' | 'ar' | 'ary';

export type LicenceCategory = 'A' | 'B' | 'C' | 'D' | 'E';

export type QuestionCategory =
  | 'priorites'
  | 'intersections'
  | 'signalisation'
  | 'vitesse'
  | 'depassement'
  | 'stationnement'
  | 'autoroute'
  | 'conduite-nuit'
  | 'meteo-pluie'
  | 'securite-routiere'
  | 'premiers-secours'
  | 'eco-conduite';

export interface Answer {
  id: string;
  text: string;
  textAr?: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  questionAr?: string;
  questionAry?: string;
  image?: string;
  imageType?: 'intersection' | 'road_sign' | 'highway' | 'night' | 'weather' | 'dashboard';
  answers: Answer[];
  explanation: string;
  explanationAr?: string;
  explanationAry?: string;
  language?: Language;
  licenceCategory: LicenceCategory;
  source: string;
  verified: boolean;
  officialRef?: string;
}

export interface ExamConfig {
  licenceCategory: LicenceCategory;
  title: string;
  totalQuestions: number;
  passingScore: number;
  timePerQuestionSeconds: number;
  description: string;
}

export interface ExamAnswer {
  questionId: string;
  selectedAnswerIds: string[];
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface ExamResult {
  id: string;
  date: string;
  licenceCategory: LicenceCategory;
  score: number;
  totalQuestions: number;
  passed: boolean;
  timeSpentSeconds: number;
  categoryBreakdown: Record<QuestionCategory, { total: number; correct: number }>;
  answers: ExamAnswer[];
}

export type SignCategory =
  | 'danger'
  | 'interdiction'
  | 'obligation'
  | 'indication'
  | 'priorite'
  | 'stationnement';

export interface RoadSign {
  id: string;
  code: string;
  name: string;
  nameAr: string;
  category: SignCategory;
  description: string;
  descriptionAr: string;
  shape: 'triangle' | 'circle' | 'square' | 'octogon' | 'diamond' | 'arrow';
  borderColor?: string;
  bgColor?: string;
  svgIconName: string;
  finePoints?: number;
  fineMad?: number;
  advice: string;
  adviceAr?: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleAr: string;
  durationMinutes: number;
  summary: string;
  content: string[];
  keyRules: string[];
  illustrations?: string[];
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface CourseCategory {
  id: QuestionCategory;
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  iconName: string;
  lessonsCount: number;
  estimatedHours: number;
  lessons: Lesson[];
}

export interface Achievement {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  xpReward: number;
  unlockedAt?: string;
  condition: string;
}

export interface UserStats {
  xp: number;
  level: string;
  levelProgress: number; // 0 to 100
  streakDays: number;
  testsCompleted: number;
  averageScore: number;
  completedLessonIds: string[];
  savedSignIds: string[];
  achievements: Achievement[];
  weakCategories: QuestionCategory[];
}

export interface ScenarioVehicle {
  id: string;
  name: string;
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  path?: [number, number, number][];
  isCorrectFirst: boolean;
  priorityOrder: number;
}

export interface Scenario3D {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  vehicles: ScenarioVehicle[];
  question: string;
  questionAr: string;
  options: { id: string; label: string; vehicleId: string }[];
  correctVehicleId: string;
  explanation: string;
  explanationAr: string;
  rulesApplied: string[];
}

export interface CityGuide {
  slug: string;
  name: string;
  nameAr: string;
  region: string;
  description: string;
  narsaCenterAddress: string;
  practicalTestTrackInfo: string;
  averageWaitWeeks: number;
  localDrivingTips: string[];
  autoEcolesEstimated: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  titleAr?: string;
  category: 'Permis' | 'Code de la Route' | 'Conseils' | 'Examen' | 'Sécurité routière';
  publishDate: string;
  readTime: string;
  author: string;
  excerpt: string;
  content: string;
  keywords: string[];
}
