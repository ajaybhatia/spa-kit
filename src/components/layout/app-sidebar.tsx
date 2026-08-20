import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDownIcon, ChevronRightIcon, SettingsIcon, type LucideIcon } from "lucide-react";

import { Link } from "@/components/router/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { usePathname } from "@/hooks/use-pathname";
import { ROUTES } from "@/constants/routes";
import { NAV_GROUPS, type NavGroup, type NavItem } from "@/lib/navigation/config";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";

const FLYOUT_CLOSE_DELAY_MS = 120;

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isSectionActive(group: NavGroup, pathname: string) {
  return group.items.some((item) => isActivePath(pathname, item.href));
}

function SidebarNavIcon({
  icon: Icon,
  active,
  className,
}: {
  icon: LucideIcon;
  active: boolean;
  className?: string;
}) {
  return (
    <Icon
      className={cn(
        "shrink-0 transition-[fill,opacity]",
        active ? "fill-current opacity-100" : "fill-none opacity-80",
        className,
      )}
      strokeWidth={active ? 2.25 : 1.8}
      aria-hidden
    />
  );
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  compact = false,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      title={label}
      className={cn(
        "flex h-[34px] items-center gap-2.5 rounded-lg text-[13px] font-medium transition-colors",
        compact ? "justify-center px-0" : "px-2.5",
        active
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:bg-hover hover:text-foreground",
      )}
      aria-current={active ? "page" : undefined}
    >
      <SidebarNavIcon icon={Icon} active={active} className="size-3.5" />
      {!compact && <span className="truncate">{label}</span>}
    </Link>
  );
}

function FlyoutNavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const Icon = item.icon;
  const active = isActivePath(pathname, item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex h-[34px] items-center gap-2.5 rounded-md px-2.5 text-[13px] font-medium transition-colors",
        active
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:bg-hover hover:text-foreground",
      )}
    >
      <SidebarNavIcon icon={Icon} active={active} className="size-4" />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function CollapsedSectionFlyout({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const anchorRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const SectionIcon = group.icon;
  const active = isSectionActive(group, pathname);

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setOpen(false), FLYOUT_CLOSE_DELAY_MS);
  };

  const openFlyout = () => {
    clearCloseTimer();
    const rect = anchorRef.current?.getBoundingClientRect();
    if (rect) {
      setCoords({ top: rect.top, left: rect.right + 8 });
    }
    setOpen(true);
  };

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        title={group.label}
        aria-expanded={open}
        onMouseEnter={openFlyout}
        onMouseLeave={scheduleClose}
        onFocus={openFlyout}
        onBlur={scheduleClose}
        className={cn(
          "relative flex h-[34px] w-full items-center justify-center rounded-lg border text-[13px] font-medium transition-colors",
          active
            ? "border-brand/50 text-brand"
            : "border-transparent text-muted-foreground hover:bg-hover hover:text-foreground",
        )}
      >
        <SidebarNavIcon icon={SectionIcon} active={active} className="size-4" />
      </button>

      {open
        ? createPortal(
            <div
              className="fixed z-50 min-w-[220px] rounded-lg border border-border bg-popover p-1.5 text-popover-foreground shadow-popover ring-1 ring-foreground/10"
              style={{ top: coords.top, left: coords.left }}
              onMouseEnter={clearCloseTimer}
              onMouseLeave={scheduleClose}
            >
              <div className="px-2.5 py-1.5 text-[10.5px] font-medium tracking-[0.07em] text-muted-foreground uppercase">
                {group.label}
              </div>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <FlyoutNavLink
                    key={item.id}
                    item={item}
                    pathname={pathname}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function NavSection({
  group,
  pathname,
  sidebarCollapsed,
  sectionCollapsed,
  onToggleSection,
}: {
  group: NavGroup;
  pathname: string;
  sidebarCollapsed: boolean;
  sectionCollapsed: boolean;
  onToggleSection: (key: string) => void;
}) {
  const SectionIcon = group.icon;
  const sectionActive = isSectionActive(group, pathname);

  if (sidebarCollapsed) {
    return <CollapsedSectionFlyout group={group} pathname={pathname} />;
  }

  return (
    <div className="flex flex-col gap-0.5 pt-2 first:pt-0">
      <button
        type="button"
        aria-expanded={!sectionCollapsed}
        onClick={() => onToggleSection(group.key)}
        className={cn(
          "flex h-[36px] w-full items-center gap-2 rounded-lg px-2 text-left transition-colors hover:bg-sidebar-accent/70",
          sectionActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        )}
      >
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background/40",
            sectionActive && !sectionCollapsed && "border-brand/50 text-brand",
            sectionActive && sectionCollapsed && "border-border bg-muted/60 text-foreground",
          )}
        >
          <SidebarNavIcon icon={SectionIcon} active={sectionActive} className="size-3.5" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[12px] font-semibold tracking-[-0.01em]">
          {group.label}
        </span>
        <span className="relative flex size-3.5 shrink-0 items-center justify-center text-muted-foreground/80">
          <ChevronDownIcon
            aria-hidden
            data-nav-section-chevron-expanded={group.key}
            className={cn("size-3.5 transition-opacity duration-150", sectionCollapsed && "hidden")}
            strokeWidth={2}
          />
          <ChevronRightIcon
            aria-hidden
            data-nav-section-chevron-collapsed={group.key}
            className={cn("size-3.5 transition-opacity duration-150", !sectionCollapsed && "hidden")}
            strokeWidth={2}
          />
        </span>
      </button>
      {!sectionCollapsed ? (
        <div
          data-nav-section-items={group.key}
          className="ml-3.5 flex flex-col gap-0.5 border-l border-border/60 pl-2"
        >
          {group.items.map((item) => (
            <NavLink
              key={item.id}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActivePath(pathname, item.href)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  const { isCollapsed, toggleSection, expandSection, isSectionCollapsed } = useSidebarStore();

  useEffect(() => {
    if (prevPathnameRef.current === null) {
      prevPathnameRef.current = pathname;
      return;
    }
    if (prevPathnameRef.current === pathname) {
      return;
    }
    prevPathnameRef.current = pathname;

    const activeGroup = NAV_GROUPS.find((group) => isSectionActive(group, pathname));
    if (activeGroup) {
      expandSection(activeGroup.key);
    }
  }, [pathname, expandSection]);

  return (
    <aside className="flex min-h-0 flex-1 flex-col bg-sidebar">
      <nav className="flex flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden px-2 py-3">
        {NAV_GROUPS.map((group) => (
          <NavSection
            key={group.key}
            group={group}
            pathname={pathname}
            sidebarCollapsed={isCollapsed}
            sectionCollapsed={isSectionCollapsed(group.key)}
            onToggleSection={toggleSection}
          />
        ))}
      </nav>

      <div
        className={cn(
          "flex shrink-0 border-t border-border py-2",
          isCollapsed ? "flex-col gap-2 px-2" : "flex-row items-center gap-2 px-2",
        )}
      >
        <div
          className={cn(
            isCollapsed ? "flex w-full flex-col gap-0.5" : "flex min-w-0 flex-1 items-center gap-1",
          )}
        >
          <ThemeToggle collapsed={isCollapsed} />
          <Link
            href={ROUTES.settings}
            title="Settings"
            aria-current={pathname === ROUTES.settings ? "page" : undefined}
            className={cn(
              "flex items-center justify-center text-muted-foreground transition-colors hover:bg-hover hover:text-foreground",
              isCollapsed
                ? "h-[34px] w-full rounded-lg"
                : "size-7 shrink-0 rounded-md border border-border",
              pathname === ROUTES.settings &&
                (isCollapsed ? "bg-muted text-foreground" : "border-brand/50 text-brand"),
            )}
          >
            <SettingsIcon className="size-[14px]" strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
