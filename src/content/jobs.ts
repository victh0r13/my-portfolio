import type { Localized } from "../i18n/types";

export type Job = {
  period: Localized;
  role: Localized;
  company: string;
  desc: Localized;
};

export const JOBS: Job[] = [
  {
    period: { pt: "mai/2026 — atual", en: "May 2026 — present" },
    role: { pt: "Desenvolvedor Full Stack e Mobile", en: "Full Stack & Mobile Developer" },
    company: "Level33",
    desc: {
      pt: "14+ sistemas web e mobile em produção para o setor público (saúde, tributação, vigilância sanitária, meio ambiente, transporte e bombeiros) e empresas privadas. Atuação ponta a ponta, no front e no back: análise de requisitos, implementação, correção de bugs e testes, com merge requests revisados no GitLab e builds Android de homologação e produção em 6+ apps React Native.",
      en: "14+ web and mobile systems in production for the public sector (healthcare, taxation, health inspection, environment, transportation, fire department) and private companies. End-to-end work, front and back: requirements analysis, implementation, bug fixing and testing, with reviewed merge requests on GitLab and Android staging and production builds across 6+ React Native apps.",
    },
  },
  {
    period: { pt: "fev/2025 — atual", en: "Feb 2025 — present" },
    role: {
      pt: "Gerente Administrativo — Automação e Operações de E-commerce",
      en: "Administrative Manager — E-commerce Automation & Operations",
    },
    company: "Le Parfum",
    desc: {
      pt: "Pipeline de SEO em Python que reescreveu e padronizou o catálogo de 677 produtos; cadastro em massa no Bling ERP via importação XLSX; integração com a API v3 do Bling usando OAuth 2.0; e gestão das integrações com Mercado Livre, Shopee, TikTok Shop e Amazon.",
      en: "A Python SEO pipeline that rewrote and standardized a 677-product catalog; bulk product registration in Bling ERP via XLSX imports; Bling ERP v3 API integration over OAuth 2.0; and management of marketplace integrations with Mercado Livre, Shopee, TikTok Shop and Amazon.",
    },
  },
  {
    period: { pt: "fev/2024 — nov/2024", en: "Feb 2024 — Nov 2024" },
    role: { pt: "Jovem Aprendiz — Administrativo", en: "Administrative Apprentice" },
    company: "Brasil 21",
    desc: {
      pt: "Suporte a rotinas de Governança Corporativa: organização documental e gestão de planilhas.",
      en: "Supported corporate governance routines: document organization and spreadsheet management.",
    },
  },
];
