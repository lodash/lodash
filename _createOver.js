import apply from './_apply';
import arrayMap from './_arrayMap';
import baseFlatten from './_baseFlatten';
import baseIteratee from './_baseIteratee';
import baseUnary from './_baseUnary';
import isArray from './isArray';
import isFlattenableIteratee from './_isFlattenableIteratee';
import rest from './rest';

/**
 * Creates a function like `_.over`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over iteratees.
 * @returns {Function} Returns the new over function.
 */
function createOver(arrayFunc) {
  return rest(function(iteratees) {
    iteratees = (iteratees.length == 1 && isArray(iteratees[0]))
      ? arrayMap(iteratees[0], baseUnary(baseIteratee))
      : arrayMap(baseFlatten(iteratees, 1, isFlattenableIteratee), baseUnary(baseIteratee));

    return rest(function(args) {
      var thisArg = this;
      return arrayFunc(iteratees, function(iteratee) {
        return apply(iteratee, thisArg, args);
      });
    });
  });
}

export default createOver;
