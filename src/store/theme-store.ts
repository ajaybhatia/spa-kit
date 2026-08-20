import { create } from "zustand";

import {
  applyThemeClass,
  readStoredTheme,
  resolveTheme,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemeSetting,
} from "@/lib/theme/theme";
import { writeLocalString } from "@/lib/storage/local-storage";

interface ThemeState {
  theme: ThemeSetting;
  resolvedTheme: ResolvedTheme;
  mounted: boolean;
  setTheme: (theme: ThemeSetting) => void;
  init: () => () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "system",
  resolvedTheme: "light",
  mounted: false,

  setTheme: (theme) => {
    const resolved = resolveTheme(theme);
    writeLocalString(THEME_STORAGE_KEY, theme);
    applyThemeClass(resolved);
    set({ theme, resolvedTheme: resolved });
  },

  init: () => {
    const theme = readStoredTheme();
    const resolved = resolveTheme(theme);
    applyThemeClass(resolved);
    set({ theme, resolvedTheme: resolved, mounted: true });

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (get().theme !== "system") {
        return;
      }
      const nextResolved = resolveTheme("system");
      applyThemeClass(nextResolved);
      set({ resolvedTheme: nextResolved });
    };

    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  },
}));
