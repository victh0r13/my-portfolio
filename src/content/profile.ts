import type { Localized } from "../i18n/types";

type Profile = {
  photo: string | null;
  photoAlt: Localized;
  monogram: string;
  available: boolean;
  roleWords: Localized<string[]>;
};

// photo: coloque a foto em public/assets/foto.webp e troque null por "assets/foto.webp".
//        Enquanto for null, aparece o monograma "VH" no lugar.
// available: false esconde o selo "Disponível para oportunidades".
// roleWords: palavras que se alternam, com efeito de digitação, na linha do cargo.
export const PROFILE: Profile = {
  photo: "assets/foto.webp",
  photoAlt: { pt: "Foto de Victor Hugo", en: "Photo of Victor Hugo" },
  monogram: "VH",
  available: true,
  roleWords: {
    pt: ["Full Stack", "Mobile", "React · .NET"],
    en: ["Full Stack", "Mobile", "React · .NET"],
  },
};
