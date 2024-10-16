import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/style.scss";
import Desktop from "./Desktop";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Desktop />
  </StrictMode>,
);
