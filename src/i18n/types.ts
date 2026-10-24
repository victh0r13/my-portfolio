export type Lang = "pt" | "en";

export type Translated<T> = { pt: T; en: T };

export type Localized<T = string> = T | Translated<T>;
