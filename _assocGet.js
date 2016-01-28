define(['./_assocIndexOf'], function(assocIndexOf) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * Gets the associative array value for `key`.
   *
   * @private
   * @param {Array} array The array to query.
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function assocGet(array, key) {
    var index = assocIndexOf(array, key);
    return index < 0 ? undefined : array[index][1];
  }

  return assocGet;
});
