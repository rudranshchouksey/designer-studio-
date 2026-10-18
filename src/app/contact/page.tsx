import { contact, site } from "@/content";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/pages/PageHero";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Start a project with Twinpix Studio. Tell us what you need, your budget and timeline — we reply within two working days.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        section="Contact"
        stage={4}
        eyebrow={contact.pageEyebrow}
        headline={contact.pageHeadline}
        lede={contact.pageLede}
        compact
      />
      <section data-section="Brief" aria-label="Project brief" className="relative pb-28 md:pb-44">
        <div className="wrap grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4" data-fade>
            <p className="text-lg text-paper/80">{contact.response}</p>

            {site.bookingUrl && (
              <div className="mt-8">
                <p className="mb-4 max-w-xs text-paper/70">{contact.bookNote}</p>
                <Button href={site.bookingUrl} external>
                  {contact.bookLabel}
                </Button>
              </div>
            )}

            <div className="mt-10">
              <p className="label mb-3">{contact.emailNote}</p>
              <CopyEmail />
            </div>
          </div>

          <div
            className="relative border border-line bg-ink/75 p-6 backdrop-blur-md md:col-span-7 md:col-start-6 md:p-10"
            data-fade
            data-delay="0.1"
          >
            <ContactForm variant="full" />
          </div>
        </div>
      </section>
    </>
  );
}
