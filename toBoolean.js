import isString from './isString.js'
import toLower from './toLower.js'

/**
 * Returns string boolean to boolean
 *
 * @since v4.17.12
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is 'true','True','TRUE','tRue' and Returns `false` if 'false','FALSE','fAlsE'. other case is `false`
 * @example
 *
 * toBoolean('true')
 * // => true
 * 
 * toBoolean('false')
 * // => false
 * 
 * toBoolean('True')
 * // => true
 *
 * toBoolean('False')
 * // => false
 * 
 * toBoolean('tRue')
 * // => true
 * 
 * toBoolean('fAlsE')
 * // => false
 * 
 * toBoolean(void 0)
 * // => false
 *
 * toBoolean(NaN)
 * // => false
 * 
 * toBoolean(undefined)
 * // => false
 */
function toBoolean(value) {
  if (isString(value) && toLower(value) === 'true') {
    return true;
  } else if(isString(value) && toLower(value) === 'false') {
    return false;
  } else {
    return false;
  }
}

export default toBoolean
