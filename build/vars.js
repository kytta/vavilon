/**
 * Input file name
 *
 * @type {string}
 */
export const input = 'src/index.ts';

/**
 * Generates output parameters
 *
 * @param {string} infix
 *        infix to add to the file name between 'vavilon' and 'js'
 */
export const output = (infix) => ({
  file: `dist/vavilon.${infix}.js`,
  format: 'iife',
  name: 'Vavilon',
});
