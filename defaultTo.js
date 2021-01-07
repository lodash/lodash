/**
 * Checks `value` to determine whether a default value should be returned in
 * its place. The `defaultValue` is returned if `value` is `NaN`, `null`, or `undefined`.
 *
 * @since 4.14.0
 * @category Util
 * @example
 *   defaultTo(1, 10)
 *   // => 1
 *
 *   defaultTo(undefined, 10)
 *   // => 10
 *
 * @param {any} value The value to check.
 * @param {any} defaultValue The default value.
 * @returns {any} Returns the resolved value.
 */
function defaultTo(value, defaultValue) {
  return value == null || value !== value ? defaultValue : value
}

export default defaultTo
