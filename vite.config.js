import { defineConfig } from "vite";
import * as path from "node:path";

export default defineConfig({
  esbuild: {
    minify: true,
  },
  build: {
    sourcemap: true,
    target: "esnext",
    minify: "terser",
    lib: {
      entry: path.resolve("./src/index.ts"),
      name: "Vavilon",
      formats: ["es", "umd", "iife"],
      // TODO: remove this legacy naming in v2
      fileName: (format) => `vavilon.${format}.js`,
    },
  },
});
