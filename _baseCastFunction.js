import identity from './identity';

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function baseCastFunction(value) {
  return typeof value == 'function' ? value : identity;
}

export default baseCastFunction;
