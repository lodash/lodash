import flow from './flow.js'

/**
 * This method is like `flow` except that it composes a function that invokes
 * the given functions from right to left.
 *
 * @since 3.0.0
 * @category Util
 * @example
 *   import add from 'lodash/add'
 *
 *   function square(n) {
 *     return n * n
 *   }
 *
 *   const addSquare = flowRight(square, add)
 *   addSquare(1, 2)
 *   // => 9
 *
 * @param {Function[]} [funcs] The functions to invoke.
 * @see flow
 * @returns {Function} Returns the new composite function.
 */
function flowRight(...funcs) {
  return flow(...funcs.reverse())
}

export default flowRight
