import strip from 'rollup-plugin-strip';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import cleanup from 'rollup-plugin-cleanup';

const getFilename = (min) => {
    return `dist/vavilon${min ? '.min' : ''}.js`;
};

const input = 'src/vavilon.js';

const commonPlugins = [
    resolve(),
    commonjs(),
    strip({
        debugger: true,
        functions: ['console.log', 'console.debug'],
        sourceMap: false
    }),
    babel({
        runtimeHelpers: true,
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime'],
        exclude: 'node_modules/**'
    })
];

export default [
    {
        input: input,
        output: {
            file: getFilename(true),
            format: 'iife'
        },
        plugins: [
            ...commonPlugins,
            uglify({
                sourcemap: false
            })
        ]
    },
    {
        input: input,
        output: {
            file: getFilename(false),
            format: 'iife'
        },
        plugins: [
            ...commonPlugins,
            cleanup({
                comments: 'license'
            })
        ]
    }
];
