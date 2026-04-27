/**
 * Newsletter subscription handler — provider-agnostic.
 *
 * To wire this up to a real email service:
 *   1. Sign up for MailerLite, Beehiiv, ConvertKit, etc. (all free)
 *   2. Get your form's POST endpoint URL from the embed/integration page
 *   3. Add to your environment (Vercel: Settings → Environment Variables, Replit: Secrets):
 *        VITE_NEWSLETTER_ENDPOINT = https://your-service.com/your-form-id
 *   4. Redeploy. That's it.
 *
 * If VITE_NEWSLETTER_ENDPOINT is not set, emails are saved to localStorage as
 * a fallback (so signups aren't lost during testing) and the user still sees
 * a success message.
 */

export interface SubscribeResult {
  ok: boolean;
  message: string;
  storedLocally?: boolean;
}

const LOCAL_FALLBACK_KEY = "toolshub:newsletter:pending";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function saveLocally(email: string) {
  try {
    const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(email)) list.push(email);
    localStorage.setItem(LOCAL_FALLBACK_KEY, JSON.stringify(list));
  } catch {
    // localStorage may be disabled — fail silently
  }
}

export async function subscribeEmail(email: string): Promise<SubscribeResult> {
  const trimmed = email.trim();
  if (!isValidEmail(trimmed)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT as
    | string
    | undefined;

  if (!endpoint) {
    saveLocally(trimmed);
    return {
      ok: true,
      message: "You're on the list — we'll be in touch soon.",
      storedLocally: true,
    };
  }

  try {
    const formData = new FormData();
    formData.append("email", trimmed);
    formData.append("source", "toolshub");

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    if (res.type === "opaque" || res.ok) {
      return {
        ok: true,
        message: "You're on the list — check your inbox to confirm.",
      };
    }

    saveLocally(trimmed);
    return {
      ok: true,
      message: "You're on the list — we'll be in touch soon.",
      storedLocally: true,
    };
  } catch {
    saveLocally(trimmed);
    return {
      ok: true,
      message: "You're on the list — we'll be in touch soon.",
      storedLocally: true,
    };
  }
}

export function getPendingSubscriptions(): string[] {
  try {
    const raw = localStorage.getItem(LOCAL_FALLBACK_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}
