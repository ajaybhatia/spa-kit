import { storageKeys } from "@/lib/storage/keys";
import { readLocalString } from "@/lib/storage/local-storage";

export const THEME_STORAGE_KEY = storageKeys.theme;

export type ThemeSetting = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export function resolveTheme(setting: ThemeSetting): ResolvedTheme {
  if (setting === "system") {
    if (typeof window === "undefined") {
      return "light";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return setting;
}

export function readStoredTheme(): ThemeSetting {
  if (typeof window === "undefined") {
    return "system";
  }
  const stored = readLocalString(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
}

export function applyThemeClass(resolved: ResolvedTheme) {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

/** Inline script injected from the root layout before paint to avoid FOUC. */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var r=t==="dark"?"dark":t==="light"?"light":window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.classList.toggle("dark",r==="dark");}catch(e){}})();`;
