import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export function RouteFallback({
  label = "Loading page…",
  compact = false,
}: {
  label?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex items-center gap-2.5 animate-loader-in">
        <Spinner className="size-4 text-muted-foreground motion-reduce:animate-none" />
        <span className="text-meta text-muted-foreground">{label}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 animate-loader-in",
        compact ? "py-2" : "min-h-[320px]",
      )}
    >
      <Spinner className="size-5 text-muted-foreground motion-reduce:animate-none" />
      <p className="text-meta text-muted-foreground">{label}</p>
    </div>
  );
}
