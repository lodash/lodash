import baseInverter from './_baseInverter.js';

/**
 * Creates a function like `invertBy`.
 *
 * @private
 * @param {Function} setter The function to set accumulator values.
 * @returns {Function} Returns the new inverter function.
 */
function createInverter(setter) {
  return (object, iteratee) => baseInverter(object, setter, iteratee, {});
}

export default createInverter;
