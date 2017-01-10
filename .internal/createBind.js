import createCtor from './.internal/createCtor.js';
import root from './.internal/root.js';

/** Used to compose bitmasks for function metadata. */
const WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBind(func, bitmask, thisArg) {
  const isBind = bitmask & WRAP_BIND_FLAG;
  const Ctor = createCtor(func);

  function wrapper(...args) {
    const fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, args);
  }
  return wrapper;
}

export default createBind;
