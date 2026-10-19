import { z } from "zod";

// 共通のお問い合わせ API と同じく、前後の空白を除いてから確かめる
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "お名前を入力してください")
    .max(100, "お名前は100文字以内で入力してください")
    .regex(/^[^\r\n]*$/, "不正な文字が含まれています"),
  email: z
    .string()
    .trim()
    .min(1, "メールアドレスを入力してください")
    .email("有効なメールアドレスを入力してください"),
  message: z
    .string()
    .trim()
    .min(1, "お問い合わせ内容を入力してください")
    .max(2000, "お問い合わせ内容は2000文字以内で入力してください"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
