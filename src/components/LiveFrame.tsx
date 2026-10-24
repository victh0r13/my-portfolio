import { useState, type ReactNode } from "react";
import { UI } from "../content/ui";
import { useScaledFrame } from "../hooks/useScaledFrame";
import { useLanguage } from "../i18n/LanguageContext";
import { IconCursor, IconDesktop, IconExternal, IconPhone } from "./Icons";

type ViewportMode = "desktop" | "mobile";

export const FRAME_WIDTH: Record<ViewportMode, number> = { desktop: 1280, mobile: 390 };

type LiveFrameProps = { url: string; title: string; onInteract?: () => void };

export const displayAddress = (url: string) => {
  const parsed = new URL(url);
  return parsed.hostname + parsed.pathname.replace(/\/$/, "");
};

export function LiveFrame({ url, title, onInteract }: LiveFrameProps) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<ViewportMode>("desktop");
  const [active, setActive] = useState(false);
  const { ref, style } = useScaledFrame<HTMLDivElement>(FRAME_WIDTH[mode]);

  const modeButton = (value: ViewportMode, label: string, icon: ReactNode) => (
    <button
      type="button"
      aria-pressed={mode === value}
      aria-label={label}
      title={label}
      onClick={() => {
        setMode(value);
        onInteract?.();
      }}
    >
      {icon}
    </button>
  );

  return (
    <div className="browser">
      <div className="browser-bar">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span className="url">{displayAddress(url)}</span>
        <span className="viewport-switch">
          {modeButton("desktop", t(UI.viewDesktop), <IconDesktop />)}
          {modeButton("mobile", t(UI.viewMobile), <IconPhone />)}
        </span>
        <a
          className="open-ext"
          href={url}
          target="_blank"
          rel="noopener"
          aria-label={t(UI.openNewTab)}
          title={t(UI.openNewTab)}
        >
          <IconExternal />
        </a>
      </div>
      <div ref={ref} className={`live-body${active ? " active" : ""}`} data-mode={mode}>
        <iframe src={url} title={title} loading="lazy" referrerPolicy="no-referrer" style={style} />
        <button
          type="button"
          className="activate"
          onClick={() => {
            setActive(true);
            onInteract?.();
          }}
        >
          <IconCursor />
          {t(UI.browseHere)}
        </button>
      </div>
    </div>
  );
}
