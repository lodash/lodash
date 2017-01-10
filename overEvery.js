import arrayEvery from './.internal/arrayEvery.js';
import createOver from './.internal/createOver.js';

/**
 * Creates a function that checks if **all** of the `predicates` return
 * truthy when invoked with the arguments it receives.
 *
 * @static
 * @since 4.0.0
 * @category Util
 * @param {...(Function|Function[])} [predicates=[identity]]
 *  The predicates to check.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var func = overEvery([Boolean, isFinite]);
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
const overEvery = createOver(arrayEvery);

export default overEvery;
