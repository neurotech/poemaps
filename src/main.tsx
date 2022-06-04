import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { App } from "./App";
import { GlobalStyles } from "./GlobalStyles";
import { themes } from "@neurotech/elements";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={themes["dark"]}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
