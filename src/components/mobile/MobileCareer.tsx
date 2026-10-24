import { useEffect, useRef, useState } from "react";
import { JOBS, type Job } from "../../content/jobs";
import { SKILLS } from "../../content/skills";
import { UI } from "../../content/ui";
import { useReveal } from "../../hooks/useReveal";
import { useLanguage } from "../../i18n/LanguageContext";

function JobCard({ job }: { job: Job }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const { ref, revealClass } = useReveal<HTMLElement>();
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const desc = descRef.current;
    if (desc && !expanded) setClamped(desc.scrollHeight > desc.clientHeight + 1);
  }, [expanded, t]);

  return (
    <article ref={ref} className={`m-job ${revealClass}`} data-reveal>
      <p className="m-job-period">{t(job.period)}</p>
      <h3>{t(job.role)}</h3>
      <p className="m-job-company">{job.company}</p>
      <p ref={descRef} className={`m-job-desc${expanded ? " expanded" : ""}`}>
        {t(job.desc)}
      </p>
      {(clamped || expanded) && (
        <button type="button" className="m-link-btn" onClick={() => setExpanded(!expanded)}>
          {t(expanded ? UI.readLess : UI.readMore)}
        </button>
      )}
    </article>
  );
}

export function MobileCareer() {
  const { t } = useLanguage();

  return (
    <section id="carreira" className="m-section">
      <div className="m-head">
        <h2>{t(UI.secCareer)}</h2>
      </div>
      <div className="m-jobs">
        {JOBS.map((job) => (
          <JobCard key={job.company} job={job} />
        ))}
      </div>
      <h3 className="m-subhead">{t(UI.secStack)}</h3>
      <div className="m-stack">
        {SKILLS.map((group) => (
          <div key={t(group.title)} className="m-stack-group">
            <p>{t(group.title)}</p>
            <div className="m-tags">
              {t(group.items)
                .split(", ")
                .map((item) => (
                  <span key={item}>{item}</span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
