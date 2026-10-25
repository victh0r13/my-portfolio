import { useRef, useState } from "react";
import type { Project, ScreenStage } from "../../content/projects";
import { UI } from "../../content/ui";
import { useLanguage } from "../../i18n/LanguageContext";
import { assetUrl, hasStages, initials, screensFor } from "../../utils/project";
import { IconArrowLeft, IconArrowRight, IconLock, IconZoom } from "../Icons";
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

  const slides = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.getBoundingClientRect().left + track.clientWidth / 2;
    const distances = slides().map((slide) => {
      const box = slide.getBoundingClientRect();
      return Math.abs(box.left + box.width / 2 - center);
    });
    setCurrent(distances.indexOf(Math.min(...distances)));
  };

  const goTo = (next: number) => {
    const track = trackRef.current;
    const slide = slides()[next];
    if (!track || !slide) return;
    const offset = slide.getBoundingClientRect().left - track.getBoundingClientRect().left;
    const left = track.scrollLeft + offset - (track.clientWidth - slide.offsetWidth) / 2;
    track.scrollTo({ left, behavior: "smooth" });
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
        <div className="m-shots-nav">
          <button
            type="button"
            className="m-icon-btn"
            disabled={current === 0}
            onClick={() => goTo(current - 1)}
            aria-label={t(UI.previousScreen)}
          >
            <IconArrowLeft size={16} />
          </button>
          <div className="m-dots" aria-hidden="true">
            {screens.map((screen, i) => (
              <i key={screen.src} className={i === current ? "on" : undefined} />
            ))}
          </div>
          <button
            type="button"
            className="m-icon-btn"
            disabled={current === screens.length - 1}
            onClick={() => goTo(current + 1)}
            aria-label={t(UI.nextScreen)}
          >
            <IconArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
