"use client";
import { useState, type FormEvent, type ReactNode } from "react";
import { CONTACT } from "@/data/contact";
import Folder, { type FolderTab } from "./Folder";

const TABS: FolderTab<"contact">[] = [{ id: "contact", label: "Contact me", width: 260 }];

/* Brand marks, drawn as inline SVG so they stay crisp and take the page's colour. */
const GithubLogo = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
const InstagramLogo = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.6" cy="6.4" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);
const MailLogo = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(v: { name: string; email: string; message: string }): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please tell me your name.";
  if (!v.email.trim()) e.email = "Please add your email so I can reply.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "That email doesn’t look right.";
  if (v.message.trim().length < 10) e.message = "Please write a few words (at least 10 characters).";
  return e;
}

function SocialLink({ href, icon, label, external = true }: { href: string; icon: ReactNode; label: string; external?: boolean }) {
  return (
    <a className="contact-link" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <span className="contact-link-icon">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

export default function Contact({ onBack }: { onBack: () => void }) {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
    setSent(false);
  };

  // No server: validate, then hand the message to the visitor's own email app (mailto) — nothing is faked.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    const subject = `Portfolio message from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <Folder label="Contact me" tabs={TABS} active="contact" onChange={() => {}} onBack={onBack} contentKey="contact" variant="dark">
      <div className="contact">
        <section className="contact-intro">
          <h2 className="contact-title">Say hello</h2>
          <p className="contact-text">
            Whether it’s a project, a collaboration, or simply a hello, I’d love to hear from you. Write a note here, or reach me through any of the links below.
          </p>
          <div className="contact-links">
            <SocialLink href={`mailto:${CONTACT.email}`} icon={<MailLogo />} label={CONTACT.email} external={false} />
            {CONTACT.instagram.url && <SocialLink href={CONTACT.instagram.url} icon={<InstagramLogo />} label={CONTACT.instagram.label || "Instagram"} />}
            <SocialLink href={CONTACT.github.url} icon={<GithubLogo />} label={CONTACT.github.label} />
          </div>
        </section>

        <form className="contact-form" onSubmit={submit} noValidate>
          <label className="field">
            <span>Name</span>
            <input type="text" name="name" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
            {errors.name && <em id="err-name" role="alert">{errors.name}</em>}
          </label>
          <label className="field">
            <span>Email</span>
            <input type="email" name="email" autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
            {errors.email && <em id="err-email" role="alert">{errors.email}</em>}
          </label>
          <label className="field">
            <span>Message</span>
            <textarea name="message" rows={6} value={values.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined} />
            {errors.message && <em id="err-message" role="alert">{errors.message}</em>}
          </label>
          <div className="contact-actions">
            <button type="submit" className="proj-btn">Send Message</button>
          </div>
          {sent && (
            <p className="contact-note" role="status">
              Your email app should now open with the message ready to send. If it doesn’t, write to me directly at{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            </p>
          )}
        </form>
      </div>
    </Folder>
  );
}
