/**
 * Generates output file name
 *
 * @param {string} [postfix]
 *        postfix to add to the file name between 'vavilon' and 'js'
 */
export const output = (postfix) => `dist/vavilon${postfix ? `.${postfix}` : ''}.js`;

/**
 * Input file name
 *
 * @type {string}
 */
export const input = 'src/index.ts';
