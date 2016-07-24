define(['./_arrayMap', './_baseFlatten', './_basePick', './_baseRest', './_toKey'], function(arrayMap, baseFlatten, basePick, baseRest, toKey) {

  /**
   * Creates an object composed of the picked `object` properties.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The source object.
   * @param {...(string|string[])} [props] The property identifiers to pick.
   * @returns {Object} Returns the new object.
   * @example
   *
   * var object = { 'a': 1, 'b': '2', 'c': 3 };
   *
   * _.pick(object, ['a', 'c']);
   * // => { 'a': 1, 'c': 3 }
   */
  var pick = baseRest(function(object, props) {
    return object == null ? {} : basePick(object, arrayMap(baseFlatten(props, 1), toKey));
  });

  return pick;
});
