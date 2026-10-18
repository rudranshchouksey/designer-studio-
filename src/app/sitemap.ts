import type { MetadataRoute } from "next";
import { caseStudies, site } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, "");
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "monthly" | "yearly" = "monthly") => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1),
    page("/work", 0.9),
    ...caseStudies.map((c) => page(`/work/${c.slug}`, c.status === "published" ? 0.8 : 0.4)),
    page("/about", 0.7),
    page("/contact", 0.8),
    page("/privacy", 0.2, "yearly"),
  ];
}
