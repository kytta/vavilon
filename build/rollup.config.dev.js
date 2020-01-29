import { input, output } from './vars';
import { ts } from './plugins';

export default {
  input,
  output: output('dev'),
  plugins: [
    ts(true),
  ],
};
