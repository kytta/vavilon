import dev from 'rollup-plugin-dev';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import minifyPrivatesTransformer from 'ts-transformer-minify-privates';

import { DEFAULT_EXTENSIONS } from '@babel/core';

import pkg from './package.json';
const banner = `/*! vavilon.js v${pkg.version} */`;

const isDev = process.env.ROLLUP_WATCH || process.env.NODE_ENV === 'development';

const external = ['dns', 'fs', 'path', 'url'];
const globals = Object.fromEntries(external.map(e => [e, e]));

const OUTPUT_DEFAULTS = {
    globals,
    freeze: false,
    esModule: false,
    banner,
    format: 'iife',
    name: pkg.name,
}

const output = [
    {
        ...OUTPUT_DEFAULTS,
        file: isDev ? './dev/vavilon.js' : './dist/vavilon.js'
    }
];
if (!isDev) {
    output.push({
        ...OUTPUT_DEFAULTS,
        file: './dist/vavilon.min.js',
        plugins: [terser({
            compress: {
                keep_infinity: true,
                pure_getters: true,
                passes: 10
            },
            mangle: {
                properties: {
                    regex: /^_private_/
                }
            },
            output: {
                comments: /^!/,
                wrap_func_args: false,
            },
            ecma: 5,
        })]
    })
}

export default {
    input: './src/index.ts',
    output,
    plugins: [
        nodeResolve({
            mainFields: ['module', 'jsnext', 'main'],
            browser: true,
            preferBuiltins: false,
        }),
        commonjs({
            include: /\/node_modules\//,
        }),
        typescript({
            typescript: require('typescript'),
            cacheRoot: `./node_modules/.cache/.rts2_cache_iife`,
            transformers: [s => ({
                before: [minifyPrivatesTransformer(s.getProgram())],
                after: []
            })]
        }),
        babel({
            babelHelpers: 'bundled',
            extensions: ['.ts', ...DEFAULT_EXTENSIONS],
            exclude: 'node_modules/**',
            plugins: [
                ['babel-plugin-transform-async-to-promises', {
                    inlineHelpers: true,
                    minify: true,
                }],
                ['@babel/plugin-proposal-class-properties', {
                    loose: true
                }],
                ['@babel/plugin-transform-regenerator', {
                    async: false
                }]
            ],
            presets: [
                ['@babel/preset-env', {
                    bugfixes: false,
                    exclude: [
                        'transform-async-to-generator',
                        'transform-regenerator',
                    ],
                    loose: true,
                    modules: false,
                    targets: [
                        'cover 95%',
                        'last 2 versions',
                        'not dead'
                    ]
                }]
            ]
        }),
        isDev && dev('dev'),
        !isDev && strip({
            debugger: true,
            include: ['**/*.js', '**/*.ts'],
            functions: ['console.log', 'console.debug', 'assert.*'],
            sourceMap: false,
        })
    ]
};
