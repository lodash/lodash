import get from './get.js'
import map from './map.js'
import isArrayLike from './isArrayLike.js'
import isNull from './isNull.js'
import isUndefined from './isUndefined.js'

/**
 * Converts `value` to a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * If value is Array and has params path, use path value as key of Map object.
 *
 * @since 5.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @param path: Array | string - The key path to new Map object
 * @returns {Map} Returns the converted Map object.
 * @example
 *
 * toMap([1, 2])
 * // => Map(4) {1 => 1, 2 => 2}
 *
 * toMap({a: 1, b: 2})
 * // => Map(2) { 'a' => 1, 'b' => 2 }
 *
 * toMap([{a: 1, b: 2}, {a:2, c: 3}], 'a')
 * // => Map(2) {1 => {a: 1, b: 2}, 2 => {a:2, c: 3}}
 *
 * assign({ 'a': 1 }, toPlainObject(new Foo))
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toMap(value, path) {
  if (isNull(value) || isUndefined(value)) {
    return value
  }

  if (isArrayLike(value)) {
    const res = new Map()
    map(value, (cur, i) => {
      res.set(path ? get(cur, path) : i, cur)
    })
    return res
  }

  return new Map(Object.entries(value))
}

export default toMap
