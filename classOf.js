/**
 * Checks `value` type of.
 *
 * @param {*} value The value to recognition.
 * @returns {String} Returns `String ` type of value,
 * @example
 *
 * classOf(1)
 * // => String
 *
 * classOf({})
 * // => Object
 *
 * classOf(undefined)
 * // => Undefined
 * 
 * classOf(null)
 * // => Null
 */
function classOf(o) {
  if(o===null) return "Null";
	if(o===undefined) return "Undefined";
	return Object.prototype.toString.call(o).slice(8,-1);
}

export default classOf
