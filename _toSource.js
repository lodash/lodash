var isFunction = require('./isFunction'),
    toString = require('./toString');

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (isFunction(func)) {
    try {
      return funcToString.call(func);
    } catch (e) {}
  }
  return toString(func);
}

module.exports = toSource;
