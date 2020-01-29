import { input, output } from './vars';
import { strip, terser, typescript } from './plugins';

export default {
  input,
  output: {
    file: output('min'),
    format: 'iife',
  },
  plugins: [
    typescript(),
    strip(),
    terser(),
  ],
};
