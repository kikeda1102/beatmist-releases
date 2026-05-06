export async function sendEmail(
  apiKey: string,
  from: string,
  to: string,
  subject: string,
  text: string,
  replyTo?: string,
): Promise<boolean> {
  const body: Record<string, unknown> = { from, to, subject, text };
  if (replyTo) {
    body.reply_to = replyTo;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("[Email] Resend API error:", res.status, errorBody);
  }

  return res.ok;
}
