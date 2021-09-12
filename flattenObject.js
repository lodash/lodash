import isPlainObject from './isPlainObject'
import forEach from './forEach'
import filter from './filter'

const DEFAULT_DELIMITER = '.'

/**
 * This method will flatten the given object onto a single layer,
 * with keys composed of the keys of each layer separated by a separator.
 *
 * @since 5.0.0
 * @category Object
 * @param {Object} object The object to flatten.
 * @param {string} [delimiter='.'] The string to separate the objects' layers.
 * @returns {Object} Returns  flattened object.
 * @example
 *
 * flattenObject({'a': 1, 'b': {'c': 3, 'd': 4}}, '.')
 * // => {'a': 1, 'b.c': 3, 'b.d': 4}
 */
function flattenObject(object, delimiter) {
  if (!isPlainObject(object)) {
    throw new TypeError('Expected an object')
  }

  delimiter = delimiter === undefined ? DEFAULT_DELIMITER : delimiter

  const output = {}

  function flattenLayer(object, previousKey) {
    forEach(object, (value, key) => {
      const newKey = filter([previousKey, key], Boolean).join(delimiter)
      if (isPlainObject(value)) {
        return flattenLayer(value, newKey)
      }
      output[newKey] = value
    })
  }

  flattenLayer(object)

  return output
}

export default flattenObject
