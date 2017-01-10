import Stack from './_Stack.js';
import arrayEach from './_arrayEach.js';
import assignValue from './_assignValue.js';
import baseAssign from './_baseAssign.js';
import baseAssignIn from './_baseAssignIn.js';
import cloneBuffer from './_cloneBuffer.js';
import copyArray from './_copyArray.js';
import copySymbols from './_copySymbols.js';
import copySymbolsIn from './_copySymbolsIn.js';
import getAllKeys from './_getAllKeys.js';
import getAllKeysIn from './_getAllKeysIn.js';
import getTag from './_getTag.js';
import initCloneArray from './_initCloneArray.js';
import initCloneByTag from './_initCloneByTag.js';
import initCloneObject from './_initCloneObject.js';
import isArray from './isArray.js';
import isBuffer from './isBuffer.js';
import isObject from './isObject.js';
import keys from './keys.js';

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1;
const CLONE_FLAT_FLAG = 2;
const CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
const argsTag = '[object Arguments]';
const arrayTag = '[object Array]';
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const funcTag = '[object Function]';
const genTag = '[object GeneratorFunction]';
const mapTag = '[object Map]';
const numberTag = '[object Number]';
const objectTag = '[object Object]';
const regexpTag = '[object RegExp]';
const setTag = '[object Set]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const weakMapTag = '[object WeakMap]';

const arrayBufferTag = '[object ArrayBuffer]';
const dataViewTag = '[object DataView]';
const float32Tag = '[object Float32Array]';
const float64Tag = '[object Float64Array]';
const int8Tag = '[object Int8Array]';
const int16Tag = '[object Int16Array]';
const int32Tag = '[object Int32Array]';
const uint8Tag = '[object Uint8Array]';
const uint8ClampedTag = '[object Uint8ClampedArray]';
const uint16Tag = '[object Uint16Array]';
const uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `clone`. */
const cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `clone` and `cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  let result;
  const isDeep = bitmask & CLONE_DEEP_FLAG;
  const isFlat = bitmask & CLONE_FLAT_FLAG;
  const isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  const isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    const tag = getTag(value);
    const isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  const stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  const keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  const props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, (subValue, key) => {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

export default baseClone;
