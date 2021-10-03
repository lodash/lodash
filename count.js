import countBy from './countBy.js'

/**
 * Creates an object composed of keys generated from the values of `Collection`.
 * The corresponding value of each key is the number of times the key was
 * returned.
 *
 * @since 4.17.0
 * @category Collection
 * @param {Array} collection The collection to iterate over.
 * @returns {Object} Returns the composed aggregate object.
 * @example
 *
 * const colors = ['blue', 'red', 'green', 'red', 'red', 'blue']
 *
 * countBy(colors, value => value.active);
 * // => { 'blue': 2, 'red': 3, 'green': 1 }
 */
function count(collection) {
  return countBy(collection, value => value)
}

export default count

