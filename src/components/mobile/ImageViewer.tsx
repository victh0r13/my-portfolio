import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { ProjectScreen } from "../../content/projects";
import { UI } from "../../content/ui";
import { useLanguage } from "../../i18n/LanguageContext";
import { assetUrl } from "../../utils/project";
import { IconArrowLeft, IconArrowRight, IconClose } from "../Icons";

type ImageViewerProps = {
  screens: ProjectScreen[];
  start: number | null;
  title: string;
  portrait: boolean;
  onClose: () => void;
};

export function ImageViewer({ screens, start, title, portrait, onClose }: ImageViewerProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (start !== null && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      setCurrent(start);
      setZoomed(false);
      requestAnimationFrame(() => {
        const track = trackRef.current;
        if (track) track.scrollLeft = start * track.clientWidth;
      });
    }
    if (start === null) {
      if (dialog.open) dialog.close();
      document.body.style.overflow = document.querySelector("dialog[open]") ? "hidden" : "";
    }
  }, [start]);

  const goTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    setZoomed(false);
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track || zoomed) return;
    setCurrent(Math.round(track.scrollLeft / track.clientWidth));
  };

  const toggleZoom = (event: MouseEvent<HTMLDivElement>) => {
    const slide = event.currentTarget;
    const box = slide.getBoundingClientRect();
    const ratioX = (event.clientX - box.left) / box.width;
    const ratioY = (event.clientY - box.top) / box.height;
    const next = !zoomed;
    setZoomed(next);
    if (!next) return;
    requestAnimationFrame(() => {
      slide.scrollLeft = ratioX * (slide.scrollWidth - slide.clientWidth);
      slide.scrollTop = ratioY * (slide.scrollHeight - slide.clientHeight);
    });
  };

  const screen = screens[current];

  return (
    <dialog ref={dialogRef} className={`m-viewer${portrait ? " portrait" : ""}`} onClose={onClose}>
      {start !== null && screen && (
        <>
          <header className="m-viewer-head">
            <div>
              <b>{title}</b>
              <small>
                {t(screen.caption)} · {current + 1}/{screens.length}
              </small>
            </div>
            <button type="button" className="m-icon-btn" onClick={onClose} aria-label={t(UI.close)}>
              <IconClose />
            </button>
          </header>
          <div ref={trackRef} className={`m-viewer-track${zoomed ? " zoomed" : ""}`} onScroll={onScroll}>
            {screens.map((item, i) => (
              <div
                key={item.src}
                className={`m-viewer-slide${zoomed && i === current ? " zoomed" : ""}`}
                onClick={i === current ? toggleZoom : undefined}
              >
                <img src={assetUrl(item.src)} alt={t(item.caption)} />
              </div>
            ))}
          </div>
          <footer className="m-viewer-foot">
            <button
              type="button"
              className="m-icon-btn"
              disabled={current === 0}
              onClick={() => goTo(current - 1)}
              aria-label={t(UI.previousScreen)}
            >
              <IconArrowLeft />
            </button>
            <p>{t(zoomed ? UI.viewerZoomedHint : UI.viewerHint)}</p>
            <button
              type="button"
              className="m-icon-btn"
              disabled={current === screens.length - 1}
              onClick={() => goTo(current + 1)}
              aria-label={t(UI.nextScreen)}
            >
              <IconArrowRight />
            </button>
          </footer>
        </>
      )}
    </dialog>
  );
}
