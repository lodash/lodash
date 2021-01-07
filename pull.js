import pullAll from './pullAll.js'

/**
 * Removes all given values from `array` using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `without`, this method mutates `array`. Use `remove` to
 * remove elements from an array by predicate.
 *
 * @since 2.0.0
 * @category Array
 * @example
 *   const array = ['a', 'b', 'c', 'a', 'b', 'c']
 *
 *   pull(array, 'a', 'c')
 *   console.log(array)
 *   // => ['b', 'b']
 *
 * @param {Array} array The array to modify.
 * @param {...*} [values] The values to remove.
 * @see pullAll, pullAllBy, pullAllWith, pullAt, remove, reject
 * @returns {Array} Returns `array`.
 */
function pull(array, ...values) {
  return pullAll(array, values)
}

export default pull
