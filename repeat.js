var baseRepeat = require('./_baseRepeat'),
    toInteger = require('./toInteger'),
    toString = require('./toString');

/**
 * Repeats the given string `n` times.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to repeat.
 * @param {number} [n=0] The number of times to repeat the string.
 * @returns {string} Returns the repeated string.
 * @example
 *
 * _.repeat('*', 3);
 * // => '***'
 *
 * _.repeat('abc', 2);
 * // => 'abcabc'
 *
 * _.repeat('abc', 0);
 * // => ''
 */
function repeat(string, n) {
  return baseRepeat(toString(string), toInteger(n));
}

module.exports = repeat;
