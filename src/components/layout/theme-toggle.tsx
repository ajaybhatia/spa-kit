import { MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({
  className,
  collapsed = false,
}: {
  className?: string;
  collapsed?: boolean;
}) {
  const { resolvedTheme, setTheme, mounted } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      title="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex items-center justify-center text-muted-foreground transition-colors hover:bg-hover hover:text-foreground",
        collapsed
          ? "h-[34px] w-full rounded-lg"
          : "size-7 shrink-0 rounded-md border border-border",
        className,
      )}
    >
      <span className="relative flex size-[14px] items-center justify-center">
        <SunIcon
          className={cn("absolute size-[14px] transition-opacity", isDark ? "opacity-100" : "opacity-0")}
          strokeWidth={1.8}
          aria-hidden={!isDark}
        />
        <MoonIcon
          className={cn("absolute size-[14px] transition-opacity", isDark ? "opacity-0" : "opacity-100")}
          strokeWidth={1.8}
          aria-hidden={isDark}
        />
      </span>
    </button>
  );
}
