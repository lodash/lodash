/**
 * Repeats the given string `n` times.
 *
 * @since 3.0.0
 * @category String
 * @example
 *   repeat('*', 3)
 *   // => '***'
 *
 *   repeat('abc', 2)
 *   // => 'abcabc'
 *
 *   repeat('abc', 0)
 *   // => ''
 *
 * @param {string} [string] The string to repeat. Default is `''`
 * @param {number} [n] The number of times to repeat the string. Default is `1`
 * @returns {string} Returns the repeated string.
 */
function repeat(string, n) {
  let result = ''
  if (!string || n < 1 || n > Number.MAX_SAFE_INTEGER) {
    return result
  }
  // Leverage the exponentiation by squaring algorithm for a faster repeat.
  // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
  do {
    if (n % 2) {
      result += string
    }
    n = Math.floor(n / 2)
    if (n) {
      string += string
    }
  } while (n)

  return result
}

export default repeat
