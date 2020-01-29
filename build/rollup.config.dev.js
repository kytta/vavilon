import { input, output } from './vars';
import { typescript } from './plugins';

export default {
  input,
  output: {
    file: output('dev'),
    format: 'iife',
  },
  plugins: [
    typescript(),
  ],
};
