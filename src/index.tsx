/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { Router } from "@solidjs/router";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?",
  );
}

if ("serviceWorker" in navigator) {
  const url =
    process.env.NODE_ENV === "production" ? "sw.js" : "/dev-sw.js?dev-sw";
  navigator.serviceWorker.register(url, { scope: "/" });
}

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!,
);
