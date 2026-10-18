# Twinpix Studio — website

Next.js (App Router) · TypeScript · Tailwind CSS v4 · three.js / react-three-fiber · GSAP · Lenis.

## Local setup
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```
Requires Node 20+.

## Routes
| Route | What it is | 3D formation |
|---|---|---|
| `/` | One-page story: hero, services, work, process, team, contact | spheres → frame → rings → helix → mark |
| `/work` | Case-study index with discipline filter | rings |
| `/work/[slug]` | Case-study template (brief, approach, media, outcome, next project) | rings |
| `/about` | Story, why “twin”, the people, how we work | spheres → mark → helix |
| `/contact` | Full brief form (type, budget, timeline, message) + booking button | mark |
| `/privacy` | Privacy policy template | mark (dimmed) |
| 404 | Branded “Frame not found” | frame |

The WebGL canvas lives in the root layout, so it is created once and **morphs between formations on navigation** instead of reloading. Each page declares which formation it wants with data attributes on its sections:

```html
<section data-section="Work" data-stage="2" data-scene="dim">
```
`data-stage` 0 spheres · 1 video frame · 2 rings · 3 double helix · 4 the Twinpix mark. `data-scene="dim"` fades the particles so text stays readable. `data-section` is the label shown on the scroll rail.

## Editing content
All copy lives in **`src/content.ts`** — no component edits needed.
- Headlines: `\n` starts a new line, `*word*` becomes the serif-italic accent.
- Services, process steps, team, about page, privacy policy, form labels and validation messages are all objects/arrays in that file.

### Adding a case study
1. Open `src/content.ts` and find `caseStudies`.
2. Copy an existing entry and give it a **unique `slug`** (this becomes `/work/<slug>`).
3. Fill in the fields:
   - `title`, `discipline` (`Video | Design | Branding | Marketing | Talent`), `year`, `services` (tags), `summary` (one sentence, also used for SEO).
   - `brief`, `approach`, `outcome` — the three story blocks.
   - `media` — frames for the gallery. Add an image to `public/work/<slug>/…` and set `src: "/work/<slug>/frame-1.jpg"` plus an `alt`. Without `src` a generated pixel artwork is shown.
   - `hue` (0–360) tints the generated artwork used on cards.
   - `status: "published"` (placeholders use `"coming-soon"`, which shows a “coming soon” notice).
4. That's it: the card appears on `/` and `/work`, the page is statically generated, and it is added to `sitemap.xml` automatically. Disciplines appear in the filter automatically. Never invent client names.

## Theme (light / dark)
Dark is the default. The nav toggle saves the choice in `localStorage` (`twinpix-theme`) and an inline script in `<head>` applies it before first paint (no flash). Colours are CSS variables defined in `src/app/globals.css` (`--ink` is always the page background, `--paper` the text colour); Tailwind classes like `bg-ink` / `text-paper` follow them. In the light theme the particle shader switches from additive to normal blending with deeper ultramarine/flame. Text contrast is ≥ 4.5:1 in both themes; if you change colours, re-check them.

## Performance notes
- The headline is server-rendered and painted immediately; only a CSS rise animates it.
- The intro (corner counter, < 1 s) shows on the **first visit of a session only** (`sessionStorage`) and never for reduced-motion users. It never covers content.
- GSAP / ScrollTrigger / Lenis and the WebGL scene are loaded lazily after first paint.
- `prefers-reduced-motion` disables the intro, custom cursor, smooth scroll, marquee motion and animated formations. Without WebGL the site falls back to a CSS gradient backdrop.

## Placeholders to replace (search for `TODO` in `src/content.ts`)
| Item | Where | Status |
|---|---|---|
| Studio email | `site.email` | `hello@twinpix.studio` is a placeholder |
| Production URL | `site.url` / `NEXT_PUBLIC_SITE_URL` | placeholder, used for Open Graph + sitemap |
| Booking link | `site.bookingUrl` / `NEXT_PUBLIC_BOOKING_URL` | empty → “Book a call” button hidden |
| Budget bands / currency | `site.budgets` | placeholder ranges |
| Social links | `footer.socials` | empty → hidden in the footer |
| Rudransh's role | `team.members[1].role` | “Co-founder” placeholder |
| Rudransh's bio | `team.members[1].bio` | “Bio coming soon.” |
| Real case studies | `caseStudies` | four placeholders, “coming soon”, no clients invented |
| About story | `about.story` | generic copy — personalise (founding date, backgrounds, location) |
| Privacy policy | `privacy` | plain-language **template, not legal advice**; fill in legal entity, address, date and have it reviewed |

## Contact form & email
Both forms (home: compact, `/contact`: full) post to `POST /api/contact`, which validates input (same rules as the client) and:
- **without `RESEND_API_KEY`**: logs the submission to the server console and returns success;
- **with `RESEND_API_KEY`**: sends a real email through [Resend](https://resend.com).

Setup:
1. Create a Resend account and an API key (verify a sending domain for production).
2. Copy `.env.example` to `.env.local` and fill in:
   - `RESEND_API_KEY` — your key
   - `CONTACT_TO_EMAIL` — where enquiries go (defaults to `site.email`)
   - `CONTACT_FROM_EMAIL` — e.g. `Twinpix Studio <hello@yourdomain.com>` (defaults to Resend's `onboarding@resend.dev`, which can only deliver to your own Resend account email)
   - `NEXT_PUBLIC_BOOKING_URL` — optional booking link
3. On Vercel, add the same variables under Project → Settings → Environment Variables.

A hidden honeypot field filters most bots.

## Deploy on Vercel
1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo. The Next.js preset is detected automatically — no config needed.
3. Add the environment variables above (optional until you want real email), then deploy.
