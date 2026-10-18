import { hero } from "@/content";
import { Headline } from "@/components/ui/Headline";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-end pb-8 pt-28 md:pb-10"
    >
      <div className="wrap w-full">
        <p className="label rise mb-6 flex items-center gap-3" style={{ animationDelay: "0.1s" }}>
          <span aria-hidden="true" className="relative inline-block h-2.5 w-2.5">
            <span className="absolute left-0 top-0 h-2 w-2 bg-ultra" />
            <span className="absolute bottom-0 right-0 h-2 w-2 bg-flame mix-blend-screen" />
          </span>
          {hero.eyebrow}
        </p>

        <Headline
          as="h1"
          eager
          id="hero-title"
          text={hero.headline}
          className="text-[clamp(3.6rem,17vw,5.5rem)] md:text-[clamp(5.5rem,12vw,11.5rem)]"
        />

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <p
            className="max-w-xl text-[1.05rem] leading-relaxed text-paper/80 md:col-span-6 md:text-lg"
          >
            {hero.lede}
          </p>
          <div className="rise flex flex-wrap gap-3 md:col-span-6 md:justify-end" style={{ animationDelay: "0.3s" }}>
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            <Button href={hero.secondary.href} variant="ghost">
              {hero.secondary.label}
            </Button>
          </div>
        </div>

        <p
          className="label rise mt-8 flex items-center gap-4 md:mt-10"
          style={{ animationDelay: "0.45s" }}
          aria-hidden="true"
        >
          <span className="relative block h-px w-14 overflow-hidden bg-line">
            <span className="absolute inset-y-0 left-0 w-1/2 animate-[hint_2.2s_var(--ease-out)_infinite] bg-flame" />
          </span>
          {hero.scrollHint}
        </p>
      </div>
    </section>
  );
}
