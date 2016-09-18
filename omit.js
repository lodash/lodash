define(['./_arrayMap', './_baseDifference', './_basePick', './_flatRest', './_getAllKeysIn', './_toKey'], function(arrayMap, baseDifference, basePick, flatRest, getAllKeysIn, toKey) {

  /**
   * The opposite of `_.pick`; this method creates an object composed of the
   * own and inherited enumerable string keyed properties of `object` that are
   * not omitted.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {...(string|string[])} [props] The property identifiers to omit.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * _.omit(object, ['a', 'c']);
   * // => { 'b': '2' }
   */
  var omit = flatRest(function(object, props) {
    if (object == null) {
      return {};
    }
    props = arrayMap(props, toKey);
    return basePick(object, baseDifference(getAllKeysIn(object), props));
  });

  return omit;
});
