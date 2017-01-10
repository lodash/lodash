import arraySome from './.internal/arraySome.js';
import createOver from './.internal/createOver.js';

/**
 * Creates a function that checks if **any** of the `predicates` return
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
 * var func = overSome([Boolean, isFinite]);
 *
 * func('1');
 * // => true
 *
 * func(null);
 * // => true
 *
 * func(NaN);
 * // => false
 */
const overSome = createOver(arraySome);

export default overSome;
