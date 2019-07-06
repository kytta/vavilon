import { input, output } from './vars';
import { cleanup } from './plugins';

export default {
    input,
    output: {
        file: output('dev'),
        format: 'iife'
    },
    plugins: [
        cleanup()
    ]
};
