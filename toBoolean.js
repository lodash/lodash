/**
 * Converts `value` to Boolean.
 *
 * @since 4.17.16
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {boolean} Returns the converted boolean.
 * @example
 *
 * toBoolean(1)
 * // => True
 *
 * toBoolean(0)
 * // => False
 *
 * toBoolean('0')
 * // => True
 *
 * toBoolean({})
 * // => True
 * 
 * toBoolean(-1)
 * // => True
 * 
 * toBoolean([])
 * // => True
 * 
 * toBoolean(undefined)
 * // => False
 * 
 * toBoolean(null)
 * // => False
 * 
 * toBoolean(Symbol)
 * // => True
 */

function toBoolean(value){
    return Boolean(value);
}
export default toBoolean;