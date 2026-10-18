import { privacy } from "@/content";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/pages/PageHero";

export const metadata = pageMeta({
  title: "Privacy",
  description: "How Twinpix Studio handles the information you send through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        section="Privacy"
        stage={4}
        dim
        eyebrow={privacy.eyebrow}
        headline={privacy.headline}
        lede={privacy.updated}
        compact
      />
      <section data-section="Policy" aria-label="Privacy policy" className="relative pb-28 md:pb-44">
        <div className="wrap">
          <div className="max-w-2xl border border-line bg-ink/75 p-6 backdrop-blur-md md:p-10">
            {privacy.sections.map((s, i) => (
              <section key={s.heading} className={i ? "mt-10" : ""}>
                <h2 className="display text-2xl md:text-3xl">{s.heading}</h2>
                <div className="mt-4 space-y-4 leading-relaxed text-paper/80">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
