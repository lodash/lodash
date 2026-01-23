import type { ArrayLike } from './types/aggregation'
import isNumeric from './.internal/isNumeric'

/**
 * Computes the maximum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @since 0.1.0
 * @category Math
 * @param array The array to iterate over.
 * @returns Returns the maximum value.
 * @see min, minBy, maxBy
 * @example
 *
 * max([4, 2, 8, 6])
 * // => 8
 *
 * max([])
 * // => undefined
 */
function max(array: ArrayLike<number>): number | undefined {
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
        : current > result)
    ) {
      result = current
    }
  }
  return result
}

export default max
