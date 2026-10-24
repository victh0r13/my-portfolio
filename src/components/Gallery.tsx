import { useState } from "react";
import type { Project } from "../content/projects";
import { UI } from "../content/ui";
import { useLanguage } from "../i18n/LanguageContext";
import { IconLock } from "./Icons";
import type { LightboxImage } from "./Lightbox";
import { assetUrl, initials } from "../utils/project";

type GalleryProps = {
  project: Project;
  onZoom: (image: LightboxImage) => void;
  autoplay?: { intervalMs: number; paused: boolean };
};

export function Gallery({ project, onZoom, autoplay }: GalleryProps) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const isPrivate = project.access === "private";

  if (!project.screens.length) {
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

  const current = project.screens[index];
  const cycling = autoplay !== undefined && project.screens.length > 1;

  const zoom = () =>
    onZoom({
      src: assetUrl(current.src),
      alt: t(current.caption),
      caption: `${t(project.name)} · ${t(current.caption)}`,
    });

  return (
    <div className="gallery">
      <button type="button" className="gallery-main" aria-label={t(UI.zoom)} onClick={zoom}>
        <img key={current.src} src={assetUrl(current.src)} alt={t(current.caption)} loading="lazy" />
      </button>
      {project.screens.length > 1 && (
        <div className="thumbs">
          {project.screens.map((screen, i) => (
            <button
              key={screen.src}
              type="button"
              className="thumb"
              aria-pressed={i === index}
              aria-label={t(screen.caption)}
              onClick={() => setIndex(i)}
            >
              <img src={assetUrl(screen.src)} alt="" loading="lazy" />
              {cycling && i === index && (
                <span
                  className="thumb-progress"
                  style={{
                    animationDuration: `${autoplay.intervalMs}ms`,
                    animationPlayState: autoplay.paused ? "paused" : "running",
                  }}
                  onAnimationEnd={() => setIndex((index + 1) % project.screens.length)}
                />
              )}
            </button>
          ))}
        </div>
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
