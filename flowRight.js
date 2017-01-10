import createFlow from './_createFlow.js';

/**
 * This method is like `flow` except that it creates a function that
 * invokes the given functions from right to left.
 *
 * @static
 * @since 3.0.0
 * @category Util
 * @param {...(Function|Function[])} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see flow
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var addSquare = flowRight([square, add]);
 * addSquare(1, 2);
 * // => 9
 */
const flowRight = createFlow(true);

export default flowRight;
