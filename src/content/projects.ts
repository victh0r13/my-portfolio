import type { Localized } from "../i18n/types";

export type ProjectKind = "web" | "mobile" | "desktop";

export type ProjectAccess = "private" | "public";

export type ScreenStage = "before" | "after";

export type ProjectScreen = { src: string; caption: Localized; stage?: ScreenStage };

export type Project = {
  id: string;
  name: Localized;
  org: Localized;
  kind: ProjectKind;
  access: ProjectAccess;
  live: string | null;
  link: { href: string; label: Localized } | null;
  tagline: Localized;
  desc: Localized;
  tags: Localized[];
  screens: ProjectScreen[];
};

// live:    'https://...'  → mostra o site navegável dentro de uma moldura (iframe)
// link:    { href, label } → link extra abaixo da descrição (ex.: download)
// screens: telas mostradas na galeria quando não há "live". Coloque as imagens em
//          public/assets/projetos/<id>/ e liste aqui, ex.:
//          { src: "assets/projetos/prontobook/01.webp", caption: { pt: "Faturamento", en: "Billing" } }
//          Lista vazia → aparece o aviso "telas em preparação".
//          stage: "before" | "after" → em redesigns, a galeria ganha a troca Antes/Depois
//          (abre no "Depois"; as telas sem stage aparecem sempre).
// A ordem desta lista é a ordem da vitrine: sites ao vivo e projetos pessoais primeiro.
export const PROJECTS: Project[] = [
  {
    id: "dra-karen-xavier",
    name: "Dra. Karen Xavier",
    org: "Freelance",
    kind: "web",
    access: "public",
    live: "https://drakarenxavier.com/",
    link: null,
    tagline: {
      pt: "Landing page de clínica de harmonização facial",
      en: "Landing page for a facial aesthetics clinic",
    },
    desc: {
      pt: "Identidade visual própria e layout mobile-first, com comparador interativo de antes e depois por arraste, galerias, CTAs de agendamento via WhatsApp, SEO técnico (metadados, Open Graph) e imagens otimizadas em WebP.",
      en: "Original visual identity and mobile-first layout, with an interactive drag-to-compare before/after slider, galleries, WhatsApp booking CTAs, technical SEO (metadata, Open Graph) and optimized WebP images.",
    },
    tags: ["Next.js", "Tailwind", "SEO"],
    screens: [],
  },

  {
    id: "le-signature",
    name: "Le Signature",
    org: "Freelance",
    kind: "web",
    access: "public",
    live: "https://lesignature.com.br/",
    link: null,
    tagline: { pt: "Espaço de locação de consultórios", en: "Medical office rental space" },
    desc: {
      pt: "Site institucional com galeria dos espaços, tabelas de planos e preços, mapa e CTAs de agendamento via WhatsApp, responsivo em qualquer tela.",
      en: "Institutional site with a gallery of the spaces, pricing and plan tables, map and WhatsApp booking CTAs, responsive on any screen.",
    },
    tags: ["Next.js", "Tailwind", "SEO"],
    screens: [],
  },

  {
    id: "kurio",
    name: "Kurio",
    org: { pt: "Desafio técnico", en: "Technical challenge" },
    kind: "web",
    access: "public",
    live: "https://junglegaming-challenge2.vercel.app/perfil",
    link: null,
    tagline: { pt: "Marketplace de NFTs", en: "NFT marketplace" },
    desc: {
      pt: "Catálogo com filtros na URL, carrinho, checkout com carteira e preços em tempo real (Socket.IO). Checkout idempotente com retentativa segura, cálculos monetários em BigInt, 70+ testes E2E em Playwright e Lighthouse 100 em acessibilidade, boas práticas e SEO.",
      en: "Catalog with URL-driven filters, cart, wallet checkout and real-time prices (Socket.IO). Idempotent checkout with safe retries, BigInt money math, 70+ Playwright E2E tests and Lighthouse 100 for accessibility, best practices and SEO.",
    },
    tags: ["React 19", "TypeScript", "TanStack", "Playwright", "MSW"],
    screens: [],
  },

  {
    id: "totem-le-parfum",
    name: { pt: "Totem Le Parfum", en: "Le Parfum kiosk" },
    org: "Le Parfum",
    kind: "mobile",
    access: "public",
    live: null,
    link: null,
    tagline: {
      pt: "Catálogo em tablet com consultor por IA",
      en: "Tablet catalog with an AI consultant",
    },
    desc: {
      pt: "Catálogo em tablet com filtros olfativos e consultor virtual por IA (Claude API), com sincronização de produtos via Bling ERP v3 sobre OAuth 2.0.",
      en: "Tablet catalog with olfactory filters and an AI virtual consultant (Claude API), syncing products through Bling ERP v3 over OAuth 2.0.",
    },
    tags: ["React Native", "Expo", "Claude API", "OAuth 2.0"],
    screens: [],
  },

  {
    id: "biblia-offline",
    name: { pt: "Bíblia offline", en: "Offline Bible" },
    org: { pt: "Avaliação técnica", en: "Technical review" },
    kind: "mobile",
    access: "public",
    live: null,
    link: null,
    tagline: {
      pt: "App de leitura bíblica 100% offline",
      en: "Bible reading app that works fully offline",
    },
    desc: {
      pt: "Funcionamento offline via AsyncStorage e consumo de API REST. Um dos dois apps completos que entreguei na avaliação técnica interna da Level33, que pedia apenas um por dev.",
      en: "Works offline via AsyncStorage and consumes a REST API. One of two complete apps I delivered for an internal Level33 technical review that asked each developer for one.",
    },
    tags: ["React Native", "Expo", "AsyncStorage"],
    screens: [
      { src: "assets/projetos/biblia-offline/01.webp", caption: { pt: "Início com o versículo do dia", en: "Home with the verse of the day" } },
      { src: "assets/projetos/biblia-offline/02.webp", caption: { pt: "Lista de livros", en: "Book list" } },
      { src: "assets/projetos/biblia-offline/03.webp", caption: { pt: "Leitura do capítulo", en: "Chapter reading" } },
    ],
  },

  {
    id: "veche",
    name: "Veche",
    org: { pt: "Projeto pessoal", en: "Personal project" },
    kind: "desktop",
    access: "private",
    live: null,
    link: {
      href: "https://github.com/GNevez/veche-releases/releases",
      label: { pt: "Baixar o app", en: "Download the app" },
    },
    tagline: { pt: "Plataforma social para gamers", en: "Social platform for gamers" },
    desc: {
      pt: "App desktop com servidores e canais no estilo Discord (chat em tempo real, voz e compartilhamento de tela, cargos e permissões), feed social no estilo X e biblioteca de jogos com capas da Steam, GOG e SteamGridDB. Desenvolvido em dupla, com instaladores para Windows, macOS e Linux e atualização automática.",
      en: "Desktop app combining Discord-style servers and channels (real-time chat, voice and screen sharing, roles and permissions), an X-style social feed and a game library with artwork from Steam, GOG and SteamGridDB. Co-developed with a partner, with Windows, macOS and Linux installers and auto-update.",
    },
    tags: ["Electron", "Next.js", "ASP.NET Core", "SignalR", "PostgreSQL", "Docker"],
    screens: [
      { src: "assets/projetos/veche/01.webp", caption: { pt: "Feed da comunidade", en: "Community feed" } },
      { src: "assets/projetos/veche/02.webp", caption: { pt: "Biblioteca de jogos", en: "Game library" } },
      { src: "assets/projetos/veche/03.webp", caption: { pt: "Chat do servidor", en: "Server chat" } },
      { src: "assets/projetos/veche/04.webp", caption: { pt: "Amigos e status", en: "Friends and status" } },
    ],
  },

  {
    id: "prontobook",
    name: "Prontobook",
    org: "Level33",
    kind: "web",
    access: "private",
    live: null,
    link: null,
    tagline: { pt: "Gestão de saúde pública (SUS)", en: "Public healthcare management (SUS)" },
    desc: {
      pt: "Conduzi a refatoração completa de UI/UX do sistema e atuo na implementação de novos fluxos e na correção de fluxos antigos quebrados, do backend ao frontend.",
      en: "Led the system's complete UI/UX refactor and work on implementing new flows and fixing broken legacy flows, from backend to frontend.",
    },
    tags: ["Node.js", "TypeScript", "React", "Prisma", "PostgreSQL"],
    screens: [
      { src: "assets/projetos/prontobook/antes-01.webp", caption: { pt: "Login antigo", en: "Old login" }, stage: "before" },
      { src: "assets/projetos/prontobook/antes-02.webp", caption: { pt: "Dashboard antigo", en: "Old dashboard" }, stage: "before" },
      { src: "assets/projetos/prontobook/depois-01.webp", caption: { pt: "Novo login", en: "New login" }, stage: "after" },
      { src: "assets/projetos/prontobook/depois-02.webp", caption: { pt: "Novo dashboard", en: "New dashboard" }, stage: "after" },
    ],
  },

  {
    id: "cbmerj",
    name: { pt: "Painel CBMERJ", en: "CBMERJ admin panel" },
    org: "Level33",
    kind: "web",
    access: "private",
    live: null,
    link: null,
    tagline: {
      pt: "Redesign para o Corpo de Bombeiros do RJ",
      en: "Redesign for the Rio de Janeiro Fire Department",
    },
    desc: {
      pt: "Recriei do zero o painel administrativo do Corpo de Bombeiros Militar do RJ sobre o backend existente: novo login, navegação agrupada por tarefa e um painel inicial com os números que a equipe acompanha no dia a dia.",
      en: "Rebuilt from scratch the admin panel for the Rio de Janeiro State Fire Department on top of the existing backend: a new login, task-grouped navigation and a home dashboard with the numbers the team tracks every day.",
    },
    tags: ["React", "TypeScript", "UI/UX"],
    screens: [
      { src: "assets/projetos/cbmerj/antes-01.webp", caption: { pt: "Login antigo", en: "Old login" }, stage: "before" },
      { src: "assets/projetos/cbmerj/antes-02.webp", caption: { pt: "Painel antigo", en: "Old dashboard" }, stage: "before" },
      { src: "assets/projetos/cbmerj/depois-01.webp", caption: { pt: "Novo login", en: "New login" }, stage: "after" },
      { src: "assets/projetos/cbmerj/depois-02.webp", caption: { pt: "Novo painel", en: "New dashboard" }, stage: "after" },
    ],
  },

  {
    id: "monitoramento-app",
    name: { pt: "App de Monitoramento", en: "Monitoring app" },
    org: "Level33",
    kind: "mobile",
    access: "private",
    live: null,
    link: null,
    tagline: {
      pt: "App mobile do CBMERJ recriado do zero",
      en: "CBMERJ mobile app rebuilt from scratch",
    },
    desc: {
      pt: "App de monitoramento em React Native (Expo) recriado do zero junto com o redesign do painel do Corpo de Bombeiros do RJ.",
      en: "React Native (Expo) monitoring app rebuilt from scratch alongside the Rio de Janeiro Fire Department panel redesign.",
    },
    tags: ["React Native", "Expo"],
    screens: [],
  },

  {
    id: "apps-fiscalizacao",
    name: { pt: "Apps de fiscalização", en: "Field inspection apps" },
    org: "Level33",
    kind: "mobile",
    access: "private",
    live: null,
    link: null,
    tagline: "VISA-DF, VigDigital, DER-RJ, SUBAS, IUBAAM",
    desc: {
      pt: "Atuo em 6 apps React Native (Expo) com arquitetura offline-first, sincronização em segundo plano e serviço de hora confiável para timestamps auditáveis, da implementação aos builds Android de homologação e produção.",
      en: "I work on 6 React Native (Expo) apps with offline-first architecture, background sync and a trusted-time service for auditable timestamps, from implementation to Android staging and production builds.",
    },
    tags: ["React Native", "Expo", "SQLite", "Offline-first"],
    screens: [],
  },
];
