import baseRepeat from './.internal/baseRepeat.js';
import isIterateeCall from './.internal/isIterateeCall.js';
import toInteger from './toInteger.js';
import toString from './toString.js';

/**
 * Repeats the given string `n` times.
 *
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to repeat.
 * @param {number} [n=1] The number of times to repeat the string.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `map`.
 * @returns {string} Returns the repeated string.
 * @example
 *
 * repeat('*', 3);
 * // => '***'
 *
 * repeat('abc', 2);
 * // => 'abcabc'
 *
 * repeat('abc', 0);
 * // => ''
 */
function repeat(string, n, guard) {
  if ((guard ? isIterateeCall(string, n, guard) : n === undefined)) {
    n = 1;
  } else {
    n = toInteger(n);
  }
  return baseRepeat(toString(string), n);
}

export default repeat;
