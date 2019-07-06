import cleanup from 'rollup-plugin-cleanup';
import { input, getFilename } from './rollup.config';

export default {
    input: input,
    output: {
        file: getFilename('dev'),
        format: 'iife'
    },
    plugins: [
        cleanup({
            comments: 'license'
        })
    ]
};
