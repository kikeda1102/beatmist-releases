import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import en from "./translations/en";

export type Locale = "ja" | "en";

const translations: Record<string, Record<string, string>> = { en };

interface TranslationContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextValue>({
  locale: "ja",
  setLocale: () => {},
  t: (key: string) => key,
});

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ja");

  const t = useCallback(
    (key: string): string => {
      if (locale === "ja") return key;
      return translations[locale]?.[key] ?? key;
    },
    [locale],
  );

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
