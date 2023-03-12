import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgLoader from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgLoader()],
});
