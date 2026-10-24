export const assetUrl = (src: string) => `${import.meta.env.BASE_URL}${src}`;

export function initials(name: string) {
  const letters = name
    .split(/\s+/)
    .filter((word) => /^[A-Za-zÀ-ú]/.test(word) && !word.endsWith("."))
    .filter((word) => word.length > 2 || /^[A-Z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
  return letters || name[0].toUpperCase();
}
