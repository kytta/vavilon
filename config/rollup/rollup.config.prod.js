import { input, output } from './vars';
import { cleanup, filesize, strip, typescript, uglify } from './plugins';

export default [
    {
        input,
        output: {
            file: output(),
            format: 'iife'
        },
        plugins: [
            typescript(),
            cleanup(),
            strip(),
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
            cleanup(),
            strip(),
            filesize()
        ]
    }
];
