/**
 * Given an string x, return true if x is a palindrome string.
 *
 * @since 5.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {boolean}  Returns `true` if x is a palindrome string
 * @example
 *
 * isPalindrome('abc')
 * // => false
 * isPalindrome('aba')
 * // => true
 */
function isPalindrome(x) {
  for (let i = 0, j = x.length - 1; i < x.length, j >= 0; i++, j--) {
    if (x[i] !== x[j]) {
      return false;
    }
  }
  return true;
}

export default isPalindrome;
