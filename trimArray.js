import dropWhile from './dropWhile.js'
import dropRightWhile from './dropRightWhile.js'
import isArrayLike from './isArrayLike.js'

/**
 * Removes falsey values from the left and right of an array.
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {*} value The value (or values as array) to trim.
 * @returns {Array} Returns the trimmed array.
 * @example
 *
 * trimArray(['', '', '', 'a', 'b', '', 'c', 'd', '', ''])
 * // => ['a', 'b', '', 'c', 'd']
 *
 * trimArray([0, 0, 0, 'a', 'b', '', 'c', 'd', 0, 0], 0)
 * // => ['a', 'b', '', 'c', 'd']
 *
 * trimArray([0, 1, 2, 'a', 'b', '', 'c', 'd', 0, 1], [0, 1, 2])
 * // => ['a', 'b', '', 'c', 'd']
 */
function trimArray(array, value) {
  if (!value) {
      array = dropWhile(array, val => !val)
      array = dropRightWhile(array, val => !val)
  } else {
      if (!isArrayLike(value)) value = [value]
      array = dropWhile(array, val => !(val in value))
      array = dropRightWhile(array, val => !(val in value))
  }
  return array
}

export default trimArray
