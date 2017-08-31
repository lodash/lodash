/**
 * Checks `value` to determine whether a default value should be returned in
 * its place. The first `defaultValues` argument that is not `NaN`, `null`,
 * or `undefined` is returned.
 *
 * @since 4.14.0
 * @category Util
 * @param {*} value The value to check.
 * @param {*} [...defaultValues] The default value.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * defaultTo(1, 10)
 * // => 1
 *
 * defaultTo(undefined, 10)
 * // => 10
 *
 * defaultTo(undefined, NaN, 'hello', 'world')
 * // => 'hello'
 */
 function defaultTo(value, ...defaultValues) {
   for (const index in [value, ...defaultValues]) {
     const defaultValue = defaultValues[index]
     if (defaultValue != null && defaultValue === defaultValue) {
       return defaultValue
     }
   }
   return undefined
}

export default defaultTo
