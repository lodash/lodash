import arrayAggregator from './.internal/arrayAggregator.js';
import baseAggregator from './.internal/baseAggregator.js';

/**
 * Creates a function like `groupBy`.
 *
 * @private
 * @param {Function} setter The function to set accumulator values.
 * @param {Function} [initializer] The accumulator object initializer.
 * @returns {Function} Returns the new aggregator function.
 */
function createAggregator(setter, initializer) {
  return (collection, iteratee) => {
    const func = Array.isArray(collection) ? arrayAggregator : baseAggregator;
    const accumulator = initializer ? initializer() : {};
    return func(collection, setter, iteratee, accumulator);
  };
}

export default createAggregator;
