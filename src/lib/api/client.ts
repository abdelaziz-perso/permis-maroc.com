const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:8000";

export type ApiErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
};

export class ApiError extends Error {
  status: number;
  body: ApiErrorBody;

  constructor(status: number, body: ApiErrorBody) {
    super(body.message || `Erreur HTTP ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }

  fieldErrors(): Record<string, string> {
    const out: Record<string, string> = {};
    if (!this.body.errors) return out;
    for (const [key, messages] of Object.entries(this.body.errors)) {
      if (messages?.[0]) out[key] = messages[0];
    }
    return out;
  }
}

let csrfReady = false;

function readXsrfToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function ensureCsrfCookie(): Promise<void> {
  if (csrfReady && readXsrfToken()) return;

  const res = await fetch(`${API_BASE}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new ApiError(res.status, {
      message: "Impossible d'initialiser la session sécurisée.",
    });
  }

  csrfReady = true;
}

export function resetCsrf(): void {
  csrfReady = false;
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  csrf?: boolean;
};

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, csrf = false } = options;

  if (csrf) {
    await ensureCsrfCookie();
  }

  const xsrf = readXsrfToken();
  const finalHeaders: Record<string, string> = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    ...headers,
  };

  if (body !== undefined) {
    finalHeaders["Content-Type"] = "application/json";
  }

  if (xsrf) {
    finalHeaders["X-XSRF-TOKEN"] = xsrf;
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      credentials: "include",
      headers: finalHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, {
      message: "Impossible de joindre le serveur. Vérifiez votre connexion.",
    });
  }

  if (res.status === 204) {
    return undefined as T;
  }

  let data: ApiErrorBody = {};
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text) as ApiErrorBody;
    } catch {
      data = { message: text };
    }
  }

  if (res.status === 419) {
    csrfReady = false;
    throw new ApiError(419, {
      message: "Session expirée. Réessayez.",
      ...data,
    });
  }

  if (!res.ok) {
    throw new ApiError(res.status, {
      message:
        data.message ||
        (res.status === 401
          ? "Non authentifié."
          : res.status === 403
            ? "Accès refusé."
            : "Une erreur est survenue."),
      errors: data.errors,
    });
  }

  return data as T;
}

export { API_BASE };
