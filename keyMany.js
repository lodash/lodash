import reduce from './reduce.js'

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is an array of all elements which `iteratee` mapped to that key. The
 * iteratee is invoked with two arguments: (value, key).
 *
 * @since 4.17.?
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to transform key sets.
 * @returns {Object} Returns the composed aggregate object.
 * @see keyBy
 * @example
 *
 *    input [e1, e2, e3], cbk;
 *      given cbk(e1) -> ['a'];
 *      given cbk(e2) -> ['a', 'b'];
 *      given cbk(e3) -> ['b', 'c'];
 *    then
 *    output {
 *      'a': [e1, e2],
 *      'b': [e2, e3],
 *      'c': [e3]
 *    }
 */

function keyMany(collection, iteratee) {
  return reduce(collection, (result, value, key) =>
    reduce(iteratee(value, key), (result, iterateeValue) => {
        // append element to key's collection, or instantiate key's collection.
      result[iterateeValue] = result[iterateeValue] ? result[iterateeValue].concat(value) : [value]
      return result
    }, result), {})
}

export default keyMany
