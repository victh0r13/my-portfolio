import { useEffect, useState } from "react";

const TRIGGER_RATIO = 0.35;

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const sectionIds = key.split("|");
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * TRIGGER_RATIO;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(sectionIds[sectionIds.length - 1]);
        return;
      }
      let current: string | null = null;
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [key]);

  return active;
}
