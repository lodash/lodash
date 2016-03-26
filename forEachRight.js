import arrayEachRight from './_arrayEachRight';
import baseEachRight from './_baseEachRight';
import baseIteratee from './_baseIteratee';
import isArray from './isArray';

/**
 * This method is like `_.forEach` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @alias eachRight
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @example
 *
 * _.forEachRight([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `2` then `1`.
 */
function forEachRight(collection, iteratee) {
  return (typeof iteratee == 'function' && isArray(collection))
    ? arrayEachRight(collection, iteratee)
    : baseEachRight(collection, baseIteratee(iteratee));
}

export default forEachRight;
