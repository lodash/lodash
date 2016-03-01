define(['./_addSetEntry', './_arrayReduce', './_setToArray'], function(addSetEntry, arrayReduce, setToArray) {

  /**
   * Creates a clone of `set`.
   *
   * @private
   * @param {Object} set The set to clone.
   * @returns {Object} Returns the cloned set.
   */
  function cloneSet(set) {
    return arrayReduce(setToArray(set), addSetEntry, new set.constructor);
  }

  return cloneSet;
});
