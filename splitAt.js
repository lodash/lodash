import slice from './slice'
import toInteger from './toInteger'

/**
 * Splits `array` into two separate arrays
 *
 * **Note:** This method is based on
 * [`Slice`](https://lodash.com/docs/4.17.15#slice).
 *
     * @since 5.0.0
 * @category Array
 * @param {array} [array=[1, 2, 3]] The array to split.
 * @param {index|number} index The index to split the array.
 * @returns {[Array, Array]} Returns two arrays.
 * @example
 *
 * splitAt([1, 2, 3, 4, 5, 6, 7], 4)
 * // => [[1, 2, 3, 4], [5, 6, 7]]
 */
const splitAt = (array, index) => {
  if (toInteger(index) <= 0) { return [[], array] }

  const firstItems = slice(array, 0, index)
  const tail = slice(array, index)

  return [firstItems, tail]
}

export default splitAt
