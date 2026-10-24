import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, revealClass: visible ? "visible" : "" };
}
