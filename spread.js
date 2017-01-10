import apply from './.internal/apply.js';
import arrayPush from './.internal/arrayPush.js';
import castSlice from './.internal/castSlice.js';
import toInteger from './toInteger.js';

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * create function and an array of arguments much like
 * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
 *
 * **Note:** This method is based on the
 * [spread operator](https://mdn.io/spread_operator).
 *
 * @since 3.2.0
 * @category Function
 * @param {Function} func The function to spread arguments over.
 * @param {number} [start=0] The start position of the spread.
 * @returns {Function} Returns the new function.
 * @example
 *
 * const say = spread((who, what) => `${ who } says ${ what }`);
 *
 * say(['fred', 'hello']);
 * // => 'fred says hello'
 *
 * const numbers = Promise.all([
 *   Promise.resolve(40),
 *   Promise.resolve(36)
 * ]);
 *
 * numbers.then(spread((x, y) => x + y));
 * // => a Promise of 76
 */
function spread(func, start) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  start = start == null ? 0 : nativeMax(toInteger(start), 0);
  return (...args) => {
    const array = args[start];
    const otherArgs = castSlice(args, 0, start);

    if (array) {
      arrayPush(otherArgs, array);
    }
    return apply(func, this, otherArgs);
  };
}

export default spread;
