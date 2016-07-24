import apply from './_apply.js';
import arrayMap from './_arrayMap.js';
import baseFlatten from './_baseFlatten.js';
import baseIteratee from './_baseIteratee.js';
import baseRest from './_baseRest.js';
import baseUnary from './_baseUnary.js';
import isArray from './isArray.js';

/**
 * Creates a function like `_.over`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over iteratees.
 * @returns {Function} Returns the new over function.
 */
function createOver(arrayFunc) {
  return baseRest(function(iteratees) {
    iteratees = (iteratees.length == 1 && isArray(iteratees[0]))
      ? arrayMap(iteratees[0], baseUnary(baseIteratee))
      : arrayMap(baseFlatten(iteratees, 1), baseUnary(baseIteratee));

    return baseRest(function(args) {
      var thisArg = this;
      return arrayFunc(iteratees, function(iteratee) {
        return apply(iteratee, thisArg, args);
      });
    });
  });
}

export default createOver;
