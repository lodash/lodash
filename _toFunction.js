import identity from './identity';

/**
 * Converts `value` to a function if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Function} Returns the function.
 */
function toFunction(value) {
  return typeof value == 'function' ? value : identity;
}

export default toFunction;
