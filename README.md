# spa-kit

Vite + React SPA kernel. Copy this folder (or clone https://github.com/ajaybhatia/spa-kit), rename, add domain screens.

Architecture and import rules: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). Agent contract: [`AGENTS.md`](AGENTS.md).

## Give this URL to an AI agent

Give the agent https://github.com/ajaybhatia/spa-kit and say: use this as the frontend starter; follow `AGENTS.md`.

The agent must:

1. Clone this repo into the product directory
2. Read `AGENTS.md` + `docs/ARCHITECTURE.md` + the spa-kit skill **before writing code**
3. Rename (`package.json`, `STORAGE_PREFIX`, `index.html` title, sidebar brand)
4. `npm ci` then `make lint && make build`
5. Add screens bottom-up (`types` → `api` → `hooks` → `screen` → route/nav) — never invent `src/pages/` or `src/features/`

Full sequence: **If you were given this repo URL** in [`AGENTS.md`](AGENTS.md).

## Stack

| Layer | Choice |
|---|---|
| Build | Vite 8 |
| UI | React 19, TypeScript 7 |
| Routing | React Router 7 |
| Data | TanStack Query (when a domain exists) |
| Styling | Tailwind CSS 4, shadcn base-nova |
| State | Zustand (shell), React Query (server data) |

## Quick start

```bash
cp .env.example .env   # optional — defaults to localhost:6100 API
npm ci
make dev               # http://localhost:3000
```

## Build

```bash
make lint    # tsc --noEmit
make build   # production build → dist/
make preview # serve dist/ locally
```

## Rename into a product

See **Rename this kit into a product** in [`AGENTS.md`](AGENTS.md).

## Agents

| File | Audience |
|---|---|
| `AGENTS.md` | Any agent (Copilot, Codex, Gemini, …) |
| `CLAUDE.md` | Claude Code |
| `.claude/skills/spa-kit/` | Claude Code skill |
| `.cursor/skills/spa-kit/` | Cursor skill |
