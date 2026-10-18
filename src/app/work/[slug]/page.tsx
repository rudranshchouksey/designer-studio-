import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, work } from "@/content";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/pages/PageHero";
import { PixelArt } from "@/components/work/PixelArt";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};
  return pageMeta({
    title: `${study.title} — ${study.discipline} case study`,
    description: study.summary,
    path: `/work/${study.slug}`,
  });
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:py-16" data-fade>
      <h2 className="label md:col-span-3">{label}</h2>
      <div className="max-w-2xl text-xl leading-relaxed text-paper/90 md:col-span-8 md:text-2xl">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const study = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];
  const soon = study.status === "coming-soon";
  const L = work.labels;

  return (
    <article>
      <PageHero
        section={study.title}
        stage={2}
        eyebrow={`${study.discipline} · Case study`}
        headline={study.title}
        lede={study.summary}
        compact
      >
        <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
          <div>
            <dt className="label">{L.services}</dt>
            <dd className="mt-1">{study.services.join(" · ")}</dd>
          </div>
          <div>
            <dt className="label">{L.year}</dt>
            <dd className="mt-1">{study.year ?? "—"}</dd>
          </div>
          <div>
            <dt className="label">{L.status}</dt>
            <dd className="mt-1">{soon ? work.comingSoon : "Published"}</dd>
          </div>
        </dl>
      </PageHero>

      <div className="wrap pb-24 md:pb-40" data-stage="2" data-scene="dim">
        {soon && (
          <p
            role="note"
            className="mb-4 border border-line border-l-flame bg-ink/70 p-5 text-paper/85 backdrop-blur-sm [border-left-width:3px]"
          >
            <span className="label mr-3 text-flame">{work.comingSoon}</span>
            {L.soonNotice}
          </p>
        )}

        <Block label={L.brief}>{study.brief}</Block>
        <Block label={L.approach}>{study.approach}</Block>

        <section className="border-t border-line py-12 md:py-16" aria-labelledby="media-title">
          <h2 id="media-title" className="label mb-8" data-fade>
            {L.media}
          </h2>
          <ul className="grid gap-6 md:grid-cols-3" data-stagger>
            {study.media.map((m, i) => (
              <li key={m.caption} data-stagger-item>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden border border-line bg-ink-2">
                    {m.src ? (
                      <Image
                        src={m.src}
                        alt={m.alt ?? m.caption}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <PixelArt hue={(study.hue + i * 28) % 360} seed={index * 7 + i + 5} cell={14} />
                    )}
                  </div>
                  <figcaption className="label mt-3">
                    {m.caption}
                    {!m.src && soon ? " · placeholder" : ""}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <Block label={L.outcome}>{study.outcome}</Block>

        <nav aria-label="Next project" className="border-t border-line pt-12 md:pt-16" data-fade>
          <p className="label mb-4">{L.next}</p>
          <Link
            href={`/work/${next.slug}`}
            className="display group inline-flex flex-wrap items-baseline gap-x-6 text-[clamp(2.4rem,8vw,7rem)] transition-colors hover:text-flame"
          >
            {next.title}
            <span aria-hidden="true" className="serif text-flame transition-transform duration-300 group-hover:translate-x-3">
              →
            </span>
          </Link>
          <div className="mt-10">
            <Link href="/work" className="label transition-colors hover:text-flame">
              ← {L.back}
            </Link>
          </div>
        </nav>
      </div>
    </article>
  );
}
