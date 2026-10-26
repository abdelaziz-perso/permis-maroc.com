import type { AudioLanguage, TTSOptions, TTSProvider } from "./types";

function pickVoice(
  voices: SpeechSynthesisVoice[],
  language: AudioLanguage
): SpeechSynthesisVoice | null {
  const prefer =
    language === "fr"
      ? ["fr-MA", "fr-FR", "fr-CA", "fr"]
      : language === "darija"
        ? ["ar-MA", "ar-DZ", "ar-TN", "ar-SA", "ar"]
        : ["ar-MA", "ar-SA", "ar-EG", "ar"];

  for (const code of prefer) {
    const exact = voices.find(
      (v) => v.lang.toLowerCase() === code.toLowerCase()
    );
    if (exact) return exact;
    const prefix = voices.find((v) =>
      v.lang.toLowerCase().startsWith(code.toLowerCase().split("-")[0])
    );
    if (prefix && code.includes("-") === false) return prefix;
    const soft = voices.find((v) =>
      v.lang.toLowerCase().startsWith(code.toLowerCase())
    );
    if (soft) return soft;
  }
  return voices[0] ?? null;
}

function langTag(language: AudioLanguage): string {
  if (language === "fr") return "fr-FR";
  if (language === "darija") return "ar-MA";
  return "ar-SA";
}

export class BrowserTTSProvider implements TTSProvider {
  private utterance: SpeechSynthesisUtterance | null = null;

  async speak(
    text: string,
    language: AudioLanguage,
    options?: TTSOptions
  ): Promise<void> {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      throw new Error("SpeechSynthesis unavailable");
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    // Some browsers need voices to be loaded asynchronously
    let voices = synth.getVoices();
    if (voices.length === 0) {
      await new Promise<void>((resolve) => {
        const onVoices = () => {
          voices = synth.getVoices();
          synth.removeEventListener("voiceschanged", onVoices);
          resolve();
        };
        synth.addEventListener("voiceschanged", onVoices);
        // Fallback timeout
        setTimeout(() => {
          synth.removeEventListener("voiceschanged", onVoices);
          resolve();
        }, 400);
      });
      voices = synth.getVoices();
    }

    return new Promise<void>((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langTag(language);
      utterance.rate = options?.rate ?? 1;
      utterance.pitch = options?.pitch ?? 1;
      utterance.volume = options?.volume ?? 1;

      const voice = pickVoice(voices, language);
      if (voice) utterance.voice = voice;

      utterance.onend = () => {
        this.utterance = null;
        resolve();
      };
      utterance.onerror = (event) => {
        this.utterance = null;
        if (event.error === "canceled" || event.error === "interrupted") {
          resolve();
          return;
        }
        reject(new Error(event.error || "TTS error"));
      };

      this.utterance = utterance;
      synth.speak(utterance);
    });
  }

  stop(): void {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    this.utterance = null;
  }

  pause(): void {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.pause();
  }

  resume(): void {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.resume();
  }
}
