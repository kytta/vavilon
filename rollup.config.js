import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import minifyPrivatesTransformer from 'ts-transformer-minify-privates';
import strip from '@rollup/plugin-strip';
import filesize from 'rollup-plugin-filesize';

const pkg = require('./package.json');
const isDev = process.env.ROLLUP_WATCH || process.env.NODE_ENV === 'development';

const outputPath = (postfix = null) =>
    `dist/vavilon${postfix ? '.' + postfix : ''}.js`;

const banner = `/*! vavilon.js v${pkg.version} */`

export default {
    input: './src/index.ts',
    output:
        isDev
            ? {
                file: outputPath('dev'),
                format: 'iife'
            }
            : [
                {
                    file: outputPath(),
                    format: 'iife',
                    banner
                },
                {
                    file: outputPath('min'),
                    format: 'iife',
                    banner,
                    plugins: [terser({
                        mangle: {
                            properties: {
                                regex: /^_private_/
                            }
                        },
                        output: {
                            comments: /^!/
                        }
                    })]
                }
            ],
    plugins: [
        typescript({
            transformers: [s => ({
                before: [minifyPrivatesTransformer(s.getProgram())],
                after: []
            })]
        }),
        !isDev && strip({
            debugger: true,
            include: ['**/*.js'],
            functions: ['console.log', 'console.debug', 'assert.*'],
            sourceMap: false,
        }),
        !isDev && filesize({
            showMinifiedSize: false
        })
    ]
};
