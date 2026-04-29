interface Env {
  STRIPE_SECRET_KEY: string;
  KEYGEN_ACCOUNT_ID: string;
  KEYGEN_POLICY_ID: string;
  KEYGEN_API_TOKEN: string;
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
}: {
  request: Request;
  env: Env;
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
    return Response.json({ error: "Invalid session" }, { status: 400 });
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

  return Response.json({
    licenseKey: createData.data.attributes.key,
  });
}
