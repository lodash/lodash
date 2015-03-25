import baseDifference from '../internal/baseDifference';
import baseFlatten from '../internal/baseFlatten';
import isArguments from '../lang/isArguments';
import isArray from '../lang/isArray';
import restParam from '../function/restParam';

/**
 * Creates an array excluding all values of the provided arrays using
 * `SameValueZero` for equality comparisons.
 *
 * **Note:** [`SameValueZero`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero)
 * comparisons are like strict equality comparisons, e.g. `===`, except that
 * `NaN` matches `NaN`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The arrays of values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.difference([1, 2, 3], [4, 2]);
 * // => [1, 3]
 */
var difference = restParam(function(array, values) {
  return (isArray(array) || isArguments(array))
    ? baseDifference(array, baseFlatten(values, false, true))
    : [];
});

export default difference;
