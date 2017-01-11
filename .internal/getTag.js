import baseGetTag from './baseGetTag.js';
import toSource from './toSource.js';

/** `Object#toString` result references. */
const dataViewTag = '[object DataView]';
const mapTag = '[object Map]';
const objectTag = '[object Object]';
const promiseTag = '[object Promise]';
const setTag = '[object Set]';
const weakMapTag = '[object WeakMap]';

/** Used to detect maps, sets, and weakmaps. */
const dataViewCtorString = toSource(DataView);
const mapCtorString = toSource(Map);
const promiseCtorString = toSource(Promise);
const setCtorString = toSource(Set);
const weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
let getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (getTag(new Map) != mapTag) ||
    (getTag(Promise.resolve()) != promiseTag) ||
    (getTag(new Set) != setTag) ||
    (getTag(new WeakMap) != weakMapTag)) {
  getTag = value => {
    const result = baseGetTag(value);
    const Ctor = result == objectTag ? value.constructor : undefined;
    const ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

export default getTag;
