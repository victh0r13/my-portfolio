import { CONTACT } from "../../content/contact";
import { ABOUT_FACTS } from "../../content/facts";
import { UI } from "../../content/ui";
import { useLanguage } from "../../i18n/LanguageContext";
import { IconCall, IconGithub, IconLinkedin, IconMail } from "../Icons";

export function MobileContact() {
  const { t } = useLanguage();

  const channels = [
    { href: `mailto:${CONTACT.email}`, label: CONTACT.email, icon: <IconMail size={20} />, external: false },
    { href: CONTACT.phoneHref, label: CONTACT.phoneDisplay, icon: <IconCall size={20} />, external: false },
    { href: CONTACT.linkedin, label: "LinkedIn", icon: <IconLinkedin size={20} />, external: true },
    { href: CONTACT.github, label: "GitHub", icon: <IconGithub size={20} />, external: true },
  ];

  return (
    <section id="contato" className="m-section">
      <div className="m-head">
        <h2>{t(UI.secAbout)}</h2>
      </div>
      <p className="m-lead">{t(UI.aboutShort)}</p>
      <dl className="m-facts">
        {ABOUT_FACTS.map((fact) => (
          <div key={t(fact.label)}>
            <dt>{t(fact.label)}</dt>
            <dd>{t(fact.value)}</dd>
          </div>
        ))}
      </dl>
      <div className="m-contact-card">
        <h2>{t(UI.contactTitle)}</h2>
        <p>{t(UI.contactLead)}</p>
        <div className="m-channels">
          {channels.map((channel) => (
            <a
              key={channel.href}
              href={channel.href}
              target={channel.external ? "_blank" : undefined}
              rel={channel.external ? "noopener" : undefined}
            >
              {channel.icon}
              <span>{channel.label}</span>
            </a>
          ))}
        </div>
      </div>
      <p className="m-footer">© {new Date().getFullYear()} Victor Hugo Gomes Xavier</p>
    </section>
  );
}
