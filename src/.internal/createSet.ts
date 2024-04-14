import setToArray from './setToArray.js'

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
const createSet = (Set && (1 / setToArray(new Set([,-0]))[1]) === INFINITY)
  ? (values) => new Set(values)
  : () => {}

export default createSet
