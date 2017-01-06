import baseInverter from './_baseInverter.js';

/**
 * Creates a function like `_.invertBy`.
 *
 * @private
 * @param {Function} setter The function to set accumulator values.
 * @param {Function} toIteratee The function to resolve iteratees.
 * @returns {Function} Returns the new inverter function.
 */
function createInverter(setter, toIteratee) {
  return (object, iteratee) => baseInverter(object, setter, toIteratee(iteratee), {});
}

export default createInverter;
