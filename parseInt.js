import root from './.internal/root.js'

/** Used to match leading and trailing whitespace. */
const reTrimStart = /^\s+/

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeParseInt = root.parseInt

/**
 * Converts `string` to an integer of the specified radix. If `radix` is
 * `undefined` or `0`, a `radix` of `10` is used unless `string` is a
 * hexadecimal, in which case a `radix` of `16` is used.
 *
 * **Note:** This method aligns with the [ES5
 * implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
 *
 * @since 1.1.0
 * @category String
 * @example
 *   parseInt('08')
 *   // => 8
 *
 * @param {string} string The string to convert.
 * @param {number} [radix] The radix to interpret `string` by. Default is `10`
 * @returns {number} Returns the converted integer.
 */
function parseInt(string, radix) {
  if (radix == null) {
    radix = 0
  } else if (radix) {
    radix = +radix
  }
  return nativeParseInt(`${string}`.replace(reTrimStart, ''), radix || 0)
}

export default parseInt
