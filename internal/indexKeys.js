define(['./baseTimes', '../isArguments', '../isArray', '../isLength', '../isString'], function(baseTimes, isArguments, isArray, isLength, isString) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Creates an array of index keys for `object` values of arrays,
   * `arguments` objects, and strings, otherwise `null` is returned.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array|null} Returns index keys, else `null`.
   */
  function indexKeys(object) {
    var length = object ? object.length : undefined;
    return (isLength(length) && (isArray(object) || isString(object) || isArguments(object)))
      ? baseTimes(length, String)
      : null;
  }

  return indexKeys;
});
