import { LayoutDashboardIcon } from "lucide-react";

import { EmptyState } from "@/components/data-display/empty-state";
import { PageHeader } from "@/components/data-display/page-header";

export function HomeScreen() {
  return (
    <div className="min-w-0 space-y-8 animate-fade-up">
      <PageHeader
        title="Welcome"
        description="spa-kit is standing up. Add domain screens via types → api → hooks → screen."
      />
      <EmptyState
        icon={LayoutDashboardIcon}
        title="No modules connected yet"
        description="Use the sidebar to navigate. Wire an API client and first domain screen when the backend exists."
      />
    </div>
  );
}
