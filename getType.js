/**
 * get type 
 * @param  {*} value The value to query
 * @return {[String]} retun the `type`
 *
 * getType(1)
 * // => Number
 *
 * getType('txt')
 * // => String
 *
 * getType(null)
 * // => Null
 *
 * getType(Function)
 * // => Function
 *
 * getType(Object.prototype)
 * // => Object
 */
function getType(value) {
  if (arguments.length === 0) {
    throw new Error('Missing required parameter!');
  }
  return toString.call(value).slice(8, -1);
}

export default getType
