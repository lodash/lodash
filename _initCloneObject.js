import baseCreate from './_baseCreate';
import isFunction from './isFunction';
import isPrototype from './_isPrototype';

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  if (isPrototype(object)) {
    return {};
  }
  var Ctor = object.constructor;
  return baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
}

export default initCloneObject;
