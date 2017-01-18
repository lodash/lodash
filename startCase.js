import createCompounder from './.internal/createCompounder.js';
import upperFirst from './upperFirst.js';

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @since 3.1.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the start cased string.
 * @see camelCase, lowerCase, kebabCase, snakeCase, upperCase, upperFirst
 * @example
 *
 * startCase('--foo-bar--');
 * // => 'Foo Bar'
 *
 * startCase('fooBar');
 * // => 'Foo Bar'
 *
 * startCase('__FOO_BAR__');
 * // => 'FOO BAR'
 */
const startCase = createCompounder((result, word, index) =>
  result + (index ? ' ' : '') + upperFirst(word)
);

export default startCase;
