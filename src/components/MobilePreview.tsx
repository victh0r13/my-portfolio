import { useEffect, useRef, useState } from "react";
import { UI } from "../content/ui";
import { useLanguage } from "../i18n/LanguageContext";
import { IconClose, IconPhone } from "./Icons";

const PHONE_WIDTH = 414;
const PHONE_HEIGHT = 868;
const VIEWPORT_MARGIN = 56;
const PROMPT_SCROLL_RATIO = 0.6;
const DISMISS_KEY = "vhgx-mobile-prompt";

const JUMPS = [
  { id: "topo", label: UI.tabHome },
  { id: "projetos", label: UI.tabProjects },
  { id: "carreira", label: UI.tabCareer },
  { id: "contato", label: UI.tabContact },
];

function usePhoneScale(active: boolean) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!active) return;
    const fit = () =>
      setScale(Math.min(1, (window.innerHeight - VIEWPORT_MARGIN) / PHONE_HEIGHT));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [active]);

  return scale;
}

type MobilePreviewDialogProps = { open: boolean; onClose: () => void };

export function MobilePreviewDialog({ open, onClose }: MobilePreviewDialogProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const scale = usePhoneScale(open);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setSrc(window.location.href.split("#")[0]);
      dialog.showModal();
    }
    if (!open && dialog.open) dialog.close();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const jump = (id: string) => {
    const frameWindow = frameRef.current?.contentWindow;
    if (frameWindow) frameWindow.location.hash = id;
  };

  return (
    <dialog
      ref={dialogRef}
      className="mp-dialog"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mp-layout">
        <div
          className="mp-slot"
          style={{ width: PHONE_WIDTH * scale, height: PHONE_HEIGHT * scale }}
        >
          <div className="mp-phone" style={{ transform: `scale(${scale})` }}>
            <span className="mp-notch" />
            {open && src && <iframe ref={frameRef} src={src} title={t(UI.previewEyebrow)} />}
          </div>
        </div>
        <aside className="mp-side">
          <p className="eyebrow">{t(UI.previewEyebrow)}</p>
          <h2>{t(UI.previewTitle)}</h2>
          <p className="mp-text">{t(UI.previewText)}</p>
          <p className="mp-label">{t(UI.previewJump)}</p>
          <div className="mp-jumps">
            {JUMPS.map((item) => (
              <button key={item.id} type="button" onClick={() => jump(item.id)}>
                {t(item.label)}
              </button>
            ))}
          </div>
          <p className="mp-hint">{t(UI.previewHint)}</p>
          <button type="button" className="btn btn-ghost mp-back" onClick={onClose}>
            {t(UI.previewBack)}
          </button>
        </aside>
        <button type="button" className="mp-close" onClick={onClose} aria-label={t(UI.close)}>
          <IconClose />
        </button>
      </div>
    </dialog>
  );
}

function readDismissed() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function MobilePreviewPrompt({ onOpen, hidden }: { onOpen: () => void; hidden: boolean }) {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(readDismissed);
  const [reached, setReached] = useState(false);

  useEffect(() => {
    if (reached) return;
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * PROMPT_SCROLL_RATIO) setReached(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reached]);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      return;
    }
  };

  if (dismissed || !reached || hidden) return null;

  return (
    <div className="mp-prompt">
      <button type="button" className="mp-prompt-main" onClick={onOpen}>
        <span className="mp-prompt-icon">
          <IconPhone size={18} />
        </span>
        <b>{t(UI.promptTitle)}</b>
      </button>
      <button type="button" className="mp-prompt-close" onClick={dismiss} aria-label={t(UI.dismiss)}>
        <IconClose size={14} />
      </button>
    </div>
  );
}
