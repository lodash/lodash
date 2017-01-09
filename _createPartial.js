import apply from './_apply.js';
import createCtor from './_createCtor.js';
import root from './_root.js';

/** Used to compose bitmasks for function metadata. */
const WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(func, bitmask, thisArg, partials) {
  const isBind = bitmask & WRAP_BIND_FLAG;
  const Ctor = createCtor(func);

  function wrapper() {
    let argsIndex = -1;
    let argsLength = arguments.length;
    let leftIndex = -1;

    const leftLength = partials.length;
    const args = Array(leftLength + argsLength);
    const fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

export default createPartial;
