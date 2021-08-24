import { dropRight } from 'lodash'
import each from './each'

/**
 * This method like join, but that returns an array
 *
 * @since 1.0.0
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @param {any} separator The element separator.
 * @returns {Array} Returns the an array.
 * @example
 *
 * const result = separate(['a', 'b', 'c'], '!')
 * // => ['a', '!', 'b', '!', 'c']
 */
function separate(array, separator) {
  if (!(array != null && array.length)) {
    return []
  }

  const result = []
  each(array, (element) => {
    result.push(element)
    result.push(separator)
  })

  return dropRight(result)
}

export default separate
