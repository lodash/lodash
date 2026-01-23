import type { ArrayLike } from './types/aggregation'
import isNumeric from './.internal/isNumeric'

/**
 * Computes the minimum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @since 0.1.0
 * @category Math
 * @param array The array to iterate over.
 * @returns Returns the minimum value.
 * @see max, minBy, maxBy
 * @example
 *
 * min([4, 2, 8, 6])
 * // => 2
 *
 * min([])
 * // => undefined
 */
function min(array: ArrayLike<number>): number | undefined {
  if (array == null || !array.length) {
    return undefined
  }

  let index = -1
  const length = array.length
  let result: number | undefined

  while (++index < length) {
    const current = array[index]

    if (
      current != null &&
      isNumeric(current) &&
      (result === undefined
        ? current === current // Check for NaN
        : current < result)
    ) {
      result = current
    }
  }
  return result
}

export default min
