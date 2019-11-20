import isObjectLike from './isObjectLike.js'

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * isEmpty(null)
 * // => true
 *
 *  * isEmpty(undefined)
 * // => true
 *
 * isEmpty(false)
 * // => true
 *
 * isEmpty(1)
 * // => true
 * 
 * isEmpty({})
 * // => true
 * 
 * isEmpty([])
 * // => true
 * 
 * isEmpty(new Set())
 * // => true
 * 
 * 
 * * isEmpty(Object.create(null))
 * // => true
 * 
 * * 
 * isEmpty( () => ({}))
 * // => true
 * 
 * * isEmpty(Object.create({key: 1}))
 * // => false
 * 
 *  * * 
 * isEmpty( () => ({key: 1}))
 * // => false
 *
 * isEmpty([1, 2, 3])
 * // => false
 *
 * isEmpty('abc')
 * // => false
 *
 * isEmpty({ 'a': 1 })
 * // => false
 * 
 */


function isEmpty(value) {
  if (isObjectLike(value)) {
      const prototype = Object.getPrototypeOf(value) || {}
      const properties = Object.keys(value) + Object.keys(prototype);
      return properties.length === 0 || properties.size === 0
    } else if(typeof value === 'function') {
      return isEmpty( value() )
    }
    return !value;
}

export default isEmpty
