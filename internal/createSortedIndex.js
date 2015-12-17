define(['./baseCallback', './binaryIndex', './binaryIndexBy'], function(baseCallback, binaryIndex, binaryIndexBy) {

  /**
   * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
   *
   * @private
   * @param {boolean} [retHighest] Specify returning the highest qualified index.
   * @returns {Function} Returns the new index function.
   */
  function createSortedIndex(retHighest) {
    return function(array, value, iteratee, thisArg) {
      return iteratee == null
        ? binaryIndex(array, value, retHighest)
        : binaryIndexBy(array, value, baseCallback(iteratee, thisArg, 1), retHighest);
    };
  }

  return createSortedIndex;
});
