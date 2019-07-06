import rollupPluginBabel from 'rollup-plugin-babel';
import rollupPluginCleanup from 'rollup-plugin-cleanup';
import rollupPluginFilesize from 'rollup-plugin-filesize';
import rollupPluginStrip from 'rollup-plugin-strip';
import { uglify as rollupPluginUglify } from 'rollup-plugin-uglify';

/**
 * Performs babel transpile
 *
 * The only preset used is `@babel/preset-env` with no parameters
 */
export const babel = () => rollupPluginBabel({
    presets: ['@babel/preset-env'],
    exclude: 'node_modules/**'
});

/**
 * Removes all the comments except for `@license` ones
 */
export const cleanup = () => rollupPluginCleanup({
    comments: 'license'
});

/**
 * Outputs the bundle size after build is complete.
 *
 * @param {boolean} showMin
 *        whether to show the minified bundle size
 */
export const filesize = (showMin = false) => rollupPluginFilesize({
    showMinifiedSize: showMin
});

/**
 * Removes `debugger` calls, `console.log` and `console.debug`
 */
export const strip = () => rollupPluginStrip({
    debugger: true,
    functions: ['console.log', 'console.debug'],
    sourceMap: false
});

/**
 * Minifies code with UglifyJS2
 *
 * @param {boolean} sourcemap
 *        whether to generate a source map
 */
export const uglify = (sourcemap = false) => rollupPluginUglify({
    sourcemap
});
