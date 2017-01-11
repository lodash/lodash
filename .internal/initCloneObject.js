import baseCreate from './.internal/baseCreate.js';
import isPrototype from './.internal/isPrototype.js';

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(Object.getPrototypeOf(object))
    : {};
}

export default initCloneObject;
