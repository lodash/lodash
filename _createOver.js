import apply from './_apply.js';
import arrayMap from './_arrayMap.js';
import baseIteratee from './_baseIteratee.js';

/**
 * Creates a function like `_.over`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over iteratees.
 * @returns {Function} Returns the new over function.
 */
function createOver(arrayFunc) {
  return (...iteratees) => {
    iteratees = arrayMap(iteratees, iteratee => baseIteratee(iteratee));
    return (...args) => {
      const thisArg = this;
      return arrayFunc(iteratees, iteratee => apply(iteratee, thisArg, args));
    };
  };
}

export default createOver;
