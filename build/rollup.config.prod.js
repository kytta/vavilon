import { input, output } from './vars';
import { babel, cleanup, filesize, strip, uglify } from './plugins';

export default [
    {
        input,
        output: {
            file: output(),
            format: 'iife'
        },
        plugins: [
            strip(),
            babel(),
            cleanup(),
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
            strip(),
            babel(),
            uglify(),
            filesize()
        ]
    }
]