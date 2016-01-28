define(['./_addSetEntry', './_arrayReduce', './_setToArray'], function(addSetEntry, arrayReduce, setToArray) {

  /**
   * Creates a clone of `set`.
   *
   * @private
   * @param {Object} set The set to clone.
   * @returns {Object} Returns the cloned set.
   */
  function cloneSet(set) {
    var Ctor = set.constructor;
    return arrayReduce(setToArray(set), addSetEntry, new Ctor);
  }

  return cloneSet;
});
