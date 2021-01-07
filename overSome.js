import some from './some.js'

/**
 * Creates a function that checks if **any** of the `predicates` return truthy
 * when invoked with the arguments it receives.
 *
 * @since 4.0.0
 * @category Util
 * @example
 *   const func = overSome([Boolean, isFinite])
 *
 *   func('1')
 *   // => true
 *
 *   func(null)
 *   // => true
 *
 *   func(NaN)
 *   // => false
 *
 * @param {Function[]} [predicates] The predicates to check. Default is `[identity]`
 * @returns {Function} Returns the new function.
 */
function overSome(iteratees) {
  return function (...args) {
    return some(iteratees, (iteratee) => iteratee.apply(this, args))
  }
}

export default overSome
