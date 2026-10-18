import type { Metadata } from "next";
import { site } from "@/content";

/** Per-page metadata: title, description, canonical + Open Graph/Twitter (image inherited from opengraph-image.tsx). */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · ${site.name}`, description, url: path, type: "website" },
    twitter: { title: `${title} · ${site.name}`, description },
  };
}
