import type { ReactNode } from "react";
import type { Localized } from "../i18n/types";

export const UI = {
  navProjects: { pt: "Projetos", en: "Projects" },
  navExperience: { pt: "Experiência", en: "Experience" },
  navStack: { pt: "Stack", en: "Stack" },
  navAbout: { pt: "Sobre", en: "About" },
  navContact: { pt: "Contato", en: "Contact" },

  heroEyebrow: { pt: "Olá, meu nome é", en: "Hi, my name is" },
  heroRole: { pt: "Desenvolvedor Full Stack e Mobile", en: "Full Stack & Mobile Developer" },
  rolePrefix: { pt: "Desenvolvedor ", en: "" },
  roleSuffix: { pt: "", en: " Developer" },
  available: { pt: "Disponível para oportunidades", en: "Open to opportunities" },
  mobilePitch: {
    pt: "Apps web e mobile de ponta a ponta: React e React Native no front, Node.js e C#/.NET no back.",
    en: "End-to-end web and mobile apps: React and React Native on the front, Node.js and C#/.NET on the back.",
  },
  tabHome: { pt: "Início", en: "Home" },
  tabProjects: { pt: "Projetos", en: "Projects" },
  tabCareer: { pt: "Carreira", en: "Career" },
  tabContact: { pt: "Contato", en: "Contact" },
  viewProject: { pt: "Ver projeto", en: "View project" },
  openProject: { pt: "Abrir projeto", en: "Open project" },
  readMore: { pt: "Ler mais", en: "Read more" },
  readLess: { pt: "Ler menos", en: "Read less" },
  livePreviewHint: {
    pt: "Site real, role e toque para navegar",
    en: "Real site, scroll and tap to browse",
  },
  mobileProjectsLead: {
    pt: "Toque em um projeto para ver as telas. Os sites ao vivo abrem navegáveis.",
    en: "Tap a project to see its screens. Live sites open fully browsable.",
  },
  openLiveSite: { pt: "Navegar no site", en: "Browse the site" },
  previewMobile: { pt: "Ver versão mobile", en: "View mobile version" },
  previewEyebrow: { pt: "Versão mobile", en: "Mobile version" },
  previewTitle: { pt: "Feita do zero para o celular.", en: "Built from scratch for phones." },
  previewText: {
    pt: "Não é o desktop espremido: abas embaixo, ao alcance do polegar, projetos em lista que abre no toque e sites ao vivo em tela cheia.",
    en: "Not the desktop squeezed down: thumb-reach tabs at the bottom, a project list that opens on tap and live sites in full screen.",
  },
  previewJump: { pt: "Ir para", en: "Jump to" },
  previewHint: {
    pt: "Role e toque dentro do celular, como se estivesse na sua mão.",
    en: "Scroll and tap inside the phone, as if it were in your hand.",
  },
  previewBack: { pt: "Voltar ao desktop", en: "Back to desktop" },
  promptTitle: { pt: "Veja a versão mobile", en: "See the mobile version" },
  dismiss: { pt: "Dispensar", en: "Dismiss" },
  secCareer: { pt: "Carreira", en: "Career" },
  aboutShort: {
    pt: "Trabalho em vários sistemas ao mesmo tempo, do front ao back. Gosto de problemas onde a regra de negócio é a parte difícil.",
    en: "I work on several systems at once, front to back. I like problems where the business rules are the hard part.",
  },
  heroPlace: { pt: "Brasília/DF", en: "Brasília, Brazil" },
  heroProjects: { pt: "Ver projetos", en: "See projects" },
  heroCv: { pt: "Baixar CV", en: "Download CV" },

  secProjects: { pt: "Projetos", en: "Projects" },
  projectsLead: {
    pt: "Os sites públicos rodam aqui mesmo, é só navegar. Os sistemas privados aparecem por telas, com dados fictícios.",
    en: "Public sites run right here, just browse them. Private systems are shown through screenshots with mock data.",
  },
  secExperience: { pt: "Experiência", en: "Experience" },
  secStack: { pt: "Stack", en: "Stack" },
  secAbout: { pt: "Sobre", en: "About" },
  secContact: { pt: "Contato", en: "Contact" },

  contactTitle: { pt: "Vamos construir algo juntos?", en: "Shall we build something together?" },
  contactLead: {
    pt: "Estou aberto a oportunidades, freelas e boas conversas sobre tecnologia. Me chama por qualquer um dos canais abaixo.",
    en: "I'm open to opportunities, freelance work and good conversations about tech. Reach out through any of the channels below.",
  },

  railLiveGroup: { pt: "Ao vivo · navegue aqui mesmo", en: "Live · browse right here" },
  previousProject: { pt: "Projeto anterior", en: "Previous project" },
  nextProject: { pt: "Próximo projeto", en: "Next project" },
  pauseShowcase: { pt: "Pausar a troca automática", en: "Pause autoplay" },
  playShowcase: { pt: "Retomar a troca automática", en: "Resume autoplay" },
  filterAll: { pt: "Todos", en: "All" },
  filterAnyAccess: { pt: "Qualquer acesso", en: "Any access" },
  kindWeb: "Web",
  kindMobile: "Mobile",
  kindDesktop: "Desktop",
  accessPublic: { pt: "Públicos", en: "Public" },
  accessPrivate: { pt: "Privados", en: "Private" },
  badgeLive: { pt: "Ao vivo", en: "Live" },
  badgePrivate: { pt: "Privado", en: "Private" },
  badgePublic: { pt: "Público", en: "Public" },
  countOf: { pt: "de", en: "of" },
  countProjects: { pt: "projetos", en: "projects" },
  visitSite: { pt: "Visitar site", en: "Visit site" },
  openNewTab: { pt: "Abrir em nova aba", en: "Open in a new tab" },
  browseHere: { pt: "Clique para navegar no site", en: "Click to browse the site" },
  viewDesktop: { pt: "Ver como desktop", en: "View as desktop" },
  viewMobile: { pt: "Ver como celular", en: "View as mobile" },
  privateNote: { pt: "Repositório privado · dados fictícios", en: "Private repository · mock data" },
  appNote: { pt: "Capturas do app", en: "App screenshots" },
  screensSoon: { pt: "Telas em preparação", en: "Screenshots coming soon" },
  zoom: { pt: "Ampliar tela", en: "Enlarge screenshot" },
  close: { pt: "Fechar", en: "Close" },
  themeLabel: { pt: "Alternar tema", en: "Toggle theme" },
  langLabel: { pt: "Switch to English", en: "Mudar para português" },

  docTitle: {
    pt: "Victor Hugo Gomes Xavier — Desenvolvedor Full Stack e Mobile",
    en: "Victor Hugo Gomes Xavier — Full Stack & Mobile Developer",
  },
  docDesc: {
    pt: "Desenvolvedor Full Stack e Mobile em Brasília/DF. React, React Native, TypeScript, Next.js, Node.js e C#/.NET. 14+ sistemas web e mobile em produção.",
    en: "Full Stack & Mobile Developer based in Brasília, Brazil. React, React Native, TypeScript, Next.js, Node.js and C#/.NET. 14+ web and mobile systems in production.",
  },
} satisfies Record<string, Localized>;

