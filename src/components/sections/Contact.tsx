import { contact } from "@/content";
import { Headline } from "@/components/ui/Headline";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-28 md:py-44">
      <div className="wrap">
        <p className="label mb-6" data-fade>
          {contact.eyebrow}
        </p>
        <Headline
          id="contact-title"
          text={contact.headline}
          className="text-[clamp(2.8rem,10.5vw,10rem)]"
        />

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12">
          <div className="md:col-span-4" data-fade>
            <p className="max-w-sm text-lg text-paper/80">{contact.intro}</p>
            <div className="mt-8">
              <CopyEmail />
            </div>
          </div>
          <div className="relative border border-line bg-ink/75 p-6 backdrop-blur-md md:col-span-7 md:col-start-6 md:p-10" data-fade data-delay="0.1">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
