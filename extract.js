import forEach from './forEach.js'
import reduce from './reduce.js'
import times from './times.js'

/**
 * Creates an array of `n` arrays of elements, each array containing
 * the elements that return truthy for the respective predicate. The
 * predicate is invoked with one argument: (value).
 *
 * @since ?
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...*} [predicates] The functions invoked per iteration.
 * @returns {Array} Returns the array of arrays of grouped elements.
 * @example
 *
 * const consumables = [
 *   { 'name': 'pear',        'type': 'fruit',      'active': false },
 *   { 'name': 'plum',        'type': 'fruit',      'active': true },
 *   { 'name': 'lettuce',     'type': 'vegetable',  'active': false },
 *   { 'name': 'apple juice', 'type': 'liquid',     'active': false }
 * ]
 *
 * extract(
 *  consumables,
 *  ({ type }) => type === 'fruit',
 *  ({ type }) => type === 'vegetable',
 *  ({ type }) => type === 'liquid',
 * )
 * // => objects for [['pear', 'plum'], ['lettuce'], ['apple juice']]
 */
function extract(collection, ...predicates) {
  return reduce(collection, (result, value) => {
    forEach(predicates, (predicate, nth) => {
      if (predicate(value)) result[nth].push(value)
    })
    return result
  }, times(predicates.length, () => []))
}

export default extract
