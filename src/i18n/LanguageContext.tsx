import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Lang, Localized, Translated } from "./types";

const STORAGE_KEY = "vhgx-lang";

type LanguageContextValue = {
  lang: Lang;
  toggleLang: () => void;
  t: <T>(value: Localized<T>) => T;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isTranslated<T>(value: Localized<T>): value is Translated<T> {
  return typeof value === "object" && value !== null && "pt" in value && "en" in value;
}

function readStoredLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "pt";
  } catch {
    return "pt";
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readStoredLang);

  const toggleLang = () => {
    const next: Lang = lang === "pt" ? "en" : "pt";
    setLang(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      return;
    }
  };

  const t = useCallback(
    <T,>(value: Localized<T>): T => (isTranslated(value) ? value[lang] : value),
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
