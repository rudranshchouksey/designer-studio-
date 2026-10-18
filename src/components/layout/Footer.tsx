import Link from "next/link";
import { footer, nav, site } from "@/content";
import { BackToTop } from "./BackToTop";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="wrap flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="label">
          © {site.year} {site.name}. {footer.legal}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {nav.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="label transition-colors hover:text-flame">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/privacy" className="label transition-colors hover:text-flame">
              {footer.privacy}
            </Link>
          </li>
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
        <BackToTop label={footer.backToTop} />
      </div>
    </footer>
  );
}
