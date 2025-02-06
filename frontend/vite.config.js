import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables";`,
        silenceDeprecations: [
          "mixed-decls",
          "color-functions",
          "global-builtin",
          "import",
          "legacy-js-api",
        ],
      },
    },
  },
});