export const RICH_TEXT = {
  heroPitch: {
    pt: (
      <>
        Construo aplicações web e mobile de ponta a ponta com{" "}
        <strong>React, React Native, TypeScript e Next.js</strong> no front e{" "}
        <strong>Node.js e C#/.NET</strong> no back — de sistemas para o setor público a automação de
        operações de e-commerce.
      </>
    ),
    en: (
      <>
        I build end-to-end web and mobile applications with{" "}
        <strong>React, React Native, TypeScript and Next.js</strong> on the front and{" "}
        <strong>Node.js and C#/.NET</strong> on the back — from public-sector systems to e-commerce
        operations automation.
      </>
    ),
  },
  aboutText: {
    pt: (
      <>
        Sou desenvolvedor full stack e mobile na <strong>Level33</strong> desde maio de 2026,
        atuando em vários sistemas ao mesmo tempo, do front ao back, com análise de requisitos,
        implementação, correção de bugs e testes. Desde 2025, em paralelo, cuido da operação digital
        da <strong>Le Parfum</strong>, onde automatizo catálogo e integrações de ERP com Python e
        OAuth 2.0. Também faço landing pages sob medida como freelancer. Gosto de problemas onde a
        regra de negócio é a parte difícil.
      </>
    ),
    en: (
      <>
        I've been a full stack and mobile developer at <strong>Level33</strong> since May 2026,
        working on several systems at once, front to back, from requirements analysis to
        implementation, bug fixing and testing. Since 2025 I have also run{" "}
        <strong>Le Parfum</strong>'s digital operation, automating the catalog and ERP integrations
        with Python and OAuth 2.0. I also build custom landing pages as a freelancer. I like
        problems where the business rules are the hard part.
      </>
    ),
  },
} satisfies Record<string, Localized<ReactNode>>;

export const KIND_LABEL = { web: UI.kindWeb, mobile: UI.kindMobile, desktop: UI.kindDesktop };
