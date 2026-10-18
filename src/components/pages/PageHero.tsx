import type { ReactNode } from "react";
import { Headline } from "@/components/ui/Headline";

type Props = {
  id?: string;
  /** Rail label for this section */
  section: string;
  /** 3D formation: 0 spheres · 1 frame · 2 rings · 3 helix · 4 mark */
  stage: number;
  dim?: boolean;
  eyebrow: string;
  headline: string;
  lede?: string;
  /** Keep content out of the left/right half the formation occupies */
  side?: "left" | "right";
  compact?: boolean;
  children?: ReactNode;
};

/** Top-of-page block shared by the inner pages. The h1 is eager so it paints with the first frame (LCP). */
export function PageHero({ id, section, stage, dim = true, eyebrow, headline, lede, side, compact, children }: Props) {
  return (
    <section
      id={id}
      data-section={section}
      data-stage={stage}
      data-scene={dim ? "dim" : undefined}
      className={`relative flex flex-col justify-end pb-16 pt-36 md:pb-24 ${compact ? "min-h-[48svh]" : "min-h-[72svh]"}`}
    >
      <div className={`wrap w-full ${side === "right" ? "md:pl-[calc(var(--gutter)+54%)]" : ""}`}>
        <p className="label rise mb-6" style={{ animationDelay: "0.1s" }}>
          {eyebrow}
        </p>
        <Headline
          as="h1"
          eager
          text={headline}
          className="text-[clamp(3.2rem,10.5vw,9.5rem)]"
        />
        {lede && (
          <p className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-paper/80 md:text-lg">{lede}</p>
        )}
        {children}
      </div>
    </section>
  );
}
