import { CONTACT, whatsappLink } from "../content/contact";
import { UI } from "../content/ui";
import { useReveal } from "../hooks/useReveal";
import { useLanguage } from "../i18n/LanguageContext";
import { IconMail, IconWhatsapp } from "./Icons";

export function Contact() {
  const { t } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLElement>();

  return (
    <section id="contato" data-reveal ref={ref} className={revealClass}>
      <div className="wrap">
        <p className="eyebrow">{t(UI.secContact)}</p>
        <h2>{t(UI.contactTitle)}</h2>
        <p className="lead">{t(UI.contactLead)}</p>
        <div className="contact-row">
          <a className="btn btn-solid" href={`mailto:${CONTACT.email}`}>
            <IconMail />
            {CONTACT.email}
          </a>
          <a className="btn btn-ghost" href={whatsappLink(t(UI.whatsappMessage))} target="_blank" rel="noopener">
            <IconWhatsapp />
            WhatsApp
          </a>
          <a className="btn btn-ghost" href={CONTACT.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a className="btn btn-ghost" href={CONTACT.github} target="_blank" rel="noopener">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
