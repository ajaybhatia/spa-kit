import { Suspense, useLayoutEffect } from "react";
import type { CSSProperties } from "react";
import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { PageTransition } from "@/components/layout/page-transition";
import { RouteFallback } from "@/components/layout/route-fallback";
import { SidebarBranding } from "@/components/layout/sidebar-branding";
import { useSidebarStore } from "@/store/sidebar-store";

export function DashboardShell() {
  const initSidebarFromStorage = useSidebarStore((s) => s.initFromStorage);
  const isCollapsed = useSidebarStore((s) => s.isCollapsed);

  useLayoutEffect(() => {
    initSidebarFromStorage();
  }, [initSidebarFromStorage]);

  const shellStyle = {
    "--sidebar-w": isCollapsed ? "60px" : "248px",
  } as CSSProperties;

  return (
    <div
      className="flex h-dvh max-w-full flex-col overflow-hidden bg-background text-foreground"
      style={shellStyle}
    >
      <div className="flex min-h-0 min-w-0 flex-1">
        <div
          className="flex shrink-0 flex-col border-r border-border bg-sidebar transition-[width] duration-[180ms] ease-out"
          style={{ width: "var(--sidebar-w)" }}
        >
          <SidebarBranding />
          <AppSidebar />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 pt-4 pb-12">
            <div className="mx-auto w-full min-w-0 max-w-[1420px]">
              <PageTransition>
                <Suspense fallback={<RouteFallback />}>
                  <Outlet />
                </Suspense>
              </PageTransition>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
