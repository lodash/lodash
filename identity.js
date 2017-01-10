/**
 * This method returns the first argument it receives.
 *
 * @since 0.1.0
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * const object = { 'a': 1 };
 *
 * console.log(identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

export default identity;
