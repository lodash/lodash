import createToPairs from './.internal/createToPairs.js';
import keysIn from './keysIn.js';

/**
 * Creates an array of own and inherited enumerable string keyed-value pairs
 * for `object` which can be consumed by `fromPairs`. If `object` is a map
 * or set, its entries are returned.
 *
 * @since 4.0.0
 * @alias entriesIn
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the key-value pairs.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * toPairsIn(new Foo);
 * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
 */
const toPairsIn = createToPairs(keysIn);

export default toPairsIn;
