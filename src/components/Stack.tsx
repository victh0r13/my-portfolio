import { SKILLS } from "../content/skills";
import { UI } from "../content/ui";
import { useReveal } from "../hooks/useReveal";
import { useLanguage } from "../i18n/LanguageContext";

export function Stack() {
  const { t } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLElement>();

  return (
    <section id="stack" data-reveal ref={ref} className={revealClass}>
      <div className="wrap">
        <div className="sec-head">
          <h2>{t(UI.secStack)}</h2>
        </div>
        <div className="skills">
          {SKILLS.map((group) => (
            <div key={t(group.title)} className="skill-group">
              <h3>{t(group.title)}</h3>
              <p>{t(group.items)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
