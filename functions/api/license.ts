import { sendEmail } from "../lib/sendEmail";

interface Env {
  STRIPE_SECRET_KEY: string;
  KEYGEN_ACCOUNT_ID: string;
  KEYGEN_POLICY_ID: string;
  KEYGEN_API_TOKEN: string;
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL: string;
}

interface StripeSession {
  payment_status: string;
  customer_details?: {
    email?: string;
  };
}

interface KeygenLicense {
  attributes: {
    key: string;
  };
}

interface KeygenListResponse {
  data?: KeygenLicense[];
}

interface KeygenCreateResponse {
  data?: KeygenLicense;
  errors?: Array<{ title: string; detail: string }>;
}

export async function onRequestGet({
  request,
  env,
  waitUntil,
}: {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
}): Promise<Response> {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");

  if (!sessionId) {
    return Response.json(
      { error: "session_id is required" },
      { status: 400 }
    );
  }

  const stripeRes = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    {
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      },
    }
  );

  if (!stripeRes.ok) {
    const stripeError = await stripeRes.text();
    console.error("Stripe API error:", stripeRes.status, stripeError);
    return Response.json(
      { error: "Invalid session", detail: `Stripe returned ${stripeRes.status}` },
      { status: 400 }
    );
  }

  const session: StripeSession = await stripeRes.json();

  if (session.payment_status !== "paid") {
    return Response.json(
      { error: "Invalid or unpaid session" },
      { status: 400 }
    );
  }

  const email = session.customer_details?.email;
  if (!email) {
    return Response.json(
      { error: "No customer email found" },
      { status: 400 }
    );
  }

  const keygenHeaders = {
    Authorization: `Bearer ${env.KEYGEN_API_TOKEN}`,
    Accept: "application/vnd.api+json",
  };

  const searchRes = await fetch(
    `https://api.keygen.sh/v1/accounts/${env.KEYGEN_ACCOUNT_ID}/licenses?metadata[stripeSessionId]=${encodeURIComponent(sessionId)}`,
    { headers: keygenHeaders }
  );
  const searchData: KeygenListResponse = await searchRes.json();

  if (searchData.data && searchData.data.length > 0) {
    return Response.json({
      licenseKey: searchData.data[0].attributes.key,
    });
  }

  const createRes = await fetch(
    `https://api.keygen.sh/v1/accounts/${env.KEYGEN_ACCOUNT_ID}/licenses`,
    {
      method: "POST",
      headers: {
        ...keygenHeaders,
        "Content-Type": "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type: "licenses",
          attributes: {
            metadata: {
              email,
              stripeSessionId: sessionId,
            },
          },
          relationships: {
            policy: {
              data: {
                type: "policies",
                id: env.KEYGEN_POLICY_ID,
              },
            },
          },
        },
      }),
    }
  );

  const createData: KeygenCreateResponse = await createRes.json();

  if (!createData.data?.attributes?.key) {
    const detail = createData.errors?.[0]?.detail ?? "Unknown error";
    return Response.json(
      { error: `Failed to create license: ${detail}` },
      { status: 500 }
    );
  }

  const licenseKey = createData.data.attributes.key;
  const fromEmail = "BeatMist <noreply@beatmist.com>";

  waitUntil(
    (async () => {
      try {
        await sendEmail(
          env.RESEND_API_KEY,
          fromEmail,
          email,
          "【BeatMist】Pro ライセンスキーのお届け",
          [
            `${email} 様`,
            "",
            "BeatMist Pro をご購入いただき誠にありがとうございます。",
            "ライセンスキーを発行いたしました。",
            "",
            "以下があなたのライセンスキーです：",
            "",
            `  ${licenseKey}`,
            "",
            "--- アクティベーション手順 ---",
            "",
            "1. BeatMist をダウンロードしてインストール",
            "2. 設定 → ライセンス を開く",
            "3. 上記のキーを貼り付けて「アクティベート」をクリック",
            "",
            "1つのライセンスキーで最大3台のPCにアクティベートできます。",
            "",
            "ご不明な点がございましたら、お気軽にお問い合わせください。",
            "https://beatmist.com/#contact",
            "",
            "BeatMist",
          ].join("\n"),
        );
      } catch (err) {
        console.error("[License] Failed to send customer email:", err);
      }

      try {
        await sendEmail(
          env.RESEND_API_KEY,
          fromEmail,
          env.CONTACT_TO_EMAIL,
          "【BeatMist】新規ライセンス購入",
          [
            "新しい BeatMist Pro ライセンスが購入されました。",
            "",
            `メール: ${email}`,
            `Stripe Session ID: ${sessionId}`,
            `ライセンスキー: ${licenseKey}`,
          ].join("\n"),
          email,
        );
      } catch (err) {
        console.error("[License] Failed to send admin notification:", err);
      }
    })(),
  );

  return Response.json({ licenseKey });
}
