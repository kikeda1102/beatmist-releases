interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
}

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
  website?: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(body: ContactRequestBody): ContactResponse["errors"] | null {
  const errors: NonNullable<ContactResponse["errors"]> = {};

  if (!body.name || body.name.trim().length === 0) {
    errors.name = ["お名前を入力してください"];
  } else if (body.name.length > 100) {
    errors.name = ["お名前は100文字以内で入力してください"];
  } else if (/[\r\n]/.test(body.name)) {
    errors.name = ["不正な文字が含まれています"];
  }

  if (!body.email || body.email.trim().length === 0) {
    errors.email = ["メールアドレスを入力してください"];
  } else if (!EMAIL_REGEX.test(body.email)) {
    errors.email = ["有効なメールアドレスを入力してください"];
  }

  if (!body.message || body.message.trim().length === 0) {
    errors.message = ["お問い合わせ内容を入力してください"];
  } else if (body.message.length > 2000) {
    errors.message = ["お問い合わせ内容は2000文字以内で入力してください"];
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

async function sendEmail(
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

  return res.ok;
}

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  let body: ContactRequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "不正なリクエストです。" } satisfies ContactResponse,
      { status: 400 },
    );
  }

  if (body.website) {
    return Response.json({
      success: true,
      message:
        "お問い合わせを受け付けました。確認メールをお送りしましたのでご確認ください。",
    } satisfies ContactResponse);
  }

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      {
        success: false,
        message:
          "送信回数の上限に達しました。しばらく経ってからもう一度お試しください。",
      } satisfies ContactResponse,
      { status: 429 },
    );
  }

  const errors = validate(body);
  if (errors) {
    return Response.json(
      {
        success: false,
        message: "入力内容に誤りがあります。",
        errors,
      } satisfies ContactResponse,
      { status: 400 },
    );
  }

  const { name, email, message } = body;
  const toEmail = env.CONTACT_TO_EMAIL;
  const fromEmail = `BeatMist <onboarding@resend.dev>`;

  try {
    const notificationSent = await sendEmail(
      env.RESEND_API_KEY,
      fromEmail,
      toEmail,
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

    if (!notificationSent) {
      return Response.json(
        {
          success: false,
          message:
            "送信に失敗しました。お手数ですが、しばらく経ってからもう一度お試しください。",
        } satisfies ContactResponse,
        { status: 500 },
      );
    }

    await sendEmail(
      env.RESEND_API_KEY,
      fromEmail,
      email,
      "【BeatMist】お問い合わせを受け付けました",
      [
        `${name} 様`,
        "",
        "お問い合わせいただきありがとうございます。",
        "以下の内容で受け付けました。",
        "",
        "---",
        "",
        `名前: ${name}`,
        `メールアドレス: ${email}`,
        "",
        "お問い合わせ内容:",
        message,
        "",
        "---",
        "",
        "内容を確認の上、折り返しご連絡いたします。",
        "しばらくお待ちください。",
        "",
        "BeatMist",
      ].join("\n"),
    );

    return Response.json({
      success: true,
      message:
        "お問い合わせを受け付けました。確認メールをお送りしましたのでご確認ください。\nもし届かない場合は、迷惑メールフォルダをご確認ください。",
    } satisfies ContactResponse);
  } catch {
    return Response.json(
      {
        success: false,
        message:
          "送信に失敗しました。お手数ですが、しばらく経ってからもう一度お試しください。",
      } satisfies ContactResponse,
      { status: 500 },
    );
  }
}
