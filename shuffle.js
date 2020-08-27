import copyArray from './.internal/copyArray.js'
import isString from './isString.js'
import isArrayLike from './isArrayLike.js'

/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @since 0.1.0
 * @category Array|String
 * @param {Array|String} array The array to shuffle. | string The string to shuffle.
 * @returns {Array|String} Returns the new shuffled array. | Returns the new shuffled string.
 * @example
 *
 * shuffle([1, 2, 3, 4])
 * // => [4, 1, 3, 2]
 * shuffle('1234')
 * // => '4132'
 */
function shuffle(inputValue) {
  const isInputString = isString(inputValue)
  const isInputArray = isArrayLike(inputValue)
  if (!isInputString && !isInputArray) {
    throw Error('unexpected input value!')
  }

  if (isInputString) {
    inputValue = inputValue.split('')
  }

  const length = inputValue == null ? 0 : inputValue.length
  if (!length) {
    if (isInputString) { return '' }
    if (isInputArray) { return [] }
  }
  let index = -1
  const lastIndex = length - 1
  const result = copyArray(inputValue)
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }

  if (isInputString) {
    return result.join('')
  }
  return result
}

export default shuffle
