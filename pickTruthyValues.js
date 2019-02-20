import isEmpty from './isEmpty.js'
import isPlainObject from './isPlainObject.js'
import transform from './transform'

/**
 * Pick only truthy values from an object with deep search
 *
 * @since 5.0.0
 * @category Object
 * @param {Object} object The object to filter.
 * @returns {Object} Returns filtered object which does not containy any falsy values.
 * @example
 *
 * 
 */
 function pickTruthyValues(object) {
  return transform(object, (result, value, key) => {
    if (!value && typeof value !== 'boolean') {
      return
    }

    if (Array.isArray(value) || isPlainObject(value)) {
      value = pickTruthyValues(value)

      if (isEmpty(value)) {
        return
      }
    }

    result[key] = value
  })
 }
 
 export default pickTruthyValues
 