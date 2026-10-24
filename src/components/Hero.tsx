import { useRef, type CSSProperties, type MouseEvent } from "react";
import { CONTACT, CV_FILE } from "../content/contact";
import { FACTS, type Fact } from "../content/facts";
import { PROFILE } from "../content/profile";
import { RICH_TEXT, UI } from "../content/ui";
import { useCountUp } from "../hooks/useCountUp";
import { useLanguage } from "../i18n/LanguageContext";
import { AvailableBadge } from "./AvailableBadge";
import { IconDownload, IconGithub, IconLinkedin, IconPin } from "./Icons";
import { TypedRole } from "./TypedRole";

const GLOW_RADIUS = 260;

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

function Stat({ fact, index }: { fact: Fact; index: number }) {
  const { t } = useLanguage();
  const { ref, value } = useCountUp<HTMLDivElement>(fact.value);

  return (
    <div ref={ref} className={`stat stat-${index}`}>
      <strong>
        {value}
        {fact.suffix}
      </strong>
      <span>{t(fact.label)}</span>
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const glowRef = useRef<HTMLDivElement>(null);

  const moveGlow = (event: MouseEvent<HTMLDivElement>) => {
    const glow = glowRef.current;
    if (!glow) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left - GLOW_RADIUS;
    const y = event.clientY - box.top - GLOW_RADIUS;
    glow.style.transform = `translate(${x}px, ${y}px)`;
  };

  const hideGlow = () => {
    if (glowRef.current) glowRef.current.style.transform = "translate(-999px, -999px)";
  };

  return (
    <div className="hero" onMouseMove={moveGlow} onMouseLeave={hideGlow}>
      <div id="glow" ref={glowRef} />
      <header id="topo" className="wrap">
        <div className="hero-in">
          <div style={stagger(0)}>
            <AvailableBadge />
            <p className="eyebrow">{t(UI.heroEyebrow)}</p>
          </div>
          <h1 style={stagger(1)}>
            Victor Hugo
            <br />
            Gomes Xavier<span>.</span>
          </h1>
          <div style={stagger(2)}>
            <TypedRole className="role" />
          </div>
          <p className="pitch" style={stagger(3)}>
            {t(RICH_TEXT.heroPitch)}
          </p>
          <p className="place" style={stagger(4)}>
            <IconPin />
            <span>{t(UI.heroPlace)}</span>
          </p>
          <div className="cta-row" style={stagger(5)}>
            <a className="btn btn-solid" href={CONTACT.github} target="_blank" rel="noopener">
              <IconGithub />
              GitHub
            </a>
            <a className="btn btn-ghost" href={CONTACT.linkedin} target="_blank" rel="noopener">
              <IconLinkedin />
              LinkedIn
            </a>
            <a className="btn btn-ghost" href={`${import.meta.env.BASE_URL}${t(CV_FILE)}`} download>
              <IconDownload />
              <span>{t(UI.heroCv)}</span>
            </a>
          </div>
        </div>
        <div className="portrait">
          <div className="portrait-ring">
            <div className="portrait-frame">
              {PROFILE.photo ? (
                <img src={`${import.meta.env.BASE_URL}${PROFILE.photo}`} alt={t(PROFILE.photoAlt)} />
              ) : (
                <span className="monogram" aria-hidden="true">
                  {PROFILE.monogram}
                </span>
              )}
            </div>
          </div>
          {FACTS.map((fact, i) => (
            <Stat key={fact.value} fact={fact} index={i} />
          ))}
        </div>
      </header>
    </div>
  );
}
