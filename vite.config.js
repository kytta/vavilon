import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  esbuild: {
    target: "es6",
  },
  build: {
    lib: {
      entry: path.resolve("./lib/index.js"),
      name: "Vavilon",
      formats: ["es", "umd", "iife"],
    },
    minify: "terser",
    sourcemap: true,
  },
});
