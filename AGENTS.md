# spa-kit — agent contract

Read this before changing UI, routing, storage, or API wiring.

Also: `docs/ARCHITECTURE.md`. Claude Code: `CLAUDE.md` + `.claude/skills/spa-kit/`. Cursor: `.cursor/skills/spa-kit/`.

## If you were given this repo URL

You are bootstrapping a **frontend** from spa-kit. Do this in order. Do not invent a different folder layout.

1. Clone (or `degit`) https://github.com/ajaybhatia/spa-kit into the target directory. Keep `.git` only if the product should stay on this history; otherwise clone then `rm -rf .git && git init`.
2. Read **this file**, `docs/ARCHITECTURE.md`, and `.claude/skills/spa-kit/SKILL.md` (Cursor: `.cursor/skills/spa-kit/SKILL.md`) **before writing code**.
3. Run the **Rename this kit into a product** checklist below (package name, `STORAGE_PREFIX`, title, sidebar brand).
4. `npm ci` (or `npm install`) then `make lint && make build`. Fix failures before adding features.
5. Add product screens **bottom-up**: `types/` → `api/<domain>/` → `hooks/<domain>/` → `screens/<domain>/` → `App.tsx` + `lib/navigation/config.ts`.
6. Unbuilt nav items use `PlaceholderScreen`. Do not create `src/pages/` or `src/features/`.
7. After every screen or layout change: `make lint && make build`. Do not claim done until both pass.

This kit **is** the frontend. Do not scaffold Create React App, Next.js, or a second Vite app beside it.

## Stack

Vite 8 · React 19 · TypeScript 7 · React Router 7 · Tailwind CSS 4 · shadcn **base-nova** · Zustand (shell) · TanStack Query (server data, when a domain exists)

No `next-themes`. Theme: `lib/theme/theme.ts` + `store/theme-store.ts`.

## Layout

```text
src/
├── api/<domain>/       # Typed HTTP → backend
├── screens/<domain>/   # *-screen.tsx
├── hooks/<domain>/     # use-*.ts
├── lib/                # navigation, storage, theme, utils
├── components/         # layout, ui, data-display, providers
├── store/              # Zustand (sidebar, theme, page transitions)
├── constants/routes.ts # Route path registry
└── types/              # DTOs matching backend JSON
```

**Import direction:** `screens → hooks → api/lib → types` · `screens → components`

Forbidden:

- `screens` importing `@/api/*` directly
- ad-hoc `localStorage` / `sessionStorage` — use `lib/storage` (`readLocalJSON` / `writeLocalJSON`)
- route string literals outside `constants/routes.ts`
- persisting auth tokens, API payloads, dialogs, or form drafts
- inventing a new top-level folder under `src/` for a feature (put it in the layers above)

## Commands

```bash
make dev      # Vite :3000
make build    # tsc + vite build → dist/
make lint     # tsc --noEmit
make preview  # preview production build
```

After any screen or layout change: `make lint && make build`. Do not claim done until both pass.

## Adding a screen

Bottom-up. Do not skip layers.

1. `types/` — DTOs (field names match backend JSON exactly)
2. `api/<domain>/api.ts` — typed wrappers around `apiFetch` / `apiPath`
3. `hooks/<domain>/use-*.ts` — loading, error, mutations
4. `screens/<domain>/<domain>-screen.tsx`
5. Register in `App.tsx` + `lib/navigation/config.ts` (href from `ROUTES`)

Unbuilt routes: `PlaceholderScreen`.

**Render order** on every async view: **header → error → loading → empty → content**

Use `components/data-display/` — `PageHeader`, `LoadingState`, `EmptyState`, `ErrorState`.

## Persist UI chrome

Keys via `storageKeys` / `uiStateKey(scope, slot)`, prefixed `STORAGE_PREFIX` (`app` until renamed).

| Mechanism | When |
| --- | --- |
| `uiStateKey(scope, slot)` | Feature chrome keys |
| Zustand + `writeLocalJSON` | Global shell (sidebar, theme) |

Do not persist: dialogs, confirm targets, query data (React Query cache).

## Rename this kit into a product

1. `package.json` `name`
2. `STORAGE_PREFIX` in `src/lib/storage/keys.ts`
3. `<title>` + description in `index.html`
4. Sidebar brand in `src/components/layout/sidebar-branding.tsx` (mark + title + subtitle)
5. Optional: rename skill folder `spa-kit` → `<product>` in `.claude/skills/` and `.cursor/skills/`

## Red flags — stop

- `localStorage.` in any file except `lib/storage/local-storage.ts` and FOUC bootstrap strings in `lib/theme` / `lib/navigation`
- `fetch(` in `screens/`
- `import … from "@/api/` in `screens/`
- Hardcoded `"/settings"` (or any path) outside `constants/routes.ts`
- New `src/features/` or `src/pages/` — those names are not this architecture
