import { input, output } from './vars';
import { typescript } from './plugins';

export default {
  input,
  output: output('dev'),
  plugins: [
    typescript(),
  ],
};
