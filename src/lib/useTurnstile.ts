import { useCallback, useEffect, useRef, useState } from "react";

interface TurnstileRenderOptions {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// 再マウントのたびに script を足さないよう、読み込みはページ全体で 1 回にする
let loading: Promise<TurnstileApi> | undefined;

const loadTurnstile = (): Promise<TurnstileApi> => {
  loading ??= new Promise<TurnstileApi>((resolve, reject) => {
    if (window.turnstile) {
      resolve(window.turnstile);
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("Turnstile is unavailable"));
    });
    script.addEventListener("error", () => reject(new Error("Failed to load Turnstile")));
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    // 読み込みに失敗したときは、次のマウントで読み込み直せるようにする
    loading = undefined;
    throw error;
  });
  return loading;
};

export const useTurnstile = (siteKey: string) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        const container = containerRef.current;
        if (cancelled || !container) return;
        widgetIdRef.current = turnstile.render(container, {
          sitekey: siteKey,
          callback: (value) => {
            setToken(value);
            setFailed(false);
          },
          "expired-callback": () => setToken(null),
          "error-callback": () => {
            setToken(null);
            setFailed(true);
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    // StrictMode や HMR で effect が 2 回走っても、ウィジェットが重ならないようにする
    return () => {
      cancelled = true;
      const widgetId = widgetIdRef.current;
      if (widgetId !== undefined) window.turnstile?.remove(widgetId);
      widgetIdRef.current = undefined;
    };
  }, [siteKey]);

  // トークンは 1 回しか使えないので、送信のたびに取り直す
  const reset = useCallback(() => {
    setToken(null);
    const widgetId = widgetIdRef.current;
    if (widgetId !== undefined) window.turnstile?.reset(widgetId);
  }, []);

  return { containerRef, token, failed, reset };
};
