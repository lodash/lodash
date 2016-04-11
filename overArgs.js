import apply from './_apply';
import arrayMap from './_arrayMap';
import baseFlatten from './_baseFlatten';
import baseIteratee from './_baseIteratee';
import isFlattenableIteratee from './_isFlattenableIteratee';
import rest from './rest';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Creates a function that invokes `func` with arguments transformed by
 * corresponding `transforms`.
 *
 * @static
 * @since 4.0.0
 * @memberOf _
 * @category Function
 * @param {Function} func The function to wrap.
 * @param {...(Array|Array[]|Function|Function[]|Object|Object[]|string|string[])}
 *  [transforms[_.identity]] The functions to transform.
 * @returns {Function} Returns the new function.
 * @example
 *
 * function doubled(n) {
 *   return n * 2;
 * }
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var func = _.overArgs(function(x, y) {
 *   return [x, y];
 * }, square, doubled);
 *
 * func(9, 3);
 * // => [81, 6]
 *
 * func(10, 5);
 * // => [100, 10]
 */
var overArgs = rest(function(func, transforms) {
  transforms = arrayMap(baseFlatten(transforms, 1, isFlattenableIteratee), baseIteratee);
  var funcsLength = transforms.length;
  return rest(function(args) {
    var index = -1,
        length = nativeMin(args.length, funcsLength);

    while (++index < length) {
      args[index] = transforms[index].call(this, args[index]);
    }
    return apply(func, this, args);
  });
});

export default overArgs;
