import baseEach from './baseEach.js';
import isArrayLike from '../isArrayLike.js';

/**
 * The base implementation of `map`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  let index = -1;
  const result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, (value, key, collection) => {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

export default baseMap;
