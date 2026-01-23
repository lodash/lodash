import type { ArrayLike, NumericAggregationResult } from './types/aggregation'
import isNumeric from './.internal/isNumeric'

/**
 * Computes the sum of the values in `array`.
 *
 * @since 3.4.0
 * @category Math
 * @param array The array to iterate over.
 * @returns Returns the sum.
 * @see mean, sumBy
 * @example
 *
 * sum([4, 2, 8, 6])
 * // => 20
 */
function sum(array: ArrayLike<number>): NumericAggregationResult {
  if (array == null || !array.length) {
    return 0
  }

  let result: number | undefined
  let index = -1
  const length = array.length

  while (++index < length) {
    const current = array[index]
    if (current !== undefined && current !== null && isNumeric(current)) {
      result = result === undefined ? current : result + current
    }
  }
  return result === undefined ? 0 : result
}

export default sum
