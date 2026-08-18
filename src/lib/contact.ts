export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type ContactResult = {
  ok: boolean;
  mode: "endpoint" | "mailto" | "local";
  message: string;
};

const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export async function submitContactForm(payload: ContactPayload): Promise<ContactResult> {
  if (CONTACT_ENDPOINT) {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Message service rejected the request. Please try again later.");
    }

    return {
      ok: true,
      mode: "endpoint",
      message: "Message sent. Thanks for reaching out — I will get back to you soon.",
    };
  }

  if (CONTACT_EMAIL) {
    const subject = encodeURIComponent(`Portfolio message from ${payload.name}`);
    const body = encodeURIComponent(`${payload.message}\n\nFrom: ${payload.name} <${payload.email}>`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    return {
      ok: true,
      mode: "mailto",
      message: "Your email app has been opened with the message pre-filled.",
    };
  }

  return {
    ok: true,
    mode: "local",
    message:
      "Form validated locally. Add NEXT_PUBLIC_CONTACT_ENDPOINT or NEXT_PUBLIC_CONTACT_EMAIL to enable delivery.",
  };
}
