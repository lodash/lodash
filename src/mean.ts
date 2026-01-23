import type { ArrayLike, NumericAggregationResult } from './types/aggregation'
import isNumeric from './.internal/isNumeric'

/**
 * Computes the mean of the values in `array`.
 *
 * @since 4.0.0
 * @category Math
 * @param array The array to iterate over.
 * @returns Returns the mean.
 * @see meanBy, sum, sumBy
 * @example
 *
 * mean([4, 2, 8, 6])
 * // => 5
 */
function mean(array: ArrayLike<number>): NumericAggregationResult {
  if (array == null || !array.length) {
    return NaN
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
  return result === undefined ? NaN : result / length
}

export default mean
