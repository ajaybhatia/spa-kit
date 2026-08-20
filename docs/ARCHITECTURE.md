# spa-kit architecture (Vite SPA)

Lean React SPA kernel. Presentation-only — authorization belongs on the API.

Bootstrapping from https://github.com/ajaybhatia/spa-kit: follow **If you were given this repo URL** in [`AGENTS.md`](../AGENTS.md).

**Agent skill:** [`.claude/skills/spa-kit/SKILL.md`](../.claude/skills/spa-kit/SKILL.md) (mirrored at `.cursor/skills/spa-kit/`).

## Folder contract

```text
src/
├── api/<domain>/       # Typed HTTP clients (empty until first domain)
├── screens/<domain>/   # *-screen.tsx
├── hooks/<domain>/     # use-*.ts
├── lib/                # navigation, storage, theme, api client, utils
├── components/         # layout, ui, data-display, providers
├── store/              # Zustand shell state (sidebar, theme, transitions)
├── constants/routes.ts # Route path registry
└── types/              # DTOs matching backend JSON field names
```

## Import direction

```text
screens → hooks → api/lib → types
screens → components
```

- Screens must not import `@/api/*` directly — use hooks.
- Never call `localStorage` directly — use `lib/storage`.
- Persist UI chrome only. See skill reference “Persisted UI state”.

## Routing

- React Router v7 with nested layout (`DashboardShell` + `Outlet`).
- Route paths defined in `constants/routes.ts` and referenced from `lib/navigation/config.ts`.

## API access

- Dev: Vite proxies `/api` → `VITE_API_PROXY_TARGET` (default `http://127.0.0.1:6100`).
- Prod: `VITE_API_BASE_URL` baked at build time; API clients call that origin.

## Screen recipe

1. `types/` — DTOs
2. `api/<domain>/api.ts` — typed HTTP wrappers
3. `hooks/<domain>/use-*.ts` — loading, error, mutations
4. `screens/<domain>/<domain>-screen.tsx`
5. Register route in `App.tsx` + nav item in `lib/navigation/config.ts`

**Render order:** header → error → loading → empty → content.
