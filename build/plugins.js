/* eslint-disable import/no-extraneous-dependencies */
import rollupPluginStrip from 'rollup-plugin-strip';
import { terser as rollupPluginTerser } from 'rollup-plugin-terser';
import rollupPluginTs from '@wessberg/rollup-plugin-ts';
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
 *
 * @param {boolean} dev
 *        specifies whether it is a dev build or not
 */
export const ts = (dev) => rollupPluginTs({
  browserslist: false,
  hook: {
    outputPath: (path, kind) => (!dev && kind === 'declaration' ? path.replace('.min', '') : undefined),
  },
  transformers: [
    (s) => ({
      before: [minifyPrivatesTransformer(s.program)],
      after: [],
    }),
  ],
  tsconfig: (resolvedOptions) => ({ ...resolvedOptions, declaration: !dev }),
});
