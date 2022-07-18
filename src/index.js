import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { ThemeProvider } from "@fluentui/react";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { proPetroThreeDTheme } from "./theme";

initializeIcons();

const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={{ palette: proPetroThreeDTheme }}>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
