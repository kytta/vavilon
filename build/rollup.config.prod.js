import { input, output } from './vars';
import { strip, terser, typescript } from './plugins';

export default {
  input,
  output: output('min'),
  plugins: [
    typescript(),
    strip(),
    terser(),
  ],
};
