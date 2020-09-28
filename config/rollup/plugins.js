import rollupPluginBanner from 'rollup-plugin-banner';
import rollupPluginCleanup from 'rollup-plugin-cleanup';
import rollupPluginFilesize from 'rollup-plugin-filesize';
import rollupPluginStrip from 'rollup-plugin-strip';
import { terser as rollupPluginTerser } from 'rollup-plugin-terser'
import rollupPluginTypescript2 from 'rollup-plugin-typescript2';
import minifyPrivatesTransformer from 'ts-transformer-minify-privates';

export const banner = () => rollupPluginBanner(
    'vavilon.js\n' +
    '<%= pkg.description %>\n' +
    '\n' +
    '@version <%= pkg.version %>\n' +
    '@license MIT'
);

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
 * Minifies code with Terser
 */
export const terser = () => rollupPluginTerser({
    mangle: {
        properties: {
            regex: /^_private_/
        }
    }
});
