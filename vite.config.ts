import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { GITHUB_PAGES_BASE_PATH } from "./src/shared/config";

export default defineConfig({
  base: process.env.GITHUB_PAGES_BASE_PATH ?? GITHUB_PAGES_BASE_PATH,
  plugins: [react()],
  test: {
    environment: "node",
  },
});
