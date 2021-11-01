import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import { theme } from "./styles/theme";
import { RecoilRoot } from "recoil";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import mixpanel from "mixpanel-browser";

Sentry.init({
  dsn: "https://4f85a46b252644a590e9413fa9cd9b6b@o1046587.ingest.sentry.io/6023393",
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN as string);

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
