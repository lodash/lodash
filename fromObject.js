/**
 * Creates an array of objects from an object of objects.
 *
 * @since 5.0.0
 * @category Object
 * @param {Object} object The object to convert.
 * @param {string} [identifier] The key to be used as identifier. Will not be included if omitted.
 * @returns {Array} Returns the array of objects.
 * @example
 *
 *
 * const example = {
 *  jim: {
 *    name: 'Jim',
 *    age: 20,
 *  },
 *  tim: {
 *    name: 'Tim',
 *    age: 22,
 *  },
 * }
 *
 * fromObject(example, 'id') // id is optional: set an identifier, could be anything
 * // => [{ name: 'Jim', age: 20, id: 'jim' }, { name: 'Tim', age: 22, id: 'tim' }]
 *
 */
function fromObject(object, identifier) {
  return Object.keys(object).map((key) => {
    if (identifier) {
      object[key][identifier] = key
    }

    return object[key]
  })
}

export default fromObject
