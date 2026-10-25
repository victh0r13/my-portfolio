import { useState, type CSSProperties } from "react";
import type { Project, ScreenStage } from "../content/projects";
import { UI } from "../content/ui";
import { useLanguage } from "../i18n/LanguageContext";
import { IconArrowLeft, IconArrowRight, IconLock } from "./Icons";
import type { LightboxImage } from "./Lightbox";
import { StageSwitch } from "./StageSwitch";
import { assetUrl, hasStages, initials, screensFor } from "../utils/project";

const pad = (value: number) => String(value).padStart(2, "0");

const circularOffset = (i: number, center: number, total: number) => {
  const half = Math.floor(total / 2);
  return ((i - center + total + half) % total) - half;
};

type GalleryProps = {
  project: Project;
  onZoom: (image: LightboxImage) => void;
  autoplay?: { intervalMs: number; paused: boolean };
};

export function Gallery({ project, onZoom, autoplay }: GalleryProps) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<ScreenStage>("after");
  const isPrivate = project.access === "private";
  const staged = hasStages(project);
  const screens = screensFor(project, stage);

  if (!screens.length) {
    return (
      <div className="placeholder">
        <strong>{initials(t(project.name))}</strong>
        <span>
          {isPrivate && <IconLock />}
          {t(UI.screensSoon)}
        </span>
      </div>
    );
  }

  const current = screens[Math.min(index, screens.length - 1)];
  const cycling = autoplay !== undefined && screens.length > 1;
  const portrait = project.kind === "mobile";

  const zoom = (screen = current) =>
    onZoom({
      src: assetUrl(screen.src),
      alt: t(screen.caption),
      caption: `${t(project.name)} · ${t(screen.caption)}`,
    });

  const progress = (i: number) =>
    cycling &&
    i === index && (
      <span
        className="thumb-progress"
        style={{
          animationDuration: `${autoplay.intervalMs}ms`,
          animationPlayState: autoplay.paused ? "paused" : "running",
        }}
        onAnimationEnd={() => setIndex((index + 1) % screens.length)}
      />
    );

  const changeStage = (next: ScreenStage) => {
    setStage(next);
    setIndex(0);
  };

  return (
    <div className={`gallery${portrait ? " gallery-portrait" : ""}`}>
      {staged && (
        <div className="gallery-stage">
          <span>{t(UI.redesign)}</span>
          <StageSwitch className="stage-switch" stage={stage} onChange={changeStage} />
        </div>
      )}
      {portrait ? (
        <div className="phone-flow">
          <div className="phone-flow-stage">
            {screens.map((screen, i) => {
              const offset = circularOffset(i, index, screens.length);
              const centered = offset === 0;
              return (
                <button
                  key={screen.src}
                  type="button"
                  className="phone-flow-item"
                  aria-current={centered}
                  aria-label={centered ? `${t(UI.zoom)}: ${t(screen.caption)}` : t(screen.caption)}
                  style={{ "--offset": offset, "--abs": Math.abs(offset) } as CSSProperties}
                  onClick={() => (centered ? zoom(screen) : setIndex(i))}
                >
                  <img src={assetUrl(screen.src)} alt={t(screen.caption)} loading="lazy" />
                </button>
              );
            })}
          </div>
          {screens.length > 1 && (
            <div className="phone-flow-nav">
              <button
                type="button"
                className="round-btn"
                aria-label={t(UI.previousScreen)}
                onClick={() => setIndex((index - 1 + screens.length) % screens.length)}
              >
                <IconArrowLeft />
              </button>
              <span className="phone-flow-count">
                <b>{pad(index + 1)}</b> / {pad(screens.length)}
                {progress(index)}
              </span>
              <button
                type="button"
                className="round-btn"
                aria-label={t(UI.nextScreen)}
                onClick={() => setIndex((index + 1) % screens.length)}
              >
                <IconArrowRight />
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <button type="button" className="gallery-main" aria-label={t(UI.zoom)} onClick={() => zoom()}>
            <img key={current.src} src={assetUrl(current.src)} alt={t(current.caption)} loading="lazy" />
          </button>
          {screens.length > 1 && (
            <div className="thumbs">
              {screens.map((screen, i) => (
                <button
                  key={screen.src}
                  type="button"
                  className="thumb"
                  aria-pressed={i === index}
                  aria-label={t(screen.caption)}
                  onClick={() => setIndex(i)}
                >
                  <img src={assetUrl(screen.src)} alt="" loading="lazy" />
                  {progress(i)}
                </button>
              ))}
            </div>
          )}
        </>
      )}
      <div className="gallery-cap">
        <span>{t(current.caption)}</span>
        <span className="note">
          {isPrivate && <IconLock />}
          {t(isPrivate ? UI.privateNote : UI.appNote)}
        </span>
      </div>
    </div>
  );
}
