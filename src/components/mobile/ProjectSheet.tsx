import { useEffect, useRef } from "react";
import type { Project } from "../../content/projects";
import { kindLabelOf, UI } from "../../content/ui";
import { useLanguage } from "../../i18n/LanguageContext";
import { IconClose, IconExternal } from "../Icons";
import { displayAddress } from "../LiveFrame";
import { MobileShots } from "./MobileShots";

type ProjectSheetProps = {
  project: Project | null;
  onClose: () => void;
};

function SheetMedia({ project }: { project: Project }) {
  const { t } = useLanguage();

  if (project.live) {
    return (
      <div className="m-sheet-live">
        <div className="m-sheet-url">
          <span>{displayAddress(project.live)}</span>
          <a href={project.live} target="_blank" rel="noopener" aria-label={t(UI.openNewTab)}>
            <IconExternal />
          </a>
        </div>
        <iframe src={project.live} title={t(project.name)} referrerPolicy="no-referrer" />
        <p className="m-hint">{t(UI.livePreviewHint)}</p>
      </div>
    );
  }

  return <MobileShots project={project} />;
}

export function ProjectSheet({ project, onClose }: ProjectSheetProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
    document.body.style.overflow = project ? "hidden" : "";
  }, [project]);

  const target = project?.live
    ? { href: project.live, label: t(UI.visitSite) }
    : project?.link && { href: project.link.href, label: t(project.link.label) };

  return (
    <dialog
      ref={dialogRef}
      className="m-sheet"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="m-sheet-in">
          <header className="m-sheet-head">
            <span className="m-grabber" />
            <div>
              <p className="m-meta">
                {t(project.org)} · {t(kindLabelOf(project))}
              </p>
              <h3>{t(project.name)}</h3>
            </div>
            <button type="button" className="m-icon-btn" onClick={onClose} aria-label={t(UI.close)}>
              <IconClose />
            </button>
          </header>
          <div className="m-sheet-body">
            <SheetMedia project={project} />
            <p className="m-tagline">{t(project.tagline)}</p>
            <p className="m-desc">{t(project.desc)}</p>
            <div className="m-tags">
              {project.tags.map((tag) => (
                <span key={t(tag)}>{t(tag)}</span>
              ))}
            </div>
            {target && (
              <a className="m-btn m-btn-primary" href={target.href} target="_blank" rel="noopener">
                {target.label}
                <IconExternal />
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
