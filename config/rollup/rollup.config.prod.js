import { input, output } from './vars';
import { banner, cleanup, filesize, strip, typescript, uglify } from './plugins';

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
            uglify(),
            strip(),
            cleanup(),
            banner(),
            filesize()
        ]
    }
];
