import { useRef, useState } from "react";
import type { Project } from "../../content/projects";
import { UI } from "../../content/ui";
import { useLanguage } from "../../i18n/LanguageContext";
import { assetUrl, initials } from "../../utils/project";
import { IconLock } from "../Icons";

export function MobileShots({ project }: { project: Project }) {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  if (!project.screens.length) {
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

  return (
    <div>
      <div ref={trackRef} className="m-shots" onScroll={onScroll}>
        {project.screens.map((screen) => (
          <figure key={screen.src}>
            <img src={assetUrl(screen.src)} alt={t(screen.caption)} loading="lazy" />
            <figcaption>{t(screen.caption)}</figcaption>
          </figure>
        ))}
      </div>
      {project.screens.length > 1 && (
        <div className="m-dots" aria-hidden="true">
          {project.screens.map((screen, i) => (
            <i key={screen.src} className={i === current ? "on" : undefined} />
          ))}
        </div>
      )}
    </div>
  );
}
