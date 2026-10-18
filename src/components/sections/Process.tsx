import { processContent as content } from "@/content";
import { Headline } from "@/components/ui/Headline";

export function Process() {
  return (
    <section id="process" data-section="Process" data-stage="3" aria-labelledby="process-title" className="relative py-28 md:py-44">
      <div className="wrap">
        <p className="label mb-6" data-fade>
          {content.eyebrow}
        </p>
        <Headline
          id="process-title"
          text={content.headline}
          className="max-w-3xl text-[clamp(2.8rem,8vw,7.5rem)]"
        />

        <ol className="mt-16 max-w-xl md:mt-24 md:max-w-[44%]">
          {content.steps.map((s, i) => (
            <li
              key={s.name}
              data-fade
              className="grid grid-cols-[3.2rem_1fr] gap-x-4 border-t border-line py-9 md:py-12"
            >
              <span
                className={`display text-3xl ${i % 2 ? "text-flame" : "text-ultra"}`}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="display text-[clamp(2rem,4vw,3.4rem)]">{s.name}</h3>
                <p className="mt-3 text-paper/75">{s.line}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
