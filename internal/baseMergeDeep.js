var assignMergeValue = require('./assignMergeValue'),
    baseClone = require('./baseClone'),
    copyArray = require('./copyArray'),
    isArguments = require('../isArguments'),
    isArray = require('../isArray'),
    isArrayLikeObject = require('../isArrayLikeObject'),
    isFunction = require('../isFunction'),
    isObject = require('../isObject'),
    isPlainObject = require('../isPlainObject'),
    isTypedArray = require('../isTypedArray'),
    toPlainObject = require('../toPlainObject');

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
 */
function baseMergeDeep(object, source, key, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue) || stack.get(objValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, (key + ''), object, source, stack) : undefined,
      isCommon = newValue === undefined;

  if (isCommon) {
    newValue = srcValue;
    if (isArray(srcValue) || isTypedArray(srcValue)) {
      newValue = isArray(objValue)
        ? objValue
        : ((isArrayLikeObject(objValue)) ? copyArray(objValue) : baseClone(srcValue));
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = isArguments(objValue)
        ? toPlainObject(objValue)
        : (isObject(objValue) ? objValue : baseClone(srcValue));
    }
    else {
      isCommon = isFunction(srcValue);
    }
  }
  stack.set(srcValue, newValue);

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    mergeFunc(newValue, srcValue, customizer, stack);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;
