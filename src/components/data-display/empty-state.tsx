import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  className,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col items-center gap-2 rounded-card border border-dashed border-border px-5 py-10 text-center",
        className,
      )}
    >
      {Icon ? <Icon className="size-5 text-muted-foreground" /> : null}
      <div className="text-[13.5px] font-medium">{title}</div>
      {description ? (
        <div className="max-w-sm text-[12.5px] leading-relaxed text-muted-foreground">
          {description}
        </div>
      ) : null}
      {action}
    </div>
  );
}
