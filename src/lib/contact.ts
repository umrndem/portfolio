export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  /** Honeypot. Must stay empty for legitimate submissions. */
  company?: string;
};

export type ContactValidationResult =
  | { ok: true; data: Required<Pick<ContactPayload, "name" | "email" | "message">> }
  | { ok: false; error: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(
  input: ContactPayload,
): ContactValidationResult {
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (name.length < 2 || name.length > 120) {
    return { ok: false, error: "Enter a name between 2 and 120 characters." };
  }

  if (!emailPattern.test(email) || email.length > 254) {
    return { ok: false, error: "Enter a valid email address." };
  }

  if (message.length < 10 || message.length > 4000) {
    return {
      ok: false,
      error: "Enter a message between 10 and 4,000 characters.",
    };
  }

  return {
    ok: true,
    data: { name, email, message },
  };
}
