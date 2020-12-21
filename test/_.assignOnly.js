var pick = require('./pick');

/**
 * This method is like `_.assign` except that the third parameter is an array of properties to copy or if is null it will assign only the properties of the first object parameter.
 *
 * @static
 * @since xxxx
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {Object} objectToCopy The object to copy
 * @param {Array} arrayKeysToCopy An array of properties keys to copy
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { a: 1, b: 1 };
 * var object2 = { a: 2, b: 2, c: 2 };
 *
 * _.assignOnly(object, object2);
 * // => {a: 2, b:2}
 *
 * _.assignOnly(object, object2; [a,c]);
 * // => {a: 2, b:1,c:2}
 */
var assignOnly = function(object, objectToCopy, arrayKeysToCopy) {

  if (!arrayKeysToCopy) {
    arrayKeysToCopy = Object.keys(object);
  }

  return Object.assign(object, _.pick(objectToCopy, arrayKeysToCopy));
}

module.exports = assignOnly;