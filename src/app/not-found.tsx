import type { Metadata } from "next";
import { notFound as copy } from "@/content";
import { PageHero } from "@/components/pages/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageHero section="404" stage={1} eyebrow={copy.eyebrow} headline={copy.headline} lede={copy.body} side="right">
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/">{copy.home}</Button>
        <Button href="/work" variant="ghost">
          {copy.work}
        </Button>
      </div>
    </PageHero>
  );
}
