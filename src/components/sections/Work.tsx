import { caseStudies, work } from "@/content";
import { Headline } from "@/components/ui/Headline";
import { Button } from "@/components/ui/Button";
import { WorkCard } from "@/components/work/WorkCard";

// Asymmetric 2x2: column spans, vertical offsets and aspect ratios per card.
const LAYOUT = [
  { col: "md:col-span-7", ratio: "aspect-[4/3]" },
  { col: "md:col-span-5 md:mt-24", ratio: "aspect-[4/5]" },
  { col: "md:col-span-5 md:-mt-12", ratio: "aspect-[4/5]" },
  { col: "md:col-span-7 md:mt-12", ratio: "aspect-[4/3]" },
];

export function Work() {
  return (
    <section
      id="work"
      data-section="Work"
      data-stage="2"
      aria-labelledby="work-title"
      className="relative py-28 md:py-44"
    >
      <div className="wrap">
        <p className="label mb-6" data-fade>
          {work.eyebrow}
        </p>
        <Headline
          id="work-title"
          text={work.headline}
          className="max-w-4xl text-[clamp(2.8rem,8vw,7.5rem)]"
        />

        <ul className="mt-16 grid gap-6 md:mt-24 md:grid-cols-12 md:gap-8" data-stagger>
          {caseStudies.slice(0, 4).map((study, i) => (
            <li key={study.slug} className={LAYOUT[i].col} data-stagger-item>
              <WorkCard study={study} index={i} ratio={LAYOUT[i].ratio} />
            </li>
          ))}
        </ul>

        <div className="mt-16 md:mt-24" data-fade>
          <Button href="/work" variant="ghost">
            {work.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
}
