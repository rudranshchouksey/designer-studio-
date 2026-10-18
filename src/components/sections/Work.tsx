import { work } from "@/content";
import { Headline } from "@/components/ui/Headline";
import { PixelArt } from "@/components/work/PixelArt";
import { TiltCard } from "@/components/work/TiltCard";

// Asymmetric 2x2: column spans, vertical offsets and aspect ratios per card.
const LAYOUT = [
  { col: "md:col-span-7", ratio: "aspect-[4/3]" },
  { col: "md:col-span-5 md:mt-24", ratio: "aspect-[4/5]" },
  { col: "md:col-span-5 md:-mt-12", ratio: "aspect-[4/5]" },
  { col: "md:col-span-7 md:mt-12", ratio: "aspect-[4/3]" },
];

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-28 md:py-44">
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
          {work.items.map((item, i) => (
            <li key={item.title} className={LAYOUT[i].col} data-stagger-item>
              <TiltCard>
                <article
                  data-cursor
                  className="group relative overflow-hidden border border-line bg-ink-2"
                >
                  <div className={`relative w-full ${LAYOUT[i].ratio}`}>
                    <PixelArt hue={item.hue} seed={i + 3} cell={i % 2 ? 12 : 16} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                    <span className="label absolute left-4 top-4 bg-ink/70 px-2 py-1 text-paper">
                      {String(i + 1).padStart(2, "0")} · {item.kind}
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-7">
                    <h3 className="display text-[clamp(1.8rem,3.6vw,3.2rem)]">{item.title}</h3>
                    <p className="label flex shrink-0 items-center gap-2 text-paper/80">
                      <span aria-hidden="true" className="h-2 w-2 animate-pulse bg-flame" />
                      {work.note}
                    </p>
                  </div>
                </article>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
