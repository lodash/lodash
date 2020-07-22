import uniq from './uniq';
import difference from './difference';


/**
 * Creates a duplicate version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 *
 *
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicates array.
 * @example
 *
 * duplicates([2, 1, 2])
 * // => [2]
 */
function duplicates(array) {
    return (array != null && array.length)
      ? difference(array, uniq(array)) 
      : []
  }