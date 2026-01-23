import type {
  NumericPropertyShorthand,
  NumericIteratee,
  ArrayLike,
  NumericAggregationResult
} from './types/aggregation'
import isNumeric from './.internal/isNumeric'

/**
 * The base implementation of `sum` and `sumBy`.
 *
 * @private
 * @param array The array to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns the sum.
 */
function baseSum<T>(
  array: readonly T[],
  iteratee: (value: T) => number | undefined | null
): number {
  let result: number | undefined
  let index = -1
  const length = array.length

  while (++index < length) {
    const current = iteratee(array[index])
    if (current !== undefined && current !== null && isNumeric(current)) {
      result = result === undefined ? current : result + current
    }
  }
  return result === undefined ? 0 : result
}

/**
 * Creates a property accessor function from a property key.
 *
 * @private
 * @param key The property key.
 * @returns Returns the property accessor function.
 */
function property<T, K extends keyof T>(key: K): (obj: T) => T[K] {
  return (obj: T) => obj[key]
}

/**
 * This method is like `_.sum` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the value to be summed.
 * The iteratee is invoked with one argument: (value).
 *
 * @since 4.0.0
 * @category Math
 * @param array The array to iterate over.
 * @param iteratee The property name to sum by.
 * @returns Returns the sum.
 * @see mean, meanBy, sum
 * @example
 *
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }]
 *
 * sumBy(objects, 'n')
 * // => 20
 */
function sumBy<T extends object>(
  array: ArrayLike<T>,
  iteratee: NumericPropertyShorthand<T>
): NumericAggregationResult

/**
 * This method is like `_.sum` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the value to be summed.
 * The iteratee is invoked with one argument: (value).
 *
 * @since 4.0.0
 * @category Math
 * @param array The array to iterate over.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns the sum.
 * @see mean, meanBy, sum
 * @example
 *
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }]
 *
 * sumBy(objects, (o) => o.n)
 * // => 20
 */
function sumBy<T>(
  array: ArrayLike<T>,
  iteratee: NumericIteratee<T>
): NumericAggregationResult

/**
 * Implementation of sumBy.
 */
function sumBy<T>(
  array: ArrayLike<T>,
  iteratee: NumericPropertyShorthand<T & object> | NumericIteratee<T>
): NumericAggregationResult {
  if (array == null || !array.length) {
    return 0
  }

  const iterateeFunc: (value: T) => number | undefined | null =
    typeof iteratee === 'function'
      ? iteratee
      : property(iteratee as keyof T) as (value: T) => number | undefined | null

  return baseSum(array, iterateeFunc)
}

export default sumBy
