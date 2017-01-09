import LodashWrapper from './_LodashWrapper.js';
import flatRest from './_flatRest.js';
import getData from './_getData.js';
import getFuncName from './_getFuncName.js';
import isArray from './isArray.js';
import isLaziable from './_isLaziable.js';

/** Error message constants. */
const FUNC_ERROR_TEXT = 'Expected a function';

/** Used to compose bitmasks for function metadata. */
const WRAP_CURRY_FLAG = 8;
const WRAP_PARTIAL_FLAG = 32;
const WRAP_ARY_FLAG = 128;
const WRAP_REARG_FLAG = 256;

/**
 * Creates a `_.flow` or `_.flowRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new flow function.
 */
function createFlow(fromRight) {
  return flatRest(funcs => {
    const length = funcs.length;
    const prereq = LodashWrapper.prototype.thru;

    let func;
    let wrapper;
    let index = length;

    if (fromRight) {
      funcs.reverse();
    }
    while (index--) {
      func = funcs[index];
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
        wrapper = new LodashWrapper([], true);
      }
    }
    index = wrapper ? index : length;
    while (++index < length) {
      func = funcs[index];

      const funcName = getFuncName(func);
      const data = funcName == 'wrapper' ? getData(func) : undefined;

      if (data && isLaziable(data[0]) &&
            data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
               !data[4].length && data[9] == 1
          ) {
        wrapper = wrapper[getFuncName(data[0])](...data[3]);
      } else {
        wrapper = (func.length == 1 && isLaziable(func))
          ? wrapper[funcName]()
          : wrapper.thru(func);
      }
    }
    return function() {
      const args = arguments;
      const value = args[0];

      if (wrapper && args.length == 1 && isArray(value)) {
        return wrapper.plant(value).value();
      }
      let index = 0, result = length ? funcs[index].apply(this, args) : value;

      while (++index < length) {
        result = funcs[index].call(this, result);
      }
      return result;
    };
  });
}

export default createFlow;
