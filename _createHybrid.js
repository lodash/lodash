import composeArgs from './_composeArgs.js';
import composeArgsRight from './_composeArgsRight.js';
import countHolders from './_countHolders.js';
import createCtor from './_createCtor.js';
import createRecurry from './_createRecurry.js';
import getHolder from './_getHolder.js';
import reorder from './_reorder.js';
import replaceHolders from './_replaceHolders.js';
import root from './_root.js';

/** Used to compose bitmasks for function metadata. */
const WRAP_BIND_FLAG = 1;
const WRAP_BIND_KEY_FLAG = 2;
const WRAP_CURRY_FLAG = 8;
const WRAP_CURRY_RIGHT_FLAG = 16;
const WRAP_ARY_FLAG = 128;
const WRAP_FLIP_FLAG = 512;

/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  const isAry = bitmask & WRAP_ARY_FLAG;
  const isBind = bitmask & WRAP_BIND_FLAG;
  const isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
  const isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
  const isFlip = bitmask & WRAP_FLIP_FLAG;
  const Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    let holderCount;
    let placeholder;
    let length = arguments.length;
    let args = Array(length);
    let index = length;

    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      placeholder = getHolder(wrapper);
      holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      const newHolders = replaceHolders(args, placeholder);
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
        args, newHolders, argPos, ary, arity - length
      );
    }
    const thisBinding = isBind ? thisArg : this;
    let fn = isBindKey ? thisBinding[func] : func;

    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

export default createHybrid;
