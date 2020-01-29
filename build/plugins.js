/* eslint-disable import/no-extraneous-dependencies */
import rollupPluginStrip from 'rollup-plugin-strip';
import { terser as rollupPluginTerser } from 'rollup-plugin-terser';
import rollupPluginTypescript2 from 'rollup-plugin-typescript2';
import minifyPrivatesTransformer from 'ts-transformer-minify-privates';

/**
 * Removes `debugger` calls, `console.log` and `console.debug`
 */
export const strip = () => rollupPluginStrip({
  debugger: true,
  functions: ['console.log', 'console.debug'],
  sourceMap: false,
});

/**
 * Minifies code with Terser
 */
export const terser = () => rollupPluginTerser({
  ecma: 5,
  mangle: {
    properties: {
      regex: /^_private_/,
    },
  },
});

/**
 * Transpiles TypeScript code
 */
export const typescript = () => rollupPluginTypescript2({
  transformers: [(s) => ({
    before: [minifyPrivatesTransformer(s.getProgram())],
    after: [],
  })],
});
