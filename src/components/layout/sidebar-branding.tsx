import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";

export function SidebarBranding() {
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  return (
    <div
      className={cn(
        "flex h-12 shrink-0 items-center border-b border-border bg-sidebar px-3",
        isCollapsed ? "justify-center" : "gap-2.5",
      )}
    >
      {isCollapsed ? (
        <button
          type="button"
          onClick={toggleSidebar}
          title="Expand sidebar"
          className="group relative flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-hover"
        >
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary font-mono text-[13px] font-medium text-primary-foreground transition-opacity group-hover:opacity-0">
            A
          </div>
          <ChevronsRightIcon
            className="absolute size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            strokeWidth={1.8}
          />
        </button>
      ) : (
        <>
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary font-mono text-[13px] font-medium text-primary-foreground">
            A
          </div>
          <div className="min-w-0 flex-1 overflow-hidden whitespace-nowrap">
            <div className="text-[13.5px] font-semibold leading-tight tracking-[-0.01em]">App</div>
            <div className="text-[11px] leading-tight text-muted-foreground">Starter</div>
          </div>
          <button
            type="button"
            onClick={toggleSidebar}
            title="Collapse sidebar"
            className="flex size-[26px] shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-hover hover:text-foreground"
          >
            <ChevronsLeftIcon className="size-3.5" />
          </button>
        </>
      )}
    </div>
  );
}
