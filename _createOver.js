var apply = require('./_apply'),
    arrayMap = require('./_arrayMap'),
    baseIteratee = require('./_baseIteratee'),
    rest = require('./rest');

/**
 * Creates a function like `_.over`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over iteratees.
 * @returns {Function} Returns the new invoker function.
 */
function createOver(arrayFunc) {
  return rest(function(iteratees) {
    iteratees = arrayMap(iteratees, baseIteratee);
    return rest(function(args) {
      var thisArg = this;
      return arrayFunc(iteratees, function(iteratee) {
        return apply(iteratee, thisArg, args);
      });
    });
  });
}

module.exports = createOver;
