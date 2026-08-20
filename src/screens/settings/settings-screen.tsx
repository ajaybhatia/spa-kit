import { PageHeader } from "@/components/data-display/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/use-theme";
import type { ThemeSetting } from "@/lib/theme/theme";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";

const THEME_OPTIONS: { value: ThemeSetting; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

function SettingsRow({
  label,
  description,
  children,
  className,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-3 border-b border-border py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0 space-y-0.5">
        <Label className="text-[13px] font-medium text-foreground">{label}</Label>
        {description ? (
          <p className="text-[12px] leading-snug text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function SettingsScreen() {
  const { theme, setTheme, mounted } = useTheme();
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <div className="min-w-0 space-y-8 animate-fade-up">
      <PageHeader
        title="Settings"
        description="Appearance preferences are stored locally in this browser."
      />

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Theme and sidebar. Chrome only — never tokens or API data.</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsRow label="Theme" description="Light, dark, or follow the system.">
            <div className="flex flex-wrap gap-1.5">
              {THEME_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  size="sm"
                  variant={mounted && theme === option.value ? "default" : "outline"}
                  onClick={() => setTheme(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </SettingsRow>
          <SettingsRow label="Sidebar" description="Collapse to icon-only navigation.">
            <Button type="button" size="sm" variant="outline" onClick={toggleSidebar}>
              {isCollapsed ? "Expand" : "Collapse"}
            </Button>
          </SettingsRow>
        </CardContent>
      </Card>
    </div>
  );
}
