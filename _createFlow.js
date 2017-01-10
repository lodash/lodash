/** Error message constants. */
const FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a `flow` or `flowRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new flow function.
 */
function createFlow(fromRight) {
  return (...funcs) => {
    const length = funcs.length;

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
    }
    return function(...args) {
      const value = args[0];
      let index = 0;
      let result = length ? funcs[index].apply(this, args) : value;

      while (++index < length) {
        result = funcs[index].call(this, result);
      }
      return result;
    };
  };
}

export default createFlow;
