import { useEffect } from "react";

import { useThemeStore } from "@/store/theme-store";

export function useTheme() {
  const theme = useThemeStore((s) => s.theme);
  const resolvedTheme = useThemeStore((s) => s.resolvedTheme);
  const mounted = useThemeStore((s) => s.mounted);
  const setTheme = useThemeStore((s) => s.setTheme);
  const init = useThemeStore((s) => s.init);

  useEffect(() => init(), [init]);

  return { theme, resolvedTheme, setTheme, mounted };
}
