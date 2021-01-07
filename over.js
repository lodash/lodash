import map from './map.js'

/**
 * Creates a function that invokes `iteratees` with the arguments it receives
 * and returns their results.
 *
 * @since 4.0.0
 * @category Util
 * @example
 *   const func = over([Math.max, Math.min])
 *
 *   func(1, 2, 3, 4)
 *   // => [4, 1]
 *
 * @param {Function[]} [iteratees] The iteratees to invoke. Default is `[identity]`
 * @returns {Function} Returns the new function.
 */
function over(iteratees) {
  return function (...args) {
    return map(iteratees, (iteratee) => iteratee.apply(this, args))
  }
}

export default over
