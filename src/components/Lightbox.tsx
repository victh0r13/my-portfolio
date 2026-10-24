import { useEffect, useRef } from "react";
import { UI } from "../content/ui";
import { useLanguage } from "../i18n/LanguageContext";

export type LightboxImage = { src: string; alt: string; caption: string };

type LightboxProps = {
  image: LightboxImage | null;
  onClose: () => void;
};

export function Lightbox({ image, onClose }: LightboxProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (image && !dialog.open) dialog.showModal();
    if (!image && dialog.open) dialog.close();
  }, [image]);

  return (
    <dialog
      id="lightbox"
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {image && <img src={image.src} alt={image.alt} />}
      <div className="lightbox-bar">
        <span>{image?.caption}</span>
        <button type="button" onClick={onClose}>
          {t(UI.close)}
        </button>
      </div>
    </dialog>
  );
}
