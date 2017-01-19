import createCompounder from './.internal/createCompounder.js';

/**
 * Converts `string`, as space separated words, to upper case.
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the upper cased string.
 * @see camelCase, kebabCase, lowerCase, snakeCase, startCase, upperFirst
 * @example
 *
 * upperCase('--foo-bar');
 * // => 'FOO BAR'
 *
 * upperCase('fooBar');
 * // => 'FOO BAR'
 *
 * upperCase('__foo_bar__');
 * // => 'FOO BAR'
 */
const upperCase = createCompounder((result, word, index) =>
  result + (index ? ' ' : '') + word.toUpperCase()
);

export default upperCase;
