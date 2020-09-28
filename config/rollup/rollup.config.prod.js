import { input, output } from './vars';
import { banner, cleanup, filesize, strip, typescript, terser } from './plugins';

export default [
    {
        input,
        output: {
            file: output(),
            format: 'iife'
        },
        plugins: [
            typescript(),
            strip(),
            cleanup(),
            banner(),
            filesize()
        ]
    },
    {
        input,
        output: {
            file: output('min'),
            format: 'iife'
        },
        plugins: [
            typescript(),
            terser(),
            strip(),
            cleanup(),
            banner(),
            filesize()
        ]
    }
];
