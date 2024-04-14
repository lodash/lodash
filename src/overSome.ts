import some from './some.js';

/**
 * Creates a function that checks if **any** of the `predicates` return
 * truthy when invoked with the arguments it receives.
 *
 * @since 4.0.0
 * @category Util
 * @param {Function[]} [predicates=[identity]]
 *  The predicates to check.
 * @returns {Function} Returns the new function.
 * @example
 *
 * const func = overSome([Boolean, isFinite])
 *
 * func('1')
 * // => true
 *
 * func(null)
 * // => true
 *
 * func(NaN)
 * // => false
 */
function overSome(iteratees) {
    return function (...args) {
        return some(iteratees, (iteratee) => iteratee.apply(this, args));
    };
}

export default overSome;
