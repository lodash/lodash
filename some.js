import arraySome from './.internal/arraySome.js';
import baseSome from './.internal/baseSome.js';
import isIterateeCall from './.internal/isIterateeCall.js';

/**
 * Checks if `predicate` returns truthy for **any** element of `collection`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `map`.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 * @example
 *
 * some([null, 0, 'yes', false], Boolean);
 * // => true
 */
function some(collection, predicate, guard) {
  const func = Array.isArray(collection) ? arraySome : baseSome;
  if (guard && isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }
  return func(collection, predicate);
}

export default some;
