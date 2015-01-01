var baseCallback = require('../internal/baseCallback'),
    binaryIndex = require('../internal/binaryIndex'),
    binaryIndexBy = require('../internal/binaryIndexBy');

/**
 * This method is like `_.sortedIndex` except that it returns the highest
 * index at which `value` should be inserted into `array` in order to
 * maintain its sort order.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration. If a property name or object is provided it is used to
 *  create a "_.property" or "_.matches" style callback respectively.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 * @example
 *
 * _.sortedLastIndex([4, 4, 5, 5, 6, 6], 5);
 * // => 4
 */
function sortedLastIndex(array, value, iteratee, thisArg) {
  return iteratee == null
    ? binaryIndex(array, value, true)
    : binaryIndexBy(array, value, baseCallback(iteratee, thisArg, 1), true);
}

module.exports = sortedLastIndex;
