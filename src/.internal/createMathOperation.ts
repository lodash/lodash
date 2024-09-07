import convertToNumberOrString from './convertToNumberOrString.js'

/**
 * Creates a function that performs a mathematical operation on two values.
 *
 * @private
 * @param {Function} operator The function to perform the operation.
 * @param {number} [defaultValue] The value used for `undefined` arguments.
 * @returns {Function} Returns the new mathematical operation function.
 */
function createMathOperation(operator, defaultValue) {
  return (value, other) => {
    if (value === undefined && other === undefined) {
      return defaultValue
    }
    if (value === undefined || other === undefined) {
      return value !== undefined ? value : other;
    }
    return operator(convertToNumberOrString(value), convertToNumberOrString(other));
  }
}

export default createMathOperation
