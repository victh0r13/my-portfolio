import { useEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "../../content/projects";
import { KIND_LABEL, UI } from "../../content/ui";
import { useScaledFrame } from "../../hooks/useScaledFrame";
import { useLanguage } from "../../i18n/LanguageContext";
import { initials } from "../../utils/project";
import { IconArrowRight, IconChevron, IconCursor, IconLock } from "../Icons";
import { FRAME_WIDTH } from "../LiveFrame";
import { MobileShots } from "./MobileShots";
import { ProjectSheet } from "./ProjectSheet";

const SCROLL_AFTER_TOGGLE_MS = 420;
const TOPBAR_SPACE = 72;
const TABBAR_SPACE = 96;

function LivePreview({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { t } = useLanguage();
  const { ref, style } = useScaledFrame<HTMLDivElement>(FRAME_WIDTH.mobile);
  if (!project.live) return null;

  return (
    <div ref={ref} className="m-live-preview">
      <iframe
        src={project.live}
        title={t(project.name)}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        referrerPolicy="no-referrer"
        style={style}
      />
      <button type="button" className="m-live-open" onClick={onOpen}>
        <IconCursor />
        {t(UI.openLiveSite)}
      </button>
    </div>
  );
}

function Status({ project }: { project: Project }) {
  const { t } = useLanguage();
  if (project.live) return <span className="m-status-live">{t(UI.badgeLive)}</span>;
  if (project.access === "private")
    return (
      <span className="m-status">
        <IconLock />
        {t(UI.badgePrivate)}
      </span>
    );
  return <span className="m-status">{t(UI.badgePublic)}</span>;
}

type IndexItemProps = {
  project: Project;
  open: boolean;
  onToggle: () => void;
  onOpen: () => void;
};

function IndexItem({ project, open, onToggle, onOpen }: IndexItemProps) {
  const { t } = useLanguage();
  const rowRef = useRef<HTMLButtonElement>(null);
  const userToggled = useRef(false);
  const [visited, setVisited] = useState(open);

  useEffect(() => {
    if (open) setVisited(true);
    if (!open || !userToggled.current) return;
    userToggled.current = false;
    const timer = window.setTimeout(() => {
      const row = rowRef.current;
      const item = row?.parentElement;
      if (!row || !item) return;
      const hiddenAbove = row.getBoundingClientRect().top < TOPBAR_SPACE;
      const hiddenBelow = item.getBoundingClientRect().bottom > window.innerHeight - TABBAR_SPACE;
      if (hiddenAbove || hiddenBelow) row.scrollIntoView({ behavior: "smooth", block: "start" });
    }, SCROLL_AFTER_TOGGLE_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  const toggle = () => {
    userToggled.current = true;
    onToggle();
  };

  return (
    <article
      className={["m-index-item", open ? "open" : "", project.live ? "is-live" : ""].join(" ").trim()}
    >
      <button ref={rowRef} type="button" className="m-index-row" aria-expanded={open} onClick={toggle}>
        <span className="m-index-icon" aria-hidden="true">
          {initials(t(project.name))}
        </span>
        <span className="m-index-text">
          <b>{t(project.name)}</b>
          <small>
            {t(KIND_LABEL[project.kind])} · <Status project={project} />
          </small>
        </span>
        <span className="m-index-chev">
          <IconChevron />
        </span>
      </button>
      <div className="m-index-body">
        <div>
          {visited && (
            <div className="m-index-in">
              {project.live ? (
                <LivePreview project={project} onOpen={onOpen} />
              ) : (
                <MobileShots project={project} />
              )}
              <p className="m-tagline">{t(project.tagline)}</p>
              <p className="m-desc">{t(project.desc)}</p>
              <div className="m-tags">
                {project.tags.map((tag) => (
                  <span key={t(tag)}>{t(tag)}</span>
                ))}
              </div>
              <button type="button" className="m-btn m-btn-primary" onClick={onOpen}>
                {t(UI.viewProject)}
                <IconArrowRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function MobileProjects() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(PROJECTS[0]?.id ?? null);
  const [sheet, setSheet] = useState<Project | null>(null);

  return (
    <section id="projetos" className="m-section">
      <div className="m-head">
        <h2>{t(UI.secProjects)}</h2>
        <span className="m-count">{PROJECTS.length}</span>
      </div>
      <p className="m-lead">{t(UI.mobileProjectsLead)}</p>
      <div className="m-index">
        {PROJECTS.map((project) => (
          <IndexItem
            key={project.id}
            project={project}
            open={openId === project.id}
            onToggle={() => setOpenId(openId === project.id ? null : project.id)}
            onOpen={() => setSheet(project)}
          />
        ))}
      </div>
      <ProjectSheet project={sheet} onClose={() => setSheet(null)} />
    </section>
  );
}
