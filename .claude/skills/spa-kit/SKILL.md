---
name: spa-kit
description: >-
  Use when editing screens, layout, routing, storage, theme, or API
  wiring in a spa-kit Vite React SPA, or when cloning
  https://github.com/ajaybhatia/spa-kit to start a frontend.
  Follow AGENTS.md "If you were given this repo URL".
---

# spa-kit UI Development

Read this skill before modifying screens or layout.

## Scope

| In | Out until a domain exists |
| --- | --- |
| Layout, sidebar, theme, transitions | Auth store, session gates |
| Static nav + placeholder screens | Server-driven nav |
| shadcn + design tokens | Direct `fetch` in screens |
| Screens via hooks → api | New top-level `src/` folders |

## Stack

- Vite 8, React 19, TypeScript 7
- React Router 7, TanStack Query (when a domain exists)
- Tailwind CSS 4, shadcn **base-nova**
- Zustand for sidebar, theme, navigation transition
- **No `next-themes`** — `lib/theme/theme.ts` + `store/theme-store.ts`

## Folder contract

```text
src/
├── api/<domain>/       # api.ts — typed HTTP
├── screens/<domain>/   # *-screen.tsx
├── hooks/<domain>/     # use-*.ts
├── lib/                # navigation, storage, theme, utils
├── components/         # layout, ui, data-display, providers
├── store/              # Zustand shell state
├── constants/routes.ts # Route path registry
└── types/              # DTOs matching backend JSON
```

**Import direction:** `screens → hooks → api/lib → types` · `screens → components`

## Adding a screen

1. `types/` — DTOs
2. `api/<domain>/api.ts` — typed HTTP wrappers
3. `hooks/<domain>/use-*.ts` — loading, error, mutations
4. `screens/<domain>/<domain>-screen.tsx`
5. Register route in `App.tsx` + nav item in `lib/navigation/config.ts`

**Render order:** header → error → loading → empty → content.

## Verification

```bash
make lint && make build
```

## Reference

- [reference.md](reference.md)
- [CLAUDE.md](../../../CLAUDE.md)
- [AGENTS.md](../../../AGENTS.md)
