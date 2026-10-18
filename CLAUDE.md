# Twinpix Studio website

Two-person creative studio (Divyani Jaiswal — Founder & Design Lead; Rudransh — Co-founder). One-page, award-site-quality marketing site.

## Commands
- `npm run dev` — local dev server (http://localhost:3000)
- `npm run build` — production build (must pass with zero errors)
- `npm run lint` — ESLint (must be clean)

## Stack
Next.js App Router (16) · TypeScript · Tailwind CSS v4 · three + @react-three/fiber + drei · gsap + ScrollTrigger · lenis. Fonts via `next/font`: Bricolage Grotesque (display), Instrument Serif (italic accents), JetBrains Mono (labels).

## Brand rules
- Single dark theme. Ink `#0a0a12`; twin accents ultramarine `#5b5bff` and flame `#ff6a3d`. Where they overlap, glow (additive blend / pale `#ffe9df` core). No purple→blue gradients, no SaaS look.
- Type is the personality: huge Bricolage headlines, serif-italic for the emphasised phrase (`*word*` in content.ts), tiny mono labels.
- Brand idea = "twin + pixel": two overlapping squares (logo, favicon, cursor, particles).
- Sharp corners / tiny radii. Film grain overlay. Generous whitespace.
- Never invent client names, socials or bios — add a `TODO` in `src/content.ts` instead.

## Architecture
- `src/content.ts` — ALL copy. Headline syntax: `\n` = new line, `*x*` = serif italic.
- `src/components/three/` — fixed WebGL canvas (`Scene` → dynamic, `ssr:false`). `formations.ts` builds 5 point formations; `shaders.ts` morphs between them on the GPU; `PixelField.tsx` maps scroll → formation index (section → stage table `STAGE_OF_SECTION`) with damping.
- `src/lib/scrollState.ts` — shared mutable scroll/pointer state (not React state).
- `src/components/layout/Reveals.tsx` — GSAP reveals driven by `data-lines`, `data-fade`, `data-stagger` attributes.
- `src/app/api/contact/route.ts` — validates (shared `lib/validate.ts`), logs, sends via Resend if `RESEND_API_KEY` is set.
- Section ids (`hero, services, work, process, team, contact`) are referenced by the nav, scroll rail and 3D scene — keep them in sync with `sections` in content.ts.

## Quality bar
Respect `prefers-reduced-motion` (no preloader/cursor/marquee motion, instant formations). Works without WebGL (CSS `.backdrop` fallback). No horizontal scroll down to 360px. Visible focus states, semantic HTML.
