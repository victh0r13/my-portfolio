import type { Localized } from "../i18n/types";

export type SkillGroup = { title: Localized; items: Localized };

export const SKILLS: SkillGroup[] = [
  {
    title: "Frontend",
    items: "React, TypeScript, Next.js, Vite, Tailwind, shadcn/ui, TanStack Query/Router, Zod",
  },
  {
    title: "Mobile",
    items: {
      pt: "React Native (Expo), SQLite e AsyncStorage offline-first, sincronização em segundo plano, builds Android",
      en: "React Native (Expo), offline-first SQLite and AsyncStorage, background sync, Android builds",
    },
  },
  {
    title: "Backend",
    items: {
      pt: "Node.js/Express, C#/.NET 8, ASP.NET Core, Prisma, Entity Framework Core, APIs REST, SignalR/WebSocket",
      en: "Node.js/Express, C#/.NET 8, ASP.NET Core, Prisma, Entity Framework Core, REST APIs, SignalR/WebSocket",
    },
  },
  {
    title: "Desktop",
    items: {
      pt: "Electron (Nextron), instaladores multiplataforma e atualização automática",
      en: "Electron (Nextron), cross-platform installers and auto-update",
    },
  },
  {
    title: { pt: "Dados", en: "Data" },
    items: {
      pt: "PostgreSQL, SQLite, modelagem relacional, migrations, Python, OAuth 2.0",
      en: "PostgreSQL, SQLite, relational modeling, migrations, Python, OAuth 2.0",
    },
  },
  {
    title: { pt: "Ferramentas", en: "Tools" },
    items: "Git, GitLab, GitHub Actions, Docker, Playwright, Lighthouse",
  },
];
