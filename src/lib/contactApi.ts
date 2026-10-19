import { z } from "zod";
import { contact } from "../data/content";

// 環境変数を足さなくても本番で動くよう、既定値は本番の値にしている
export const CONTACT_API_URL =
  import.meta.env.PUBLIC_CONTACT_API_URL || "https://contact.sync-note.com";
export const TURNSTILE_SITE_KEY =
  import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAFbiBil1V9Nozi_y";

const SITE_ID = "beatmist";

type ContactField = "name" | "email" | "message";

export type FieldErrors = Partial<Record<ContactField, string[]>>;

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
  turnstileToken: string;
  honeypot: string;
}

// 知らない種類が返ってきても応答全体を捨てないよう、種類は文字列のまま受け取る
const responseSchema = z.union([
  z.object({ ok: z.literal(true) }),
  z.object({
    ok: z.literal(false),
    error: z.string(),
    fields: z
      .object({
        name: z.string().optional(),
        email: z.string().optional(),
        message: z.string().optional(),
      })
      .optional(),
  }),
]);

type ContactResponse = z.infer<typeof responseSchema>;

export type ContactOutcome =
  | { kind: "success" }
  | { kind: "fieldErrors"; errors: FieldErrors }
  | { kind: "error"; message: string };

// API は文章を返さないので、欄ごとの種類をサイトの文言に対応させる
const FIELD_MESSAGES: Record<ContactField, Readonly<Record<string, string>>> = {
  name: {
    required: contact.validation.nameRequired,
    too_long: contact.validation.nameMax,
    invalid: contact.validation.nameInvalid,
  },
  email: {
    required: contact.validation.emailRequired,
    invalid: contact.validation.emailInvalid,
  },
  message: {
    required: contact.validation.messageRequired,
    too_long: contact.validation.messageMax,
  },
};

const CONTACT_FIELDS: readonly ContactField[] = ["name", "email", "message"];

const toFieldErrors = (fields: Partial<Record<ContactField, string>>): FieldErrors =>
  Object.fromEntries(
    CONTACT_FIELDS.flatMap((field) => {
      const code = fields[field];
      if (code === undefined) return [];
      return [[field, [FIELD_MESSAGES[field][code] ?? contact.validationError]]];
    }),
  );

const resolveInvalidInput = (
  fields: Partial<Record<ContactField, string>> | undefined,
): ContactOutcome => {
  const errors = toFieldErrors(fields ?? {});
  return Object.keys(errors).length > 0
    ? { kind: "fieldErrors", errors }
    : { kind: "error", message: contact.validationError };
};

export const resolveContactOutcome = (response: ContactResponse | undefined): ContactOutcome => {
  if (response === undefined) return { kind: "error", message: contact.error };
  if (response.ok) return { kind: "success" };
  switch (response.error) {
    case "invalid_input":
      return resolveInvalidInput(response.fields);
    case "turnstile_failed":
      return { kind: "error", message: contact.turnstileError };
    case "rate_limited":
      return { kind: "error", message: contact.rateLimit };
    default:
      return { kind: "error", message: contact.error };
  }
};

// 応答が JSON でないときや形が違うときは undefined を返し、送信失敗として扱う
export const postContact = async (body: ContactRequest): Promise<ContactResponse | undefined> => {
  const res = await fetch(`${CONTACT_API_URL}/v1/contact/${SITE_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json: unknown = await res.json().catch(() => undefined);
  const parsed = responseSchema.safeParse(json);
  return parsed.success ? parsed.data : undefined;
};
