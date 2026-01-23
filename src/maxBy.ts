import type {
  NumericPropertyShorthand,
  NumericIteratee,
  ArrayLike,
  ExtremumResult
} from './types/aggregation'
import isNumeric from './.internal/isNumeric'

/**
 * The base implementation of methods like `minBy` and `maxBy` which accepts a
 * `comparator` to determine the extremum value.
 *
 * @private
 * @param array The array to iterate over.
 * @param iteratee The iteratee invoked per iteration.
 * @param comparator The comparator used to compare values.
 * @returns Returns the extremum value.
 */
function baseExtremum<T>(
  array: readonly T[],
  iteratee: (value: T) => number | undefined | null,
  comparator: (value: number, other: number) => boolean
): T | undefined {
  let index = -1
  const length = array.length
  let computed: number | undefined
  let result: T | undefined

  while (++index < length) {
    const value = array[index]
    const current = iteratee(value)

    if (
      current != null &&
      isNumeric(current) &&
      (computed === undefined
        ? current === current // Check for NaN
        : comparator(current, computed))
    ) {
      computed = current
      result = value
    }
  }
  return result
}

/**
 * Used to compare values for sorting.
 *
 * @private
 * @param value The value to compare.
 * @param other The other value to compare.
 * @returns Returns `true` if `value` is greater than `other`.
 */
function baseGt(value: number, other: number): boolean {
  return value > other
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
 * This method is like `_.max` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @since 4.0.0
 * @category Math
 * @param array The array to iterate over.
 * @param iteratee The property name to rank by.
 * @returns Returns the maximum value.
 * @see max, min, minBy
 * @example
 *
 * const objects = [{ 'n': 1 }, { 'n': 2 }]
 *
 * maxBy(objects, 'n')
 * // => { 'n': 2 }
 */
function maxBy<T extends object>(
  array: ArrayLike<T>,
  iteratee: NumericPropertyShorthand<T>
): ExtremumResult<T>

/**
 * This method is like `_.max` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @since 4.0.0
 * @category Math
 * @param array The array to iterate over.
 * @param iteratee The iteratee invoked per element.
 * @returns Returns the maximum value.
 * @see max, min, minBy
 * @example
 *
 * const objects = [{ 'n': 1 }, { 'n': 2 }]
 *
 * maxBy(objects, (o) => o.n)
 * // => { 'n': 2 }
 */
function maxBy<T>(
  array: ArrayLike<T>,
  iteratee: NumericIteratee<T>
): ExtremumResult<T>

/**
 * Implementation of maxBy.
 */
function maxBy<T>(
  array: ArrayLike<T>,
  iteratee: NumericPropertyShorthand<T & object> | NumericIteratee<T>
): ExtremumResult<T> {
  if (array == null || !array.length) {
    return undefined
  }

  const iterateeFunc: (value: T) => number | undefined | null =
    typeof iteratee === 'function'
      ? iteratee
      : property(iteratee as keyof T) as (value: T) => number | undefined | null

  return baseExtremum(array, iterateeFunc, baseGt)
}

export default maxBy
