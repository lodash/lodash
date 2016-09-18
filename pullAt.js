define(['./_arrayMap', './_baseAt', './_basePullAt', './_compareAscending', './_flatRest', './_isIndex'], function(arrayMap, baseAt, basePullAt, compareAscending, flatRest, isIndex) {

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
   * var array = ['a', 'b', 'c', 'd'];
   * var pulled = _.pullAt(array, [1, 3]);
   *
   * console.log(array);
   * // => ['a', 'c']
   *
   * console.log(pulled);
   * // => ['b', 'd']
   */
  var pullAt = flatRest(function(array, indexes) {
    var length = array ? array.length : 0,
        result = baseAt(array, indexes);

    basePullAt(array, arrayMap(indexes, function(index) {
      return isIndex(index, length) ? +index : index;
    }).sort(compareAscending));

    return result;
  });

  return pullAt;
});
