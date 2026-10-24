import { JOBS } from "../content/jobs";
import { UI } from "../content/ui";
import { useReveal } from "../hooks/useReveal";
import { useLanguage } from "../i18n/LanguageContext";

export function Experience() {
  const { t } = useLanguage();
  const { ref, revealClass } = useReveal<HTMLElement>();

  return (
    <section id="experiencia" data-reveal ref={ref} className={revealClass}>
      <div className="wrap">
        <div className="sec-head">
          <h2>{t(UI.secExperience)}</h2>
        </div>
        <div className="timeline">
          {JOBS.map((job, i) => (
            <div key={job.company} className="job">
              <div className="job-rail">
                <span className="dot" />
                {i < JOBS.length - 1 && <span className="rail" />}
              </div>
              <div className="job-body">
                <p className="job-period">{t(job.period)}</p>
                <h3>
                  {t(job.role)} · <em>{job.company}</em>
                </h3>
                <p>{t(job.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
