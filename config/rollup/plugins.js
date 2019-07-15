import rollupPluginCleanup from 'rollup-plugin-cleanup';
import rollupPluginFilesize from 'rollup-plugin-filesize';
import rollupPluginStrip from 'rollup-plugin-strip';
import rollupPluginTypescript2 from 'rollup-plugin-typescript2';
import minifyPrivatesTransformer from 'ts-transformer-minify-privates';
import { uglify as rollupPluginUglify } from 'rollup-plugin-uglify';

/**
 * Removes all the comments except for `@license` ones
 */
export const cleanup = () => rollupPluginCleanup({
    comments: 'license',
    extensions: ['.ts']
});

/**
 * Outputs the bundle size after build is complete.
 */
export const filesize = () => rollupPluginFilesize({
    showMinifiedSize: false
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
 * Transpiles TypeScript code
 */
export const typescript = () => rollupPluginTypescript2({
    transformers: [s =>({
        before: [ minifyPrivatesTransformer(s.getProgram()) ],
        after: []
    })]
});

/**
 * Minifies code with UglifyJS2
 *
 * @param {boolean} sourcemap
 *        whether to generate a source map
 */
export const uglify = (sourcemap = false) => rollupPluginUglify({
    sourcemap,
    mangle: {
        properties: {
            regex: /^_private_/
        }
    }
});
