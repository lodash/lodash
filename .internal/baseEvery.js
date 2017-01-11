import baseEach from './baseEach.js';

/**
 * The base implementation of `every`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`
 */
function baseEvery(collection, predicate) {
  let result = true;
  baseEach(collection, (value, index, collection) => {
    result = !!predicate(value, index, collection);
    return result;
  });
  return result;
}

export default baseEvery;
