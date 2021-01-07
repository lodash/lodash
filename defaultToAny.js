import arrayReduce from './.internal/arrayReduce.js'
import defaultTo from './defaultTo.js'

/**
 * This method is like `defaultTo` except that it accepts multiple default
 * values and returns the first one that is not `NaN`, `null`, or `undefined`.
 *
 * @since 5.0.0
 * @category Util
 * @example
 *   defaultToAny(1, 10, 20)
 *   // => 1
 *
 *   defaultToAny(undefined, 10, 20)
 *   // => 10
 *
 *   defaultToAny(undefined, null, 20)
 *   // => 20
 *
 *   defaultToAny(undefined, null, NaN)
 *   // => NaN
 *
 * @param {any} value The value to check.
 * @param {...*} defaultValues The default values.
 * @see _.defaultTo
 * @returns {any} Returns the resolved value.
 */
function defaultToAny(value, ...defaultValues) {
  return arrayReduce(defaultValues, defaultTo, value)
}

export default defaultToAny
