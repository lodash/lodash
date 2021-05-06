/**
 * @since 5.0.0
 * @category String
 * @param {string} str The string to modify
 * @param {string} change The replacement
 * @param {Number} i Replaced index
 * @returns {string} Returns the modified string
 * @example
 *
 * const str = '01234567'
 *
 * replaceAt(str, '---', 3)
 *
 * // -> '012---4567'
 *
 */

function replaceAt(str, change, i) {
  if(typeof str !== 'string') {
    throw new TypeError('First parameter a string expected')
  }
  if(typeof change !== 'string') {
    throw new TypeError('Second parameter a string expected')
  }
  if(typeof i !== 'number') {
    throw new TypeError('Third parameter a number expected')
  }
  if(i < 0 || i >= str.length) {
    throw new Error('Index out of bounds')
  }

  return str.substr(0,i) + change + str.substr(i+1)
}

export default replaceAt
