import { TriangleAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-card border border-bad/40 bg-bad/10 px-4 py-3 text-[13px] text-bad">
      <TriangleAlertIcon className="size-4 shrink-0" />
      <div className="min-w-0 flex-1 break-words">{message}</div>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}
