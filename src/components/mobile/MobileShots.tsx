import { useRef, useState } from "react";
import type { Project, ScreenStage } from "../../content/projects";
import { UI } from "../../content/ui";
import { useLanguage } from "../../i18n/LanguageContext";
import { assetUrl, hasStages, initials, screensFor } from "../../utils/project";
import { IconLock, IconZoom } from "../Icons";
import { StageSwitch } from "../StageSwitch";
import { ImageViewer } from "./ImageViewer";

export function MobileShots({ project }: { project: Project }) {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [stage, setStage] = useState<ScreenStage>("after");
  const [viewer, setViewer] = useState<number | null>(null);
  const screens = screensFor(project, stage);

  if (!screens.length) {
    return (
      <div className="m-shot-empty">
        <strong>{initials(t(project.name))}</strong>
        <span>
          {project.access === "private" && <IconLock />}
          {t(UI.screensSoon)}
        </span>
      </div>
    );
  }

  const onScroll = () => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    setCurrent(Math.round(track.scrollLeft / first.offsetWidth));
  };

  const changeStage = (next: ScreenStage) => {
    setStage(next);
    setCurrent(0);
    trackRef.current?.scrollTo({ left: 0 });
  };

  return (
    <div>
      {hasStages(project) && (
        <StageSwitch className="stage-switch m-stage-switch" stage={stage} onChange={changeStage} />
      )}
      <div
        ref={trackRef}
        className={`m-shots${project.kind === "mobile" ? " m-shots-portrait" : ""}`}
        onScroll={onScroll}
      >
        {screens.map((screen, i) => (
          <figure key={screen.src}>
            <button
              type="button"
              className="m-shot-open"
              onClick={() => setViewer(i)}
              aria-label={`${t(UI.zoom)}: ${t(screen.caption)}`}
            >
              <img src={assetUrl(screen.src)} alt={t(screen.caption)} loading="lazy" />
              <span className="m-shot-zoom" aria-hidden="true">
                <IconZoom />
              </span>
            </button>
            <figcaption>{t(screen.caption)}</figcaption>
          </figure>
        ))}
      </div>
      <ImageViewer
        screens={screens}
        start={viewer}
        title={t(project.name)}
        portrait={project.kind === "mobile"}
        onClose={() => setViewer(null)}
      />
      {screens.length > 1 && (
        <div className="m-dots" aria-hidden="true">
          {screens.map((screen, i) => (
            <i key={screen.src} className={i === current ? "on" : undefined} />
          ))}
        </div>
      )}
    </div>
  );
}
