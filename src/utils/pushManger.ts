export const isSupported =
  typeof window !== "undefined" &&
  "navigator" in window &&
  "serviceWorker" in window.navigator &&
  "PushManager" in window;
