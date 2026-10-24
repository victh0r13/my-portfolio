import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PROJECTS, type Project } from "../content/projects";
import { KIND_LABEL, UI } from "../content/ui";
import { useLanguage } from "../i18n/LanguageContext";
import { Gallery } from "./Gallery";
import { IconArrowLeft, IconArrowRight, IconExternal, IconLock, IconPause, IconPlay } from "./Icons";
import { Lightbox, type LightboxImage } from "./Lightbox";
import { LiveFrame } from "./LiveFrame";

const LIVE_DWELL_MS = 9000;
const PROJECT_DWELL_MS = 8000;
const SCREEN_DWELL_MS = 4000;

const dwellOf = (project: Project) =>
  project.live
    ? LIVE_DWELL_MS
    : Math.max(PROJECT_DWELL_MS, project.screens.length * SCREEN_DWELL_MS);

const pad = (value: number) => String(value).padStart(2, "0");

const FIRST_NOT_LIVE = PROJECTS.findIndex((project) => !project.live);
const LIVE_COUNT = FIRST_NOT_LIVE === -1 ? PROJECTS.length : FIRST_NOT_LIVE;

function Badge({ project }: { project: Project }) {
  const { t } = useLanguage();
  if (project.live) return <span className="badge badge-live">{t(UI.badgeLive)}</span>;
  if (project.access === "private")
    return (
      <span className="badge">
        <IconLock />
        {t(UI.badgePrivate)}
      </span>
    );
  return <span className="badge">{t(UI.badgePublic)}</span>;
}

function CaseLink({ project }: { project: Project }) {
  const { t } = useLanguage();
  const target = project.live
    ? { href: project.live, label: t(UI.visitSite) }
    : project.link && { href: project.link.href, label: t(project.link.label) };
  if (!target) return null;
  return (
    <a className="case-link" href={target.href} target="_blank" rel="noopener">
      {target.label}
      <IconExternal />
    </a>
  );
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export function Projects() {
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLElement>();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoplay, setAutoplay] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hovering, setHovering] = useState(false);
  const [zoomed, setZoomed] = useState<LightboxImage | null>(null);

  const project = PROJECTS[index];
  const dwell = dwellOf(project);
  const paused = !autoplay || hovering || !inView || zoomed !== null;

  const step = (delta: number) => {
    setDirection(delta);
    setIndex((current) => (current + delta + PROJECTS.length) % PROJECTS.length);
  };

  const choose = (next: number) => {
    setAutoplay(false);
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const manualStep = (delta: number) => {
    setAutoplay(false);
    step(delta);
  };

  useEffect(() => {
    if (!inView) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") manualStep(1);
      if (event.key === "ArrowLeft") manualStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <section
      id="projetos"
      ref={ref}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="wrap">
        <div className="sec-head">
          <h2>{t(UI.secProjects)}</h2>
          <p className="sec-lead">{t(UI.projectsLead)}</p>
        </div>
        <div className="showcase">
          <div key={`text-${project.id}`} className="sc-text">
            <div className="sc-meta">
              <Badge project={project} />
              <span>
                {pad(index + 1)} / {pad(PROJECTS.length)}
              </span>
              <span>
                {t(project.org)} · {t(KIND_LABEL[project.kind])}
              </span>
            </div>
            <h3>
              {t(project.name)}
              <span>.</span>
            </h3>
            <p className="tagline">{t(project.tagline)}</p>
            <p className="desc">{t(project.desc)}</p>
            <div className="tags">
              {project.tags.map((tag) => (
                <span key={t(tag)} className="tag">
                  {t(tag)}
                </span>
              ))}
            </div>
            <div className="sc-actions">
              <CaseLink project={project} />
              <div className="sc-controls">
                <button
                  type="button"
                  className="round-btn"
                  onClick={() => setAutoplay(!autoplay)}
                  aria-label={t(autoplay ? UI.pauseShowcase : UI.playShowcase)}
                  title={t(autoplay ? UI.pauseShowcase : UI.playShowcase)}
                >
                  {autoplay ? <IconPause /> : <IconPlay />}
                </button>
                <button
                  type="button"
                  className="round-btn"
                  onClick={() => manualStep(-1)}
                  aria-label={t(UI.previousProject)}
                >
                  <IconArrowLeft />
                </button>
                <button
                  type="button"
                  className="round-btn"
                  onClick={() => manualStep(1)}
                  aria-label={t(UI.nextProject)}
                >
                  <IconArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div
            key={`media-${project.id}`}
            className={`sc-media ${direction > 0 ? "from-right" : "from-left"}`}
          >
            <div className="sc-tilt">
              {project.live ? (
                <LiveFrame
                  url={project.live}
                  title={t(project.name)}
                  onInteract={() => setAutoplay(false)}
                />
              ) : (
                <Gallery
                  project={project}
                  onZoom={setZoomed}
                  autoplay={{ intervalMs: dwell / Math.max(1, project.screens.length), paused }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="sc-rail" style={{ "--n": PROJECTS.length } as CSSProperties}>
          {LIVE_COUNT > 0 && (
            <span className="sc-rail-group" style={{ gridColumn: `1 / span ${LIVE_COUNT}` }}>
              {t(UI.railLiveGroup)}
            </span>
          )}
          {PROJECTS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-current={i === index ? "true" : undefined}
              className={[i < index ? "seen" : "", item.live ? "is-live" : ""].join(" ").trim() || undefined}
              onClick={() => choose(i)}
            >
              {i === index && (
                <i
                  key={`${item.id}-${autoplay}`}
                  className={autoplay ? "running" : "full"}
                  style={{
                    animationDuration: `${dwell}ms`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                  onAnimationEnd={() => step(1)}
                />
              )}
              <b>{t(item.name)}</b>
              <small>
                {t(KIND_LABEL[item.kind])}
                {item.live ? ` · ${t(UI.badgeLive).toLowerCase()}` : ""}
              </small>
            </button>
          ))}
        </div>
      </div>
      <Lightbox image={zoomed} onClose={() => setZoomed(null)} />
    </section>
  );
}
