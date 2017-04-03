import assignValue from './assignValue.js'
import baseAssignValue from './baseAssignValue.js'

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  const isNew = !object
  object || (object = {})

  for (const key of props) {
    let newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined

    if (newValue === undefined) {
      newValue = source[key]
    }
    if (isNew) {
      baseAssignValue(object, key, newValue)
    } else {
      assignValue(object, key, newValue)
    }
  }
  return object
}

export default copyObject
