import { PROFILE } from "../content/profile";
import { UI } from "../content/ui";
import { useLanguage } from "../i18n/LanguageContext";

export function AvailableBadge() {
  const { t } = useLanguage();
  if (!PROFILE.available) return null;

  return (
    <span className="available">
      <i />
      {t(UI.available)}
    </span>
  );
}
