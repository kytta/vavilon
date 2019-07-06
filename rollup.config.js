import strip from 'rollup-plugin-strip';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import cleanup from 'rollup-plugin-cleanup';
import filesize from 'rollup-plugin-filesize';

export const getFilename = (postfix) => {
    return `dist/vavilon${postfix ? '.' + postfix : ''}.js`;
};

export const input = 'src/index.js';

const commonPlugins = [
    strip({
        debugger: true,
        functions: ['console.log', 'console.debug'],
        sourceMap: false
    }),
    babel({
        presets: ['@babel/preset-env'],
        exclude: 'node_modules/**'
    })
];

export default [
    {
        input: input,
        output: {
            file: getFilename('min'),
            format: 'iife'
        },
        plugins: [
            ...commonPlugins,
            uglify({
                sourcemap: false
            }),
            filesize({
                showMinifiedSize: false
            })
        ]
    },
    {
        input: input,
        output: {
            file: getFilename(),
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
