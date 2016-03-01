import baseCreate from './_baseCreate';
import isPrototype from './_isPrototype';

/** Built-in value references. */
var getPrototypeOf = Object.getPrototypeOf;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototypeOf(object))
    : {};
}

export default initCloneObject;
