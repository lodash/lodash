/**
 * Replaces matches for `pattern` in `string` with `replacement`.
 *
 * **Note:** This method is based on
 * [`String#replace`](https://mdn.io/String/replace).
 *
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to modify.
 * @param {RegExp|string} pattern The pattern to replace.
 * @param {Function|string} replacement The match replacement.
 * @returns {string} Returns the modified string.
 * @see truncate, trim
 * @example
 *
 * replace('Hi Fred Fred', 'Fred', 'Barney')
 * // => 'Hi Fred Barney'
 */

function replaceLast(...args) {
    var string = `${args[0]}`;
    var last_index = args[0].lastIndexOf(args[1])
    string = string.slice(0, last_index) + string.slice(last_index).replace(args[1], args[2]);
  return string
  }
  
  export default replaceLast
  