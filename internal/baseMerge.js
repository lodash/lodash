define(['./arrayEach', './baseMergeDeep', './getSymbols', '../lang/isArray', './isArrayLike', '../lang/isObject', './isObjectLike', '../lang/isTypedArray', '../object/keys'], function(arrayEach, baseMergeDeep, getSymbols, isArray, isArrayLike, isObject, isObjectLike, isTypedArray, keys) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used for native method references. */
  var arrayProto = Array.prototype;

  /** Native method references. */
  var push = arrayProto.push;

  /**
   * The base implementation of `_.merge` without support for argument juggling,
   * multiple sources, and `this` binding `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {Function} [customizer] The function to customize merging properties.
   * @param {Array} [stackA=[]] Tracks traversed source objects.
   * @param {Array} [stackB=[]] Associates values with source counterparts.
   * @returns {Object} Returns `object`.
   */
  function baseMerge(object, source, customizer, stackA, stackB) {
    if (!isObject(object)) {
      return object;
    }
    var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source));
    if (!isSrcArr) {
      var props = keys(source);
      push.apply(props, getSymbols(source));
    }
    arrayEach(props || source, function(srcValue, key) {
      if (props) {
        key = srcValue;
        srcValue = source[key];
      }
      if (isObjectLike(srcValue)) {
        stackA || (stackA = []);
        stackB || (stackB = []);
        baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
      }
      else {
        var value = object[key],
            result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
            isCommon = result === undefined;

        if (isCommon) {
          result = srcValue;
        }
        if ((isSrcArr || result !== undefined) &&
            (isCommon || (result === result ? (result !== value) : (value === value)))) {
          object[key] = result;
        }
      }
    });
    return object;
  }

  return baseMerge;
});
