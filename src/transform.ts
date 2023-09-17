import arrayEach from './.internal/arrayEach.js';
import baseForOwn from './.internal/baseForOwn.js';
import isBuffer from './isBuffer.js';
import isObject from './isObject.js';
import isTypedArray from './isTypedArray.js';

/**
 * An alternative to `reduce` this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own
 * enumerable string keyed properties thru `iteratee`, with each invocation
 * potentially mutating the `accumulator` object. If `accumulator` is not
 * provided, a new object with the same `[[Prototype]]` will be used. The
 * iteratee is invoked with four arguments: (accumulator, value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @since 1.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The custom accumulator value.
 * @returns {*} Returns the accumulated value.
 * @see reduce, reduceRight
 * @example
 *
 * transform([2, 3, 4], (result, n) => {
 *   result.push(n *= n)
 *   return n % 2 === 0
 * }, [])
 * // => [4, 9]
 *
 * transform({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key) => {
 *   (result[value] || (result[value] = [])).push(key)
 * }, {})
 * // => { '1': ['a', 'c'], '2': ['b'] }
 */
function transform(object, iteratee, accumulator) {
    const isArr = Array.isArray(object);
    const isArrLike = isArr || isBuffer(object) || isTypedArray(object);

    if (accumulator == null) {
        const Ctor = object && object.constructor;
        if (isArrLike) {
            accumulator = isArr ? new Ctor() : [];
        } else if (isObject(object)) {
            accumulator =
                typeof Ctor === 'function' ? Object.create(Object.getPrototypeOf(object)) : {};
        } else {
            accumulator = {};
        }
    }
    (isArrLike ? arrayEach : baseForOwn)(object, (value, index, _object) =>
        iteratee(accumulator, value, index, _object),
    );
    return accumulator;
}

export default transform;
