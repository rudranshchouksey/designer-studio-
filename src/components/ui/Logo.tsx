type MarkProps = { size?: number; className?: string };

/** The Twinpix mark: two overlapping squares whose overlap glows. */
export function LogoMark({ size = 28, className }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2" y="2" width="19" height="19" fill="#5b5bff" />
      <rect x="11" y="11" width="19" height="19" fill="#ff6a3d" />
      <rect x="11" y="11" width="10" height="10" fill="#ffe9df" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="display text-[1.15rem] tracking-[-0.03em]">
        Twinpix<span className="serif text-flame"> studio</span>
      </span>
    </span>
  );
}
