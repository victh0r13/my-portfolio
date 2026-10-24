import { useEffect, useState } from "react";

const TYPE_MS = 75;
const ERASE_MS = 40;
const HOLD_MS = 1800;
const GAP_MS = 350;

export function useTypewriter(words: string[]) {
  const [text, setText] = useState(words[0] ?? "");
  const key = words.join("|");

  useEffect(() => {
    const list = key.split("|");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(list[0]);
      return;
    }
    let wordIndex = 0;
    let length = list[0].length;
    let erasing = false;
    let timer = 0;
    setText(list[0]);

    const step = () => {
      const word = list[wordIndex];
      if (!erasing && length === word.length) {
        erasing = true;
        timer = window.setTimeout(step, HOLD_MS);
        return;
      }
      if (erasing && length === 0) {
        erasing = false;
        wordIndex = (wordIndex + 1) % list.length;
        timer = window.setTimeout(step, GAP_MS);
        return;
      }
      length += erasing ? -1 : 1;
      setText(list[wordIndex].slice(0, length));
      timer = window.setTimeout(step, erasing ? ERASE_MS : TYPE_MS);
    };

    timer = window.setTimeout(step, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [key]);

  return text;
}
