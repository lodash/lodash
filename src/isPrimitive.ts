/**
 * Checks if `value` is a primitive.
 *
 * @since 4.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a primitive, else `false`.
 * @link https://developer.mozilla.org/en-US/docs/Glossary/Primitive
 * @example
 *
 * isPrimitive('abc')
 * // => true
 *
 * isPrimitive(null)
 * // => true
 *
 * isPrimitive({})
 * // => false
 */
function isPrimitive(value?: unknown): boolean {
    return value !== Object(value);
}

export default isPrimitive;
