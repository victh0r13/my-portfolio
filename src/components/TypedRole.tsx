import { PROFILE } from "../content/profile";
import { UI } from "../content/ui";
import { useTypewriter } from "../hooks/useTypewriter";
import { useLanguage } from "../i18n/LanguageContext";

export function TypedRole({ className }: { className: string }) {
  const { t } = useLanguage();
  const typed = useTypewriter(t(PROFILE.roleWords));

  return (
    <p className={className} aria-label={t(UI.heroRole)}>
      <span aria-hidden="true">
        {t(UI.rolePrefix)}
        <span className="typed">{typed}</span>
        <span className="caret" />
        {t(UI.roleSuffix)}
      </span>
    </p>
  );
}
