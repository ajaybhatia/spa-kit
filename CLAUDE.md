# CLAUDE.md

Guidance for **spa-kit** (Vite 8 + React 19 SPA kernel).

Also read `ARCHITECTURE.md` (via `docs/ARCHITECTURE.md`) and `AGENTS.md`. UI skill: `.claude/skills/spa-kit/SKILL.md`.

Given https://github.com/ajaybhatia/spa-kit to start a frontend: follow **If you were given this repo URL** in `AGENTS.md`. Do not scaffold a second app.

## Layout

```text
src/
├── api/<domain>/       # Typed HTTP clients
├── screens/<domain>/   # *-screen.tsx — compose hooks + components
├── hooks/<domain>/     # use-*.ts → api/ or lib/
├── lib/                # Navigation, storage, theme, pure helpers
├── components/         # Layout shell, shadcn ui, data-display, providers
├── store/              # Zustand (sidebar, theme, page transitions)
├── constants/routes.ts # Route path registry
└── types/              # DTOs matching backend JSON
```

**Import direction:** `screens → hooks → api/lib → types` · `screens → components`

Forbidden: `screens` importing `@/api/*` directly; ad-hoc `localStorage` calls.

## Commands

```bash
make dev      # Vite dev server (port 3000)
make build    # tsc + vite build → dist/
make lint     # tsc --noEmit
make preview  # preview production build
```

## Conventions

- Never call `localStorage` directly — use `lib/storage` (`readLocalJSON`/`writeLocalJSON`). Keys via `storageKeys` / `uiStateKey()`, prefixed `STORAGE_PREFIX`.
- No `next-themes` — use `lib/theme/theme.ts` + `store/theme-store.ts`.
- Route paths: `constants/routes.ts` (single source of truth), referenced from `lib/navigation/config.ts`.
- API: dev via Vite proxy (`/api` → `VITE_API_PROXY_TARGET`); prod via build-time `VITE_API_BASE_URL`.
- Do not persist auth tokens or API payloads — UI chrome only.

## Screen render order

Every async view: **header → error → loading → empty → content**

Use `components/data-display/` — `PageHeader`, `LoadingState`, `EmptyState`, `ErrorState`.

## Routing

React Router nested layout: `DashboardShell` wraps all routes via `<Outlet />`.

- `components/router/link.tsx` — `href` prop shim for react-router `Link`
- `hooks/use-pathname.ts` — pathname helper wrapping `useLocation()`

## Full-stack workflow

Types in `types/` must match backend JSON field names exactly.

Bottom-up for new screens:

1. `types/` — DTOs
2. `api/<domain>/api.ts` — typed HTTP wrappers
3. `hooks/<domain>/use-*.ts` — loading, error, mutations
4. `screens/<domain>/<domain>-screen.tsx`
5. Register route in `App.tsx` + nav item in `lib/navigation/config.ts`
