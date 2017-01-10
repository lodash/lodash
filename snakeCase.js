import createCompounder from './_createCompounder.js';

/**
 * Converts `string` to
 * [snake case](https://en.wikipedia.org/wiki/Snake_case).
 *
 * @static
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the snake cased string.
 * @example
 *
 * snakeCase('Foo Bar');
 * // => 'foo_bar'
 *
 * snakeCase('fooBar');
 * // => 'foo_bar'
 *
 * snakeCase('--FOO-BAR--');
 * // => 'foo_bar'
 */
const snakeCase = createCompounder((result, word, index) =>
  result + (index ? '_' : '') + word.toLowerCase()
);

export default snakeCase;
