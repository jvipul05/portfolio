"use client";

import { Loader2, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { submitContactForm, type ContactResult } from "@/lib/contact";
import { GitHubMark, LinkedInMark } from "@/components/ui/brand-icons";
import { SectionHeading } from "@/components/ui/section-heading";

const contactLinks = [
  {
    label: "Email",
    value: "Configure NEXT_PUBLIC_CONTACT_EMAIL",
    href: "#contact-form",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "Add final profile URL before launch",
    href: "https://www.linkedin.com/in/vipul-jain-05",
    icon: LinkedInMark,
  },
  {
    label: "GitHub",
    value: "Vipuljain05",
    href: "https://github.com/Vipuljain05",
    icon: GitHubMark,
  },
];

export function Contact() {
  const [result, setResult] = useState<ContactResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResult(null);
    setIsSending(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
    };

    try {
      const response = await submitContactForm(payload);
      setResult(response);
      if (response.mode !== "mailto") {
        event.currentTarget.reset();
      }
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to send message right now.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading eyebrow="Contact" title="Let's build something meaningful.">
          Tell me what you are building, where the system is getting complicated, or how backend and AI-assisted
          engineering can help. The form supports an optional temporary email endpoint through environment variables.
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <p className="text-lg leading-8 text-slate-300">
              I am most interested in backend systems, API design, service orchestration, production debugging,
              and practical AI workflows that improve delivery without hiding engineering trade-offs.
            </p>
            <div className="mt-6 space-y-4">
              {contactLinks.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-slate-300 transition hover:border-sky-400/50 hover:text-white"
                  href={href}
                >
                  <Icon className="size-6 text-sky-300" />
                  <span>
                    <span className="block font-semibold text-white">{label}</span>
                    <span className="text-sm text-slate-400">{value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <form id="contact-form" className="glass rounded-3xl p-6" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Name
                <input
                  name="name"
                  required
                  minLength={2}
                  placeholder="Your name"
                  className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 outline-none transition focus:border-sky-400"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Email
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 outline-none transition focus:border-sky-400"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Message
                <textarea
                  name="message"
                  required
                  minLength={10}
                  placeholder="What are you trying to build?"
                  rows={5}
                  className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 outline-none transition focus:border-sky-400"
                />
              </label>
              <button
                disabled={isSending}
                className="inline-flex items-center justify-center rounded-full bg-sky-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSending ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                {isSending ? "Sending..." : "Send Message"}
              </button>
              {result ? <p className="text-sm text-emerald-300">{result.message}</p> : null}
              {error ? <p className="text-sm text-red-300">{error}</p> : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
