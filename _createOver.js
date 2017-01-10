import apply from './_apply.js';

/**
 * Creates a function like `_.over`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over iteratees.
 * @returns {Function} Returns the new over function.
 */
function createOver(arrayFunc) {
  return (...iteratees) => {
    return function(...args) {
      const thisArg = this;
      return arrayFunc(iteratees, iteratee => apply(iteratee, thisArg, args));
    };
  };
}

export default createOver;
