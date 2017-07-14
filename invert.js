const toString = Object.prototype.toString

/**
 * Creates an object composed of the inverted keys and values of `object`.
 * If `object` contains duplicate values, subsequent values overwrite
 * property assignments of previous values.
 *
 * @since 0.7.0
 * @category Object
 * @param {Object} object The object to invert.
 * @returns {Object} Returns the new inverted object.
 * @example
 *
 * const object = { 'a': 1, 'b': 2, 'c': 1 }
 *
 * invert(object)
 * // => { '1': 'c', '2': 'b' }
 */
function invert(object) {
  const result = {}
  Object.keys(object).forEach((key) => {
    let value = object[key]
    if (value != null && typeof value.toString != 'function') {
      value = toString.call(value)
    }
    result[value] = key
  })
  return result
}

export default invert
