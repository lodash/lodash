import isFlattenable from './isFlattenable.js'

/**
 * The base implementation of `flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, init = []) {
  predicate || (predicate = isFlattenable)

  return array.reduce((result, value) => {
    if (depth > 0 && predicate(value)) {
      if (depth > 1) baseFlatten(value, depth - 1, predicate, isStrict, result)
      else result.push(value)
    } else if (!isStrict) result[result.length] = value

    return result
  }, init)
}

export default baseFlatten
