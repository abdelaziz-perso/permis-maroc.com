/**
 * In-memory + localStorage cache keys for future remote TTS URLs.
 * Does not store audio blobs locally yet — only URL lookups.
 */

export function buildAudioCacheKey(parts: {
  language: string;
  contentType: string;
  contentId: string;
  contentVersion?: string;
}): string {
  return [
    parts.contentType,
    parts.language,
    parts.contentId,
    parts.contentVersion ?? "v1",
  ].join("-");
}

const memoryCache = new Map<string, string>();

export function getCachedAudioUrl(key: string): string | undefined {
  if (memoryCache.has(key)) return memoryCache.get(key);
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(`pm_audio_url_${key}`);
    if (raw) {
      memoryCache.set(key, raw);
      return raw;
    }
  } catch {
    /* ignore */
  }
  return undefined;
}

export function setCachedAudioUrl(key: string, url: string): void {
  memoryCache.set(key, url);
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`pm_audio_url_${key}`, url);
  } catch {
    /* ignore quota */
  }
}
