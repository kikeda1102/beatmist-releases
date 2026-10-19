// 型を付けないと import.meta.env の値が any になるため、使う変数だけを宣言する
interface ImportMetaEnv {
  readonly PUBLIC_CONTACT_API_URL?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
