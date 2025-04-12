import React from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

import "index.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
root.render(
  <React.StrictMode>
   <ClerkProvider  publishableKey={PUBLISHABLE_KEY} >
    <App />
  </ClerkProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
