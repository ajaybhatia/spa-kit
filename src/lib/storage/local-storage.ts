function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function readLocalJSON<T>(key: string): T | undefined;
export function readLocalJSON<T>(key: string, fallback: T): T;
export function readLocalJSON<T>(key: string, fallback?: T): T | undefined {
  if (!isBrowser()) {
    return fallback;
  }
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeLocalJSON<T>(key: string, value: T): void {
  if (!isBrowser()) {
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // QuotaExceededError or private mode — UI prefs should not break the app.
  }
}

export function readLocalString(key: string): string | undefined {
  if (!isBrowser()) {
    return undefined;
  }
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? undefined : raw;
  } catch {
    return undefined;
  }
}

export function writeLocalString(key: string, value: string): void {
  if (!isBrowser()) {
    return;
  }
  try {
    localStorage.setItem(key, value);
  } catch {
    // QuotaExceededError or private mode — UI prefs should not break the app.
  }
}
