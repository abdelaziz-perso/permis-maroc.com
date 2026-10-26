import type { Answer, Language, Question, RoadSign } from "@/types/models";
import type { AudioLanguage } from "./types";
import {
  localizedAnswerText,
  localizedExplanationText,
  localizedQuestionText,
  localizedSignAdvice,
  localizedSignDescription,
  localizedSignName,
  mapUiLanguageToAudio,
} from "@/lib/i18n/localizeContent";

export { mapUiLanguageToAudio };

function toUiLang(language: AudioLanguage | Language): Language {
  if (language === "darija" || language === "ary") return "ary";
  if (language === "ar") return "ar";
  return "fr";
}

export function questionTextFor(
  q: Question,
  language: AudioLanguage | Language
): string {
  return localizedQuestionText(q, toUiLang(language));
}

export function answerTextFor(
  answer: Answer,
  language: AudioLanguage | Language
): string {
  return localizedAnswerText(answer, toUiLang(language));
}

export function explanationTextFor(
  q: Question,
  language: AudioLanguage | Language
): string {
  return localizedExplanationText(q, toUiLang(language));
}

export function buildQuestionSpeech(opts: {
  question: Question;
  index: number;
  total: number;
  language: AudioLanguage | Language;
  includeAnswers: boolean;
  situationText?: string;
}): string {
  const { question, index, total, includeAnswers, situationText } = opts;
  const ui = toUiLang(opts.language);
  const parts: string[] = [];

  if (ui === "fr") {
    parts.push(`Question ${index} sur ${total}.`);
  } else if (ui === "ary") {
    parts.push(`السؤال ${index} من ${total}.`);
  } else {
    parts.push(`السؤال ${index} من ${total}.`);
  }

  if (situationText?.trim()) {
    parts.push(situationText.trim());
  }

  parts.push(localizedQuestionText(question, ui));

  if (includeAnswers) {
    question.answers.forEach((answer, i) => {
      const letter = String.fromCharCode(65 + i);
      const label =
        ui === "fr"
          ? `Réponse ${letter}.`
          : ui === "ary"
            ? `الجواب ${letter}.`
            : `الإجابة ${letter}.`;
      parts.push(`${label} ${localizedAnswerText(answer, ui)}`);
    });
  }

  return parts.filter(Boolean).join(" ");
}

export function buildCorrectionSpeech(opts: {
  question: Question;
  isCorrect: boolean;
  language: AudioLanguage | Language;
}): string {
  const { question, isCorrect } = opts;
  const ui = toUiLang(opts.language);
  const verdict =
    ui === "fr"
      ? isCorrect
        ? "Bonne réponse."
        : "Ce n'est pas la bonne réponse."
      : ui === "ary"
        ? isCorrect
          ? "جواب صحيح."
          : "هاد الجواب ماشي صحيح."
        : isCorrect
          ? "إجابة صحيحة."
          : "هذه ليست الإجابة الصحيحة.";

  return `${verdict} ${localizedExplanationText(question, ui)}`;
}

export function buildSignSpeech(
  sign: RoadSign,
  language: AudioLanguage | Language
): string {
  const ui = toUiLang(language);
  const name = localizedSignName(sign, ui);
  const description = localizedSignDescription(sign, ui);
  const advice = localizedSignAdvice(sign, ui);

  if (ui === "fr") {
    return `Panneau ${name}. ${description} ${advice}`;
  }
  return `علامة ${name}. ${description} ${advice}`;
}
