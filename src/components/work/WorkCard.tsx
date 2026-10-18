import Link from "next/link";
import { work, type CaseStudy } from "@/content";
import { PixelArt } from "./PixelArt";
import { TiltCard } from "./TiltCard";

type Props = { study: CaseStudy; index: number; ratio?: string; heading?: "h2" | "h3" };

/** Case-study card: generated pixel artwork, discipline label, title, and a "coming soon" / "view" marker. */
export function WorkCard({ study, index, ratio = "aspect-[4/3]", heading: Heading = "h3" }: Props) {
  const soon = study.status === "coming-soon";
  return (
    <TiltCard>
      <Link
        href={`/work/${study.slug}`}
        className="group relative block overflow-hidden border border-line bg-ink-2"
      >
        <div className={`relative w-full ${ratio}`}>
          <PixelArt hue={study.hue} seed={index + 3} cell={index % 2 ? 12 : 16} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
          <span className="label absolute left-4 top-4 bg-ink/70 px-2 py-1 text-paper">
            {String(index + 1).padStart(2, "0")} · {study.discipline}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-7">
          <Heading className="display text-[clamp(1.8rem,3.6vw,3.2rem)]">{study.title}</Heading>
          <p className="label flex shrink-0 items-center gap-2 text-paper/80">
            {soon ? (
              <>
                <span aria-hidden="true" className="h-2 w-2 animate-pulse bg-flame" />
                {work.note}
              </>
            ) : (
              <>
                View case study{" "}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </p>
        </div>
      </Link>
    </TiltCard>
  );
}
