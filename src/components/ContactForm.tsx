"use client";

import { useId, useState } from "react";
import type { FormEvent } from "react";
import { homeContent } from "@/content/home";
import { profile } from "@/content/profile";

type FormStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; detail: string }
  | { state: "error"; detail: string };

const copy = homeContent.footer.form;

export function ContactForm() {
  const formId = useId();
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const messageId = `${formId}-message`;
  const honeypotId = `${formId}-company`;
  const statusId = `${formId}-status`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status.state === "submitting") {
      return;
    }

    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        mode?: string;
      };

      if (!response.ok || !payload.ok) {
        setStatus({
          state: "error",
          detail: payload.error ?? copy.errorBody,
        });
        return;
      }

      setName("");
      setEmail("");
      setMessage("");
      setCompany("");
      setStatus({
        state: "success",
        detail: copy.successBody,
      });
    } catch {
      setStatus({
        state: "error",
        detail: copy.errorBody,
      });
    }
  }

  const busy = status.state === "submitting";

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <label className="contact-form__field" htmlFor={nameId}>
          <span>{copy.nameLabel}</span>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            placeholder={copy.namePlaceholder}
            value={name}
            disabled={busy}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label className="contact-form__field" htmlFor={emailId}>
          <span>{copy.emailLabel}</span>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder={copy.emailPlaceholder}
            value={email}
            disabled={busy}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>

      <label className="contact-form__field" htmlFor={messageId}>
        <span>{copy.messageLabel}</span>
        <textarea
          id={messageId}
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          placeholder={copy.messagePlaceholder}
          value={message}
          disabled={busy}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>

      <label className="contact-form__honeypot" htmlFor={honeypotId}>
        <span>{copy.honeypotLabel}</span>
        <input
          id={honeypotId}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </label>

      <div className="contact-form__actions">
        <button className="button-link button-link--light" type="submit" disabled={busy}>
          {busy ? copy.submittingLabel : copy.submitLabel}
          <span aria-hidden="true">{busy ? "…" : "→"}</span>
        </button>
        <a className="text-link contact-form__mailto" href={`mailto:${profile.email}`}>
          {copy.directEmailLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div
        className="contact-form__status"
        id={statusId}
        role="status"
        aria-live="polite"
      >
        {status.state === "success" ? (
          <p>
            <strong>{copy.successTitle}</strong>
            <span>{status.detail}</span>
          </p>
        ) : null}
        {status.state === "error" ? (
          <p className="contact-form__status--error">
            <strong>{copy.errorTitle}</strong>
            <span>{status.detail}</span>
          </p>
        ) : null}
      </div>
    </form>
  );
}
