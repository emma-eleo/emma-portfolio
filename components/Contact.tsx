"use client";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
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
const CopyLogo = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="8" y="8" width="13" height="13" rx="2" />
    <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
  </svg>
);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT.email}`;
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
  const [composeRequested, setComposeRequested] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (copyStatus === "idle") return;
    const timeout = window.setTimeout(() => setCopyStatus("idle"), 2500);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
    setComposeRequested(false);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    const subject = `Portfolio message from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`;
    const composeUrl = new URL(GMAIL_COMPOSE_URL);
    composeUrl.searchParams.set("su", subject);
    composeUrl.searchParams.set("body", body);
    window.open(composeUrl.toString(), "_blank", "noopener,noreferrer");
    setComposeRequested(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
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
            <SocialLink href={GMAIL_COMPOSE_URL} icon={<MailLogo />} label={CONTACT.email} />
            <SocialLink href={`mailto:${CONTACT.email}`} icon={<MailLogo />} label="Open in default email app" external={false} />
            <button
              type="button"
              className="contact-link"
              style={{ border: 0, background: "transparent", fontFamily: "inherit", cursor: "pointer", textAlign: "left" }}
              onClick={copyEmail}
            >
              <span className="contact-link-icon"><CopyLogo /></span>
              <span>Copy email address</span>
            </button>
            {copyStatus !== "idle" && (
              <p className="contact-note" role="status">
                {copyStatus === "copied" ? "Email copied!" : "Couldn’t copy email. Please use the email link instead."}
              </p>
            )}
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
          {composeRequested && (
            <p className="contact-note" role="status">
              Gmail compose should open in a new tab with your message ready to send. If it doesn’t, email me at{" "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or use the default email app link.
            </p>
          )}
        </form>
      </div>
    </Folder>
  );
}
