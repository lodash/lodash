import isObject from './isObject.js';
import isNull from './isNull.js';

/**
 * The flattenObject function recursively flattens a nested object.
 * It takes an object and converts it into a new object where all nested properties
 * are represented as key-value pairs with keys in a dot-separated notation.
 * This means that nested properties are concatenated into a single key string with
 * dots separating each level of the hierarchy.
 * Useful for e.g. updating nested object in MongoDB.
 * @category Object
 * @param {any} object The object to iterate over.
 * @param {string} prefix The function invoked per iteration.
 * @returns { [key: string]: any }  Returns a new flattened object.
 * @example
 * const input = {
 *     a: 1,
 *     b: {
 *         c: 2,
 *         d: {
 *             e: 3,
 *         },
 *     },
 *     f: 4,
 * };
 *
 * flattenObject(input)
 * => {
 *     a: 1,
 *     'b.c': 2,
 *     'b.d.e': 3,
 *     f: 4,
 * }
 */
function flattenObject(object: any, prefix: string = ''): { [key: string]: any } {
    return Object.keys(object).reduce((acc: { [key: string]: any }, key) => {
        const nestedKey = prefix ? `${prefix}.${key}` : key;
        if (Array.isArray(object[key])) {
            acc[nestedKey] = object[key];
        } else if (isObject(object[key]) && !isNull(object[key])) {
            Object.assign(acc, flattenObject(object[key], nestedKey));
        } else {
            acc[nestedKey] = object[key];
        }
        return acc;
    }, {});
}

export default flattenObject;
