import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

const repoName = "vincen-react-template";

export default defineConfig({
  // Relative paths for local dev, absolute base for GitHub Pages
  base: process.env.DEPLOY_TARGET === "github-pages" ? `/${repoName}/` : "./",
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
