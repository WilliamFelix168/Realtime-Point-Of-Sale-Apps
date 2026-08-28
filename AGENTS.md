# Repository Guidelines

## Project Overview

Realtime point-of-sales system built with Next.js 15 App Router. The project is in the **initial scaffold stage** — `create-next-app` bootstrap only, no domain features implemented yet. The name signals intent: live order/inventory updates, likely via WebSockets or server-sent events.

---

## Architecture & Data Flow

Next.js 15 App Router with React 19. All routing lives under `src/app/` using the file-system convention:

```
src/app/
  layout.tsx     ← root layout (fonts, global CSS)
  page.tsx       ← route segment
  globals.css    ← Tailwind v4 theme + CSS custom properties
```

Expected growth pattern for a POS system:
- `src/app/(pos)/` — sales/checkout routes
- `src/app/api/` — Route Handlers for server-side logic
- `src/components/` — shared UI primitives
- `src/lib/` — data-fetching, realtime client, business logic
- `src/types/` — shared TypeScript interfaces

No state management, data layer, or realtime transport is installed yet. Add dependencies before building features.

---

## Key Directories

| Path | Purpose |
|------|---------|
| `src/app/` | All routes, layouts, and pages (App Router) |
| `src/app/globals.css` | Global Tailwind v4 imports and CSS variables |
| `public/` | Static assets served at `/` |

Path alias `@/*` maps to `src/*` — use it everywhere:
```ts
import { Button } from "@/components/ui/button";
```

---

## Development Commands

```bash
npm run dev       # Dev server with Turbopack (fast refresh, port 3000)
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint check
```

No test runner is installed. Add one (e.g. Vitest + Testing Library) before writing tests.

---

## Code Conventions & Common Patterns

### TypeScript
- Strict mode enabled (`"strict": true`). No `any`, no type assertions without justification.
- Target `ES2017`; module resolution `bundler`.
- `isolatedModules: true` — every file must be independently type-safe; avoid type-only re-exports without `export type`.

### Components
- Server Components by default (App Router). Add `"use client"` only when browser APIs, event handlers, or client state are needed.
- Co-locate a component's styles, hooks, and types in a feature folder rather than a flat dump.
- Props interfaces named `<ComponentName>Props`.

### Styling
- Tailwind CSS v4. Import via `@import "tailwindcss"` (not `@tailwind base/components/utilities`).
- Theme tokens defined in `globals.css` under `@theme inline` — extend here, not inline magic values.
- CSS custom properties for semantic colors: `--background`, `--foreground`. Dark mode via `@media (prefers-color-scheme: dark)`.
- Fonts injected as CSS variables: `var(--font-geist-sans)`, `var(--font-geist-mono)`.

### Async / Data Fetching
- Server Components fetch data directly (async component functions).
- Route Handlers in `src/app/api/[route]/route.ts` follow `export async function GET/POST/...`.
- Client-side realtime: not yet wired — choose one transport (Supabase Realtime, Pusher, native WebSocket, SSE) and document it here when added.

### Error Handling
- No conventions set yet. Adopt Next.js `error.tsx` / `not-found.tsx` per route segment as features are built.

### Naming
- Files: `kebab-case` for directories and route segments, `PascalCase.tsx` for component files.
- Exports: named exports for utilities/hooks; default export for page/layout route segments (required by Next.js).

---

## Important Files

| File | Role |
|------|------|
| `src/app/layout.tsx` | Root layout — fonts, `<html>`, `<body>`, global metadata |
| `src/app/page.tsx` | Root route `/` — replace with POS home/dashboard |
| `src/app/globals.css` | Tailwind v4 entry + design tokens |
| `next.config.ts` | Next.js config (empty, extend as needed) |
| `tsconfig.json` | TypeScript config — strict, `@/*` alias |
| `eslint.config.mjs` | ESLint 9 flat config — `next/core-web-vitals` + `next/typescript` |
| `postcss.config.mjs` | PostCSS — `@tailwindcss/postcss` plugin only |

---

## Runtime / Tooling Preferences

- **Package manager**: `npm` (`package-lock.json` present). Do not mix with `yarn`/`pnpm`/`bun` lockfiles.
- **Node**: standard Node.js runtime. No Bun-specific APIs in source unless the runtime is switched.
- **Bundler**: Turbopack in dev (`next dev --turbopack`), webpack in production builds.
- **TypeScript**: required — no plain `.js` source files.
- **Tailwind**: v4 (breaking change from v3 — `@import "tailwindcss"`, no `tailwind.config.js` by default, config via CSS `@theme`).

---

## Testing & QA

No test framework is installed. Recommended setup for this stack:

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event jsdom
```

- Unit/integration tests: Vitest + React Testing Library.
- E2E: Playwright (`npm init playwright@latest`).
- Place unit tests adjacent to source (`*.test.ts`) or in `src/__tests__/`.
- ESLint (`npm run lint`) is the only automated quality gate currently active.

---

## Git Workflow

**Trigger keyword: `cp`** — when the user says `cp`, always run `git fetch origin` first before doing anything else.

```bash
git fetch origin        # sync remote state without merging
git status              # confirm clean working tree
```

- `cp` → fetch first, no exceptions.
- Branch from an up-to-date `main`: `git fetch origin && git checkout main && git pull`.
- Commit messages follow Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, etc.
- Keep commits atomic — one logical change per commit.
