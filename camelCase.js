import capitalize from './capitalize.js';
import createCompounder from './_createCompounder.js';

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
const camelCase = createCompounder((result, word, index) => {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

export default camelCase;
