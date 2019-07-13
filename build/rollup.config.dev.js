import { input, output } from './vars';
import { cleanup, typescript } from './plugins';

export default {
    input,
    output: {
        file: output('dev'),
        format: 'iife'
    },
    plugins: [
        typescript(),
        cleanup()
    ]
};
