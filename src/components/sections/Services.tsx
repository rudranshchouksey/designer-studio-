import { services } from "@/content";
import { Headline } from "@/components/ui/Headline";

export function Services() {
  return (
    <section
      id="services" data-section="Services" data-stage="1"
      aria-labelledby="services-title"
      className="relative py-28 md:py-44"
    >
      <div className="wrap md:pl-[calc(var(--gutter)+50%)]">
        <p className="label mb-6" data-fade>
          {services.eyebrow}
        </p>
        <Headline
          id="services-title"
          text={services.headline}
          className="max-w-4xl text-[clamp(2.8rem,8vw,7.5rem)] md:text-[clamp(2.8rem,5.4vw,6rem)]"
        />

        <ol className="mt-16 border-t border-line md:mt-24" data-stagger>
          {services.items.map((s, i) => (
            <li
              key={s.name}
              data-stagger-item
              data-cursor
              className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-7 transition-[transform,background-color] duration-500 ease-[var(--ease-out)] hover:translate-x-3 hover:bg-white/[0.03] md:grid-cols-[3.5rem_1fr] md:py-9"
            >
              <span className="label pt-2 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3
                  className={`display text-[clamp(1.9rem,4.4vw,3.6rem)] transition-colors duration-300 ${
                    i % 2 ? "group-hover:text-flame" : "group-hover:text-ultra"
                  }`}
                >
                  {s.name}
                </h3>
                <p className="mt-3 max-w-md text-paper/75">{s.line}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${s.name} tags`}>
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="border border-line px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-mute"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
