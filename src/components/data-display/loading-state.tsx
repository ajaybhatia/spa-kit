import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

/** Stacked skeleton rows — generic fallback outside table layouts. */
export function LoadingState({ label, rows = 5 }: { label?: string; rows?: number }) {
  return (
    <div
      className="overflow-hidden rounded-card border border-border bg-card shadow-card"
      role="status"
      aria-busy="true"
      aria-label={label ?? "Loading"}
    >
      {label ? (
        <div className="flex items-center gap-2 border-b border-border px-3.5 py-3 text-[12.5px] text-muted-foreground">
          <Spinner className="size-3.5" />
          <span>{label}</span>
        </div>
      ) : null}
      <div className="flex flex-col gap-2 p-3.5">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-[var(--row-h)] w-full" style={{ animationDelay: `${i * 60}ms` }} />
        ))}
      </div>
    </div>
  );
}
