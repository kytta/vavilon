import { input, output } from './vars';
import { strip, terser, ts } from './plugins';

export default {
  input,
  output: output('min'),
  plugins: [
    ts(false),
    strip(),
    terser(),
  ],
};
