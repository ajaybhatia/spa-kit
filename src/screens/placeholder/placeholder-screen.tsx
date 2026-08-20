import { EmptyState } from "@/components/data-display/empty-state";
import { PageHeader } from "@/components/data-display/page-header";
import { usePathname } from "@/hooks/use-pathname";
import { navItemForPathname } from "@/lib/navigation/config";

export function PlaceholderScreen() {
  const pathname = usePathname();
  const item = navItemForPathname(pathname);

  return (
    <div className="min-w-0 space-y-8 animate-fade-up">
      <PageHeader
        title={item?.label ?? "Coming soon"}
        description={item?.subtitle ?? "This screen will be implemented later."}
      />
      <EmptyState
        title="Screen not implemented"
        description="Navigation and styling are in place. Add types, API, hooks, then replace this placeholder."
      />
    </div>
  );
}
