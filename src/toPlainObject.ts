/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * assign({ 'a': 1 }, new Foo)
 * // => { 'a': 1, 'b': 2 }
 *
 * assign({ 'a': 1 }, toPlainObject(new Foo))
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
    value = Object(value);
    const result = {};
    for (const key in value) {
        result[key] = value[key];
    }
    return result;
}

export default toPlainObject;
