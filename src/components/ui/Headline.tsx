import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
};

/**
 * Renders a content.ts headline. "\n" = new line, *asterisks* = serif italic accent.
 * Each line is masked so GSAP (Reveals) can slide it up.
 */
export function Headline({ text, as: Tag = "h2", className = "", id }: Props) {
  const lines = text.split("\n");
  return (
    <Tag id={id} className={`display ${className}`} data-lines>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <span className="line-inner" data-line>
            {line.split("*").map((part, j) =>
              j % 2 === 1 ? <em key={j}>{part}</em> : <span key={j}>{part}</span>,
            )}
          </span>
        </span>
      ))}
    </Tag>
  );
}
