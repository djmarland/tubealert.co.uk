import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://tubealert-co-uk.pages.dev",
        changeOrigin: true,
        secure: true,
        ws: true,
      },
    },
  },
  build: {
    target: "esnext",
  },
});
