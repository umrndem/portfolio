"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { homeContent } from "@/content/home";
import { profile } from "@/content/profile";

const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
      theme?: "auto" | "light" | "dark";
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function loadTurnstileScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }
  if (window.turnstile) {
    return Promise.resolve();
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${TURNSTILE_SCRIPT_SRC}"]`,
  );
  if (existing) {
    return new Promise((resolve) =>
      existing.addEventListener("load", () => resolve(), { once: true }),
    );
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("turnstile")), {
      once: true,
    });
    document.head.appendChild(script);
  });
}

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

  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [token, setToken] = useState("");

  // Fetch the public Turnstile site key from the Worker env.
  useEffect(() => {
    let active = true;
    fetch("/api/contact/config")
      .then((res) => res.json())
      .then((data: { siteKey?: string | null }) => {
        if (active && data.siteKey) {
          setSiteKey(data.siteKey);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Render the widget once we have a site key and the script has loaded.
  useEffect(() => {
    if (!siteKey) {
      return;
    }
    let cancelled = false;

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !widgetRef.current || !window.turnstile) {
          return;
        }
        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: siteKey,
          callback: (value) => setToken(value),
          "error-callback": () => setToken(""),
          "expired-callback": () => setToken(""),
        });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  function resetWidget() {
    setToken("");
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status.state === "submitting") {
      return;
    }

    if (siteKey && !token) {
      setStatus({
        state: "error",
        detail: "Please complete the verification below.",
      });
      return;
    }

    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          company,
          turnstileToken: token,
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        mode?: string;
      };

      if (!response.ok || !payload.ok) {
        resetWidget();
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
      resetWidget();
      setStatus({
        state: "success",
        detail: copy.successBody,
      });
    } catch {
      resetWidget();
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

      {siteKey ? (
        <div className="contact-form__turnstile" ref={widgetRef} />
      ) : null}

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
