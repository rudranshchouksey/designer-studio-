/**
 * All site copy lives here. Edit text freely — components only render it.
 *
 * Headline syntax: "\n" starts a new line, *asterisks* mark the serif-italic accent.
 *
 * Search for "TODO" to find every placeholder that still needs real information.
 */

export const site = {
  name: "Twinpix Studio",
  tagline: "Made by two. Seen by everyone.",
  description:
    "Twinpix Studio is a two-person creative studio — video editing, graphic design, branding, marketing and talent management, built from scratch for clients.",
  // TODO: confirm the real studio email address (placeholder).
  email: "hello@twinpix.studio",
  // TODO: add the production URL (also settable with NEXT_PUBLIC_SITE_URL).
  url: "https://twinpix.studio",
  year: new Date().getFullYear(),
};

export const nav = {
  links: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Team", href: "#team" },
  ],
  cta: { label: "Start a project", href: "#contact" },
};

/** Section ids, used by the scroll rail and the 3D scene. Order matters. */
export const sections = [
  { id: "hero", label: "Intro" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
] as const;

export const hero = {
  eyebrow: "Twinpix Studio — Creative studio",
  headline: "Made by two.\n*Seen by everyone.*",
  lede: "Divyani Jaiswal and Rudransh build films, identities and campaigns from scratch — two people, one studio, nothing off the shelf.",
  primary: { label: "Start a project", href: "#contact" },
  secondary: { label: "See the work", href: "#work" },
  scrollHint: "Scroll to split the frame",
};

export const marquee = [
  "Video editing",
  "Graphic design",
  "Branding",
  "Marketing",
  "Talent management",
  "Everything in between",
];

export const services = {
  eyebrow: "01 — Services",
  headline: "One studio for\nthe *whole story.*",
  items: [
    {
      name: "Video editing",
      line: "Cuts that hold attention — from launch films to short-form.",
      tags: ["Edit", "Motion", "Colour", "Sound"],
    },
    {
      name: "Graphic design",
      line: "Layouts, decks and visuals with a point of view.",
      tags: ["Print", "Social", "Editorial"],
    },
    {
      name: "Branding",
      line: "Names, marks and systems built to be recognised at a glance.",
      tags: ["Identity", "Strategy", "Guidelines"],
    },
    {
      name: "Marketing",
      line: "Campaigns planned, produced and rolled out end to end.",
      tags: ["Campaigns", "Content", "Launch"],
    },
    {
      name: "Talent management",
      line: "Representation and growth for creators worth backing.",
      tags: ["Creators", "Deals", "Growth"],
    },
    {
      name: "Everything in between",
      line: "Sites, scripts, one-off oddities. If it needs making, we make it.",
      tags: ["Web", "Scripts", "Custom"],
    },
  ],
};

export const work = {
  eyebrow: "02 — Work",
  headline: "Built to be\n*remembered.*",
  note: "Case study coming soon",
  // TODO: replace these placeholders with real case studies (title, client, link) when ready.
  // Do not invent client names. `hue` tints the generated artwork (0–360).
  items: [
    { title: "Launch film", kind: "Video", hue: 232 },
    { title: "Identity system", kind: "Branding", hue: 14 },
    { title: "Campaign rollout", kind: "Marketing", hue: 262 },
    { title: "Creator roster", kind: "Talent", hue: 24 },
  ],
};

export const process = {
  eyebrow: "03 — Process",
  headline: "Four steps.\n*No detours.*",
  steps: [
    {
      name: "Brief",
      line: "We listen first: goals, audience, and the thing you can't quite name yet.",
    },
    {
      name: "Concept",
      line: "Ideas on the table fast — one clear direction, argued for.",
    },
    {
      name: "Make",
      line: "Two sets of hands, one standard. Built from scratch, never templated.",
    },
    {
      name: "Launch",
      line: "We ship it, watch it land, and stay close once it's out in the world.",
    },
  ],
};

export const team = {
  eyebrow: "04 — Team",
  headline: "Two people.\n*One studio.*",
  members: [
    {
      name: "Divyani Jaiswal",
      role: "Founder & Design Lead",
      bio: "Sets the creative direction and holds every frame to it.",
      hue: 232,
    },
    {
      name: "Rudransh",
      // TODO: confirm Rudransh's exact role (placeholder).
      role: "Co-founder",
      // TODO: replace with Rudransh's real bio (placeholder).
      bio: "Bio coming soon.",
      hue: 14,
    },
  ],
};

export const contact = {
  eyebrow: "05 — Contact",
  headline: "Let's make something\n*worth watching.*",
  intro: "Tell us what you're building. We reply within two working days.",
  needsLabel: "What do you need?",
  needs: ["Video", "Design", "Branding", "Marketing", "Talent", "Other"],
  fields: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@company.com" },
    message: { label: "Message", placeholder: "A few lines about the project…" },
  },
  submit: "Send message",
  sending: "Sending…",
  success: "Thank you — your message is in. We'll be in touch soon.",
  failure: "Something went wrong sending that. Please try again, or email us directly.",
  copyLabel: "Copy email",
  copiedLabel: "Copied",
};

/** Validation messages shared by the form and the API route. */
export const errors = {
  need: "Pick at least one thing you need.",
  nameRequired: "Please tell us your name.",
  emailRequired: "Please enter your email.",
  emailInvalid: "That email doesn't look right.",
  messageRequired: "Please add a short message.",
  messageShort: "A little more detail, please (at least 10 characters).",
};

export const footer = {
  // TODO: add social links, e.g. { label: "Instagram", href: "https://…" }. Empty = hidden.
  socials: [] as { label: string; href: string }[],
  backToTop: "Back to top",
  legal: "All rights reserved.",
};
