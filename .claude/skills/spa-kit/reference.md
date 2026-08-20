# spa-kit — Reference

## Navigation config shape

```ts
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
```

`navItemForPathname(pathname)` drives placeholder titles. Route paths live in `constants/routes.ts`.

Footer-only items (Settings) go in `SETTINGS_NAV_ITEM`, not `NAV_GROUPS`.

---

## Persisted UI state

UI chrome only — never tokens, API payloads, dialogs, or form drafts.

| Mechanism | When |
| --- | --- |
| `uiStateKey(scope, slot)` | Feature chrome keys. Example: `uiStateKey("orders", "workspace")` → `app-ui-orders-workspace` |
| Zustand + `writeLocalJSON` | Global shell (sidebar, theme) |

Registered shell keys (prefix = `STORAGE_PREFIX`): `<prefix>-sidebar-collapsed`, `<prefix>-sidebar-sections`, `<prefix>-theme`.

Do not persist: dialogs, confirm targets, query data (React Query cache).

Bootstrap scripts injected in `main.tsx` before React mounts (theme + sidebar sections FOUC prevention). Those scripts may read `localStorage` inline; application code still goes through `lib/storage`.

---

## Router link shim

`components/router/link.tsx` wraps react-router `Link` with `href`.

`hooks/use-pathname.ts` wraps `useLocation().pathname`.

---

## Screen placeholder pattern

`screens/placeholder/placeholder-screen.tsx` — `PageHeader` + `EmptyState` driven by nav config. Use for routes that exist in nav but have no domain UI yet.

---

## API client

`lib/api/client.ts` — `apiFetch` + `apiPath`. Domain modules live in `api/<domain>/api.ts` and call those helpers. Screens never import them.

---

## What not to invent

- `src/features/`, `src/pages/`, `src/services/` — use the folder contract
- `next-themes`
- Auth/session gates until a real auth module exists
- Direct `localStorage` outside `lib/storage/local-storage.ts`
