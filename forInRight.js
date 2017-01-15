import baseForRight from './.internal/baseForRight.js';
import keysIn from './keysIn.js';

/**
 * This method is like `forIn` except that it iterates over properties of
 * `object` in the opposite order.
 *
 * @since 2.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see forEach, forEachRight, forIn, forOwn, forOwnRight
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * forInRight(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'c', 'b', then 'a' assuming `forIn` logs 'a', 'b', then 'c'.
 */
function forInRight(object, iteratee) {
  return object == null ? object : baseForRight(object, iteratee, keysIn);
}

export default forInRight;
