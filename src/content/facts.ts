import type { Localized } from "../i18n/types";

export type Fact = { value: number; suffix: string; label: Localized };

export type AboutFact = { label: Localized; value: Localized };

export const FACTS: Fact[] = [
  {
    value: 14,
    suffix: "+",
    label: { pt: "sistemas web e mobile em produção", en: "web and mobile systems in production" },
  },
  {
    value: 6,
    suffix: "+",
    label: { pt: "apps React Native entregues", en: "React Native apps shipped" },
  },
];

export const ABOUT_FACTS: AboutFact[] = [
  {
    label: { pt: "Formação", en: "Education" },
    value: {
      pt: "Ciência da Computação · UCB (previsão 2029)",
      en: "B.Sc. Computer Science · UCB (expected 2029)",
    },
  },
  {
    label: { pt: "Idiomas", en: "Languages" },
    value: {
      pt: "Português nativo · Inglês técnico avançado",
      en: "Portuguese (native) · Advanced technical English",
    },
  },
  {
    label: { pt: "Modelo", en: "Work mode" },
    value: { pt: "Híbrido em Brasília/DF ou remoto", en: "Hybrid in Brasília or remote" },
  },
];
