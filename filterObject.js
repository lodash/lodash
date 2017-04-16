/**
 * A specialized version of `filter` for objects.
 * Will filter the object's keys and values.
 *
 * @param {Object} obj The object to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Object} Returns a new object with the filtered keys and values.
 * @example
 *
 * const user = {
 *   name: 'Fred',
 *   active: true,
 *   password: 'FredIsAwesome'
 * }
 *
 * filterProps(user, (v,k) => k !== 'password')
 * // => { name: 'Fred', active: true }
 */
export default function filterProps(obj, predicate) => {
  let result = {}
  for(let key in obj) {
    let val = obj[key]
    if(predicate(val, key)) {
      result[key] = val
    }
  }
  return result
}
