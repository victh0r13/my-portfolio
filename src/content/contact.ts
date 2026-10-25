export const CONTACT = {
  email: "victorhugovhg@gmail.com",
  whatsappNumber: "5561998363183",
  github: "https://github.com/victh0r13",
  linkedin: "https://www.linkedin.com/in/victorhugogx",
};

// Arquivos do currículo — ficam em public/
export const CV_FILE = {
  pt: "CV_Victor_Hugo_PT-BR.pdf",
  en: "CV_Victor_Hugo_EN.pdf",
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
