import { useDirection } from "@mantine/core";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "ar" | "en";
export type Bi = { ar: string; en: string };

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (value: Bi) => string;
};

const LangContext = createContext<LangContextValue>({
  lang: "ar",
  setLang: () => {},
  t: (v) => v.ar,
});

const STORAGE_KEY = "legint-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  const { setDirection } = useDirection();

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "en" || stored === "ar") setLangState(stored);
  }, []);

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next);
      window.localStorage.setItem(STORAGE_KEY, next);
      setDirection(next === "ar" ? "rtl" : "ltr");
      document.documentElement.lang = next;
    },
    [setDirection],
  );

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, t: (v: Bi) => (lang === "ar" ? v.ar : v.en) }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
