import { team } from "@/content";
import { Headline } from "@/components/ui/Headline";
import Image from "next/image";
import { PixelArt } from "@/components/work/PixelArt";

/** The two team cards, reused on the home page and /about. */
export function TeamCards({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid gap-6 sm:grid-cols-2 ${className}`} data-stagger>
      {team.members.map((m, i) => (
        <li key={m.name} data-stagger-item className="h-full">
          <article className="h-full border border-line bg-ink/60 backdrop-blur-sm">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              {m.photo ? (
                <Image
                  src={m.photo.src}
                  alt={m.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <PixelArt hue={m.hue} seed={40 + i * 7} variant="portrait" cell={11} />
              )}
            </div>
            <div className="p-5 md:p-6">
              <h3 className="display text-3xl">{m.name}</h3>
              <p className={`label mt-2 ${i ? "text-flame" : "text-ultra-text"}`}>{m.role}</p>
              <p className="mt-4 text-paper/75">{m.bio}</p>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export function Team() {
  return (
    <section
      id="team"
      data-section="Team"
      data-stage="3"
      aria-labelledby="team-title"
      className="relative py-28 md:py-44"
    >
      <div className="wrap">
        <p className="label mb-6" data-fade>
          {team.eyebrow}
        </p>
        <Headline
          id="team-title"
          text={team.headline}
          className="max-w-3xl text-[clamp(2.8rem,8vw,7.5rem)]"
        />
        <TeamCards className="mt-16 md:mt-24 md:max-w-[56%]" />
      </div>
    </section>
  );
}
