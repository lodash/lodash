define(['./_Symbol', './_copyArray', './_getTag', './isArrayLike', './isString', './_iteratorToArray', './_mapToArray', './_setToArray', './_stringToArray', './values'], function(Symbol, copyArray, getTag, isArrayLike, isString, iteratorToArray, mapToArray, setToArray, stringToArray, values) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** `Object#toString` result references. */
  var mapTag = '[object Map]',
      setTag = '[object Set]';

  /** Built-in value references. */
  var iteratorSymbol = Symbol ? Symbol.iterator : undefined;

  /**
   * Converts `value` to an array.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Array} Returns the converted array.
   * @example
   *
   * _.toArray({ 'a': 1, 'b': 2 });
   * // => [1, 2]
   *
   * _.toArray('abc');
   * // => ['a', 'b', 'c']
   *
   * _.toArray(1);
   * // => []
   *
   * _.toArray(null);
   * // => []
   */
  function toArray(value) {
    if (!value) {
      return [];
    }
    if (isArrayLike(value)) {
      return isString(value) ? stringToArray(value) : copyArray(value);
    }
    if (iteratorSymbol && value[iteratorSymbol]) {
      return iteratorToArray(value[iteratorSymbol]());
    }
    var tag = getTag(value),
        func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

    return func(value);
  }

  return toArray;
});
