import createToPairs from './.internal/createToPairs.js';
import keys from './keys.js';

/**
 * Creates an array of own enumerable string keyed-value pairs for `object`
 * which can be consumed by `fromPairs`. If `object` is a map or set, its
 * entries are returned.
 *
 * @since 4.0.0
 * @alias entries
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
 * toPairs(new Foo);
 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
 */
const toPairs = createToPairs(keys);

export default toPairs;
