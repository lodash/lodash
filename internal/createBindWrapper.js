import createCtorWrapper from './createCtorWrapper';
import root from './root';

/**
 * Creates a function that wraps `func` and invokes it with the `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new bound function.
 */
function createBindWrapper(func, thisArg) {
  var Ctor = createCtorWrapper(func);

  function wrapper() {
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return fn.apply(thisArg, arguments);
  }
  return wrapper;
}

export default createBindWrapper;
