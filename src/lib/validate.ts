import { errors } from "@/content";

export type ContactInput = {
  needs: string[];
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the form (client) and the route handler (server). */
export function validateContact(input: ContactInput): ContactErrors {
  const out: ContactErrors = {};
  if (!input.needs.length) out.needs = errors.need;
  if (!input.name.trim()) out.name = errors.nameRequired;
  const email = input.email.trim();
  if (!email) out.email = errors.emailRequired;
  else if (!EMAIL_RE.test(email) || email.length > 254) out.email = errors.emailInvalid;
  const msg = input.message.trim();
  if (!msg) out.message = errors.messageRequired;
  else if (msg.length < 10) out.message = errors.messageShort;
  return out;
}
