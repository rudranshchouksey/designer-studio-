# Twinpix Studio — website

Next.js (App Router) · TypeScript · Tailwind CSS · three.js / react-three-fiber · GSAP · Lenis.

## Local setup
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```
Requires Node 20+.

## Editing content
All copy lives in **`src/content.ts`** — no component edits needed.
- Headlines: `\n` starts a new line, `*word*` becomes the serif-italic accent.
- Services, work cards, process steps, team members, form labels and validation messages are all arrays/objects in that file.

## Placeholders to replace (search for `TODO` in `src/content.ts`)
| Item | Where | Status |
|---|---|---|
| Studio email | `site.email` | `hello@twinpix.studio` is a placeholder |
| Production URL | `site.url` / `NEXT_PUBLIC_SITE_URL` | placeholder, used for Open Graph |
| Social links | `footer.socials` | empty → hidden in the footer |
| Rudransh's role | `team.members[1].role` | "Co-founder" placeholder |
| Rudransh's bio | `team.members[1].bio` | "Bio coming soon." |
| Real case studies | `work.items` | four placeholder cards, "Case study coming soon" (no client names invented) |

## Contact form & email
The form posts to `POST /api/contact`, which validates input (same rules as the client), and:
- **without `RESEND_API_KEY`**: logs the submission to the server console and returns success;
- **with `RESEND_API_KEY`**: sends a real email through [Resend](https://resend.com).

Setup:
1. Create a Resend account and an API key (verify a sending domain for production).
2. Copy `.env.example` to `.env.local` and fill in:
   - `RESEND_API_KEY` — your key
   - `CONTACT_TO_EMAIL` — where enquiries go (defaults to `site.email`)
   - `CONTACT_FROM_EMAIL` — e.g. `Twinpix Studio <hello@yourdomain.com>` (defaults to Resend's `onboarding@resend.dev`, which can only deliver to your own Resend account email)
3. On Vercel, add the same variables under Project → Settings → Environment Variables.

A hidden honeypot field filters most bots.

## Deploy on Vercel
1. Push this repo to GitHub.
2. In Vercel: **Add New → Project**, import the repo. The Next.js preset is detected automatically — no config needed.
3. Add the environment variables above (optional until you want real email), then deploy.

## Notes
- The 3D scene is loaded with `next/dynamic` (`ssr: false`). Without WebGL the site falls back to a CSS gradient backdrop.
- `prefers-reduced-motion` disables the preloader, custom cursor, smooth scroll, marquee motion and animated formations.
- Mobile uses ~10k points and a capped pixel ratio.
