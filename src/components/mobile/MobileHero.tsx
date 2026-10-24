import { CONTACT, CV_FILE } from "../../content/contact";
import { FACTS, type Fact } from "../../content/facts";
import { PROFILE } from "../../content/profile";
import { UI } from "../../content/ui";
import { useCountUp } from "../../hooks/useCountUp";
import { useLanguage } from "../../i18n/LanguageContext";
import { assetUrl } from "../../utils/project";
import { AvailableBadge } from "../AvailableBadge";
import { IconArrowRight, IconDownload, IconGithub, IconLinkedin, IconPin } from "../Icons";
import { TypedRole } from "../TypedRole";

function MobileStat({ fact }: { fact: Fact }) {
  const { t } = useLanguage();
  const { ref, value } = useCountUp<HTMLDivElement>(fact.value);

  return (
    <div ref={ref} className="m-stat">
      <strong>
        {value}
        {fact.suffix}
      </strong>
      <span>{t(fact.label)}</span>
    </div>
  );
}

export function MobileHero() {
  const { t } = useLanguage();

  return (
    <section id="topo" className="m-hero">
      <div className="m-hero-top m-rise">
        <div className="m-avatar">
          <div className="m-avatar-frame">
            {PROFILE.photo ? (
              <img src={assetUrl(PROFILE.photo)} alt={t(PROFILE.photoAlt)} />
            ) : (
              <span aria-hidden="true">{PROFILE.monogram}</span>
            )}
          </div>
        </div>
        <AvailableBadge />
      </div>
      <p className="m-eyebrow m-rise">{t(UI.heroEyebrow)}</p>
      <h1 className="m-name m-rise">
        Victor Hugo
        <br />
        Gomes Xavier<span>.</span>
      </h1>
      <div className="m-rise">
        <TypedRole className="m-role" />
      </div>
      <p className="m-pitch m-rise">{t(UI.mobilePitch)}</p>
      <p className="m-place m-rise">
        <IconPin />
        {t(UI.heroPlace)}
      </p>
      <div className="m-stats m-rise">
        {FACTS.map((fact) => (
          <MobileStat key={fact.value} fact={fact} />
        ))}
      </div>
      <a className="m-btn m-btn-primary m-rise" href="#projetos">
        {t(UI.heroProjects)}
        <IconArrowRight />
      </a>
      <div className="m-quick m-rise">
        <a href={CONTACT.github} target="_blank" rel="noopener">
          <IconGithub size={20} />
          GitHub
        </a>
        <a href={CONTACT.linkedin} target="_blank" rel="noopener">
          <IconLinkedin size={20} />
          LinkedIn
        </a>
        <a href={assetUrl(t(CV_FILE))} download>
          <IconDownload size={20} />
          CV
        </a>
      </div>
    </section>
  );
}
