import { sendEmail } from "../lib/sendEmail";
import { contactFormSchema } from "../../src/lib/validations/contact";
import type { ContactFormResponse } from "../../src/lib/types/contact";

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// 画面に出す完了の文言はフォーム側で組み立てるので、ここでは短い固定の文だけを返す
const SUCCESS_RESPONSE: ContactFormResponse = {
  success: true,
  message: "お問い合わせを受け付けました。",
};

const SEND_FAILED_RESPONSE: ContactFormResponse = {
  success: false,
  message:
    "送信に失敗しました。お手数ですが、しばらく経ってからもう一度お試しください。",
};

const readHoneypot = (body: unknown): unknown =>
  typeof body === "object" && body !== null && "confirm_url_hp" in body
    ? body.confirm_url_hp
    : undefined;

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        success: false,
        message: "不正なリクエストです。",
      } satisfies ContactFormResponse,
      { status: 400 },
    );
  }

  if (readHoneypot(body)) {
    return Response.json(SUCCESS_RESPONSE);
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      {
        success: false,
        message:
          "送信回数の上限に達しました。しばらく経ってからもう一度お試しください。",
      } satisfies ContactFormResponse,
      { status: 429 },
    );
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return Response.json(
      {
        success: false,
        message: "入力内容に誤りがあります。",
        errors: {
          name: fieldErrors.name,
          email: fieldErrors.email,
          message: fieldErrors.message,
        },
      } satisfies ContactFormResponse,
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;

  // 送るのは運営者宛ての通知だけにする。入力されたアドレスにメールを送ると、
  // 他人のアドレスと任意の文面を入力して BeatMist の名前でメールを送らせる使い方ができてしまうため
  try {
    const sent = await sendEmail(
      env.RESEND_API_KEY,
      "BeatMist <noreply@beatmist.com>",
      env.CONTACT_TO_EMAIL,
      `【お問い合わせ】${name} さんからのメッセージ`,
      [
        `名前: ${name}`,
        `メールアドレス: ${email}`,
        "",
        "お問い合わせ内容:",
        message,
      ].join("\n"),
      email,
    );
    if (!sent) {
      return Response.json(SEND_FAILED_RESPONSE, { status: 500 });
    }
    return Response.json(SUCCESS_RESPONSE);
  } catch {
    return Response.json(SEND_FAILED_RESPONSE, { status: 500 });
  }
}
