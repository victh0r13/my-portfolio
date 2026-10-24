import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { LanguageProvider } from "./i18n/LanguageContext";
import "./styles.css";
import "./mobile.css";

if (window.self !== window.top) document.documentElement.dataset.embedded = "true";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
