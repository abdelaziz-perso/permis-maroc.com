"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { BrowserTTSProvider } from "@/lib/audio/browserTTS";
import { RemoteTTSProvider, isRemoteTTSEnabled } from "@/lib/audio/remoteTTS";
import {
  AUDIO_STORAGE_KEY,
  DEFAULT_AUDIO_SETTINGS,
  type AudioLanguage,
  type AudioPlaybackRate,
  type AudioSettings,
  type AudioStatus,
  type PlayRequest,
} from "@/lib/audio/types";

interface AudioContextValue {
  settings: AudioSettings;
  updateSettings: (patch: Partial<AudioSettings>) => void;
  status: AudioStatus;
  isPlaying: boolean;
  isPaused: boolean;
  currentId: string | null;
  currentAudio: PlayRequest | null;
  progress: number;
  duration: number;
  error: string | null;
  play: (request: PlayRequest) => Promise<void>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  toggle: (request?: PlayRequest) => Promise<void>;
  setRate: (rate: AudioPlaybackRate) => void;
  speakText: (
    text: string,
    opts?: { id?: string; language?: AudioLanguage; url?: string }
  ) => Promise<void>;
  testVoice: () => Promise<void>;
}

const AudioContext = createContext<AudioContextValue | null>(null);

function loadSettings(): AudioSettings {
  if (typeof window === "undefined") return DEFAULT_AUDIO_SETTINGS;
  try {
    const raw = localStorage.getItem(AUDIO_STORAGE_KEY);
    if (!raw) return DEFAULT_AUDIO_SETTINGS;
    return { ...DEFAULT_AUDIO_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_AUDIO_SETTINGS;
  }
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [settings, setSettings] = useState<AudioSettings>(() => loadSettings());
  const [status, setStatus] = useState<AudioStatus>("idle");
  const [currentAudio, setCurrentAudio] = useState<PlayRequest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const browserTTS = useRef(new BrowserTTSProvider());
  const remoteTTS = useRef(new RemoteTTSProvider());
  const playTokenRef = useRef(0);
  const pausedRef = useRef(false);
  const pathRef = useRef(pathname);

  useEffect(() => {
    try {
      localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  // Keep TTS language in sync when the UI language switcher changes
  useEffect(() => {
    const onSync = (event: Event) => {
      const detail = (event as CustomEvent<{ audioLanguage?: AudioLanguage }>)
        .detail;
      if (!detail?.audioLanguage) return;
      setSettings((prev) =>
        prev.audioLanguage === detail.audioLanguage
          ? prev
          : { ...prev, audioLanguage: detail.audioLanguage! }
      );
    };
    window.addEventListener("pm-audio-settings", onSync);
    return () => window.removeEventListener("pm-audio-settings", onSync);
  }, []);

  const stopInternal = useCallback(() => {
    playTokenRef.current += 1;
    browserTTS.current.stop();
    remoteTTS.current.stop();
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
      htmlAudioRef.current.src = "";
      htmlAudioRef.current = null;
    }
    pausedRef.current = false;
    setStatus("idle");
    setCurrentAudio(null);
    setProgress(0);
    setDuration(0);
  }, []);

  // Stop audio on route changes (defer setState out of the sync effect body)
  useEffect(() => {
    if (pathRef.current === pathname) return;
    pathRef.current = pathname;
    const timer = window.setTimeout(() => stopInternal(), 0);
    return () => window.clearTimeout(timer);
  }, [pathname, stopInternal]);

  const updateSettings = useCallback((patch: Partial<AudioSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const setRate = useCallback((rate: AudioPlaybackRate) => {
    setSettings((prev) => ({ ...prev, playbackRate: rate }));
    if (htmlAudioRef.current) {
      htmlAudioRef.current.playbackRate = rate;
    }
  }, []);

  const playUrl = useCallback(
    (url: string, rate: number, token: number) =>
      new Promise<void>((resolve, reject) => {
        const audio = new Audio(url);
        audio.playbackRate = rate;
        htmlAudioRef.current = audio;

        audio.onloadedmetadata = () => {
          if (token !== playTokenRef.current) return;
          setDuration(audio.duration || 0);
        };
        audio.ontimeupdate = () => {
          if (token !== playTokenRef.current) return;
          setProgress(audio.currentTime || 0);
          setDuration(audio.duration || 0);
        };
        audio.onended = () => {
          if (token !== playTokenRef.current) return;
          setStatus("idle");
          setCurrentAudio(null);
          resolve();
        };
        audio.onerror = () => {
          if (token !== playTokenRef.current) return;
          reject(new Error("Impossible de charger l'audio"));
        };
        void audio.play().catch(reject);
      }),
    []
  );

  const play = useCallback(
    async (request: PlayRequest) => {
      stopInternal();
      const token = playTokenRef.current;
      const rate = request.rate ?? settings.playbackRate;
      setError(null);
      setCurrentAudio(request);
      setStatus("loading");
      pausedRef.current = false;

      try {
        if (request.url) {
          setStatus("playing");
          await playUrl(request.url, rate, token);
          return;
        }

        if (isRemoteTTSEnabled()) {
          try {
            setStatus("playing");
            await remoteTTS.current.speak(request.text, request.language, {
              rate,
            });
            if (token === playTokenRef.current) {
              setStatus("idle");
              setCurrentAudio(null);
            }
            return;
          } catch {
            // fall through to browser TTS
          }
        }

        setStatus("playing");
        await browserTTS.current.speak(request.text, request.language, {
          rate,
        });
        if (token === playTokenRef.current) {
          setStatus("idle");
          setCurrentAudio(null);
        }
      } catch (err) {
        if (token !== playTokenRef.current) return;
        setStatus("error");
        setError(
          err instanceof Error
            ? err.message
            : "Impossible de charger l'audio"
        );
      }
    },
    [playUrl, settings.playbackRate, stopInternal]
  );

  const pause = useCallback(() => {
    if (htmlAudioRef.current && !htmlAudioRef.current.paused) {
      htmlAudioRef.current.pause();
      pausedRef.current = true;
      setStatus("paused");
      return;
    }
    browserTTS.current.pause?.();
    remoteTTS.current.pause?.();
    pausedRef.current = true;
    setStatus("paused");
  }, []);

  const resume = useCallback(() => {
    if (htmlAudioRef.current && htmlAudioRef.current.paused) {
      void htmlAudioRef.current.play();
      pausedRef.current = false;
      setStatus("playing");
      return;
    }
    browserTTS.current.resume?.();
    remoteTTS.current.resume?.();
    pausedRef.current = false;
    setStatus("playing");
  }, []);

  const stop = useCallback(() => {
    stopInternal();
  }, [stopInternal]);

  const toggle = useCallback(
    async (request?: PlayRequest) => {
      if (
        request &&
        currentAudio?.id === request.id &&
        (status === "playing" || status === "paused")
      ) {
        if (status === "playing") pause();
        else resume();
        return;
      }
      if (!request && currentAudio) {
        if (status === "playing") pause();
        else if (status === "paused") resume();
        return;
      }
      if (request) await play(request);
    },
    [currentAudio, pause, play, resume, status]
  );

  const speakText = useCallback(
    async (
      text: string,
      opts?: { id?: string; language?: AudioLanguage; url?: string }
    ) => {
      await play({
        id: opts?.id ?? `speech-${Date.now()}`,
        text,
        language: opts?.language ?? settings.audioLanguage,
        url: opts?.url,
      });
    },
    [play, settings.audioLanguage]
  );

  const testVoice = useCallback(async () => {
    const samples: Record<AudioLanguage, string> = {
      fr: "Bonjour. Mode audio Permis Maroc activé. Vous pouvez écouter les questions et les explications.",
      ar: "مرحبا. تم تفعيل وضع الصوت في بيرمي المغرب. يمكنك الاستماع إلى الأسئلة والشروحات.",
      darija:
        "السلام. تفعّل المود الصوتي ديال بيرمي المغرب. تقدر تسمع الأسئلة والشرح.",
    };
    await speakText(samples[settings.audioLanguage], {
      id: "voice-test",
      language: settings.audioLanguage,
    });
  }, [settings.audioLanguage, speakText]);

  const value = useMemo<AudioContextValue>(
    () => ({
      settings,
      updateSettings,
      status,
      isPlaying: status === "playing",
      isPaused: status === "paused",
      currentId: currentAudio?.id ?? null,
      currentAudio,
      progress,
      duration,
      error,
      play,
      pause,
      resume,
      stop,
      toggle,
      setRate,
      speakText,
      testVoice,
    }),
    [
      settings,
      updateSettings,
      status,
      currentAudio,
      progress,
      duration,
      error,
      play,
      pause,
      resume,
      stop,
      toggle,
      setRate,
      speakText,
      testVoice,
    ]
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return ctx;
}

/** Safe hook when provider may be absent (returns null). */
export function useAudioOptional(): AudioContextValue | null {
  return useContext(AudioContext);
}

/** Avoid nesting duplicate providers (e.g. MobileAppShell inside a page AudioProvider). */
export function AudioProviderNestable({
  children,
}: {
  children: React.ReactNode;
}) {
  const existing = useContext(AudioContext);
  if (existing) return <>{children}</>;
  return <AudioProvider>{children}</AudioProvider>;
}
