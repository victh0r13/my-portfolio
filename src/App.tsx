import { useEffect, useState } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { MobileApp } from "./components/mobile/MobileApp";
import { MobilePreviewDialog, MobilePreviewPrompt } from "./components/MobilePreview";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { Stack } from "./components/Stack";
import { UI } from "./content/ui";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useLanguage } from "./i18n/LanguageContext";

const MOBILE_QUERY = "(max-width: 720px)";

const setMeta = (selector: string, value: string) =>
  document.querySelector(selector)?.setAttribute("content", value);

function DesktopApp() {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <Nav onPreviewMobile={() => setPreviewOpen(true)} />
      <Hero />
      <main>
        <Projects />
        <Experience />
        <Stack />
        <About />
        <Contact />
      </main>
      <footer>
        <div className="wrap">© {new Date().getFullYear()} Victor Hugo Gomes Xavier</div>
      </footer>
      <MobilePreviewPrompt hidden={previewOpen} onOpen={() => setPreviewOpen(true)} />
      <MobilePreviewDialog open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </>
  );
}

export function App() {
  const { lang, t } = useLanguage();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    document.title = t(UI.docTitle);
    setMeta('meta[name="description"]', t(UI.docDesc));
    setMeta('meta[property="og:title"]', t(UI.docTitle));
    setMeta('meta[property="og:description"]', t(UI.docDesc));
  }, [lang, t]);

  return isMobile ? <MobileApp /> : <DesktopApp />;
}
