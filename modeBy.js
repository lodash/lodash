import baseSum from './.internal/baseSum.js'

/** Used as references for various `Number` constants. */
const NAN = 0 / 0

/**
 * This method is like `mode` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the value to be averaged.
 * The iteratee is invoked with one argument: (value).
 *
 * @since 4.7.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per element.
 * @returns {Array} Returns the mode, the most frequently occuring items as an array.
 * @example
 *
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }, { 'n': 2}]
 *
 * modeBy(objects, ({ n }) => n)
 * // => [2]
 */
function modeBy(array, iteratee) {
  const length = array == null ? 0 : array.length
  if(!length)
    return NAN;
  let arr = _.orderBy(_.groupBy(array, iteratee), 'length');
  let result = [];
  let maxLength = arr[arr.length - 1].length;
  for (var i = 0; i < arr.length; i++) { 
      if(arr[i].length == maxLength)
      	result[result.length] = arr[i];
  }
  return result;
}

export default modeBy
