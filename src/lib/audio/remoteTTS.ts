import type { AudioLanguage, TTSOptions, TTSProvider } from "./types";
import { buildAudioCacheKey, getCachedAudioUrl, setCachedAudioUrl } from "./audioCache";

/**
 * Remote TTS provider stub.
 *
 * Static export (next.config `output: "export"`) cannot host `/api` routes.
 * When a cloud TTS endpoint becomes available, set:
 *   NEXT_PUBLIC_TTS_ENDPOINT=/api/audio/tts   (or absolute URL)
 * and keep secrets server-side only (TTS_API_KEY never in the browser).
 *
 * Until then, `isRemoteTTSEnabled()` returns false and the AudioProvider
 * falls back to BrowserTTSProvider.
 */
export function isRemoteTTSEnabled(): boolean {
  return Boolean(
    typeof process !== "undefined" &&
      process.env.NEXT_PUBLIC_TTS_ENDPOINT?.trim()
  );
}

export class RemoteTTSProvider implements TTSProvider {
  private audio: HTMLAudioElement | null = null;

  async speak(
    text: string,
    language: AudioLanguage,
    options?: TTSOptions
  ): Promise<void> {
    const endpoint = process.env.NEXT_PUBLIC_TTS_ENDPOINT?.trim();
    if (!endpoint) {
      throw new Error("Remote TTS endpoint not configured");
    }

    const cacheKey = buildAudioCacheKey({
      language,
      contentType: "tts",
      contentId: hashText(text),
    });

    let url = getCachedAudioUrl(cacheKey);
    if (!url) {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language, rate: options?.rate ?? 1 }),
      });
      if (!res.ok) {
        throw new Error(`Remote TTS failed (${res.status})`);
      }
      const data = (await res.json()) as { url?: string };
      if (!data.url) throw new Error("Remote TTS returned no URL");
      url = data.url;
      setCachedAudioUrl(cacheKey, url);
    }

    await this.playUrl(url, options?.rate ?? 1);
  }

  private playUrl(url: string, rate: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stop();
      const audio = new Audio(url);
      audio.playbackRate = rate;
      this.audio = audio;
      audio.onended = () => {
        this.audio = null;
        resolve();
      };
      audio.onerror = () => {
        this.audio = null;
        reject(new Error("Audio playback failed"));
      };
      void audio.play().catch(reject);
    });
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = "";
      this.audio = null;
    }
  }

  pause(): void {
    this.audio?.pause();
  }

  resume(): void {
    void this.audio?.play();
  }
}

function hashText(text: string): string {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h << 5) - h + text.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}
