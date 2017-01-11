import baseEach from './baseEach.js';

/**
 * The base implementation of `some`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function baseSome(collection, predicate) {
  let result;

  baseEach(collection, (value, index, collection) => {
    result = predicate(value, index, collection);
    return !result;
  });
  return !!result;
}

export default baseSome;
