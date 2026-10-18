import { about } from "@/content";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/pages/PageHero";
import { Headline } from "@/components/ui/Headline";
import { Button } from "@/components/ui/Button";
import { TeamCards } from "@/components/sections/Team";

export const metadata = pageMeta({
  title: "About",
  description:
    "Twinpix Studio is a two-person creative studio led by Divyani Jaiswal and Rudransh. Learn why “twin”, who we are and how we work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        section="About"
        stage={0}
        eyebrow={about.eyebrow}
        headline={about.headline}
        side="left"
      >
        <div className="mt-10 max-w-xl space-y-5 text-[1.05rem] leading-relaxed text-paper/80 md:text-lg">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </PageHero>

      <section
        data-section="Why twin"
        data-stage="4"
        aria-labelledby="why-title"
        className="relative py-28 md:py-44"
      >
        <div className="wrap">
          <p className="label mb-6" data-fade>
            {about.whyTwin.eyebrow}
          </p>
          <Headline
            id="why-title"
            text={about.whyTwin.headline}
            className="max-w-4xl text-[clamp(2.8rem,8vw,7.5rem)]"
          />
          <div className="mt-12 max-w-xl space-y-5 text-[1.05rem] leading-relaxed text-paper/80 md:mt-20 md:text-lg" data-fade>
            {about.whyTwin.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section
        data-section="People"
        data-stage="3"
        aria-label="The people"
        className="relative py-28 md:py-44"
      >
        <div className="wrap">
          <p className="label mb-10" data-fade>
            {about.peopleEyebrow}
          </p>
          <TeamCards className="md:max-w-[56%]" />
        </div>
      </section>

      <section
        data-section="How we work"
        data-stage="3"
        aria-labelledby="principles-title"
        className="relative py-28 md:py-44"
      >
        <div className="wrap">
          <p className="label mb-6" data-fade>
            {about.principlesEyebrow}
          </p>
          <Headline
            id="principles-title"
            text={about.principlesHeadline}
            className="max-w-3xl text-[clamp(2.8rem,8vw,7.5rem)]"
          />
          <ol className="mt-16 max-w-xl md:mt-24 md:max-w-[44%]">
            {about.principles.map((s, i) => (
              <li
                key={s.name}
                data-fade
                className="grid grid-cols-[3.2rem_1fr] gap-x-4 border-t border-line py-8 md:py-10"
              >
                <span className={`display text-3xl ${i % 2 ? "text-flame" : "text-ultra-text"}`} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-[clamp(1.8rem,3.6vw,3rem)]">{s.name}</h3>
                  <p className="mt-3 text-paper/75">{s.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-section="Next" data-stage="4" aria-labelledby="about-cta" className="relative pb-32 pt-12 md:pb-48">
        <div className="wrap">
          <p className="label mb-6" data-fade>
            {about.cta.eyebrow}
          </p>
          <Headline
            id="about-cta"
            text={about.cta.headline}
            className="text-[clamp(2.8rem,9vw,8.5rem)]"
          />
          <div className="mt-10" data-fade>
            <Button href={about.cta.href}>{about.cta.label}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
