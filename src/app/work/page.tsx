import { work } from "@/content";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/pages/PageHero";
import { WorkIndex } from "@/components/work/WorkIndex";

export const metadata = pageMeta({
  title: "Work",
  description:
    "Selected work from Twinpix Studio across video, design, branding, marketing and talent management. Case studies are coming soon.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        section="Work"
        stage={2}
        eyebrow={work.pageEyebrow}
        headline={work.pageHeadline}
        lede={work.pageLede}
      />
      <section data-section="Projects" data-stage="2" data-scene="dim" aria-label="Projects" className="relative pb-28 md:pb-44">
        <div className="wrap">
          <WorkIndex />
        </div>
      </section>
    </>
  );
}
