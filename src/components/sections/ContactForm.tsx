"use client";

import { useRef, useState } from "react";
import { contact } from "@/content";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/validate";

type Status = "idle" | "sending" | "success" | "error";

const fieldBase =
  "w-full border border-line bg-ink/60 px-4 py-3.5 text-base text-paper placeholder:text-mute/70 transition-colors focus:border-ultra focus:outline-none focus-visible:outline-2 focus-visible:outline-flame";

export function ContactForm() {
  const [needs, setNeeds] = useState<string[]>([]);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const form = useRef<HTMLFormElement>(null);

  const toggle = (n: string) => {
    setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));
    setErrors((e) => ({ ...e, needs: undefined }));
  };

  const clear = (k: keyof ContactInput) => () => setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const input: ContactInput = {
      needs,
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const found = validateContact(input);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = (["needs", "name", "email", "message"] as const).find((k) => found[k]);
      form.current?.querySelector<HTMLElement>(first === "needs" ? "[data-chip]" : `[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, company: String(fd.get("company") ?? "") }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        setNeeds([]);
        form.current?.reset();
      } else {
        if (data.errors) setErrors(data.errors);
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const err = (id: string, msg?: string) =>
    msg ? (
      <p id={`${id}-error`} className="mt-2 font-mono text-[0.78rem] text-flame">
        {msg}
      </p>
    ) : null;

  const ariaFor = (k: keyof ContactInput) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="space-y-8" aria-label="Project enquiry">
      <fieldset aria-describedby={errors.needs ? "needs-error" : undefined}>
        <legend className="label mb-4">{contact.needsLabel}</legend>
        <div className="flex flex-wrap gap-2.5">
          {contact.needs.map((n) => {
            const on = needs.includes(n);
            return (
              <button
                key={n}
                type="button"
                data-chip
                aria-pressed={on}
                onClick={() => toggle(n)}
                className={`border px-4 py-2.5 font-mono text-[0.78rem] uppercase tracking-[0.12em] transition-colors ${
                  on
                    ? "border-flame bg-flame text-ink"
                    : "border-line text-paper hover:border-ultra hover:bg-ultra/15"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
        {err("needs", errors.needs)}
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label mb-2 block">
            {contact.fields.name.label}
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder={contact.fields.name.placeholder}
            onChange={clear("name")}
            className={fieldBase}
            {...ariaFor("name")}
          />
          {err("name", errors.name)}
        </div>
        <div>
          <label htmlFor="email" className="label mb-2 block">
            {contact.fields.email.label}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={contact.fields.email.placeholder}
            onChange={clear("email")}
            className={fieldBase}
            {...ariaFor("email")}
          />
          {err("email", errors.email)}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label mb-2 block">
          {contact.fields.message.label}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={contact.fields.message.placeholder}
          onChange={clear("message")}
          className={`${fieldBase} resize-y`}
          {...ariaFor("message")}
        />
        {err("message", errors.message)}
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 bg-paper px-8 py-4 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-flame disabled:opacity-60"
        >
          {status === "sending" ? contact.sending : contact.submit}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
        <p role="status" aria-live="polite" className="max-w-sm text-sm">
          {status === "success" && <span className="text-paper">{contact.success}</span>}
          {status === "error" && <span className="text-flame">{contact.failure}</span>}
        </p>
      </div>
    </form>
  );
}
