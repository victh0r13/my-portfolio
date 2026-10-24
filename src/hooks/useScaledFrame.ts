import { useEffect, useRef, useState, type CSSProperties } from "react";

export function useScaledFrame<T extends HTMLElement>(viewportWidth: number) {
  const ref = useRef<T>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    const fit = () => {
      const scale = Math.min(1, box.clientWidth / viewportWidth);
      setStyle({
        width: viewportWidth,
        height: box.clientHeight / scale,
        transform: `scale(${scale})`,
        left: Math.max(0, (box.clientWidth - viewportWidth * scale) / 2),
      });
    };
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, [viewportWidth]);

  return { ref, style };
}
