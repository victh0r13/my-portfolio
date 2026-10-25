import type { ScreenStage } from "../content/projects";
import { UI } from "../content/ui";
import { useLanguage } from "../i18n/LanguageContext";

const STAGES: ScreenStage[] = ["before", "after"];

type StageSwitchProps = {
  stage: ScreenStage;
  onChange: (stage: ScreenStage) => void;
  className: string;
};

export function StageSwitch({ stage, onChange, className }: StageSwitchProps) {
  const { t } = useLanguage();

  return (
    <div className={className} role="group" aria-label={t(UI.redesign)}>
      {STAGES.map((item) => (
        <button key={item} type="button" aria-pressed={stage === item} onClick={() => onChange(item)}>
          {t(item === "before" ? UI.stageBefore : UI.stageAfter)}
        </button>
      ))}
    </div>
  );
}
