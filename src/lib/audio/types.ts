export type AudioLanguage = "fr" | "ar" | "darija";

export type AudioPlaybackRate = 0.75 | 1 | 1.25 | 1.5;

export type AudioStatus = "idle" | "loading" | "playing" | "paused" | "error";

export interface AudioAsset {
  url?: string;
  text?: string;
  language: AudioLanguage;
  duration?: number;
}

export interface QuestionAudio {
  question?: AudioAsset;
  situation?: AudioAsset;
  answers?: Record<string, AudioAsset>;
  explanation?: AudioAsset;
}

export interface AudioSettings {
  audioMode: boolean;
  audioLanguage: AudioLanguage;
  autoReadQuestions: boolean;
  autoReadAnswers: boolean;
  autoReadCorrections: boolean;
  playbackRate: AudioPlaybackRate;
}

export interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

export interface TTSProvider {
  speak(
    text: string,
    language: AudioLanguage,
    options?: TTSOptions
  ): Promise<void>;
  stop(): void;
  pause?(): void;
  resume?(): void;
}

export interface PlayRequest {
  id: string;
  text: string;
  language: AudioLanguage;
  url?: string;
  rate?: number;
}

export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  audioMode: false,
  audioLanguage: "ar",
  autoReadQuestions: true,
  autoReadAnswers: true,
  autoReadCorrections: true,
  playbackRate: 1,
};

export const AUDIO_STORAGE_KEY = "pm_audio_settings_v1";

export const PLAYBACK_RATES: AudioPlaybackRate[] = [0.75, 1, 1.25, 1.5];
