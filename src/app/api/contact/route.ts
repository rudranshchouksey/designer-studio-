import { NextResponse } from "next/server";
import { site } from "@/content";
import { validateContact, type ContactInput } from "@/lib/validate";

export const runtime = "nodejs";

const MAX = { name: 120, email: 254, message: 5000 };

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field. Pretend success for bots.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const input: ContactInput = {
    needs: Array.isArray(body.needs)
      ? body.needs.filter((n): n is string => typeof n === "string").slice(0, 6)
      : [],
    name: typeof body.name === "string" ? body.name.slice(0, MAX.name) : "",
    email: typeof body.email === "string" ? body.email.slice(0, MAX.email) : "",
    message: typeof body.message === "string" ? body.message.slice(0, MAX.message) : "",
  };

  const errors = validateContact(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const subject = `New enquiry from ${input.name.trim()} — ${input.needs.join(", ")}`;
  const text = [
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    `Needs: ${input.needs.join(", ")}`,
    "",
    input.message.trim(),
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // No email service configured yet: log so nothing is lost during development.
    console.log("[contact] RESEND_API_KEY not set — logging submission instead of emailing:\n" + text);
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Twinpix Studio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL || site.email],
        reply_to: input.email.trim(),
        subject,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "Email service error." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json({ ok: false, error: "Email service unreachable." }, { status: 502 });
  }
}
