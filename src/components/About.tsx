import { ABOUT_FACTS } from "../content/facts";
import { RICH_TEXT, UI } from "../content/ui";
import { useReveal } from "../hooks/useReveal";
import { useLanguage } from "../i18n/LanguageContext";

export function About() {
  const { t } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLElement>();

  return (
    <section id="sobre" data-reveal ref={ref} className={revealClass}>
      <div className="wrap about-grid">
        <div>
          <div className="sec-head">
            <h2>{t(UI.secAbout)}</h2>
          </div>
          <p className="about">{t(RICH_TEXT.aboutText)}</p>
        </div>
        <dl className="about-facts">
          {ABOUT_FACTS.map((fact) => (
            <div key={t(fact.label)}>
              <dt>{t(fact.label)}</dt>
              <dd>{t(fact.value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
