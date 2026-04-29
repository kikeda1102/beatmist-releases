import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "お名前を入力してください")
    .max(100, "お名前は100文字以内で入力してください")
    .regex(/^[^\r\n]*$/, "不正な文字が含まれています"),
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("有効なメールアドレスを入力してください"),
  message: z
    .string()
    .min(1, "お問い合わせ内容を入力してください")
    .max(2000, "お問い合わせ内容は2000文字以内で入力してください"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
