# Twinpix Studio website

Two-person creative studio (Divyani Jaiswal — Founder & Design Lead; Rudransh — Co-founder). Multi-page, award-site-quality marketing site.

## Commands
- `npm run dev` — local dev server (http://localhost:3000)
- `npm run build` — production build (must pass with zero errors)
- `npm run lint` — ESLint (must be clean)

## Stack
Next.js App Router (16) · TypeScript · Tailwind CSS v4 · three + @react-three/fiber · gsap + ScrollTrigger · lenis. Fonts via `next/font`: Bricolage Grotesque (display), Instrument Serif (italic accents), JetBrains Mono (labels).

## Brand rules
- Dark by default, light optional (toggle in nav). Dark: ink `#0a0a12`; twin accents ultramarine `#5b5bff` and flame `#ff6a3d`; where they overlap they glow (additive blend). Light: paper `#f4f1ea`, deeper accents, normal blending. No purple→blue gradients, no SaaS look.
- Type is the personality: huge Bricolage headlines, serif-italic for the emphasised phrase (`*word*` in content.ts), tiny mono labels.
- Brand idea = "twin + pixel": two overlapping squares (logo, favicon, cursor, particles).
- Sharp corners / tiny radii. Film grain overlay. Generous whitespace.
- Never invent client names, socials or bios — add a `TODO` in `src/content.ts` instead.

## Architecture
- `src/content.ts` — ALL copy and data (`caseStudies`, `about`, `privacy`, `site.budgets`…). Headline syntax: `\n` = new line, `*x*` = serif italic.
- **Root layout owns the shell** (`src/app/layout.tsx`): backdrop, `Scene` (WebGL), `Nav`, `ScrollRail`, `<main>`, `Footer`. The canvas persists across routes; `app/template.tsx` fades pages in (skipped on first load).
- **3D stages are declared by the page**: `<section data-section="Label" data-stage="0-4" data-scene="dim?">`. `PixelField.tsx` measures `[data-stage]` nodes, maps scroll → formation index (damped), and on route change morphs straight from the old to the new opening formation. Formations: 0 spheres, 1 frame, 2 rings, 3 helix, 4 mark (`formations.ts`, shaders in `shaders.ts`).
- Page building blocks: `components/pages/PageHero.tsx` (inner-page header, eager h1), `components/work/{WorkCard,WorkIndex,PixelArt,TiltCard}.tsx`, `components/sections/*` (home sections + `ContactForm` with `variant="compact"|"full"`).
- `src/lib/scrollState.ts` — shared mutable scroll/pointer state. `src/lib/theme.ts` — `useTheme`/`setTheme`. `src/lib/metadata.ts` — `pageMeta()` for per-page metadata. `src/lib/validate.ts` — shared form validation (client + API).
- `src/app/api/contact/route.ts` — validates, logs, sends via Resend if `RESEND_API_KEY` is set.
- `app/sitemap.ts` lists every route + case-study slug.

## Performance rules (keep these true)
- The hero/page `h1` must be server-rendered and visible at first paint (`Headline eager`). Never hide LCP content behind JS/preloaders.
- GSAP, ScrollTrigger and Lenis load lazily (`components/layout/Enhancements.tsx`); don't import `gsap` in components rendered on first paint (use CSS or rAF).
- The preloader is a non-blocking corner indicator, first visit per session only, skipped for reduced motion.

## Theme rules
Use token classes (`bg-ink`, `text-paper`, `border-line`, `text-mute`, `text-ultra-text`, `text-flame`) — never hard-code hex in components. `ink` = page background, `paper` = text in both themes. Small text must stay ≥ 4.5:1 in both themes.

## Quality bar
Respect `prefers-reduced-motion`. Works without WebGL (CSS `.backdrop` fallback). No horizontal scroll down to 360px. Visible focus states, semantic HTML, axe-clean in both themes.
