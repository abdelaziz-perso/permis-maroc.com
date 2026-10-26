import type { Answer, Question, RoadSign } from "@/types/models";
import type { AudioLanguage } from "./types";

function uiLang(language: AudioLanguage): "fr" | "ar" | "ary" {
  if (language === "fr") return "fr";
  if (language === "darija") return "ary";
  return "ar";
}

export function questionTextFor(
  q: Question,
  language: AudioLanguage
): string {
  const lang = uiLang(language);
  if (lang === "ary") return q.questionAry || q.questionAr || q.question;
  if (lang === "ar") return q.questionAr || q.question;
  return q.question;
}

export function answerTextFor(
  answer: Answer,
  language: AudioLanguage
): string {
  const lang = uiLang(language);
  if (lang === "ar" || lang === "ary") return answer.textAr || answer.text;
  return answer.text;
}

export function explanationTextFor(
  q: Question,
  language: AudioLanguage
): string {
  const lang = uiLang(language);
  if (lang === "ary") return q.explanationAry || q.explanationAr || q.explanation;
  if (lang === "ar") return q.explanationAr || q.explanation;
  return q.explanation;
}

export function buildQuestionSpeech(opts: {
  question: Question;
  index: number;
  total: number;
  language: AudioLanguage;
  includeAnswers: boolean;
  situationText?: string;
}): string {
  const { question, index, total, language, includeAnswers, situationText } =
    opts;
  const parts: string[] = [];

  if (language === "fr") {
    parts.push(`Question ${index} sur ${total}.`);
  } else if (language === "darija") {
    parts.push(`السؤال ${index} من ${total}.`);
  } else {
    parts.push(`السؤال ${index} من ${total}.`);
  }

  if (situationText?.trim()) {
    parts.push(situationText.trim());
  }

  parts.push(questionTextFor(question, language));

  if (includeAnswers) {
    question.answers.forEach((answer, i) => {
      const letter = String.fromCharCode(65 + i);
      const label =
        language === "fr"
          ? `Réponse ${letter}.`
          : language === "darija"
            ? `الجواب ${letter}.`
            : `الإجابة ${letter}.`;
      parts.push(`${label} ${answerTextFor(answer, language)}`);
    });
  }

  return parts.filter(Boolean).join(" ");
}

export function buildCorrectionSpeech(opts: {
  question: Question;
  isCorrect: boolean;
  language: AudioLanguage;
}): string {
  const { question, isCorrect, language } = opts;
  const verdict =
    language === "fr"
      ? isCorrect
        ? "Bonne réponse."
        : "Ce n'est pas la bonne réponse."
      : language === "darija"
        ? isCorrect
          ? "جواب صحيح."
          : "هاد الجواب ماشي صحيح."
        : isCorrect
          ? "إجابة صحيحة."
          : "هذه ليست الإجابة الصحيحة.";

  return `${verdict} ${explanationTextFor(question, language)}`;
}

export function buildSignSpeech(
  sign: RoadSign,
  language: AudioLanguage
): string {
  const name = language === "fr" ? sign.name : sign.nameAr;
  const description =
    language === "fr" ? sign.description : sign.descriptionAr;
  const advice =
    language === "fr"
      ? sign.advice
      : sign.adviceAr || sign.advice;

  if (language === "fr") {
    return `Panneau ${name}. ${description} ${advice}`;
  }
  return `علامة ${name}. ${description} ${advice}`;
}

export function mapUiLanguageToAudio(
  language: "fr" | "ar" | "ary"
): AudioLanguage {
  if (language === "fr") return "fr";
  if (language === "ary") return "darija";
  return "ar";
}
