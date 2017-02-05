/** Used for built-in method references. */
const objectProto = Object.prototype

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  const Ctor = value && value.constructor
  const proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto

  return value === proto
}

export default isPrototype
