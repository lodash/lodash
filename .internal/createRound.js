import toInteger from '../toInteger.js';
import toNumber from '../toNumber.js';
import toString from '../toString.js';

/**
 * Creates a function like `round`.
 *
 * @private
 * @param {string} methodName The name of the `Math` method to use when rounding.
 * @returns {Function} Returns the new round function.
 */
function createRound(methodName) {
  const func = Math[methodName];
  return (number, precision) => {
    number = toNumber(number);
    precision = precision == null ? 0 : Math.min(toInteger(precision), 292);
    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      let pair = `${ toString(number) }e`.split('e');
      const value = func(`${ pair[0] }e${ +pair[1] + precision }`);

      pair = `${ toString(value) }e`.split('e');
      return +`${ pair[0] }e${ +pair[1] - precision }`;
    }
    return func(number);
  };
}

export default createRound;
