import dev from "rollup-plugin-dev";
import minifyPrivatesTransformer from "ts-transformer-minify-privates";
import strip from "@rollup/plugin-strip";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

const pkg = require("./package.json");

const isDev =
  process.env.ROLLUP_WATCH || process.env.NODE_ENV === "development";

const banner = `/*! vavilon.js v${pkg.version} */`;

export default {
  input: "./src/index.ts",
  output: isDev
    ? {
        file: "dev/vavilon.js",
        format: "iife",
      }
    : [
        {
          file: "dist/vavilon.js",
          format: "iife",
          banner,
        },
        {
          file: "dist/vavilon.min.js",
          format: "iife",
          banner,
          plugins: [
            terser({
              mangle: {
                properties: {
                  regex: /^_private_/,
                },
              },
              output: {
                comments: /^!/,
              },
            }),
          ],
        },
      ],
  plugins: [
    typescript({
      transformers: [
        (s) => ({
          before: [minifyPrivatesTransformer(s.getProgram())],
          after: [],
        }),
      ],
    }),
    isDev && dev("dev"),
    !isDev &&
      strip({
        debugger: true,
        include: ["**/*.js"],
        functions: ["console.log", "console.debug", "assert.*"],
        sourceMap: false,
      }),
  ],
};
