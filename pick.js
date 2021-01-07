import basePick from './.internal/basePick.js'

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @since 0.1.0
 * @category Object
 * @example
 *   const object = { a: 1, b: '2', c: 3 }
 *
 *   pick(object, ['a', 'c'])
 *   // => { 'a': 1, 'c': 3 }
 *
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function pick(object, ...paths) {
  return object == null ? {} : basePick(object, paths)
}

export default pick
