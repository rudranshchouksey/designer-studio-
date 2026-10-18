"use client";

import { useState } from "react";
import { caseStudies, work } from "@/content";
import { WorkCard } from "./WorkCard";

const disciplines = Array.from(new Set(caseStudies.map((c) => c.discipline)));

/** Discipline filter + grid for /work. */
export function WorkIndex() {
  const [active, setActive] = useState<string>(work.all);
  const items = active === work.all ? caseStudies : caseStudies.filter((c) => c.discipline === active);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div role="group" aria-label={work.filterLabel} className="flex flex-wrap gap-2.5">
          {[work.all, ...disciplines].map((d) => {
            const on = d === active;
            return (
              <button
                key={d}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(d)}
                className={`border px-4 py-2.5 font-mono text-[0.78rem] uppercase tracking-[0.12em] transition-colors ${
                  on
                    ? "border-flame bg-flame text-ink"
                    : "border-line text-paper hover:border-ultra hover:bg-ultra/15"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
        <p className="label" role="status" aria-live="polite">
          {work.count(items.length)}
        </p>
      </div>

      {items.length ? (
        <ul key={active} className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
          {items.map((study, i) => (
            <li key={study.slug} className="rise" style={{ animationDelay: `${i * 0.07}s` }}>
              <WorkCard study={study} index={caseStudies.indexOf(study)} ratio="aspect-[4/3]" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-16 text-paper/70">{work.empty}</p>
      )}
    </div>
  );
}
