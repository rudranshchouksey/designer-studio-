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
  // TODO: add a real booking link (Cal.com, Calendly, etc.). Empty = the "Book a call" button is hidden.
  // Can also be set with NEXT_PUBLIC_BOOKING_URL.
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  // TODO: confirm budget bands and currency with the studio.
  budgets: ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"],
  timelines: ["As soon as possible", "Within 1–3 months", "3–6 months", "Flexible"],
  year: new Date().getFullYear(),
};

export const nav = {
  links: [
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Start a project", href: "/contact" },
  themeLabel: { toLight: "Switch to light theme", toDark: "Switch to dark theme" },
};

// Section ids / labels / 3D formations are declared on the page sections themselves:
//   <section id="work" data-section="Work" data-stage="2">
// Stages: 0 twin spheres · 1 video frame · 2 interlocking rings · 3 double helix · 4 the Twinpix mark.

export const hero = {
  eyebrow: "Twinpix Studio — Creative studio",
  headline: "Made by two.\n*Seen by everyone.*",
  lede: "Divyani Jaiswal and Rudransh build films, identities and campaigns from scratch — two people, one studio, nothing off the shelf.",
  primary: { label: "Start a project", href: "/contact" },
  secondary: { label: "See the work", href: "/work" },
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
  viewAll: "All work",
  // /work page
  pageEyebrow: "Work",
  pageHeadline: "Selected work,\n*in the making.*",
  pageLede:
    "Case studies are on their way. Until then, these placeholders show how each project will be told.",
  filterLabel: "Filter by discipline",
  all: "All",
  empty: "Nothing in this discipline yet.",
  count: (n: number) => `${n} ${n === 1 ? "project" : "projects"}`,
  comingSoon: "Coming soon",
  // /work/[slug] template labels
  labels: {
    back: "All work",
    brief: "The brief",
    approach: "The approach",
    media: "Selected frames",
    outcome: "The outcome",
    next: "Next project",
    services: "Disciplines",
    year: "Year",
    status: "Status",
    soonNotice:
      "This case study is a placeholder. The real story — brief, approach, media and results — will be published here.",
  },
};

export type CaseStudy = {
  slug: string;
  title: string;
  discipline: "Video" | "Design" | "Branding" | "Marketing" | "Talent";
  /** "coming-soon" renders placeholder blocks; "published" renders the real copy below. */
  status: "coming-soon" | "published";
  year?: string;
  /** Hue (0–360) that tints the generated artwork. */
  hue: number;
  summary: string;
  services: string[];
  brief: string;
  approach: string;
  outcome: string;
  /** Frames for the media gallery. Without `src` a generated pixel artwork is shown. */
  media: { caption: string; src?: string; alt?: string }[];
};

/**
 * Case studies. To add one: copy an entry, give it a unique `slug`, set `status: "published"`
 * and fill in the copy. See README → "Adding a case study".
 * TODO: replace the four placeholders with real projects. Never invent client names.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "launch-film",
    title: "Launch film",
    discipline: "Video",
    status: "coming-soon",
    hue: 232,
    summary: "Placeholder for a launch-film case study.",
    services: ["Edit", "Motion", "Colour", "Sound"],
    brief: "The brief will appear here.",
    approach: "How the film was conceived, cut and finished will appear here.",
    outcome: "Results and where the film lived will appear here.",
    media: [{ caption: "Frame one" }, { caption: "Frame two" }, { caption: "Frame three" }],
  },
  {
    slug: "identity-system",
    title: "Identity system",
    discipline: "Branding",
    status: "coming-soon",
    hue: 14,
    summary: "Placeholder for a brand-identity case study.",
    services: ["Identity", "Strategy", "Guidelines"],
    brief: "The brief will appear here.",
    approach: "How the identity was developed will appear here.",
    outcome: "How the system is used and what it changed will appear here.",
    media: [{ caption: "Mark" }, { caption: "System" }, { caption: "In use" }],
  },
  {
    slug: "campaign-rollout",
    title: "Campaign rollout",
    discipline: "Marketing",
    status: "coming-soon",
    hue: 262,
    summary: "Placeholder for a marketing-campaign case study.",
    services: ["Campaigns", "Content", "Launch"],
    brief: "The brief will appear here.",
    approach: "How the campaign was planned and produced will appear here.",
    outcome: "Reach and results will appear here.",
    media: [{ caption: "Key visual" }, { caption: "Rollout" }, { caption: "Results" }],
  },
  {
    slug: "creator-roster",
    title: "Creator roster",
    discipline: "Talent",
    status: "coming-soon",
    hue: 24,
    summary: "Placeholder for a talent-management case study.",
    services: ["Creators", "Deals", "Growth"],
    brief: "The brief will appear here.",
    approach: "How the roster was built and managed will appear here.",
    outcome: "Growth and outcomes will appear here.",
    media: [{ caption: "Roster" }, { caption: "Partnerships" }, { caption: "Growth" }],
  },
];

export const about = {
  eyebrow: "About",
  headline: "Two people.\n*One way of working.*",
  // TODO: have the studio review and personalise this story (founding date, backgrounds, location).
  story: [
    "Twinpix Studio is a two-person creative studio. We make video, design, branding and marketing — and we build every project from scratch, because the work is only as good as the attention it gets.",
    "There's no account layer and no hand-off. The people you brief are the people who make it.",
  ],
  whyTwin: {
    eyebrow: "Why “twin”?",
    headline: "Two of us.\n*Two squares.*",
    body: [
      "Twinpix is built on a simple picture: two squares, overlapping. Where they meet, the colour glows — that overlap is how we work. Two perspectives on every project, pushed against each other until the idea is sharper than either started.",
      "The pixel is the smallest honest unit of anything on a screen. Get every one of them right and the whole frame follows.",
    ],
  },
  peopleEyebrow: "The people",
  principlesEyebrow: "How we work",
  principlesHeadline: "Small on purpose.\n*Serious about it.*",
  principles: [
    { name: "Built from scratch", line: "No templates, no recycled decks. Every project starts from your brief." },
    { name: "Two sets of hands", line: "Direct access to the people making your work, from first call to final export." },
    { name: "Decisions, not options", line: "We argue for one direction and show our reasoning — then refine it with you." },
    { name: "Shipped, then supported", line: "Launch is the middle of the story. We stay close once it's out in the world." },
  ],
  cta: { eyebrow: "Next", headline: "Have something\n*in mind?*", label: "Start a project", href: "/contact" },
};

export const notFound = {
  eyebrow: "404",
  headline: "Frame\n*not found.*",
  body: "The page you're looking for isn't in the edit. Let's get you back to something that is.",
  home: "Back to home",
  work: "See the work",
};

export const privacy = {
  eyebrow: "Privacy",
  headline: "Privacy,\n*plainly.*",
  // TODO: this is a plain-language template, not legal advice. Have it reviewed, then fill in the
  // legal entity name, registered address and a privacy contact email before launch.
  updated: "Last updated: [TODO date]",
  sections: [
    {
      heading: "Who we are",
      body: [
        "This site is run by Twinpix Studio ([TODO: legal entity name and address]). You can reach us about anything in this policy at the studio email shown on the contact page.",
      ],
    },
    {
      heading: "What we collect",
      body: [
        "Only what you send us through the contact form: your name, email address, the type of project, an optional budget and timeline, and your message. We use it to reply to you and to run the conversation about your project.",
        "We don't run analytics or advertising trackers, and we don't set tracking cookies.",
      ],
    },
    {
      heading: "How your message is handled",
      body: [
        "Form submissions are sent to the studio by email through our email provider (Resend), which processes them on our behalf. We keep enquiries only as long as needed to respond and to keep a record of the conversation.",
      ],
    },
    {
      heading: "Stored in your browser",
      body: [
        "To remember your light/dark theme choice the site stores a small value in your browser's local storage. A session-storage flag also remembers that you've already seen the intro animation during this visit. Neither is sent to us and neither identifies you.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "You can ask us what we hold about you, to correct it, or to delete it, by emailing the studio. Depending on where you live you may also have the right to complain to your local data-protection authority.",
      ],
    },
    {
      heading: "Changes",
      body: ["If we change how the site handles data we'll update this page and the date above."],
    },
  ],
};

export const processContent = {
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
  // Full /contact page
  pageEyebrow: "Contact",
  pageHeadline: "Tell us what\n*you're building.*",
  pageLede: "A few details help us come back with something useful. Everything except the basics is optional.",
  budgetLabel: "Budget range (optional)",
  timelineLabel: "Timeline (optional)",
  selectPlaceholder: "Select…",
  bookLabel: "Book a call",
  bookNote: "Prefer to talk it through? Pick a time that suits you.",
  emailNote: "Or write to us directly:",
  fullFormLink: "Share the full brief",
  response: "We reply within two working days.",
};

/** Validation messages shared by the form and the API route. */
export const errors = {
  need: "Pick at least one thing you need.",
  nameRequired: "Please tell us your name.",
  emailRequired: "Please enter your email.",
  emailInvalid: "That email doesn't look right.",
  messageRequired: "Please add a short message.",
  messageShort: "A little more detail, please (at least 10 characters).",
  invalidOption: "Please choose one of the listed options.",
};

export const footer = {
  // TODO: add social links, e.g. { label: "Instagram", href: "https://…" }. Empty = hidden.
  socials: [] as { label: string; href: string }[],
  backToTop: "Back to top",
  privacy: "Privacy",
  legal: "All rights reserved.",
};
