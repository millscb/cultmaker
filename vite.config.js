/* ===== vite.config.js ===== */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: "./hooks/foundry.js",
      name: "cultmaker",
      fileName: () => "cultmaker.js",
      formats: ["es"],
    },
  },
  plugins: [react()],
});
