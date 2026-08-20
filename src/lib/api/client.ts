export type ApiErrorBody = { error?: string; message?: string };

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly messageText?: string;

  constructor(status: number, code: string, messageText?: string) {
    super(messageText?.trim() || code);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.messageText = messageText;
  }
}

type ApiFetchOptions = {
  method?: string;
  body?: unknown;
};

export async function apiFetch<T>(path: string, options?: ApiFetchOptions): Promise<T> {
  const headers: Record<string, string> = {};
  let body: string | undefined;

  if (options?.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.body);
  }

  const response = await fetch(path, {
    method: options?.method ?? "GET",
    headers,
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    let code = "request_failed";
    let messageText: string | undefined;
    try {
      const payload = (await response.json()) as ApiErrorBody;
      if (payload.error) {
        code = payload.error;
      }
      if (payload.message?.trim()) {
        messageText = payload.message.trim();
      }
    } catch {
      // ignore parse errors
    }
    throw new ApiError(response.status, code, messageText);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

// VITE_API_BASE_URL is baked in at build time.
// Dev: Vite proxies /api → VITE_API_PROXY_TARGET (see vite.config.ts).
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "/api/v1").replace(/\/$/, "");

export function apiPath(segment: string): string {
  const normalized = segment.startsWith("/") ? segment : `/${segment}`;
  return `${API_BASE_URL}${normalized}`;
}
