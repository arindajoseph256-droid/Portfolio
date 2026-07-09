---
name: Vercel portfolio migration
description: Lessons from porting the Arinda Joseph Next.js portfolio to Replit Vite+React.
---

# Vercel portfolio migration notes

## SiOpenai missing from react-icons

`SiOpenai` does not exist in `react-icons@5.7.0` (installed via workspace catalog). The package has `SiOpenaigym` but not `SiOpenai`. Use `SiHuggingface` as a substitute for AI/LLM icon contexts.

**Why:** react-icons 5.x dropped or never added SiOpenai; the Vite bundler throws a hard SyntaxError at runtime if you import a named export that doesn't exist.

**How to apply:** Any time a Next.js project imports `SiOpenai` from `react-icons/si`, grep the installed package first (`grep "SiOpenai" node_modules/.pnpm/react-icons*/node_modules/react-icons/si/index.mjs`) and substitute with an available icon.

## Tailwind v3 → v4 theme migration

The scaffold uses Tailwind v4 with `@tailwindcss/vite`. The original used Tailwind v3 with `tailwind.config.ts`. Migration pattern:
- Color tokens from `tailwind.config.ts` `extend.colors` go into `:root` / `.dark` CSS vars (already referenced via `hsl(var(--*))` in `@theme inline`)
- Custom shadows go in `@theme inline` as `--shadow-*`
- Custom animations go as `--animate-*` in `@theme inline` + `@keyframes` at top level
- Custom background images go as `--background-image-*` in `@theme inline`
- Custom font families go as `--font-display` etc. in `@theme inline`
- Delete `tailwind.config.ts` and `postcss.config.mjs` — both conflict with v4

## Loading screen behavior

The original portfolio has a 1400ms loading screen that blocks the view. Screenshots taken with the Screenshot tool will always show this loading screen on fresh page loads. This is expected and not a bug.
