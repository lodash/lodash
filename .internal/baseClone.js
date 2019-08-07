import Stack from './Stack.js'
import arrayEach from './arrayEach.js'
import assignValue from './assignValue.js'
import cloneBuffer from './cloneBuffer.js'
import copyArray from './copyArray.js'
import copyObject from './copyObject.js'
import cloneArrayBuffer from './cloneArrayBuffer.js'
import cloneDataView from './cloneDataView.js'
import cloneRegExp from './cloneRegExp.js'
import cloneSymbol from './cloneSymbol.js'
import cloneTypedArray from './cloneTypedArray.js'
import copySymbols from './copySymbols.js'
import copySymbolsIn from './copySymbolsIn.js'
import getAllKeys from './getAllKeys.js'
import getAllKeysIn from './getAllKeysIn.js'
import getTag from './getTag.js'
import initCloneObject from './initCloneObject.js'
import isBuffer from '../isBuffer.js'
import isObject from '../isObject.js'
import keys from '../keys.js'
import keysIn from '../keysIn.js'
import isTypedArray from '../isTypedArray'

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1
const CLONE_FLAT_FLAG = 2
const CLONE_SYMBOLS_FLAG = 4

/** `Object#toString` result references. */
const argsTag = '[object Arguments]'
const arrayTag = '[object Array]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const objectTag = '[object Object]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const weakMapTag = '[object WeakMap]'

const arrayBufferTag = '[object ArrayBuffer]'
const dataViewTag = '[object DataView]'
const float32Tag = '[object Float32Array]'
const float64Tag = '[object Float64Array]'
const int8Tag = '[object Int8Array]'
const int16Tag = '[object Int16Array]'
const int32Tag = '[object Int32Array]'
const uint8Tag = '[object Uint8Array]'
const uint8ClampedTag = '[object Uint8ClampedArray]'
const uint16Tag = '[object Uint16Array]'
const uint32Tag = '[object Uint32Array]'

/** Used to identify `toStringTag` values supported by `clone`. */
const cloneableTags = {}
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
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true
cloneableTags[errorTag] = cloneableTags[weakMapTag] = false

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

function updateParentObject(object, key, value){
  const tag = getTag(object)
  if(tag === mapTag){
    object.set(key, value)
  }else if(tag === setTag){
    object.add(value)
  } else {
    assignValue(object, key, value)
  }
}


/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  const Ctor = object.constructor
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object)

    case boolTag:
    case dateTag:
      return new Ctor(+object)

    case dataViewTag:
      return cloneDataView(object, isDeep)

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep)

    case mapTag:
      return new Ctor

    case numberTag:
    case stringTag:
      return new Ctor(object)

    case regexpTag:
      return cloneRegExp(object)

    case setTag:
      return new Ctor

    case symbolTag:
      return cloneSymbol(object)
  }
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  const { length } = array
  const result = new array.constructor(length)

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index
    result.input = array.input
  }
  return result
}

/**
 * The base implementation of `clone` and `cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {number} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer) {
  let clonedWrapper = {};
  const clonedKey = 'wrappedInstance';
  const callStack = [{value,  key: clonedKey, object:clonedWrapper}];
  const isDeep = bitmask & CLONE_DEEP_FLAG
  const isFlat = bitmask & CLONE_FLAT_FLAG
  const isFull = bitmask & CLONE_SYMBOLS_FLAG

  while(callStack.length){
    let {value,  key, object, stack} = callStack.pop();
    let result


    if (customizer) {
      result = (object !== clonedWrapper) ? customizer(value, key, object, stack) : customizer(value)
    }
    if (result !== undefined) {
      updateParentObject(object, key, result);
      break;
    }
    if (!isObject(value)) {
      updateParentObject(object, key, value);
      break;
    }
    const isArr = Array.isArray(value)
    const tag = getTag(value)
    if (isArr) {
      result = initCloneArray(value)
      if (!isDeep) {
        updateParentObject(object, key, copyArray(value, result));
        break;
      }
    } else {
      const isFunc = typeof value == 'function'

      if (isBuffer(value)) {
        updateParentObject(object, key, cloneBuffer(value, isDeep))
        break;
      }
      if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
        result = (isFlat || isFunc) ? {} : initCloneObject(value)
        if (!isDeep) {
          updateParentObject(object, key, isFlat
            ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
            : copySymbols(value, Object.assign(result, value))
          )
          break;
        }
      } else {
        if (isFunc || !cloneableTags[tag]) {
          updateParentObject(object, key, (object !== clonedWrapper) ? value : {})
          break;
        }
        result = initCloneByTag(value, tag, isDeep)
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new Stack)
    const stacked = stack.get(value)
    if (stacked) {
      updateParentObject(object, key, stacked)
      break;
    }
    stack.set(value, result)

    if (tag == mapTag) {
      value.forEach((subValue, key) => {
        callStack.push({value: subValue, key, object: result, stack})
      })
      updateParentObject(object, key, result)
      break;
    }

    if (tag == setTag) {
      value.forEach((subValue) => {
        callStack.push({value: subValue, key, object: result, stack})
      })
      updateParentObject(object, key, result)
      break;
    }

    if (isTypedArray(value)) {
      updateParentObject(object, key, result)
      break;
    }

    const keysFunc = isFull
      ? (isFlat ? getAllKeysIn : getAllKeys)
      : (isFlat ? keysIn : keys)

    const props = isArr ? undefined : keysFunc(value)
    arrayEach(props || value, (subValue, key) => {
      if (props) {
        key = subValue
        subValue = value[key]
      }
      callStack.push({value: subValue,  key, object: result, stack})
    })

    updateParentObject(object, key, result)
  }

  return clonedWrapper[clonedKey];
}

export default baseClone
