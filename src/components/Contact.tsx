"use client";

import { FormEvent, useState } from "react";
import { CONTACT } from "../data/businesses";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const interest = String(data.get("interest") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(
      `Woodlands Group inquiry — ${interest || "General"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`,
    );
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setStatus("ready");
  }

  return (
    <section id="contact" className="bg-mist py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6e6e73]">
            Contact
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Let’s connect.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Reach the group for partnerships, fleet needs, travel, or any
            subsidiary enquiry.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-navy">Address</dt>
              <dd className="mt-1 text-muted">{CONTACT.address}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Phone</dt>
              <dd className="mt-1 text-muted">{CONTACT.phone}</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-medium text-[#1d1d1f] underline-offset-4 transition duration-300 hover:underline"
                >
                  {CONTACT.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(0,0,0,0.08)] sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-navy">
              Name
              <input
                required
                name="name"
                className="mt-2 w-full rounded-xl border border-black/[0.08] bg-[#f5f5f7] px-3 py-2.5 outline-none transition duration-300 hover:border-black/20 hover:bg-white focus:border-black/25 focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]"
              />
            </label>
            <label className="block text-sm font-medium text-navy">
              Email
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full rounded-xl border border-black/[0.08] bg-[#f5f5f7] px-3 py-2.5 outline-none transition duration-300 hover:border-black/20 hover:bg-white focus:border-black/25 focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]"
              />
            </label>
          </div>
          <label className="block text-sm font-medium text-navy">
            Interest
            <select
              name="interest"
              required
              defaultValue=""
              className="mt-2 w-full rounded-xl border border-black/[0.08] bg-[#f5f5f7] px-3 py-2.5 outline-none transition duration-300 hover:border-black/20 hover:bg-white focus:border-black/25 focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]"
            >
              <option value="" disabled>
                Select a business
              </option>
              <option>Woodlands Transport</option>
              <option>WTS Travel</option>
              <option>WTS Engineering</option>
              <option>CashBox</option>
              <option>The Bus Collective</option>
              <option>Plotigo</option>
              <option>Flash Laundry</option>
              <option>General / Group</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-navy">
            Message
            <textarea
              required
              name="message"
              rows={4}
              className="mt-2 w-full resize-y rounded-xl border border-black/[0.08] bg-[#f5f5f7] px-3 py-2.5 outline-none transition duration-300 hover:border-black/20 hover:bg-white focus:border-black/25 focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-[#1d1d1f] px-5 py-3 text-sm font-semibold text-white transition duration-500 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)]"
          >
            Send message
          </button>
          {status === "ready" && (
            <p className="text-sm text-muted">Opening your email client…</p>
          )}
        </form>
      </div>
    </section>
  );
}
