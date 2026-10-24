import { useEffect, useRef } from "react";
import { UI } from "../content/ui";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useTheme } from "../hooks/useTheme";
import type { Lang } from "../i18n/types";
import { useLanguage } from "../i18n/LanguageContext";
import { IconGlobe, IconMoon, IconPhone, IconSun } from "./Icons";

const HOME_ID = "topo";

const LINKS = [
  { id: HOME_ID, label: UI.tabHome, optional: false },
  { id: "projetos", label: UI.navProjects, optional: false },
  { id: "experiencia", label: UI.navExperience, optional: false },
  { id: "stack", label: UI.navStack, optional: true },
  { id: "sobre", label: UI.navAbout, optional: true },
  { id: "contato", label: UI.navContact, optional: false },
];

const SECTION_IDS = LINKS.filter((link) => link.id !== HOME_ID).map((link) => link.id);

const LANGS: Lang[] = ["en", "pt"];

export function Nav({ onPreviewMobile }: { onPreviewMobile: () => void }) {
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useScrollProgress<HTMLSpanElement>();
  const active = useActiveSection(SECTION_IDS) ?? HOME_ID;

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty("--nav-h", `${nav.offsetHeight}px`);
    });
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  return (
    <nav ref={navRef} className="topnav">
      <div className="wrap nav-in">
        <a href={`#${HOME_ID}`} className="logo">
          vhgx<span>.</span>
        </a>
        <div className="nav-pill">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={[active === link.id ? "active" : "", link.optional ? "nav-optional" : ""].join(" ").trim() || undefined}
              aria-current={active === link.id ? "true" : undefined}
            >
              {t(link.label)}
            </a>
          ))}
          <span ref={progressRef} className="scroll-progress" />
        </div>
        <div className="nav-actions">
          <div className="lang-switch" role="group" aria-label={t(UI.langLabel)}>
            <IconGlobe />
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={lang === code}
                onClick={() => lang !== code && toggleLang()}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="nav-icon-btn"
            onClick={onPreviewMobile}
            aria-label={t(UI.previewMobile)}
            title={t(UI.previewMobile)}
          >
            <IconPhone size={16} />
          </button>
          <button id="theme-toggle" type="button" onClick={toggleTheme} aria-label={t(UI.themeLabel)}>
            {theme === "light" ? <IconSun /> : <IconMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
