import { useEffect, useRef } from "react";

import { Spinner } from "@/components/ui/spinner";
import { usePathname } from "@/hooks/use-pathname";
import { cn } from "@/lib/utils";
import { useNavigationTransitionStore } from "@/store/navigation-transition-store";

const PAGE_ENTER_MS = 320;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isNavigating = useNavigationTransitionStore((state) => state.isNavigating);
  const completeNavigation = useNavigationTransitionStore((state) => state.completeNavigation);
  const previousPathRef = useRef(pathname);

  useEffect(() => {
    if (pathname === previousPathRef.current) {
      return;
    }

    previousPathRef.current = pathname;
    const timer = window.setTimeout(() => completeNavigation(), PAGE_ENTER_MS);
    return () => window.clearTimeout(timer);
  }, [pathname, completeNavigation]);

  return (
    <div className="relative min-w-0">
      <div
        aria-hidden={!isNavigating}
        className={cn(
          "pointer-events-none absolute inset-0 z-10 flex items-start justify-center pt-24 transition-opacity duration-300 ease-out motion-reduce:transition-none",
          isNavigating ? "opacity-100" : "opacity-0",
        )}
      >
        <div
          aria-label="Loading"
          className="animate-loader-in rounded-card border border-border/80 bg-background/90 p-3 shadow-card backdrop-blur-sm"
        >
          <Spinner className="size-4 text-muted-foreground motion-reduce:animate-none" />
        </div>
      </div>

      <div
        key={pathname}
        className={cn(
          "min-w-0 transform-gpu will-change-[opacity,transform] motion-reduce:transition-none",
          isNavigating
            ? "pointer-events-none scale-[0.992] opacity-35 blur-[0.4px] transition-[opacity,transform,filter] duration-200 ease-in"
            : "scale-100 opacity-100 blur-0 animate-page-enter",
        )}
      >
        {children}
      </div>
    </div>
  );
}
