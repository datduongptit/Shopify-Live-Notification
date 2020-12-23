import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@shopify/polaris/dist/styles.css";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import App from "./App";

ReactDOM.render(
  <AppProvider i18n={enTranslations}>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
