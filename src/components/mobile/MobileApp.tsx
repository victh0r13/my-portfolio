import { UI } from "../../content/ui";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../i18n/LanguageContext";
import { IconBriefcase, IconChat, IconGrid, IconHome, IconMoon, IconSun } from "../Icons";
import { MobileCareer } from "./MobileCareer";
import { MobileContact } from "./MobileContact";
import { MobileHero } from "./MobileHero";
import { MobileProjects } from "./MobileProjects";

const TABS = [
  { id: "topo", label: UI.tabHome, icon: <IconHome /> },
  { id: "projetos", label: UI.tabProjects, icon: <IconGrid /> },
  { id: "carreira", label: UI.tabCareer, icon: <IconBriefcase /> },
  { id: "contato", label: UI.tabContact, icon: <IconChat /> },
];

const SECTION_IDS = TABS.slice(1).map((tab) => tab.id);

function MobileTopBar() {
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const progressRef = useScrollProgress<HTMLSpanElement>();

  return (
    <header className="m-topbar">
      <a href="#topo" className="logo">
        vhgx<span>.</span>
      </a>
      <div className="m-topbar-actions">
        <button type="button" className="m-icon-btn" onClick={toggleLang} aria-label={t(UI.langLabel)}>
          {lang === "pt" ? "EN" : "PT"}
        </button>
        <button type="button" className="m-icon-btn" onClick={toggleTheme} aria-label={t(UI.themeLabel)}>
          {theme === "light" ? <IconSun /> : <IconMoon />}
        </button>
      </div>
      <span ref={progressRef} className="scroll-progress" />
    </header>
  );
}

function MobileTabBar() {
  const { t } = useLanguage();
  const active = useActiveSection(SECTION_IDS) ?? "topo";

  return (
    <nav className="m-tabbar">
      {TABS.map((tab) => (
        <a
          key={tab.id}
          href={`#${tab.id}`}
          className={active === tab.id ? "active" : undefined}
          aria-current={active === tab.id ? "true" : undefined}
        >
          {tab.icon}
          <span>{t(tab.label)}</span>
        </a>
      ))}
    </nav>
  );
}

export function MobileApp() {
  return (
    <div className="m-app">
      <MobileTopBar />
      <main>
        <MobileHero />
        <MobileProjects />
        <MobileCareer />
        <MobileContact />
      </main>
      <MobileTabBar />
    </div>
  );
}
