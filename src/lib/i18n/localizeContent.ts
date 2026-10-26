import type { Answer, Language, Question, RoadSign } from "@/types/models";
import type { AudioLanguage } from "@/lib/audio/types";

export function mapUiLanguageToAudio(language: Language): AudioLanguage {
  if (language === "fr") return "fr";
  if (language === "ary") return "darija";
  return "ar";
}

export function localizedQuestionText(
  q: Question,
  language: Language
): string {
  if (language === "ary") {
    return q.questionAry || q.questionAr || q.question;
  }
  if (language === "ar") {
    return q.questionAr || q.question;
  }
  return q.question;
}

export function localizedAnswerText(
  answer: Answer,
  language: Language
): string {
  if (language === "ar" || language === "ary") {
    return answer.textAr || answer.text;
  }
  return answer.text;
}

export function localizedExplanationText(
  q: Question,
  language: Language
): string {
  if (language === "ary") {
    return q.explanationAry || q.explanationAr || q.explanation;
  }
  if (language === "ar") {
    return q.explanationAr || q.explanation;
  }
  return q.explanation;
}

export function localizedSituationText(
  q: Question,
  language: Language
): string | undefined {
  const desc = q.audioDescription;
  if (!desc) return undefined;
  if (language === "fr") return desc.fr;
  if (language === "ary") return desc.darija || desc.ar;
  return desc.ar;
}

export function localizedSignName(sign: RoadSign, language: Language): string {
  if (language === "fr") return sign.name;
  return sign.nameAr || sign.name;
}

export function localizedSignDescription(
  sign: RoadSign,
  language: Language
): string {
  if (language === "fr") return sign.description;
  return sign.descriptionAr || sign.description;
}

export function localizedSignAdvice(
  sign: RoadSign,
  language: Language
): string {
  if (language === "fr") return sign.advice;
  return sign.adviceAr || sign.advice;
}

export function listenQuestionLabel(language: Language): string {
  if (language === "ary") return "سمع السؤال";
  if (language === "ar") return "استمع للسؤال";
  return "Écouter la question";
}

export function listenAnswerLabel(language: Language, letter: string): string {
  if (language === "ary") return `سمع الجواب ${letter}`;
  if (language === "ar") return `استمع للإجابة ${letter}`;
  return `Écouter la réponse ${letter}`;
}

export function listenExplanationLabel(language: Language): string {
  if (language === "ary") return "سمع الشرح";
  if (language === "ar") return "استمع للشرح";
  return "Écouter l'explication";
}

export function answerSpeechPrefix(language: Language, letter: string): string {
  if (language === "ary") return `الجواب ${letter}.`;
  if (language === "ar") return `الإجابة ${letter}.`;
  return `Réponse ${letter}.`;
}
