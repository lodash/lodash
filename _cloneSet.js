import addSetEntry from './_addSetEntry';
import arrayReduce from './_arrayReduce';
import setToArray from './_setToArray';

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

export default cloneSet;
