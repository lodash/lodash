import apply from './.internal/apply.js';
import arrayEvery from './.internal/arrayEvery.js';

/**
 * Creates a function that checks if **all** of the `predicates` return
 * truthy when invoked with the arguments it receives.
 *
 * @since 4.0.0
 * @category Util
 * @param {Function[]} [predicates=[identity]]
 *  The predicates to check.
 * @returns {Function} Returns the new function.
 * @example
 *
 * const func = overEvery([Boolean, isFinite]);
 *
 * func('1');
 * // => true
 *
 * func(null);
 * // => false
 *
 * func(NaN);
 * // => false
 */
function overEvery(iteratees) {
  return function(...args) {
    const thisArg = this;
    return arrayEvery(iteratees, iteratee => apply(iteratee, thisArg, args));
  };
}

export default overEvery;
