import arrayMap from './_arrayMap';
import baseAt from './_baseAt';
import baseFlatten from './_baseFlatten';
import basePullAt from './_basePullAt';
import compareAscending from './_compareAscending';
import isIndex from './_isIndex';
import rest from './rest';

/**
 * Removes elements from `array` corresponding to `indexes` and returns an
 * array of removed elements.
 *
 * **Note:** Unlike `_.at`, this method mutates `array`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...(number|number[])} [indexes] The indexes of elements to remove.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = [5, 10, 15, 20];
 * var evens = _.pullAt(array, 1, 3);
 *
 * console.log(array);
 * // => [5, 15]
 *
 * console.log(evens);
 * // => [10, 20]
 */
var pullAt = rest(function(array, indexes) {
  indexes = baseFlatten(indexes, 1);

  var length = array ? array.length : 0,
      result = baseAt(array, indexes);

  basePullAt(array, arrayMap(indexes, function(index) {
    return isIndex(index, length) ? +index : index;
  }).sort(compareAscending));

  return result;
});

export default pullAt;
