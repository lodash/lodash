import baseAssignValue from './.internal/baseAssignValue.js'
import reduce from './reduce.js'

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The order of grouped values
 * is determined by the order they occur in `collection`. The corresponding
 * value of each key is an array of elements responsible for generating the
 * key. The iteratee is invoked with one argument: (value).
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The iteratee to transform keys.
 * @param {{allowNull?: boolean, allowUndefined?: boolean}} [options = { allowNull: true , allowUndefined: true }] Let the keys to be null or undefined. Defaults are true.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * groupBy([6.1, 4.2, 6.3], Math.floor)
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 */
function groupBy(collection, iteratee, options = {}) {
  const { allowNull = true, allowUndefined = true } = options
  return reduce(collection, (result, value, key) => {
    key = iteratee(value)
    if (hasOwnProperty.call(result, key)) {
      result[key].push(value)
    } else {
      if ((allowNull || key !== null) && (allowUndefined || key !== undefined)) {
        baseAssignValue(result, key, [value])
      }
    }
    return result
  }, {})
}

export default groupBy
