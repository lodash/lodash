/**
 * Replaces matches for `pattern` in `string` with `replacement`.
 *
 * **Note:** This method is based on [`String#replace`](https://mdn.io/String/replace).
 *
 * @since 4.0.0
 * @category String
 * @example
 *   replace('Hi Fred', 'Fred', 'Barney')
 *   // => 'Hi Barney'
 *
 * @param {string} [string] The string to modify. Default is `''`
 * @param {RegExp | string} pattern The pattern to replace.
 * @param {Function | string} replacement The match replacement.
 * @see truncate, trim
 * @returns {string} Returns the modified string.
 */
function replace(...args) {
  const string = `${args[0]}`
  return args.length < 3 ? string : string.replace(args[1], args[2])
}

export default replace
