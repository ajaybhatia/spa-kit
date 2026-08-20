import type { LucideIcon } from "lucide-react";
import { HomeIcon, LayoutDashboardIcon, SettingsIcon } from "lucide-react";

import { ROUTES } from "@/constants/routes";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  subtitle?: string;
};

export type NavGroup = {
  key: string;
  label: string;
  icon: LucideIcon;
  items: NavItem[];
};

/** Footer-only — not listed in sidebar nav groups. */
export const SETTINGS_NAV_ITEM: NavItem = {
  id: "settings",
  label: "Settings",
  href: ROUTES.settings,
  icon: SettingsIcon,
  subtitle: "Theme and layout preferences",
};

export const NAV_GROUPS: NavGroup[] = [
  {
    key: "app",
    label: "App",
    icon: LayoutDashboardIcon,
    items: [
      {
        id: "home",
        label: "Home",
        href: ROUTES.home,
        icon: HomeIcon,
        subtitle: "Overview",
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

const ROUTABLE_NAV_ITEMS = [...NAV_ITEMS, SETTINGS_NAV_ITEM];

export function navItemForPathname(pathname: string): NavItem | undefined {
  const match = ROUTABLE_NAV_ITEMS.filter(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  ).sort((a, b) => b.href.length - a.href.length)[0];
  return match ?? NAV_ITEMS[0];
}

export function navGroupForPathname(pathname: string): NavGroup | undefined {
  return NAV_GROUPS.find((group) =>
    group.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)),
  );
}
