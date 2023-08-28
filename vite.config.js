import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve("./src/index.ts"),
      name: "Vavilon",
      formats: ["es", "umd", "iife"],
    },
    minify: "terser",
    sourcemap: true,
  },
});
