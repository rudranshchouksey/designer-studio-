import { footer, site } from "@/content";
import { BackToTop } from "./BackToTop";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="wrap flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="label">
          © {site.year} {site.name}. {footer.legal}
        </p>
        {footer.socials.length > 0 && (
          <ul className="flex flex-wrap gap-6" aria-label="Social links">
            {footer.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="label transition-colors hover:text-flame"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <BackToTop label={footer.backToTop} />
      </div>
    </footer>
  );
}
